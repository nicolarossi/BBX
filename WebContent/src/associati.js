
function load_associati() {
    associati.sort(function (a,b) {
	if (a.female == b.female) {
	    return a.name > b.name ;
	} else {
	    return ( a.female == "false" );
	}

	
    });
    
    for (var i=0;i<associati.length;i++) {
	var socio=associati[i];
	/**/

	var el = $("<div class='col-sm-6'></div>");
	var panel = $("<div class='panel panel-transparent'></div>");

	var header=$("<div class='panel-heading'></div>");
//	header.html("<div class='row'><div class='col-xs-6'><strong><h2>"+socio.name+"</h2></div><div class='col-xs-6'></strong><i><h3>"+socio.level+"</h3></i></div>");
	//	header.html("<strong><h2>"+socio.name+"</h2></strong><i><h3>"+socio.level+"</h3></i>");
	header.html("<strong><h2>"+socio.name+"</h2></strong>");

	var body=$("<div class='panel-body'></div>");

	var html="<img class='img img-responsive img-rounded' src='"+socio.image+"'><br><strong><ul>"

	html+="<li>"+socio.level+" Diver</li>";
	
	if (( 'cave' in socio ) && ( socio.cave != "")) {
	    html+="<li><strong>"+socio.cave+" Diver</strong></li>";
	}
	if (( 'dpv' in socio ) && ( socio.dpv != "")) {
	    html+="<li><strong>"+socio.dpv+" Diver</strong></li>";
	}
	if (( 'ccr' in socio ) && ( socio.ccr != "")) {
	    html+="<li><strong>"+socio.ccr+" Diver</strong></li>";
	}

	html+="</ul></strong>";
	
	
	body.html(html);

//	var footer=$("<div class='panel-footer'></div>");
//	footer.html("<ul><li><strong>"+socio.level+"</strong></li></ul>");
		   
	panel.append(header,body);

	el.append(panel);
	
	/**/
	$("#associati").append(el);
    }
}


