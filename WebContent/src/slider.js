var myIndex = 0;

function carousel() {
	var i;
	var x = document.getElementsByClassName("mySlides");
	var y = document.getElementById("bkimg");

	bkimg = myIndex;
	myIndex++;
	if (myIndex > x.length) {
		myIndex = 1;
		bkimg = (x.length);
	}
	if (myIndex === 1) {
		bkimg = (x.length);
	}

	for (i = 0; i < x.length; i++) {

		x[i].style.display = "none";

	}

	x[myIndex - 1].style.display = "block";

	y.style.backgroundImage = 'url(' + x[bkimg - 1].src + ')';
	setTimeout(carousel, 10000);
}
function carousel2() {
	var i;
	var x = document.getElementsByClassName("mySlides");
	for (i = 0; i < x.length; i++) {
		x[i].style.display = "none";
	}
	myIndex++;
	if (myIndex > x.length) {
		myIndex = 1
	}
	x[myIndex - 1].style.display = "block";
	setTimeout(carousel, 9000);
}
