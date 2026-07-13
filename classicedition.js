function Square(name, pricetext, color, price, groupNumber, baserent, rent1, rent2, rent3, rent4, rent5) {
	this.name = name;
	this.pricetext = pricetext;
	this.color = color;
	this.owner = 0;
	this.mortgage = false;
	this.house = 0;
	this.hotel = 0;
	this.groupNumber = groupNumber || 0;
	this.price = (price || 0);
	this.baserent = (baserent || 0);
	this.rent1 = (rent1 || 0);
	this.rent2 = (rent2 || 0);
	this.rent3 = (rent3 || 0);
	this.rent4 = (rent4 || 0);
	this.rent5 = (rent5 || 0);
	this.landcount = 0;

	if (groupNumber === 3 || groupNumber === 4) {
		this.houseprice = 50;
	} else if (groupNumber === 5 || groupNumber === 6) {
		this.houseprice = 100;
	} else if (groupNumber === 7 || groupNumber === 8) {
		this.houseprice = 150;
	} else if (groupNumber === 9 || groupNumber === 10) {
		this.houseprice = 200;
	} else {
		this.houseprice = 0;
	}
}

function Card(text, action) {
	this.text = text;
	this.action = action;
}

function corrections() {
	document.getElementById("cell1name").textContent = "Conjunto de Enteros ℤ";

	// Add images to enlarges.
	document.getElementById("enlarge5token").innerHTML += '<img src="images/train_icon.png" height="60" width="65" alt="" style="position: relative; bottom: 20px;" />';
	document.getElementById("enlarge15token").innerHTML += '<img src="images/train_icon.png" height="60" width="65" alt="" style="position: relative; top: -20px;" />';
	document.getElementById("enlarge25token").innerHTML += '<img src="images/train_icon.png" height="60" width="65" alt="" style="position: relative; top: -20px;" />';
	document.getElementById("enlarge35token").innerHTML += '<img src="images/train_icon.png" height="60" width="65" alt="" style="position: relative; top: -20px;" />';
	document.getElementById("enlarge12token").innerHTML += '<img src="images/electric_icon.png" height="60" width="48" alt="" style="position: relative; top: -20px;" />';
	document.getElementById("enlarge28token").innerHTML += '<img src="images/water_icon.png" height="60" width="78" alt="" style="position: relative; top: -20px;" />';
}

function utiltext() {
	return '<div style="font-size: 13px; line-height: 1.4;">Propiedad algebraica especial. Consulta la ficha: cada estructura incluye definición, ejemplo y reto asociado.</div>';
}

function transtext() {
	return '<div style="font-size: 13px; line-height: 1.4;">Concepto algebraico especial. Resuelve su reto con una justificación para poder adquirirlo.</div>';
}

function luxurytax() {
	addAlert(player[turn].name + " pagó $100 por caer en Error de Distributividad.");
	player[turn].pay(100, 0);

	$("#landed").show().text("Caíste en Error de Distributividad. Paga $100.");
}

function citytax() {
	addAlert(player[turn].name + " pagó $200 por caer en Error de Cerradura.");
	player[turn].pay(200, 0);

	$("#landed").show().text("Caíste en Error de Cerradura. Paga $200.");
}

var square = [];

