
function create_carousel_with(m) {

	var str = '<div id="myCarousel" class="carousel slide" data-ride="carousel">';
	str += '<ol class="carousel-indicators">'
	var k = 0;
	for (var i = 0; i < m.length; i++) {
		if (m[i].type != "img")
			continue;
		console.log(i + "URL:" + m[i].url);
		var active = "";
		if (k == 0) {
			active = 'class="active"';
		}
		str += '<li data-target="#myCarousel" data-slide-to="' + k + '" '
				+ active + '></li>'
		k++;
	}
	str += '</ol>'; /**/
	var k = 0;
	str += '<div class="carousel-inner" role="listbox">';
	for (var i = 0; i < m.length; i++) {
		if (m[i].type != "img")
			continue;
		var active = "";
		if (k == 0) {
			active = 'active';
		}
		str += '<div class="item ' + active + '"><img src="' + m[i].url
				+ '" alt="' + m[i].description + '"></div>';
		k++;
	}
	str += '</div>';
	/**/

	if (k != 0) {
		str += ' <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev"><span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span><span class="sr-only">Previous</span></a><a class="right carousel-control" href="#myCarousel" role="button" data-slide="next"><span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span><span class="sr-only">Next</span></a></div>';
	}
	str += "</div>";
	return str;
}
function close_url(i) {
	var s = "#video_modal_" + i
	$(s).on('hide.bs.modal', function(e) {
		console.log("Hello closing #id_video_" + i);
		$("#id_video_" + i).attr('src', '');
	});

}

function create_lightbox_with(m) {
	var str = '<div class="row">';
	str += '<div class="offset-md- 1  col-md-10">';
	var modal = "";
	var k = -1;
	for (var i = 0; i < m.length; i++) {
		if (m[i].type != 'video')
			continue;
		k++;
		if (k % 3 == 0) {
			str += '<div class="row" >';
		}

		// var tiny = (m[i].url).replace("https://www.youtube.com/watch?v=",
		// "//i1.ytimg.com/vi/").concat("/mqdefault.jpg");
		// var tiny = (m[i].url).replace("//www.youtube.com/watch?v=",
		// "//i1.ytimg.com/vi/").concat("/mqdefault.jpg");
		var tiny = "//i1.ytimg.com/vi/" + (m[i].url) + "/mqdefault.jpg";
		str += '<div class="col-xs-4">';
		str += '<div class="thumbnail">';

		str += '<a href="#video_modal_' + i + '" data-toggle="modal">';
		str += ' <img src="' + tiny + '" class="img-fluid">';
		str += ' <div  class="caption" > ' + m[i].description + '</div>';
		str += '</a>';
		str += '</div>';
		str += '</div>';
		if (k % 3 == 2) {
			str += '</div>';
		}

		modal += ' <!-- Modal HTML -->';
		modal += '    <div id="video_modal_' + i + '" class="modal">';
		modal += '        <div class="modal-dialog">';
		modal += '            <div class="modal-content">';
		modal += '                <div class="modal-header">';
		modal += '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true" onclick="close_url('
				+ i + ')">&times;</button>';
		modal += '                    <h4 class="modal-title">' + m[i].title
				+ '</h4>';
		modal += '                </div>';
		modal += '                <div class="modal-body">';
		modal += '                    <iframe id="id_video_' + i
				+ '" width="560" height="315" ';
		modal += '  src="//www.youtube.com/embed/' + m[i].url
				+ '" frameborder="0" allowfullscreen></iframe>';
		modal += '                </div>';
		modal += '            </div>';
		modal += '        </div>';
		modal += '    </div>';
		modal += '';
	}
	if (k % 3 != 2) {
		str += '</div>';
	}
	str += modal;
	return str;
}

var data = null;
var graph = null;
function add_station_at(x, y, z, id, data, val) {
	console.log("val[" + id + "]=" + val);
	data.add({
		id : id,
		x : x,
		y : y,
		z : z,
		style : val
	});
}

