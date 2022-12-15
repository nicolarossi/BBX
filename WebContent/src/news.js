
function load_news( just_first, target_container, target_list ) {
    var type_inserted={};
    
/*    news_list.sort(function (a,b) {
     	return (a.id > b.id);
    });*/

    // console.log(" dentro load_news "+news_list.length+ ' ' +just_first);
    target_list.sort(function(a, b) {
	keyA= a.id ;
	keyB= b.id ;
	if (keyA > keyB) return -1;
	if (keyA < keyB) return 1;
	return 0;
    });

    pencil='<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>'
    
    for (var i=0; i<target_list.length; i++) {
	
	//	console.log(" l = "+(target_list.length-1 -i  i)+" "+i);
	var news=target_list[ i ];
	// if ( ! ("type" in news) ) {
	//     console.log('ATTENZIONE l elemento '+news.id+' non ha type');
	//     return;
	// }
//	console.log(" dentro load_news "+i+' : '+JSON.stringify(news));

	/**/

	var el = $("<div class='row'></div>");
	var panel = $("<div class='panel panel-transparent'></div>");

	var header=$("<div class='panel-heading'></div>");

	var icon=''
	if ( 'icon' in news) {
	    icon+='<span class="'+news.icon+'" aria-hidden="true"></span>'
	} else if ('type' in news) {
	    icon+='<span class="glyphicon glyphicon-'+news.type+'" aria-hidden="true"></span>'
	    

	}
	if ('title' in news) {
	    header.html("<strong><h2 id=\""+news.id +"\">"+icon+' '+news.title+"</h2></strong>");
	}
	
	if ('authors' in news) {
	    //	    header.html("<p class='font-italic'><h2 id=\""+news.id +"\">"+news.authors+"</h2></italic>");
	    header.html(pencil+" <p class='font-italic'>"+news.authors+" <b>"+ news.date+"</b> </p>");
	}

	var body=$("<div class='panel-body'></div>");

	var html=" "
	var col_text=12

	var col_img=4
	html+='<div class="row">'
	if ('research_title' in news){
	    html+='<div class="col-xs-'+col_text+'">'+news.research_title+'</div>'	    
	}
	if ('img' in news) {
	    col_text=8
	}
	if ( !( 'body'  in news))  {
	    col_img=12
	}

	if ('body' in news) {
	    html+='<div class="col-xs-'+col_text+'">'+news.body+'</div>'
	}
	if ('img' in news) {
	    if ('link' in news) {
		html+="<div class='col-xs-"+col_img+"'><a href='"+news.link+"'><img class='img img-responsive img-rounded' src='"+news.img+"'></a><br><strong><ul></div>"		
	    } else {
		html+="<div class='col-xs-"+col_img+"'><img class='img img-responsive img-rounded' src='"+news.img+"'><br><strong><ul></div>"
	    }
	} 
	if ('vimeo' in news) {
	    html+="<div class='embed-container'><iframe src='"+news.vimeo+"' frameborder='0' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div>"
	}
	if ('where' in news) {
	    html+=(" <p class='font-italic'>"+news.where+" "+ news.date +"</p>");
	}  
	html+='</div>'
	
	body.html(html);

	if ('type' in news) {
	    var footer=$("<div class='panel-footer'></div>");
	    html_footer=""
	    if ('date' in news) {
		html_footer+=("<strong>"+news.date+"</strong>");
	    }
	    html_footer+="</br>"
	    	    
	    footer.html(html_footer);
	    panel.append(header,body, footer);

	} else {
	    if ('link' in news ) {
		var footer=$("<div class='panel-footer'></div>");
		html_footer=""
		html_footer+="<div class='col-xs-"+col_img+"'><a href='"+news.link+"'>"+news.link+"</a></div>";
		html_footer+="</br>"

		footer.html(html_footer);

		panel.append(header,body, footer);
	    } else {
		panel.append(header,body);
	    }
	}

	el.append(panel);
	
	/**/

	if ( (! just_first) || ! ( type_inserted.hasOwnProperty(news.type) )) {
	    $("#"+target_container).append(el);
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




//	html_footer+="<a href=\"whatsapp://send?text="+news.title+"\" data-action=\"share/whatsapp/share\"><span class=\"glyphicon glyphicon-share\"></span> Condividi via Whatsapp</a>"	 ;

	
	
//	html_footer+="<a href=\"whatsapp://send\" data-text=\""+news.title.replace(/<[^>]+>/g,"")+"\" data-href=\"#"+news.id+"\" <span class=\"glyphicon glyphicon-share\"></span> Condividi via Whatsapp</a>"	 ;

//	html_footer+="<a href=\"whatsapp://send?text=text to share\" data-action=\"share/whatsapp/share\"><span class=\"glyphicon glyphicon-share\"></span> Condividi via Whatsapp</a>"	 ;
	
	//	<a href="whatsapp://send" data-text="Take a look at this awesome website:" data-href="http://www.pippo.com" class="wa_btn wa_btn_s" style="display:none">Share</a>
