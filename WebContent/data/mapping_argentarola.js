var def_copyright = "";//Copyleft

function index_of_station(id){
    for (k=0;k<mapping.length;k++){
	if (mapping[k].id==id) {
	    return k
	}
    }
}

var mapping = [ {
    id : 10,
    depth : 50,
    bussola : 110,
    dist : 0,	
    divers : [ "Claudio" , "Damiano"],
    intensita_corrente: 0,
    direzione_corrente:234,

    temperatura : 12,
    fondale : "fango",
    visibilita : 2,
    benthos  :  { "gorgonie" : 1 , "eunicella cavolini" : 1 } ,

    media : [],
    impatto_umano : 0
}, {
    id : 9,
    depth : 45.8 ,
    bussola : 120,
    dist : 21,
    divers : [ "Cedurno - Daviano" ],
    
    intensita_corrente: 0,
    direzione_corrente:234,

    visibilita : 2,	
    temperatura : 13,
    fondale : "fango",
    benthos  :  { "alcyonum palmatum": 1 , "gorgonie" : 1 ,"eunicella cavolini" : 1} ,
    impatto_umano : 0,
    media : [],
    colore : 1 /* fmGJqTd0Qt8 */
}, {
    id : 8,
    depth : 39.3,
    bussola : 150,
    dist : 15,
    divers: ["Massimo Papini","Francesca Marini"],
    
    visibilita : 4,	
    intensita_corrente: 1,
    direzione_corrente:234,

    temperatura : 14,
    fondale: "sabbia",
    benthos : { "gorgonia" : 1 , "spugna" : 1 , "donzella" : 1 , "stella marina" : 1 },
    impatto_umano : "sciarpa attorno ad una gorgonia",
    media : [],
    pesci : { "anthias" : "banchi di 10"}
},{
    id : 7 ,
    depth : 35,
    bussola : 150,
    dist : 7,
    divers: ["Massimo Papini","Francesca Marini"],
    temperatura : 12,
    intensita_corrente: 0,
    direzione_corrente:234,
    visibilita : 5,
    fondale : "semi roccioso",
    benthos : { "gorgonia rossa" : 1 , "astice" : 1 , "spugna" : 1 , "margherite" : 1 , "stelle marine" : 1 , "sertella" : 1},
    pesci : { "anthias" : 1 , "donzella" : 1 , "castagnole" : 1},
    
    media : [ {
	type : "img",
	url : "media/anthias.jpg",
	description : "Una immagine"
	}]
}, {
    id : 6,
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
    id : 5,
    depth : 24.3,
    bussola : 150,
    dist : 8,
    divers: [ "Andrea", "PS", "Alfredo"],
    temperatura : 14,
    intensita_corrente: 1,
    direzione_corrente : 235,
    visibilita : 4.5,
    fondale : "scarpata rocciosa",
    benthos : { "spugne" : 1 , "posidonia gialla" : 1 , "posidonia" : 1 , "flabellina" : 1 , "stelle marine" : 1 },
    media : [],
    pesci : { "castagnole" : 1 },
}, {
    id : 4,
    depth : 20,
    bussola : 130,
    dist : 9,
    divers: [ "Orsi Massimiliano" , "Mazzantini Daniele", "Salvadori Fabrizio" ],
    visibilita : 4.5,
    intensita_corrente: 1,
    direzione_corrente : 235,
    temperatura : 14,
    benthos : { "paramunicea" : 4 , "gorgonia gialla" : 5 , "ricci punta bianca" : 6 , "flabellina" : 2 , "stelle marine" : 3 },
    media : [],
    pesci : { "saraghi": 7 , "triglie" : 3 , "carabinieri" : 2 , "grongo" : 1 , "anthias" : "> 30 "}
}, {
    id : 3,
    depth : 15,
    bussola : 130,
    dist : 10,
    divers: [ "Corirossi Maurizio ", "Veronese Manuel"],
    temperatura : 14,
    intensita_corrente: 1,
    direzione_corrente : 235,

    visibilita : 9.4,
    benthos : {"pinna nobilis":1 ,"flabellina affinis":1, "stella rossa":1,
	       "riccio femmina":1 , "gorgonia bianca":1 ,"gorgonia gialla" :1, "sabella":1}
    ,
    media : [],
    pesci: { "saraghi": 1 , "grongo" : 1 , "castagnole" : 1 }
}, {
    id : 2,
    depth : 10,
    bussola : 120,
    dist : 18,
    divers: [ "Eli" , "Eugenia"] ,
    temperatura : 14,
    intensita_corrente: 3,
    direzione_corrente : 235,
    visibilita : 6,
    fondale : "roccia",
    benthos : { "eunicella cavolini":1 ,
		"alghe":1 ,
		"ricci":1 ,
		"spugne":1 		
	      },
    media : [],
    pesci : { "castagnole" : 1 , "serranidi": 1 , "boga":1}
}, {
    id : 1,
    depth : 5,
    bussola : 160,
    dist : 10,
    divers: [ "Eli" , "Eugenia"] ,
    temperatura : 14,
    intensita_corrente: 2,
    direzione_corrente : 235,
    visibilita : 6,
    fondale : "roccia",
    benthos : { "alghe verdi" : 1 , "alghe rosse" : 1 , "spugne":1 , "clandocola" : 1 , "ricci" :1 , "stelle" : 1},
    media : [],
    pesci : { "castagnole" : 1 , "serranidi" : 1 , "anthias" :1 ,"boga":1}
}, {
    id : 0,
    depth : 0,
    bussola : 0,
    divers: [ "BBX" ],
    temperatura : 15,
    intensita_corrente : 0,
    visibilita:6,
    dist : 8,
    Nord : "42° 25.110' ",
    Est : "11° 4.839' "
} ];

