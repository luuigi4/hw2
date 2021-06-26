function validazione(){
	const avviso=document.querySelector('h2');
		console.log(form.email.value);
	if(form.email.value.length == 0 ||
       form.password.value.length == 0){
		
		avviso.textContent='';
		avviso.textContent='Compila tutti i campi!';
		form.appendChild(avviso);
		event.preventDefault();
	   }else{
		   avviso.textContent='';
	   }
	   
	
}

const form = document.forms['nome_form'];
form.addEventListener('submit',validazione);
