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
	document.getElementById("cell24name").textContent = "blooming...";
}

function utiltext() {
	return '&nbsp;&nbsp;&nbsp;&nbsp;If one "Utility" is owned rent is 4 times amount shown on dice.<br /><br />&nbsp;&nbsp;&nbsp;&nbsp;If both "Utilitys" are owned rent is 10 times amount shown on dice.';
}

function transtext() {
	return '<div style="font-size: 14px; line-height: 1.5;">Rent<span style="float: right;">$25.</span><br />If 2 Transportations are owned<span style="float: right;">50.</span><br />If 3 &nbsp; &nbsp; " &nbsp; &nbsp; " &nbsp; &nbsp; "<span style="float: right;">100.</span><br />If 4 &nbsp; &nbsp; " &nbsp; &nbsp; " &nbsp; &nbsp; "<span style="float: right;">200.</span></div>';
}

function citytax() {
	var p = player[turn];

	if (p.human) {

		buttonAonclick = 'hide("popupbackground"); hide("popupwrap"); var p=player[turn]; addalert(p.name+" pagó $200 por caer en Impuesto de la Ciudad."); p.pay(200, 0);';
		buttonBonclick = ' hide("popupbackground"); hide("popupwrap"); var p=player[turn]; var cost=p.money; for(var i=0; i<40; i++){sq=square[i]; if(sq.owner==turn) { if(sq.mortgage) { cost+=sq.price*0.5; } else { cost+=sq.price; } cost+=(sq.house*sq.houseprice); } } cost*=0.1; cost=Math.round(cost); addalert(p.name+" pagó $"+cost+" por caer en Impuesto de la Ciudad."); p.pay(cost,0);';

		popup("Caíste en Impuesto de la Ciudad. Debes pagar $200 o el diez por ciento de tu patrimonio total.<div><input type='button' value='Pagar $200' onclick='" + buttonAonclick + "' /><input type='button' value='Pagar 10%' onclick='" + buttonBonclick + "' /></div>", false);
	} else {
		addalert(p.name + " pagó $200 por caer en Impuesto de la Ciudad.");
		p.pay(200, 0);
	}
}

function luxurytax() {
	addalert(player[turn].name + " pagó $75 por caer en Impuesto de Lujo.");
	player[turn].pay(75, 0);

	$("landed").show().text("Caíste en Impuesto de Lujo. Paga $75.");
}

var square = [];

