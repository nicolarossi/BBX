function create_carousel_measurement(m,id_carousel) {
    var str = '<div id="'+id_carousel+'" class="carousel slide" data-ride="carousel">';
    str += '<ol class="carousel-indicators">'
    var k = 0;
    for (var i = 0; (typeof m != "undefined") && (i < m.length); i++) {
	//		console.log(i + "URL:" + m[i].url);
	var active = "";
	if (k == 0) {
	    active = 'class="active"';
	}
	str += '<li data-target="#'+id_carousel+'" data-slide-to="' + k + '" '
	    + active + '></li>'
	k++;
    }
    str += '</ol>'; /**/
    var k = 0;
    str += '<div class="carousel-inner" role="listbox">';
    for (var i = 0; (typeof m != "undefined") && (i < m.length); i++) {
	var active = "";
	if (k == 0) {
	    active = 'active';
	}

	description=''
	description+='<table class="table">'
	description+='<tbody>'
	description+='<tr><td>Divers:</td><td>'+m[i]['Divers']+'</td></tr>'
	description+='<tr><td>Depth:</td><td>'+m[i]['Depth (m)']+' m</td></tr>'
	description+='<tr><td>Visibility:</td><td>'+m[i]['Visibility (m)']+' m</td></tr>'
	description+='<tr><td>Flow Intensity:</td><td>'+m[i]['Flow Intensity (High/Medium/Low)']+' </td></tr>'
	description+='<tr><td>Flow Direction:</td><td>'+m[i]['Flow Direction (Degrees)']+' </td></tr>'
	description+='<tr><td>Temperature:</td><td>'+m[i]['Temperature (Celsius)']+' &degC</td></tr>'
	description+='<tr><td>Compass Direction:</td><td>'+m[i]['Compass Direction (Degrees)']+'</td></tr>'
	description+='<tr><td>Photo Distance:</td><td>'+m[i]['Photo Distance (Mt)']+'</td> m</tr>'
	description+='<tr><td>Bottom Type:</td><td>'+m[i]['Bottom Type']+'</td></tr>'
	description+='<tr><td>Benthos:</td><td>'+m[i]['Benthos (Species/Number)']+'</td></tr>'
	description+='<tr><td>Anthropic Impact:</td><td>'+m[i]['Anthropic Impact']+'</td></tr>'
	description+='<tr><td>Fish (Species/Number):</td><td>'+m[i]['Fish (Species/Number)']+'</td></tr>'
	description+='</tbody>'
	description+='</table>'

	
	date_time=''+m[i]['Date']+' '+m[i]['Time']+'<br>'
	description+='<br>'

	console.log(' url '+m[i].url)
	if ( m[i].url != "undefined" ) {
	    img_str='<img src="img/pbts/' + m[i].url
		+ '" style="width:100%" alt="image ' +(i) + '">'	    
	} else {
	    img_str=''	    
	}
	
	str += '<div class="item ' + active + '">'+img_str
	    +'<div class="carousel-caption carousel-caption-below">'
	    +'<div class="panel panel-transparent">'
	    +'<div class="panel-heading"> Measurement date: '+date_time+'</div>'
	    +'<div class="panel-body justified">'+description+'</div>'
	    +'</div>'
	    +'</div>'
	    +'</div>'

	;
	k++;
    }
    str += '</div>';
    /**/

    if (k != 0) {
	str += ' <a class="left carousel-control" href="#'+id_carousel+'" role="button" data-slide="prev"><span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span><span class="sr-only">Previous</span></a><a class="right carousel-control" href="#'+id_carousel+'" role="button" data-slide="next"><span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span><span class="sr-only">Next</span></a></div>';
    }
    str += "</div>";
    return str;
}
