
find images/carousel -type f |sort |while read f ; do
echo '<img class="mySlides w3-animate-fading img img-rounded" src="'$f'" style="width:100%">'
done
