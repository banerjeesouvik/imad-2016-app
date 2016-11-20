var form=document.getElementById('poem_form');

form.onclick= function(){
 var title=document.getElementById('title');
 var poet=document.getElementById('poet');
 var poem=document.getElementById('poem');
 var uid=document.getElementById('uid');

 var request=new XMLHttpRequest();
 request.onreadystatechange= function(){
		if(request.readyState===XMLHttpRequest.DONE){
			if(request.status===200){
			  alert('You have successfully added this poem. Add more poems.');
			  title.value='';
			  poet.value='';
			  poem.value='';
			}
			else if(request.status===500)
			  alert('Something went wrong. Please try again.');
			else if(request.status===403){
			  alert('Invalid username/password');
			  uname.value='';
			  pswd.value='';
			}
		}
 }

 if(title.value==='')
 	title.focus();
 else if(poet.value==='')
	poet.focus();
 else if(poem.value==='')
 	poem.focus();
 else{
	request.open('POST','http://localhost:8080/addpoem',true);
	request.setRequestHeader('Content-Type','application/json');
	request.send(JSON.stringify({ttl: title.value,pt: poet.value,pm: poem.value, usid: uid.value}));
 }
};
