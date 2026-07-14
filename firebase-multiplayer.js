// Multiplayer helpers using Firebase Realtime Database
// Minimal, non-invasive integration layer. Keeps existing game logic,
// snapshots dynamic state to the DB and applies remote snapshots.

var MP = (function() {
  var app = null;
  var db = null;
  var isMultiplayer = false;
  var roomCode = null;
  var lobbyRef = null;
  var stateRef = null;
  var lobbyPlayersRef = null;
  var localPlayerKey = null;
  var localPlayerName = null;
  var localPlayerIndex = null; // 1-based index into `player` array
  var isHost = false;
  var applyingRemote = false;

  function init() {
    // Read configuration at initialization time (in case scripts loaded in different order)
    var cfg = window.firebaseConfig || null;
    if (!cfg) {
      console.warn('firebaseConfig not found; multiplayer disabled until config is set.');
      return;
    }

    if (typeof window.firebase === 'undefined') {
      console.error('Firebase SDK not detected. Ensure Firebase scripts are loaded before firebase-multiplayer.js');
      return;
    }

    try {
      app = firebase.initializeApp(cfg);
      db = firebase.database();
    } catch (e) {
      console.error('Firebase init error', e);
      return;
    }

    // Wire UI buttons (guard in case DOM elements are missing)
    var el;
    el = document.getElementById('create-room'); if (el) el.addEventListener('click', onCreateRoom);
    el = document.getElementById('join-room'); if (el) el.addEventListener('click', onJoinRoom);
    el = document.getElementById('start-online-game'); if (el) el.addEventListener('click', onStartOnlineGame);

    // Wrap state-changing functions so we can push snapshots after they run.
    wrapFunction(window, 'buy');
    wrapFunction(window, 'mortgage');
    wrapFunction(window, 'unmortgage');
    wrapFunction(window, 'buyHouse');
    wrapFunction(window, 'sellHouse');
    // nextbutton will call game.next(); intercept button click
    var nextBtn = document.getElementById('nextbutton');
    if (nextBtn) {
      nextBtn.addEventListener('click', function(e) {
        if (!isMultiplayer) { game.next(); return; }
        // If multiplayer, only allow if it's our turn
        if (localPlayerIndex && localPlayerIndex === turn) {
          // perform action locally then push state
          game.next();
          pushState();
        } else {
          popup('<p>No es tu turno.</p>');
        }
      });
    }

    // Keep join-name in local storage to match after state arrives.
    var joinNameInput = document.getElementById('join-name');
    if (joinNameInput) {
      joinNameInput.value = sessionStorage.getItem('mp_join_name') || '';
    }

    console.log('MP initialized');

    // If the page is opened with ?id=ROOMCODE, prefill the join input.
    try {
      var url = new URL(window.location.href);
      var idParam = url.searchParams.get('id');
      if (idParam) {
        var joinInput = document.getElementById('join-code');
        if (joinInput) joinInput.value = idParam;

        // If user previously saved a name, prefill and auto-join.
        var savedName = sessionStorage.getItem('mp_join_name');
        var nameInput = document.getElementById('join-name');
        if (nameInput && savedName) {
          nameInput.value = savedName;
          // Attempt automatic join if elements exist and db is ready
          if (document.getElementById('join-room')) {
            // Slight delay to ensure listeners are attached
            setTimeout(function() { try { onJoinRoom(); } catch (e) { console.error('auto join failed', e); } }, 200);
          }
        }
      }
    } catch (e) {
      // ignore URL parsing errors
    }
  }

  function wrapFunction(obj, name) {
    if (!obj || !obj[name] || typeof obj[name] !== 'function') return;
    var orig = obj[name];
    obj[name] = function() {
      var res = orig.apply(this, arguments);
      if (isMultiplayer) {
        // push state asynchronously
        setTimeout(pushState, 200);
      }
      return res;
    };
  }

  function generateRoomCode() {
    return 'ALGEBRA-' + ('' + Math.floor(1000 + Math.random() * 9000));
  }

  function onCreateRoom() {
    if (!db) return popup('<p>Firebase no está configurado. Copia tu configuración en firebase-config.js</p>');
    roomCode = generateRoomCode();
    lobbyRef = db.ref('games/' + roomCode + '/lobby');
    stateRef = db.ref('games/' + roomCode + '/state');
    lobbyPlayersRef = db.ref('games/' + roomCode + '/lobby/players');

    // Create minimal lobby record
    lobbyRef.set({ createdAt: Date.now(), host: true });

    showLobby(roomCode, true);
    isMultiplayer = true;
    isHost = true;

    // Generate QR linking to join url on the same host/path where this page is served
    // Use current page base (without query/hash) so the QR opens this page with ?id=ROOMCODE
    var base = (window.location.href || '').split('?')[0].split('#')[0];
    var joinUrl = base + (base.indexOf('?') === -1 ? '?' : '&') + 'id=' + roomCode;
    var qrcodeEl = document.getElementById('qrcode');
    qrcodeEl.innerHTML = '';
    new QRCode(qrcodeEl, { text: joinUrl, width: 128, height: 128 });

    // Listen for lobby players
    lobbyPlayersRef.on('value', function(snapshot) {
      var players = snapshot.val() || {};
      renderLobbyPlayers(players);
    });

    // Listen for state changes (players joining after start may wait for state)
    stateRef.on('value', function(snap) {
      var state = snap.val();
      if (state) applyState(state);
    });
  }

  function onJoinRoom() {
    if (!db) return popup('<p>Firebase no está configurado. Copia tu configuración en firebase-config.js</p>');
    var code = document.getElementById('join-code').value.trim();
    var name = document.getElementById('join-name').value.trim() || 'Jugador';
    if (!code) return popup('<p>Ingresa un código de sala.</p>');
    roomCode = code;
    lobbyPlayersRef = db.ref('games/' + roomCode + '/lobby/players');
    lobbyRef = db.ref('games/' + roomCode + '/lobby');
    stateRef = db.ref('games/' + roomCode + '/state');

    // Save name locally for later matching
    localPlayerName = name;
    sessionStorage.setItem('mp_join_name', name);

    // Add to lobby players list
    var pushed = lobbyPlayersRef.push({ name: name, joinedAt: Date.now() });
    localPlayerKey = pushed.key;

    // Show lobby UI
    showLobby(roomCode, false);

    // Listen for lobby updates
    lobbyPlayersRef.on('value', function(snapshot) {
      var players = snapshot.val() || {};
      renderLobbyPlayers(players);
    });

    // Listen for state updates (game started)
    stateRef.on('value', function(snap) {
      var state = snap.val();
      if (state) {
        applyState(state);
        // Find our player index by name, best-effort
        for (var i = 1; i <= (state.pcount || 8); i++) {
          var p = state.players && state.players[i];
          if (p && p.name === localPlayerName) {
            localPlayerIndex = i;
            console.log('Assigned localPlayerIndex', i);
            break;
          }
        }
      }
    });

    isMultiplayer = true;
    isHost = false;
  }

  function onStartOnlineGame() {
    if (!isHost || !roomCode) return;
    // Call original setup() to initialize game using existing UI values
    setup();
    // After setup finishes, push full snapshot
    setTimeout(function() {
      pushState();
      // show lobby players updated
      lobbyRef.update({ startedAt: Date.now() });
    }, 400);
  }

  function showLobby(code, host) {
    document.getElementById('lobby').style.display = 'block';
    document.getElementById('lobby-info').textContent = 'Sala: ' + code + (host ? ' (host)' : '');
    document.getElementById('start-online-game').style.display = host ? 'inline-block' : 'none';
  }

  function renderLobbyPlayers(playersObj) {
    var html = '<strong>Jugadores en sala:</strong><ul>';
    var i = 1;
    for (var k in playersObj) {
      if (!playersObj.hasOwnProperty(k)) continue;
      html += '<li>' + (playersObj[k].name || 'Jugador') + '</li>';
      i++;
    }
    html += '</ul>';
    document.getElementById('lobby-players').innerHTML = html;
  }

  function getCurrentState() {
    var state = {};
    state.pcount = pcount || 0;
    state.turn = turn || 0;
    state.doublecount = doublecount || 0;
    state.players = {};
    for (var i = 1; i <= (pcount || 0); i++) {
      var p = player[i];
      state.players[i] = {
        name: p.name,
        color: p.color,
        position: p.position,
        money: p.money,
        creditor: p.creditor,
        jail: p.jail,
        jailroll: p.jailroll,
        communityChestJailCard: p.communityChestJailCard,
        chanceJailCard: p.chanceJailCard,
        bidding: p.bidding,
        human: p.human,
        algebraPoints: p.algebraPoints,
        challengesCompleted: p.challengesCompleted,
        correctAnswers: p.correctAnswers,
        proofsCompleted: p.proofsCompleted,
        masteredConcepts: p.masteredConcepts,
        learningEvidence: p.learningEvidence
      };
    }
    state.squares = {};
    for (var s = 0; s < 40; s++) {
      var sq = square[s];
      state.squares[s] = {
        owner: sq.owner,
        house: sq.house,
        hotel: sq.hotel,
        mortgage: sq.mortgage,
        purchaseApprovedTurn: sq.purchaseApprovedTurn,
        purchaseFailedTurn: sq.purchaseFailedTurn,
        landcount: sq.landcount
      };
    }
    // dice values if available
    try { state.die1 = game.getDie(1); state.die2 = game.getDie(2); } catch (e) {}
    state.updatedAt = Date.now();
    return state;
  }

  function pushState() {
    if (!db || !roomCode || !stateRef) return;
    if (applyingRemote) return; // prevent echoing remote back
    var state = getCurrentState();
    stateRef.set(state, function(err) {
      if (err) console.error('pushState error', err);
    });
  }

  function applyState(state) {
    if (!state) return;
    applyingRemote = true;
    // Apply pcount/turn/doublecount
    if (typeof state.pcount === 'number') pcount = state.pcount;
    if (typeof state.turn === 'number') turn = state.turn;
    if (typeof state.doublecount === 'number') doublecount = state.doublecount;

    // Apply players
    if (state.players) {
      for (var i = 1; i <= pcount; i++) {
        if (!state.players[i]) continue;
        var src = state.players[i];
        var dst = player[i] || new Player('', '');
        dst.name = src.name;
        dst.color = src.color;
        dst.position = src.position;
        dst.money = src.money;
        dst.creditor = src.creditor;
        dst.jail = src.jail;
        dst.jailroll = src.jailroll;
        dst.communityChestJailCard = src.communityChestJailCard;
        dst.chanceJailCard = src.chanceJailCard;
        dst.bidding = src.bidding;
        dst.human = src.human;
        dst.algebraPoints = src.algebraPoints;
        dst.challengesCompleted = src.challengesCompleted;
        dst.correctAnswers = src.correctAnswers;
        dst.proofsCompleted = src.proofsCompleted;
        dst.masteredConcepts = src.masteredConcepts || {};
        dst.learningEvidence = src.learningEvidence || [];
        dst.index = i;
        player[i] = dst;
      }
    }

    // Apply squares dynamic fields
    if (state.squares) {
      for (var si = 0; si < 40; si++) {
        if (!state.squares[si]) continue;
        var ssrc = state.squares[si];
        var sdst = square[si];
        sdst.owner = ssrc.owner;
        sdst.house = ssrc.house;
        sdst.hotel = ssrc.hotel;
        sdst.mortgage = ssrc.mortgage;
        sdst.purchaseApprovedTurn = ssrc.purchaseApprovedTurn;
        sdst.purchaseFailedTurn = ssrc.purchaseFailedTurn;
        sdst.landcount = ssrc.landcount;
      }
    }

    // Update UI
    try {
      updatePosition();
      updateMoney();
      updateOwned();
      updateAlgebraDashboard();
      updateDice();
    } catch (e) {
      console.error('applyState UI update error', e);
    }

    // Try assign local player index by name match if not set
    if (!localPlayerIndex && localPlayerName && state.players) {
      for (var j = 1; j <= pcount; j++) {
        if (state.players[j] && state.players[j].name === localPlayerName) {
          localPlayerIndex = j;
          console.log('Matched local player index to', j);
          break;
        }
      }
    }

    applyingRemote = false;
  }

  // Expose a simple API for other scripts if needed
  return {
    init: init,
    pushState: pushState,
    applyState: applyState
  };
})();

// Init when DOM ready
window.addEventListener('load', function() {
  MP.init();
});
