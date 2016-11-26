var like=document.getElementById("lk_btn");
var uid=document.getElementById("user_id");
var pid=document.getElementById("poem_id");


like.onclick=function(){
	var xhr=new XMLHttpRequest();
	xhr.onreadystatechange=function(){
		if(xhr.readyState===XMLHttpRequest.DONE){
			if(xhr.status===200){
			  alert('Thanks for liking!');
			  like.innerHTML="You liked this poem";
			  like.setAttribute('title',"You liked this poem");
			  like.setAttribute('style',"cursor:text");
			  window.location.reload(true);
			}
			else if(xhr.status===500)
			  alert('You already liked this poem');
		}

	}
	xhr.open('POST',"http://banerjeesouvik.imad.hasura-app.io/like",true);
	xhr.setRequestHeader('Content-Type','application/json');
	xhr.send(JSON.stringify({usr_id:uid.value,pm_id:pid.value}));
};


function checklike(){
  var xhr=new XMLHttpRequest();
	xhr.onreadystatechange=function(){
		if(xhr.readyState===XMLHttpRequest.DONE){
			if(xhr.status===200){
			  like.innerHTML="You liked this poem";
			  like.setAttribute('title',"You liked this poem");
			  like.setAttribute('style',"cursor:text");
			}
		}

	}
	xhr.open('POST',"http://banerjeesouvik.imad.hasura-app.io/check-like",true);
	xhr.setRequestHeader('Content-Type','application/json');
	xhr.send(JSON.stringify({u:uid.value,p:pid.value}));
}

checklike();
