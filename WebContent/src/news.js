
function load_news( just_first ) {
    var type_inserted={};
    
    news_list.sort(function (a,b) {
	return (a.id < b.id) ;
    });

    console.log(" dentro load_news "+news_list.length+ ' ' +just_first);
   
    for (var i=0;i<news_list.length;i++) {

	var news=news_list[i];
	if ( ! ("type" in news) ) {
	    console.log('ATTENZIONE l elemento '+news.id+' non ha type');
	    return;
	}
	console.log(" dentro load_news "+i+' : '+JSON.stringify(news));

	/**/

	var el = $("<div class='row'></div>");
	var panel = $("<div class='panel panel-transparent'></div>");

	var header=$("<div class='panel-heading'></div>");

	var icon=''
	if ( 'icon' in news) {
	    icon+='<span class="'+news.icon+'" aria-hidden="true"></span>'
	} else {
	    icon+='<span class="glyphicon glyphicon-'+news.type+'" aria-hidden="true"></span>'
	}
	header.html("<strong><h2>"+icon+' '+news.title+"</h2></strong>");

	var body=$("<div class='panel-body'></div>");

	var html=" "
	var col_text=12
	html+='<div class="row">'
	if ('img' in news) {
	    col_text=8
	}

	if ('body' in news) {
	    html+='<div class="col-xs-'+col_text+'">'+news.body+'</div>'
	}
	if ('img' in news) {
	    html+="<div class='col-xs-4'><img class='img img-responsive img-rounded' src='"+news.img+"'><br><strong><ul></div>"
	    col_text=8
	}
	html+='</div>'
	
	body.html(html);

	var footer=$("<div class='panel-footer'></div>");
	if ('date' in news) {
	    footer.html("<strong>"+news.date+"</strong>");
	}
		   
	panel.append(header,body,footer);

	el.append(panel);
	
	/**/

	if ( (! just_first) || ! ( type_inserted.hasOwnProperty(news.type) )) {
	    $("#news_container").append(el);
	    type_inserted[news.type]= true;
	}
	
	if ( (just_first) &&
	     ( 'leaf' in type_inserted ) &&
	     ( 'globe' in type_inserted )  &&
	     ( 'education' in type_inserted )) {
	    return;
	}
    }
}


