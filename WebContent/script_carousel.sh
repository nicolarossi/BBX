
#find images/carousel -type f |sort |while read f ; do
#echo '<img class="mySlides w3-animate-fading img img-rounded" src="'$f'" style="width:100%">'
#done

active="active"
for ((i=1;i<=30;i++)); do
    IMG=$(printf "img/slide_%02d.png" $i)

    echo "
    <div class=\"item $active\">
     <div class='row'>
       <p class='text-center'>
	<img src=\"${IMG}\" class='img-rounded' alt='Logo' >
       </p>
       </div>
       </div>"

    active=""    
done
