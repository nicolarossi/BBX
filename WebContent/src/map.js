var map;
var view;
var ol_geolocation;
var style;
var style_you_are_here;

var site_maps={};
var buddy_list;

var main_scope={};

$.widget( "custom.iconselectmenu", $.ui.selectmenu, {
    _renderItem: function( ul, item ) {
	var li = $( "<li>" ),
	    wrapper = $( "<div>", { text: item.label } );
	
	if ( item.disabled ) {
	    li.addClass( "ui-state-disabled" );
	}
	
	$( "<span>", {
	    style: item.element.attr( "data-style" ),
	    "class": "ui-icon " + item.element.attr( "data-class" )
	})
	    .appendTo( wrapper );
	
	return li.append( wrapper ).appendTo( ul );
    }
});

//-----------------------------


function create_map(){
    console.log('in create_map');
    view=new ol.View({
            center: ol.proj.fromLonLat([14.477869, 40.694812]),
            zoom: 5
    });
   /* style= new ol.style.Style({
		    image: new ol.style.Circle({
			radius: 7,
			stroke: new ol.style.Stroke({
			    color: '#000070',
			    width: 2
			}),
			fill: new ol.style.Fill({color: 'yellow'})
		  })
    });*/
    style=function(feature, viewResolution){
        // access your radius property
        var r = feature.get('how_many_dives');
        // create your style...
        var image;
        if (r>0) {
        	r=parseInt(r)+3;
        	var max_r=7;
        	if (r>max_r) {
        		r=max_r;
        	}
        	style = new ol.style.Style({              
                 image: new ol.style.Circle({ 
                     radius: r,
                     stroke: new ol.style.Stroke({
                    	 color: '#000070',
                    	 width: 2
                     }),
                     fill: new ol.style.Fill({color: 'green'})
                 })
             });
        } else {
        	  style = new ol.style.Style({
                 // ...
             	
                 image: new ol.style.Circle({
                     // ...
                     radius: 7,
                     stroke: new ol.style.Stroke({
                    	 color: '#000070',
                    	 width: 2
                     }),
                     fill: new ol.style.Fill({color: 'yellow'})
                 	})
             });
        }
       
        return style;
    }


    style_you_are_here=  new ol.style.Style({
		    image: new ol.style.Circle({
			radius: 7,
			stroke: new ol.style.Stroke({
			    color: '#000070',
			    width: 2
			}),
			fill: new ol.style.Fill({color: '#20c752'}) 
		  })
    });

    
    map = new ol.Map({
	target: 'map',
	layers: [
            new ol.layer.Tile({
		source: new ol.source.OSM()
            }),
            new ol.layer.Vector({
		name: 'dive_site',
		title: 'Dive Sites',
		source: new ol.source.Vector({
		    url: 'data/dive_site.json',
		    format: new ol.format.GeoJSON()
		}),
		style: style
            })
	],
	view: view
//	controls: ol.control.defaults().extend([
//	    new ol.control.ScaleLine(),
//	    new ol.control.OverviewMap(),	    
//	    new ol.control.ZoomSlider()
//	])
    });
    
    //--- Selettore al mouse hove
    
    // select interaction working on "mousemove"
/*    var selectMouseMove = new ol.interaction.Select({
	condition: ol.events.condition.mouseMove
    });*/

    
    //map.addInteraction(selectMouseMove);

}


function reset_map(new_site_data){
    var old_layer;
    map.getLayers().forEach(function (layer,i){
	if (layer.get('name')=='dive_site') {
	    old_layer=layer;
	}
    });

    map.removeLayer(old_layer);
			    

    map.addLayer(
            new ol.layer.Vector({
		title: 'Dive Sites',
		source: new ol.source.Vector({
		    features: (new ol.format.GeoJSON()).readFeatures(new_site_data)
		}),
		style: style
            })
    );
}

// TODO cambiarla
function select_site(id,description) {
    return ;
    
}

// handling_click_id := selected_site
function aggiungi_visualizzazione_popup(handling_click_id){
    $('.modal').on('shown.bs.modal', function() {
	//Make sure the modal and backdrop are siblings (changes the DOM)
	$(this).before($('.modal-backdrop'));
	//Make sure the z-index is higher than the backdrop
	$(this).css("z-index", parseInt($('.modal-backdrop').css('z-index')) + 1);
    });
    
    $("#provamodal").click(function(){
    	$("#myModal").modal();	
    });
    

    map.on('click', function(evt) {
	var feature = map.forEachFeatureAtPixel(evt.pixel,
						function(feature, layer) {
						    console.log("Clicked feature ");
						    return feature;
						});
	    
	//	
	var el=$("#popupinfo");
	if (feature) {
	    var coordinate = feature.getGeometry().getCoordinates();
	    
	    var text_to_print;
	    var site_title;
	    
	    if (typeof feature.get('text') !== "undefined") {
		text_to_print=feature.get('text');
		console.log("FIND feature.text="+text_to_print);
	    } else if (typeof feature.get('description') !== "undefined") {
		text_to_print=feature.get('description');
		site_title=feature.get('site_title')
		
		console.log("FIND feature.description="+text_to_print);
	    } else {
		console.log(" un terzo caso accade ");
	    }
	    
	    if (typeof feature.get('id') !== "id") {
		var id=feature.get('id');
		handling_click_id(id);
		console.log(" DEBUG  selezionata la feature con id:["+id+"]");
	    } else {
		console.log(" ERRORE la feature selezionata non ha il valore id");
	    }

	    $("#site_title").html(site_title)

	    var coordinate=ol.coordinate.toStringHDMS(ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326'));
	    el.html(""+text_to_print + "<br>"+coordinate+"");
	    $("#myModal").modal();

	    $("#popupinfo").css('display','');
	     
//	    $("#myModal").toggleClass("hide");
	    
	    //--- selezioniamo il sito
//	    select_site(parseInt(feature.get('id')),feature.get('description'));
	} else {
	    el.hide();
	}
	
    });
}

var extern_D={};

function selected_station() {
    id_stazione=$("#select_stazione").val()
    console.log("selected station "+id_stazione)

    console.log("selected station "+id_stazione)

    $("#view_measurement").empty();
//    $("#view_measurement").append("<h3>Che ci mettiamo per la stazione ["+id_stazione+"]?</h3>")
    /*
    for (var m in measurement[id_stazione]) {
    }*/
    $("#view_measurement").append(
	create_carousel_measurement(measurement[id_stazione],'slide_stations'));
}


function selected_site(id){
    if (id<=0) {
	console.log("ERRORE id<=0 ");
    	return ;
    }
    console.log("into selected_id "+id);

    $("#select_stazione").remove()

    var site=site_maps[id]

    n_stations=0
    
    for(var k in site) {
	n_stations++
    }
    
    if (n_stations==0) {
	return ;
    }

    var sel = $('<select class="form-control" id="select_stazione" onchange="selected_station()">').insertAfter('#label_select_stazione');
    
    for (var k in site) {
	var info=site[k]

	sel.append($("<option>").attr('value',k).text(''+k+' - '+info.description));
	console.log('aggiunto : '+k);

    }
    
}


// TODO Rivedere 
