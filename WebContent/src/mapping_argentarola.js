var mapping = [ {
	id : 11,
	depth : 50,
	bussola : 110,
	dist : 0,	
	divers : [ "Cedurno" , "Daviano"],
	intensita_corrente: 0,
	temperatura : 12,
	fondale : "fango",
	visibilita : 2,
	benthos  :  { "gorgonie" : 1 , "cavolini" : 1 , "isolane" : 1 } ,
	impatto_umano : 0
}, {
	id : 10,
	depth : 45.8 ,
	bussola : 120,
	dist : 21,
	divers : "Cedurno - Daviano",

	visibilita : 2,	
	intensita_corrente: 0,

	temperatura : 13,
	fondale : "fango",
	benthos  :  { "malcion" : 1 , "palmatum": 1 , "gorgonie" : 1 ,"gavowni" : 1} ,
	impatto_umano : 0,
	colore : 1 /* fmGJqTd0Qt8 */

}, {
	id : 9,
	depth : 39.3,
	bussola : 150,
	dist : 15,
	divers: ["Massimo Papini","Francesca Marini"],
	
	visibilita : 4,	
	intensita_corrente: 1,
	temperatura : 14,
	fondale: "sabbia",
	benthos : { "gorgonia" : 1 , "spugna" : 1 , "donzella" : 1 , "stelle marine" : 1 },
	impatto_umano : "8 .... attorno ad una gorgonia",
	pesci : { "anthias" : "banchi di 10"}
	}, 
	{
	id : 8,
	depth : 35,
	bussola : 150,
	dist : 7,
	divers: ["Massimo Papini","Francesca Marini"],
	temperatura : 12,
	intensita_corrente: 0,
	visibilita : 5,
	fondale : "semi roccioso",
	benthos : { "gorgonia rossa" : 1 , "astice" : 1 , "spugna" : 1 , "margherita" : 1 , "stelle marine" : 1 , "sertelle" : 1},
	pesci : { "anthias" : 1 , "donzelle" : 1 , "castagnole" : 1},
	
	media : [ {
		type : "img",
	url : "media/anthias.jpg",
	description : "Una immagine"
	}]
}, {
	id : 7,
	depth : 30,
	bussola : 150,
	dist : 10,
	divers: [ "Orsi Massimiliano" , "Mazzantini Daniele", "Salvadori Fabrizio" ],
	visibilita : 4,	
	intensita_corrente: 1,
	direzione_corrente: 234,
	temperatura : 14,
			media : [ {
				type : "video",
				url : "YE7VzlLtp-4",
				title : "una tartaruga",
				description : "Un video "
			} ],
	pesci : { "anthias" : 1 }
	}, {
	id : 6,
	depth : 24.3,
	bussola : 150,
	dist : 8,
	divers: [ "Andrea", "PS", "Alfredo"],
	temperatura : 14,
	visibilita : 4.5,
	fondale : "scarpata rocciosa",
	benthos : { "spugne" : 1 , "posidonia gialla" : 1 , "posidonia" : 1 , "flabellina" : 1 , "stelle marine" : 1 },
	pesci : { "castagnole" : 1 },
}, {
	id : 5,
	depth : 20,
	bussola : 130,
	dist : 9,
	divers: [ "Orsi Massimiliano" , "Mazzantini Daniele", "Salvadori Fabrizio" ],
	visibilita : 4.5,
	intensita_corrente: 1,
	direzione_corrente : 235,
	temperatura : 14,
	benthos : { "paraminacee" : 4 , "gorgonia gialla" : 5 , "ricci punta bianca" : 6 , "flabellina" : 2 , "stelle marine" : 3 },
	pesci : { "saraghi": 7 , "triglie" : 3 , "cradinieri" : 2 , "gronco" : 1 , "anthias" : "> 30 "}
}, {
	id : 4,
	depth : 15,
	bussola : 130,
	dist : 10,
	divers: [ "Corirossi Maurizio ", "Veronese Manuel"],
	temperatura : 14,
	intensita_corrente: 0,
	visibilita : 9.4,
	benthos : {"pinna nobilis":1 ,"flabellina affinis":1, "stella rossa":1,
		"riccio femmina":1 , "gorgonia bianca":1 ,"gorgonia gialla" :1, "sabella":1}
	,
	pesci: { "saraghi": 1 , "grongo" : 1 , "castagnole" : 1 }
	}, {
	id : 3,
	depth : 10,
	bussola : 120,
	dist : 18,
	divers: [ "Eli" , "Eugenia"] ,
	temperatura : 14,
	visibilita : 6,
	fondale : "roccia",
	benthos : { "eunicella":1 ,
		"cavolini":1 ,
		"sinsulanis":1 ,
		"alghe":1 ,
		"ricci":1 ,
		"spugne":1 		
	},
	pesci : { "castagnole" : 1 , "semanidi": 1 , "boga":1}
}, {
	id : 2,
	depth : 5,
	bussola : 160,
	dist : 10,
	divers: [ "Eli" , "Eugenia"] ,
	temperatura : 14,
	intensita_corrente: 9.5,
	visibilita : 6,
	fondale : "roccia",
	benthos : { "alghe verdi" : 1 , "alghe rosse" : 1 , "spugne":1 , "clandocola" : 1 , "ricci" :1 , "stelle" : 1},
	pesci : { "castagnole" : 1 , "seracidi" : 1 , "anthias" :1 ,"boga":1}
}, {
	id : 1,
	depth : 0,
	bussola : 0,
	temperatura : 15,
	intensita_corrente : 0,
	visibilita:30,
	dist : 8,
	Nord : "42° 25.110' ",
	Est : "11° 4.839' "
} ];