console.log('index_of_station(3) ',index_of_station(3))
mapping[index_of_station(3)].media.push({type:"img", url : "media/argentarola/3/benthos/3f_Sabella_sp..jpg", description : "Sabella"})
mapping[index_of_station(3)].media.push({type:"img", url : "media/argentarola/3/benthos/3a_Pinna_nobilis.jpg", description : "Pinna Nobilis"})
mapping[index_of_station(3)].media.push({type:"img", url : "media/argentarola/3/benthos/3c_Stella_rossa.JPG", description : "Stella rossa"})
mapping[index_of_station(3)].media.push({type:"img", url : "media/argentarola/3/benthos/3d_Gorgonia_gialla.JPG", description:"gorgonia gialla"})
mapping[index_of_station(3)].media.push({type:"img", url : "media/argentarola/3/benthos/3g_Serpula.jpg", description:"serpula"})
mapping[index_of_station(3)].media.push({type:"img", url : "media/argentarola/3/benthos/3b_Flabellina_sp..JPG", description:"flabellina"})
mapping[index_of_station(3)].media.push({type:"img", url : "media/argentarola/3/pesci/3h_Sarago.jpg", description:"sarago"})
// Not parsable media/argentarola/3/3_Panoramica_stazione_3.jpg
mapping[index_of_station(2)].media.push({type:"img", url : "media/argentarola/2/benthos/2b_Spugne_incrostanti.jpg", description:"spugneincrostanti"})
mapping[index_of_station(2)].media.push({type:"img", url : "media/argentarola/2/benthos/2a_Gorgonia.jpg", description:"gorgonia"})
mapping[index_of_station(2)].media.push({type:"img", url : "media/argentarola/2/benthos/5d_Riccio.jpg", description:"riccio"})
mapping[index_of_station(2)].media.push({type:"img", url : "media/argentarola/2/pesci/2g_castagnola.jpg", description:"castagnola"})
mapping[index_of_station(2)].media.push({type:"img", url : "media/argentarola/2/pesci/2f_Serranide.jpg", description:"serranide"})
mapping[index_of_station(2)].media.push({type:"img", url : "media/argentarola/2/pesci/2e_Boga.jpg", description:"boga"})
mapping[index_of_station(4)].media.push({type:"img", url : "media/argentarola/4/benthos/4a_Gorgonia_gialla_e_stella_rossa.jpg", description:"gorgonia gialla e stella rossa"})
mapping[index_of_station(4)].media.push({type:"img", url : "media/argentarola/4/benthos/4b_Riccio_di_prateria.jpg", description:"riccio di prateria"})
mapping[index_of_station(8)].media.push({type:"img", url : "media/argentarola/8/benthos/8b_Spugna.jpg", description:"spugna"})
mapping[index_of_station(8)].media.push({type:"img", url : "media/argentarola/8/benthos/8a_Gorgonia_rossa.jpg", description:"gorgonia rossa"})
mapping[index_of_station(9)].media.push({type:"img", url : "media/argentarola/9/benthos/Gorgonie_rosse.jpg", description:"Gorgonie rosse"})
mapping[index_of_station(9)].media.push({type:"img", url : "media/argentarola/9/benthos/9a_Gorgonia_rossa.jpg", description:"gorgonia rossa"})
mapping[index_of_station(9)].media.push({type:"img", url : "media/argentarola/9/benthos/9b_Spugne_incrostanti.jpg", description:"spugne incrostanti"})
mapping[index_of_station(5)].media.push({type:"img", url : "media/argentarola/5/benthos/Gorgonia_rossa_e_gialla.JPG", description:"rossa e gialla"})
mapping[index_of_station(5)].media.push({type:"img", url : "media/argentarola/5/benthos/5c_Gorgonia_gialla_e_stella_rossa.jpg", description:"gorgonia gialla e stella rossa"})
mapping[index_of_station(5)].media.push({type:"img", url : "media/argentarola/5/benthos/5a_Gorgonia_gialla_e_spugna.jpg", description:"gorgonia gialla e spugna"})
mapping[index_of_station(5)].media.push({type:"img", url : "media/argentarola/5/pesci/5b_Flabellina_sp.jpg", description:"flabellina"})
// Not parsable media/argentarola/5/5_Panoramica_stazione.JPG
mapping[index_of_station(1)].media.push({type:"img", url : "media/argentarola/1/benthos/1a_Alghe_verdi.jpg", description:"alghe verdi"})
mapping[index_of_station(1)].media.push({type:"img", url : "media/argentarola/1/benthos/1e_ricci.jpg", description:"ricci"})
mapping[index_of_station(1)].media.push({type:"img", url : "media/argentarola/1/benthos/1b_Alghe_rosse.jpg", description:"alghe rosse"})
mapping[index_of_station(1)].media.push({type:"img", url : "media/argentarola/1/benthos/1c_Spugne_incrostanti_e_stella_rossa.jpg", description:"spugne incrostanti e stella rossa"})
mapping[index_of_station(1)].media.push({type:"img", url : "media/argentarola/1/benthos/1d_Cladocora_caespitosa.jpg", description:"cladocora caespitosa"})
mapping[index_of_station(1)].media.push({type:"img", url : "media/argentarola/1/pesci/internet_boga2.jpg", description:"boga"})
mapping[index_of_station(1)].media.push({type:"img", url : "media/argentarola/1/pesci/Wikipedia_Serranide.png", description:"serranide"})
mapping[index_of_station(7)].media.push({type:"img", url : "media/argentarola/7/benthos/7a_Gorgonia_rossa_e_gialla.jpg", description:"gorgonia rossa e gialla"})
mapping[index_of_station(7)].media.push({type:"img", url : "media/argentarola/7/benthos/7c_Gorgonia_rossa_e_castagnole.jpg", description:"gorgonia rossa e castagnole"})
mapping[index_of_station(7)].media.push({type:"img", url : "media/argentarola/7/benthos/7b_Gorgonia_rossa_e_spugne.jpg", description:"gorgonia rossa e spugne"})
mapping[index_of_station(7)].media.push({type:"img", url : "media/argentarola/7/pesci/Castagnole.jpg", description:"Castagnole"})
mapping[index_of_station(7)].media.push({type:"img", url : "media/argentarola/7/pesci/7d_Donzella.jpg", description:"donzella"})
