var reg_form_submit=document.getElementById('submit_reg_form');

reg_form_submit.onclick= function(){
 var pswd=document.getElementById('passwd');
 var cpswd=document.getElementById('crfnpswd');
 var uname=document.getElementById('uname');
 
 if(pswd.value != cpswd.value){
	 alert("Passwords dont match. Re enter password.");
	 cpswd.value='';
	 pswd.value='';
	 pswd.focus();
 }
 else{
	var request=new XMLHttpRequest();
	request.onreadystatechange= function(){
		if(request.readyState===XMLHttpRequest.DONE){
			if(request.status===200){
			  alert('You are registered successfully');
			  uname.value='';
			  pswd.value='';
			  cpswd.value='';
			}
			else if(request.status===500)
			  alert('Either uername already exists or something went wrong. Please try again.');
		}
	}
 	request.open('POST','http://localhost:8080/adduser',true);
	request.setRequestHeader('Content-Type','application/json');
	request.send(JSON.stringify({username: uname.value,password: pswd.value}));
 }
};
