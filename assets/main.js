'use strict';

const req = new XMLHttpRequest();
req.onload = onLoad;

function onLoad(event) {
    // Ici, this.readyState égale XMLHttpRequest.DONE .
    if (this.status === 200) {
    	var messages = '';   	
    	var data = JSON.parse(this.responseText);
    	console.log(data);
    	
    	for (let k in data) {
    		messages += '<li>'+data[k].ip+' : '+data[k].msg+'</li>'
    	}
    	document.getElementById("container-chat").innerHTML = messages;
    	
    }
}

function loadChat()
{
	req.open('GET', 'chat.php', true);
	req.send(null);
}

document.addEventListener('DOMContentLoaded', function(){
	document.addEventListener('keypress',function(event){
		
		if(event.keyCode == 13) {
			event.preventDefault();
			document.getElementById('button-submit').click();
		}
	});

	document.getElementById('button-submit').addEventListener('click',function(event){
		req.open('POST', 'chat.php', true);
		req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		req.send('message='+document.getElementById('msg').value);
		document.getElementById('msg').value = '';
		loadChat();
	});
	loadChat();
	window.setInterval(function() { loadChat(); }, 3000);
});