square[0] = new Square("Inicio Algebraico", "COBRA 200 UA AL PASAR", "#FFFFFF");
square[1] = new Square("Conjunto de Enteros ℤ", "$60", "#8B4513", 60, 3, 2, 10, 30, 90, 160, 250);
square[2] = new Square("Contraejemplo", "TOMA UNA TARJETA", "#FFFFFF");
square[3] = new Square("Conjunto de Racionales ℚ", "$60", "#8B4513", 60, 3, 4, 20, 60, 180, 320, 450);
square[4] = new Square("Error de Cerradura", "PENALIZACIÓN 200 UA", "#FFFFFF");
square[5] = new Square("Operación Binaria", "$200", "#FFFFFF", 200, 1);
square[6] = new Square("Cerradura", "$100", "#87CEEB", 100, 4, 6, 30, 90, 270, 400, 550);
square[7] = new Square("Reto de Grupo", "TOMA UNA TARJETA", "#FFFFFF");
square[8] = new Square("Asociatividad", "$100", "#87CEEB", 100, 4, 6, 30, 90, 270, 400, 550);
square[9] = new Square("Elemento Neutro", "$120", "#87CEEB", 120, 4, 8, 40, 100, 300, 450, 600);
square[10] = new Square("Visita al Aula", "", "#FFFFFF");
square[11] = new Square("Inverso Aditivo", "$140", "#FF0080", 140, 5, 10, 50, 150, 450, 625, 750);
square[12] = new Square("Grupo (ℤ,+)", "$150", "#FFFFFF", 150, 2);
square[13] = new Square("Grupo ℤ₅", "$140", "#FF0080", 140, 5, 10, 50, 150, 450, 625, 750);
square[14] = new Square("Grupo Abeliano", "$160", "#FF0080", 160, 5, 12, 60, 180, 500, 700, 900);
square[15] = new Square("Subgrupo", "$200", "#FFFFFF", 200, 1);
square[16] = new Square("No Abeliano S₃", "$180", "#FFA500", 180, 6, 14, 70, 200, 550, 750, 950);
square[17] = new Square("Demostración Algebraica", "TOMA UNA TARJETA", "#FFFFFF");
square[18] = new Square("Anillo de Enteros ℤ", "$180", "#FFA500", 180, 6, 14, 70, 200, 550, 750, 950);
square[19] = new Square("Anillo ℤ₆", "$200", "#FFA500", 200, 6, 16, 80, 220, 600, 800, 1000);
square[20] = new Square("Descanso Matemático", "", "#FFFFFF");
square[21] = new Square("Anillo Conmutativo", "$220", "#FF0000", 220, 7, 18, 90, 250, 700, 875, 1050);
square[22] = new Square("Reto de Campo", "TOMA UNA TARJETA", "#FFFFFF");
square[23] = new Square("Dominio Entero", "$220", "#FF0000", 220, 7, 18, 90, 250, 700, 875, 1050);
square[24] = new Square("Divisores de Cero", "$240", "#FF0000", 240, 7, 20, 100, 300, 750, 925, 1100);
square[25] = new Square("Ideal de un Anillo", "$200", "#FFFFFF", 200, 1);
square[26] = new Square("Campo de Racionales ℚ", "$260", "#FFFF00", 260, 8, 22, 110, 330, 800, 975, 1150);
square[27] = new Square("Campo ℤ₅", "$260", "#FFFF00", 260, 8, 22, 110, 330, 800, 975, 1150);
square[28] = new Square("Campo de Reales ℝ", "$150", "#FFFFFF", 150, 2);
square[29] = new Square("Campo Finito 𝔽₇", "$280", "#FFFF00", 280, 8, 24, 120, 360, 850, 1025, 1200);
square[30] = new Square("A Prisión: sin demostración", "VE DIRECTO A PRISIÓN", "#FFFFFF");
square[31] = new Square("Espacio Vectorial", "$300", "#008000", 300, 9, 26, 130, 390, 900, 1100, 1275);
square[32] = new Square("Homomorfismo", "$300", "#008000", 300, 9, 26, 130, 390, 900, 1100, 1275);
square[33] = new Square("Error de Cerradura", "TOMA UNA TARJETA", "#FFFFFF");
square[34] = new Square("Isomorfismo", "$320", "#008000", 320, 9, 28, 150, 450, 1000, 1200, 1400);
square[35] = new Square("Cociente ℤ/nℤ", "$200", "#FFFFFF", 200, 1);
square[36] = new Square("Contraejemplo", "TOMA UNA TARJETA", "#FFFFFF");
square[37] = new Square("Campo Complejo ℂ", "$350", "#0000FF", 350, 10, 35, 175, 500, 1100, 1300, 1500);
square[38] = new Square("Error de Distributividad", "PAGA 100 UA", "#FFFFFF");
square[39] = new Square("Campo Finito 𝔽₁₁", "$400", "#0000FF", 400, 10, 50, 200, 600, 1400, 1700, 2000);

