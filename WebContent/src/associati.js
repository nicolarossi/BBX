
function load_associati() {
    for (var i=0;i<associati.length;i++) {
	var socio=associati[i];
	/**/

	var el = $("<div class='col-sm-6'></div>");
	var panel = $("<div class='panel panel-transparent'></div>");

	var header=$("<div class='panel-heading'></div>");
	header.html("<strong><h2>"+socio.name+"</h2></strong>");

	var body=$("<div class='panel-body'></div>");
	body.html("<img class='img img-responsive img-rounded' src='"+socio.image+"'>");

	panel.append(header,body);

	el.append(panel);
	
	/**/
	$("#associati").append(el);
    }
}


