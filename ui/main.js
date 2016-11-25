var slideIndex = 0;
showSlides();

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
       slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex> slides.length) {slideIndex = 1}
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
    setTimeout(showSlides, 5000); // Change image every 5 seconds
}

function checksession(){
	var sesreq=new XMLHttpRequest();
	sesreq.onreadystatechange=function(){
	    if(sesreq.readyState===XMLHttpRequest.DONE){
		if(sesreq.status===200)
		  window.location.href="http://banerjeesouvik.imad.hasura-app.io/profile";
	    }
	}
	sesreq.open('GET','http://banerjeesouvik.imad.hasura-app.io/checksession',true);
	sesreq.send(null);
}

checksession();
