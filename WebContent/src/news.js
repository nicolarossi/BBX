
function load_news( just_first ) {
    var type_inserted={};
    
    news_list.sort(function (a,b) {
	return (a.id < b.id) ;
    });

    console.log(" dentro load_news "+news_list.length);
   
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
	}
	header.html("<strong><h2>"+icon+' '+news.title+"</h2></strong>");

	var body=$("<div class='panel-body'></div>");

	var html=" "
/*	if ('image' in news) {
	    html+="<img class='img img-responsive img-rounded' src='"+news.image+"'><br><strong><ul>"
	    }*/

	if ('body' in news) {
	    html+=''+news.body
	}
	

	body.html(html);

	var footer=$("<div class='panel-footer'></div>");
	if ('date' in news) {
	    footer.html("<strong>"+news.date+"</strong>");
	}
		   
	panel.append(header,body,footer);

	el.append(panel);
	
	/**/

	if ( ! (   type_inserted.hasOwnProperty(news.type) )) {
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

