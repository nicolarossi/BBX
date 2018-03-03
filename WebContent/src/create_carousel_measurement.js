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
	str += '<div class="item ' + active + '"><img src="img/pbts/' + m[i].url
	    + '" style="width:100%" alt="' + description + '">'+
	    '<div class="carousel-caption"><h3>' + description + '</h3></div></div>';
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
