var login_form_submit=document.getElementById('submit_login_form');

login_form_submit.onclick= function(){
 var pswd=document.getElementById('passwd');
 var uname=document.getElementById('uname');

 var request=new XMLHttpRequest();
 request.onreadystatechange= function(){
		if(request.readyState===XMLHttpRequest.DONE){
			if(request.status===200)
			  window.location.replace('http://banerjeesouvik.imad.hasura-app.io/profile');
			else if(request.status===500)
			  alert('Something went wrong. Please try again.');
			else if(request.status===403){
			  alert('Invalid username/password');
			  uname.value='';
			  pswd.value='';
			}
		}
	}
	request.open('POST','http://banerjeesouvik.imad.hasura-app.io/login',true);
	request.setRequestHeader('Content-Type','application/json');
	request.send(JSON.stringify({username: uname.value,password: pswd.value}));
};