square[0] = new Square("GO", "COBRA $200 POR PASAR.", "white");
square[1] = new Square("Port Authority Bus Terminal", "$60", "#4B0082", 60, 3, 2, 10, 30, 90, 160, 250);
square[2] = new Square("Community Chest", "FOLLOW INSTRUCTIONS ON TOP CARD", "white");
square[3] = new Square("Lincoln Tunnel", "$60", "#4B0082", 60, 3, 4, 20, 60, 180, 320, 450);
square[4] = new Square("City Tax", "PAY 10% OR $200", "white");
square[5] = new Square("LOMTO", "$200", "white", 200, 1);
square[6] = new Square("Statue of Liberty", "$100", "#AACCFF", 100, 4, 6, 30, 90, 270, 400, 550);
square[7] = new Square("Chance", "NEW YORK LOTTERY GAMES", "white");
square[8] = new Square("Empire State Building", "$100", "#AACCFF", 100, 4, 6, 30, 90, 270, 400, 550);
square[9] = new Square("Central Park", "$120", "#AACCFF", 120, 4, 8, 40, 100, 300, 450, 600);
square[10] = new Square("Just Visiting", "", "white");
square[11] = new Square("98.7 Kiss FM", "$140", "purple", 140, 5, 10, 50, 150, 450, 625, 750);
square[12] = new Square("Con Edison Electric", "$150", "white", 150, 2);
square[13] = new Square("Thirteen WNET", "$140", "purple", 140, 5, 10, 50, 150, 450, 625, 750);
square[14] = new Square("The New York Times", "$160", "purple", 160, 5, 12, 60, 180, 500, 700, 900);
square[15] = new Square("New York City Transit", "$200", "white", 200, 1);
square[16] = new Square("New York Rangers", "$180", "orange", 180, 6, 14, 70, 200, 550, 750, 950);
square[17] = new Square("Community Chest", "FOLLOW INSTRUCTIONS ON TOP CARD", "white");
square[18] = new Square("New York Knicks", "$180", "orange", 180, 6, 14, 70, 200, 550, 750, 950);
square[19] = new Square("Madison Square Garden", "$200", "orange", 200, 6, 16, 80, 220, 600, 800, 1000);
square[20] = new Square("Free Parking", "", "white");
square[21] = new Square("macy*s", "$220", "red", 220, 7, 18, 90, 250, 700, 875, 1050);
square[22] = new Square("Chance", "NEW YORK LOTTERY GAMES", "white");
square[23] = new Square("FAO Schwarz", "$220", "red", 220, 7, 18, 90, 250, 700, 875, 1050);
square[24] = new Square("bloomingdale's", "$240", "red", 240, 7, 20, 100, 300, 750, 925, 1100);
square[25] = new Square("Metro-North Railroad", "$200", "white", 200, 1);
square[26] = new Square("Deloitte & Touche LLP", "$260", "yellow", 260, 8, 22, 110, 330, 800, 975, 1150);
square[27] = new Square("SmithBarney", "$260", "yellow", 260, 8, 22, 110, 330, 800, 975, 1150);
square[28] = new Square("Con Edison Gas", "$150", "white", 150, 2);
square[29] = new Square("CITIBANK", "$280", "yellow", 280, 8, 24, 120, 360, 850, 1025, 1200);
square[30] = new Square("Go to Jail", "Ve directamente a prisión. No pases por Inicio ni cobres $200.", "white");
square[31] = new Square("The Regency Hotel", "$300", "green", 300, 9, 26, 130, 390, 900, 1100, 1275);
square[32] = new Square("Essex House", "$300", "green", 300, 9, 26, 130, 390, 900, 1100, 1275);
square[33] = new Square("Community Chest", "FOLLOW INSTRUCTIONS ON TOP CARD", "white");
square[34] = new Square("The Plaza", "$320", "green", 320, 9, 28, 150, 450, 1000, 1200, 1400);
square[35] = new Square("United Airlines", "$200", "white", 200, 1);
square[36] = new Square("Chance", "NEW YORK LOTTERY GAMES", "white");
square[37] = new Square("Tiffany & CO.", "$350", "blue", 350, 10, 35, 175, 500, 1100, 1300, 1500);
square[38] = new Square("LUXURY TAX", "Paga $75", "white");
square[39] = new Square("TRUMP TOWER", "$400", "blue", 400, 10, 50, 200, 600, 1400, 1700, 2000);

var communityChestCards = [];
var chanceCards = [];