/**/
function get_parameter_value_selected(mapping, pos, val) {
	switch (val) {
	case "temp":
		return mapping[pos].temp;
	case "vis_verticale":
		return mapping[pos].vis_verticale;
	case "vis_orizzontale":
		return mapping[pos].vis_orizzontale;
	case "count_pesci":
		return mapping[pos].count_pesci;
	case "colore":
		return mapping[pos].colore;
	default:
		console
				.log("ATTENZIONE e' stato richiesto in get_parameter_value_selected il parametro "
						+ val);
		break;
	}
}
// Called when the Visualization API is loaded.
function drawVisualization() {
	// console.log("Disegniamo " + $("#parametro_da_graficare").val());
	// Create and populate a data table.
	data = new vis.DataSet();
	// create some nice looking data with mapping
	var x = 0; /*
				 * TODO Sostituire con coordinate GPS della stazione 0
				 */
	var y = 0; /*
				 * TODO Sostituire con coordinate GPS della stazione 0
				 */

	add_station_at(x, y, 0, mapping[(mapping.length - 1)].id, data,
			get_parameter_value_selected(mapping, (mapping.length - 1), $(
					"#parametro_da_graficare").val()));
	for (var i = mapping.length - 2; i >= 0; i--) {
		var teta = Math.PI * (180 + mapping[i].bussola) / 180.;
		// console.log("id: "+(i+1)+" teta: "+teta+"
		// bussola: "+mapping[i].bussola);

		var nx = mapping[i + 1].dist * Math.cos(teta);
		var ny = mapping[i + 1].dist * Math.sin(teta);
		x = x + nx;
		y = y + ny;
		// console.log("id:"+mapping[i].id );
		add_station_at(x, y, -mapping[i].depth, mapping[i].id, data,
				get_parameter_value_selected(mapping, (i), $(
						"#parametro_da_graficare").val()));
	}

	function human_readable(nh) {
		switch (nh) {
		case 'temp':
			return "Temperatura";
		case 'vis_verticale':
			return "Vis. verticale";
		case 'vis_orizzontale':
			return "Vis. orizzontale";
		case 'count_pesci':
			return "Censo / min";
		case 'colore':
			return "Colore";
		default:
			return "TODO";
		}

	}
	// specify options
	var options = {
		width : '600px',
		height : '600px',
		style : 'dot-color',
		showLegend : true,
		legendLabel : human_readable($("#parametro_da_graficare").val()),
		showPerspective : true,
		showGrid : true,
		showShadow : true,
		zValueLabel : function(value) {
			return -value;
		}/*
			 * , tooltip: function (point) { return '<strong>Stazione:</strong><b>' +
			 * point.data.id + '</b><br>'; }
			 */,
		onclick : function(point) {
			$("#media")
					.replaceWith(
							'<div id="media"><div id="media_img"></div><div id="media_video"></div></div>');

			var i = point.id;
			var m = null;
			for (var j = 0; j < mapping.length; j++) {
				if (mapping[j].id == i) {
					m = mapping[j].media;
					// console.log("Trovato");
					break;
				}
			}
			if (m == null) {
				console.log("Non abbiamo trovato " + i);
			}

			$("#info_panel_heading").html("Info su stazione #" + i);

			/* Aggiungiamo un carousel */
			var str = create_carousel_with(m);

			$("#media_img")
					.replaceWith(
							'<div id="media_img"><div class="panel panel-transparent"><div class="panel-heading">Immagini</div><div class="panel-body" id="img_body">'
									+ str + '</div></div></div>');

			var str = create_lightbox_with(m);
			$("#media_video")
					.replaceWith(
							'<div id="media_video"><div class="panel panel-transparent"><div class="panel-heading">Video</div><div class="panel-body" id="video_body">'
									+ str + '</div></div></div>');

			for (var i = 0; i < m.length; i++) {
				if (m[i].type != 'video')
					continue;
				/*
				 * Get iframe src attribute value i.e. YouTube video url and
				 * store it in a variable
				 */

				var s = "#video_modal_" + i
				$(s).ready(function() {
					var url = $("#id_video_" + i).attr('src');
					console.log("url=" + url);
					/*
					 * Assign empty url value to the iframe src attribute when
					 * modal hide, which stop the video playing
					 */
					console.log("Trovato?: " + i);
					console.log($("#video_modal_" + i));

					$(s).on('hidden.bs.modal', function(e) {
						console.log("Hello closing #id_video_" + i);
						$("#id_video_" + i).attr('src', '');
					});

					/*
					 * Assign the initially stored url back to the iframe src
					 * attribute when modal is displayed again
					 */
					$("#video_modal_" + i).on('shown.bs.modal', function(e) {
						console.log("show url=" + url);
						$("#id_video_" + i).attr('src', url);
					});
				});

			}

		},
		keepAspectRatio : true,
		verticalRatio : 0.5
	};

	// Instantiate our graph object.
	var container = document.getElementById('map3d');
	graph = new vis.Graph3d(container, data, options);

}

function todo_onload() {
	drawVisualization();
	/* Attiva tutti i widget dei menu */
	$("#parametro_da_graficare").selectmenu({
		change : function(event, ui) {
			drawVisualization();
		}
	});
}
