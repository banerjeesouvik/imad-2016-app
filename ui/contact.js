var souvik=document.getElementById("myimg");
		souvik.onmouseover=function(){
			souvik.setAttribute('src',"https://scontent.fccu1-1.fna.fbcdn.net/v/t1.0-9/12065474_941578672601943_1485895669026129759_n.jpg?oh=7312670539a0c3ac66d4d26a113d35f4&oe=58887908");
		};
		souvik.onmouseout=function(){
			souvik.setAttribute('src',"https://scontent.fccu1-1.fna.fbcdn.net/v/t1.0-9/14463110_1159333654159776_5140025532760958800_n.jpg?oh=8581b563cef8dba7d7318a418abe4f8b&oe=58B15325");
};

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