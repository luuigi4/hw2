function registrazione(event){	
			const modulo=document.querySelector('#reg');
			//console.log(modulo.nome.value);
			//console.log(modulo.email.value);
			//console.log(modulo.password.value);
					//event.preventDefault();
					//console.log(er);				
			const er=document.querySelectorAll('h4');


			if(modulo.nome.value.length == 0 ||
			   modulo.email.value.length == 0 ){
					event.preventDefault();
					er[0].classList.remove('hidden');
			}else{
					er[0].classList.add('hidden');
					//event.preventDefault();
			}
			
			const ck_password = /^[A-Za-z0-9]{6,12}$/;
			
		     if (!ck_password.test(modulo.password.value)) {
					event.preventDefault();
					er[1].classList.remove('hidden');
			}

			
			/*if(modulo.password.value.length <= 6){
					event.preventDefault();
					er[1].classList.remove('hidden');
					
			}*/else{	
					er[1].classList.add('hidden');		
					//event.preventDefault();
			}
			//event.preventDefault();

}

const regi = document.querySelector('form');
regi.addEventListener('submit', registrazione);