// Información que aparece en la ficha de cada propiedad y en el panel de apoyo.
var algebraPropertyInfo = {
	1: ["Conjuntos", "ℤ es el conjunto de los enteros: {...,-2,-1,0,1,2,...}."], 3: ["Conjuntos", "ℚ contiene los números que pueden escribirse como p/q, con q ≠ 0."],
	5: ["Operaciones", "Una operación binaria en A es una función A × A → A."], 6: ["Operaciones", "Hay cerradura si operar dos elementos de A produce otro elemento de A."], 8: ["Operaciones", "La asociatividad exige (a*b)*c = a*(b*c)."], 9: ["Grupos", "El neutro e satisface e*a = a*e = a."],
	11: ["Grupos", "Cada a tiene inverso a⁻¹ tal que a*a⁻¹ = e."], 12: ["Grupos", "(ℤ,+) es grupo: cerrado, asociativo, con 0 e inversos aditivos."], 13: ["Grupos", "ℤ₅ bajo suma módulo 5 es un grupo cíclico."], 14: ["Grupos abelianos", "Un grupo abeliano además cumple a*b = b*a."], 15: ["Grupos", "Un subgrupo es un subconjunto que, con la operación heredada, también es grupo."], 16: ["Grupos", "S₃ es grupo, pero no abeliano: la composición de permutaciones no conmuta."],
	18: ["Anillos", "(ℤ,+,·) es un anillo conmutativo con identidad."], 19: ["Anillos", "ℤ₆ es anillo, pero tiene divisores de cero: 2·3 = 0 mod 6."], 21: ["Anillos", "En un anillo conmutativo, a·b = b·a."], 23: ["Anillos", "Un dominio entero es un anillo conmutativo con 1 y sin divisores de cero."], 24: ["Anillos", "a y b no nulos son divisores de cero si a·b = 0."], 25: ["Anillos", "Un ideal absorbe la multiplicación por elementos del anillo."],
	26: ["Campos", "ℚ es campo: cada racional no nulo tiene inverso multiplicativo."], 27: ["Campos", "ℤ₅ es campo porque 5 es primo; todo no cero tiene inverso."], 28: ["Campos", "ℝ es campo con las operaciones usuales."], 29: ["Campos", "𝔽₇ = ℤ₇ es un campo finito de 7 elementos."], 31: ["Estructuras", "Un espacio vectorial combina vectores con escalares de un campo."], 32: ["Estructuras", "Un homomorfismo preserva la operación."], 34: ["Estructuras", "Un isomorfismo es un homomorfismo biyectivo."], 35: ["Anillos", "ℤ/nℤ son clases de equivalencia módulo n."], 37: ["Campos", "ℂ es campo: todo complejo no nulo tiene inverso."], 39: ["Campos", "𝔽₁₁ = ℤ₁₁ es campo finito porque 11 es primo."]
};

for (var algebraIndex in algebraPropertyInfo) {
	if (algebraPropertyInfo.hasOwnProperty(algebraIndex)) {
		square[algebraIndex].algebraCategory = algebraPropertyInfo[algebraIndex][0];
		square[algebraIndex].algebraInfo = algebraPropertyInfo[algebraIndex][1];
	}
}

var communityChestCards = [];
var chanceCards = [];

communityChestCards[0] = new Card("SAL DE PRISIÓN GRATIS. Conserva esta tarjeta hasta necesitarla o venderla.", function(p) { p.communityChestJailCard = true; updateOwned();});
communityChestCards[1] = new Card("Has ganado un premio académico. Cobra $10.", function() { addamount(10, 'Caja de retos');});
communityChestCards[2] = new Card("Por publicar una solución, recibes $50.", function() { addamount(50, 'Caja de retos');});
communityChestCards[3] = new Card("Tu beca matemática vence. Cobra $100.", function() { addamount(100, 'Caja de retos');});
communityChestCards[4] = new Card("Recibes una devolución de inscripción. Cobra $20.", function() { addamount(20, 'Caja de retos');});
communityChestCards[5] = new Card("El fondo académico vence. Recibe $100.", function() { addamount(100, 'Caja de retos');});
communityChestCards[6] = new Card("Heredas $100 para material de estudio.", function() { addamount(100, 'Caja de retos');});
communityChestCards[7] = new Card("Recibe $25 por asesoría matemática.", function() { addamount(25, 'Caja de retos');});
communityChestCards[8] = new Card("Paga $100 por recursos académicos.", function() { subtractamount(100, 'Caja de retos');});
communityChestCards[9] = new Card("Error del banco a tu favor. Cobra $200.", function() { addamount(200, 'Caja de retos');});
communityChestCards[10] = new Card("Paga $50 de cuota escolar.", function() { subtractamount(50, 'Caja de retos');});
communityChestCards[11] = new Card("Paga $50 de material didáctico.", function() { subtractamount(50, 'Caja de retos');});
communityChestCards[12] = new Card("Es tu día de exposición. Cobra $10 de cada jugador.", function() { collectfromeachplayer(10, 'Caja de retos');});
communityChestCards[13] = new Card("AVANZA A INICIO ALGEBRAICO (cobra $200).", function() { advance(0);});
communityChestCards[14] = new Card("Reparaciones de aula: $40 por casa y $115 por hotel.", function() { streetrepairs(40, 115);});
communityChestCards[15] = new Card("VE A PRISIÓN. No pases por Inicio Algebraico ni cobres $200.", function() { gotojail();});