communityChestCards[0] = new Card("Sal de la cárcel gratis. Esta carta puede conservarse hasta usarla o venderla.", function() { p.communityChestJailCard = true; updateOwned();});
communityChestCards[1] = new Card("Has ganado entrega a domicilio de por vida del New York Times. Cobra $10", function() { addamount(10, 'Caja Comunitaria');});
communityChestCards[2] = new Card("Por la venta de acciones de Macy's, recibes $45", function() { addamount(45, 'Caja Comunitaria');});
communityChestCards[3] = new Card("Vence el seguro de vida. Cobra $100", function() { addamount(100, 'Caja Comunitaria');});
communityChestCards[4] = new Card("Declaración de impuestos de Deloitte & Touche LLP. Cobra $20", function() { addamount(20, 'Caja Comunitaria');});
communityChestCards[5] = new Card("Vence el fondo navideño de FAO Schwarz. Cobra $100", function() { addamount(100, 'Caja Comunitaria');});
communityChestCards[6] = new Card("Has ganado un viaje alrededor del mundo con United Airlines. Cobra $100", function() { addamount(100, 'Caja Comunitaria');});
communityChestCards[7] = new Card("Celebraste una boda en el Plaza Hotel. Recibe $25", function() { addamount(25, 'Caja Comunitaria');});
communityChestCards[8] = new Card("Paga $100 al hospital", function() { subtractamount(100, 'Caja Comunitaria');});
communityChestCards[9] = new Card("¡Ganaste la lotería! Cobra $200", function() { addamount(200, 'Caja Comunitaria');});
communityChestCards[10] = new Card("Paga impuesto escolar de $150", function() { subtractamount(150, 'Caja Comunitaria');});
communityChestCards[11] = new Card("Honorarios del médico. Paga $50", function() { subtractamount(50, 'Caja Comunitaria');});
communityChestCards[12] = new Card("Inauguración en Madison Square Garden esta noche. Cobra $50 a cada jugador por entradas.", function() { collectfromeachplayer(50, 'Caja Comunitaria');});
communityChestCards[13] = new Card("¡Has ganado 'kiss cash'! Avanza a Inicio (cobra $200)", function() { advance(0);});
communityChestCards[14] = new Card("Te cobran por reparaciones de calles. $40 por casa, $115 por hotel.", function() { streetrepairs(40, 115);});
communityChestCards[15] = new Card("Ve a prisión. Ve directamente a prisión. No pases por Inicio ni cobres $200.", function() { gotojail();});


chanceCards[0] = new Card("Sal de la cárcel gratis. Esta carta puede conservarse hasta usarla o venderla.", function() { p.chanceJailCard=true; updateOwned();});
chanceCards[1] = new Card("Haz reparaciones generales en todas tus propiedades. Paga $25 por cada casa, $100 por cada hotel.", function() { streetrepairs(25, 100);});
chanceCards[2] = new Card("Paga impuesto de pobreza de $15.", function() { subtractamount(15, 'Suerte');});
chanceCards[3] = new Card("Has sido elegido presidente de Con Edison. Paga $50 a cada jugador.", function() { payeachplayer(50, 'Suerte');});
chanceCards[4] = new Card("Retrocede 3 casillas.", function() { gobackthreespaces();});
chanceCards[5] = new Card("Avanza a la utilidad Con Edison más cercana. Si NO está en venta, puedes comprarla al banco. Si está comprada, tira los dados y paga al propietario diez veces la suma de los dados.", function() { advanceToNearestUtility();});
chanceCards[6] = new Card("Citibank te paga intereses de $50.", function() { addamount(50, 'Suerte');});
chanceCards[7] = new Card("Avanza a la estación de transporte más cercana y paga al propietario el doble del alquiler. Si la estación no tiene dueño, puedes comprarla al banco.", function() { advanceToNearestRailroad();});
chanceCards[8] = new Card("Da un paseo por The Essex House. Avanza a Inicio. Cobra $200.", function() { advance(0,32);});
chanceCards[9] = new Card("Ve al Regency Hotel. Si pasas por Inicio, cobra $200.", function() { advance(31);});
chanceCards[10] = new Card("Camina por la Quinta Avenida. Avanza a Trump Tower.", function() { advance(39);});
chanceCards[11] = new Card("Avanza a la casilla 13.", function() { advance(13);});
chanceCards[12] = new Card("Tu fondo mutuo Smith Barney paga dividendos. Cobra $150.", function() { addamount(150, 'Suerte');});
chanceCards[13] = new Card("Avanza a la estación de transporte más cercana y paga al propietario el doble del alquiler.\n\nSi la estación no tiene dueño, puedes comprarla al banco.", function() { advanceToNearestRailroad();});
chanceCards[14] = new Card("Toma un autobús a Central Park. Si pasas por Inicio, cobra $200.", function() { advance(9);});
chanceCards[15] = new Card("Ve directamente a prisión. No pases por Inicio, no cobres $200.", function() { gotojail();});