chanceCards[0] = new Card("SAL DE PRISIÓN GRATIS. Conserva esta tarjeta hasta necesitarla o intercambiarla.", function(p) { p.chanceJailCard=true; updateOwned();});
chanceCards[1] = new Card("Repara tus propiedades: paga $25 por casa y $100 por hotel.", function() { streetrepairs(25, 100);});
chanceCards[2] = new Card("Multa de $15.", function() { subtractamount(15, 'Suerte');});
chanceCards[3] = new Card("Fuiste elegido representante. Paga $50 a cada jugador.", function() { payeachplayer(50, 'Suerte');});
chanceCards[4] = new Card("Retrocede tres casillas.", function() { gobackthreespaces();});
chanceCards[5] = new Card("AVANZA A LA ESTRUCTURA ESPECIAL MÁS CERCANA. Si no tiene dueño puedes comprarla; si lo tiene, tira los dados y paga diez veces el resultado.", function() { advanceToNearestUtility();});
chanceCards[6] = new Card("El banco te paga $50.", function() { addamount(50, 'Suerte');});
chanceCards[7] = new Card("AVANZA AL CONCEPTO ESPECIAL MÁS CERCANO. Si tiene dueño, paga el doble de renta.", function() { advanceToNearestRailroad();});
chanceCards[8] = new Card("Paga una multa de $15.", function() { subtractamount(15, 'Suerte');});
chanceCards[9] = new Card("Viaja a Operación Binaria. Si pasas por Inicio Algebraico, cobra $200.", function() { advance(5);});
chanceCards[10] = new Card("AVANZA A Campo Finito 𝔽₁₁.", function() { advance(39);});
chanceCards[11] = new Card("AVANZA A Divisores de Cero. Si pasas por Inicio Algebraico, cobra $200.", function() { advance(24);});
chanceCards[12] = new Card("Tu apoyo académico vence. Cobra $150.", function() { addamount(150, 'Suerte');});
chanceCards[13] = new Card("AVANZA AL CONCEPTO ESPECIAL MÁS CERCANO. Si tiene dueño, paga el doble de renta.", function() { advanceToNearestRailroad();});
chanceCards[14] = new Card("AVANZA A Inverso Aditivo. Si pasas por Inicio Algebraico, cobra $200.", function() { advance(11);});
chanceCards[15] = new Card("VE A PRISIÓN. No pases por Inicio Algebraico ni cobres $200.", function() { gotojail();});

// Las tarjetas conservan el mazo existente, pero ahora disparan retos de Álgebra.
communityChestCards[1] = new Card("CONTRAEJEMPLO: refuta una afirmación algebraica.", function() { startSpecialAlgebraChallenge("counterexample"); });
communityChestCards[4] = new Card("ERROR DE CERRADURA: verifica si una operación permanece en el conjunto.", function() { startSpecialAlgebraChallenge("closure"); });
communityChestCards[9] = new Card("DEMOSTRACIÓN ALGEBRAICA: justifica con definiciones.", function() { startSpecialAlgebraChallenge("proof"); });
communityChestCards[12] = new Card("RETO DE GRUPO: identifica los axiomas necesarios.", function() { startSpecialAlgebraChallenge("identification"); });
communityChestCards[14] = new Card("RETO DE CAMPO: clasifica y justifica la estructura.", function() { startSpecialAlgebraChallenge("classification"); });
chanceCards[2] = new Card("DEMOSTRACIÓN ALGEBRAICA: explica cada axioma usado.", function() { startSpecialAlgebraChallenge("proof"); });
chanceCards[4] = new Card("CONTRAEJEMPLO: encuentra un caso que haga falsa la afirmación.", function() { startSpecialAlgebraChallenge("counterexample"); });
chanceCards[6] = new Card("RETO DE GRUPO: responde con una justificación.", function() { startSpecialAlgebraChallenge("identification"); });
chanceCards[8] = new Card("RETO DE CAMPO: clasifica la estructura propuesta.", function() { startSpecialAlgebraChallenge("classification"); });
chanceCards[12] = new Card("ERROR DE CERRADURA: analiza el resultado de la operación.", function() { startSpecialAlgebraChallenge("closure"); });
