function onJson2(json){
	const testo=document.createElement('h1');
	testo.textContent="Ecco i film più visti della settimana!";
	const ref_b=document.querySelector('body');
	ref_b.appendChild(testo);
	//testo.addEventListener('click',FilmTop);

	//console.log(json);
	const wrap=document.querySelector('body');
	wrap.classList.remove('nascondi');
	const ord=document.createElement('ol');
	wrap.appendChild(ord);
	
	for(let i=0;i<5;i++){
			console.log(json.results[i].original_title);
			const item=document.createElement('li');
			item.textContent=json.results[i].original_title;
			ord.appendChild(item);
			
	}
}


function onResponse2(response){
console.log('Sono arrivato fin qui')
	return response.json();
	
}

function onError2(error){
	console.log("Error:" +error);
}

/*function Scomparsa(){
	const top1=document.querySelector('.top h1');
	top1.removeEventListener('click',Scomparsa);
	top1.addEventListener('click',FilmTop);
	top1.textContent='Clicca qui per scoprire i film più visti della settimana!';
	const ref_wrap=document.querySelector('.top div');
	ref_wrap.innerHTML='';
	ref_wrap.classList.add('nascondi');
	
}*/

function FilmTop(){
const url2='Film/Popolari';
fetch(url2).then(onResponse2,onError2).then(onJson2);

}

function Avanti(event){
	let ide=event.currentTarget.parentNode.parentNode.dataset.indice;
	console.log("La section visualizzata è"+ide);
	if(ide==8){
	//ide++;
	//	console.log("La prossima da visualizzare"+ide);
	console.log("Nascondo la sezione corrente");
	const sec_cor=event.currentTarget.parentNode.parentNode;
	sec_cor.classList.add('nascondi');
	console.log("Visualizzo la prima");
	const ref_sez=document.querySelectorAll('section');
	console.log(ref_sez);
	ref_sez[0].classList.remove('nascondi');
		
	}else{
	
	ide++;
	console.log("La prossima da visualizzare"+ide);
	console.log("Nascondo la sezione corrente");
	const sec_cor=event.currentTarget.parentNode.parentNode;
	sec_cor.classList.add('nascondi');
	console.log("Visualizzo la prossima");
	const ref_sez=document.querySelectorAll('section');
	console.log(ref_sez);
	ref_sez[ide-1].classList.remove('nascondi');
	}	

  
}

function Indietro(event){
	let ide=event.currentTarget.parentNode.parentNode.dataset.indice;
	//console.log("La section visualizzata è"+ide);
	if (ide==1){	
	//console.log("Nascondo la sezione corrente");
	const sec_cor=event.currentTarget.parentNode.parentNode;
	sec_cor.classList.add('nascondi');
	//console.log("Visualizzo l'ultima in database");
	const ref_sez=document.querySelectorAll('section');
	//console.log(ref_sez);
	ref_sez[7].classList.remove('nascondi');
		
	}else{
	ide--;
	//console.log("La prossima da visualizzare"+ide);
	//console.log("Nascondo la sezione corrente");
	const sec_cor=event.currentTarget.parentNode.parentNode;
	sec_cor.classList.add('nascondi');
	//console.log("Visualizzo la precedente");
	const ref_sez=document.querySelectorAll('section');
	//console.log(ref_sez);
	ref_sez[ide-1].classList.remove('nascondi');
  }
}

function appendi(json){
	//creo le sezione e le marco con un indice
	for(let i=0;i<json.length;i++){
		const section=document.createElement('section');
		section.dataset.indice=json[i].Id;
		section.classList.add('nascondi');
		const ref_body=document.querySelector('body');
		ref_body.appendChild(section);	
	}

	for(let i=0;i<json.length;i++){
		const sezione=document.querySelectorAll('section');
		
		//titolo
		const titolo=document.createElement('h1');
		titolo.textContent=json[i].Titolo;
		sezione[i].appendChild(titolo);
		
	    //immagine
		const immagine=document.createElement('img');
			if(json[i].Immagine.indexOf("http")!==-1){
				immagine.src=json[i].Immagine;
			}else{
				immagine.src="http://localhost/test_laravel/public/img/"+json[i].Immagine;
			}
		//immagine.src='http://localhost/test_laravel/public/img/'+json[i].Immagine;
		sezione[i].appendChild(immagine);
		
		//description
		const desc=document.createElement('p');
		desc.textContent=json[i].Descrizione;
		sezione[i].appendChild(desc);		
		
		//div intestazione
		const intestazione=document.createElement('div');
		const div_int=document.createElement('div');
		sezione[i].appendChild(intestazione);
		intestazione.classList.add('intestazione');
		intestazione.appendChild(div_int);
		
		//autore
		const autore=document.createElement('h4');
		autore.textContent=json[i].Autore;
		intestazione.appendChild(autore);
		//data
		const data=document.createElement('h4');
		data.textContent=json[i].Data;
		intestazione.appendChild(data);
		//categoria	
		/*const categoria=document.createElement('h4');
		categoria.textContent=json[i].Categoria;
		intestazione.appendChild(categoria);*/


		//url
		const url=document.createElement('a');
		url.textContent="Vai all'articolo>>";
		url.href=json[i].Url;
		sezione[i].appendChild(url);

		const frecciav=document.createElement('img');
		frecciav.src="http://localhost/test_laravel/public/img/frecciav.png";
		frecciav.classList.add('frecciav');
		//evento
		frecciav.addEventListener('click',Avanti);
		
		const ref=document.createElement('div');
		ref.classList.add('freccia');
		//const sec=document.querySelectorAll('section');
		sezione[i].appendChild(ref);
		

		const frecciain=document.createElement('img');
		frecciain.src="http://localhost/test_laravel/public/img/freccin.png";
		frecciain.classList.add('frecciain');
		//evento
		frecciain.addEventListener('click',Indietro);
		
		//sec[0].appendChild(frecciain);
		ref.appendChild(frecciain);
		ref.appendChild(frecciav);


		//rendo visibile la sezione
		//sezione[i].classList.remove('nascondi');	
	}
		const riferimenti=document.querySelectorAll('section');
		riferimenti[0].classList.remove('nascondi');

}

function onJson(json){
	console.log(json);
	appendi(json);
}



function News(){
	const url='News/Db';
	fetch(url).then(onResponse2,onError2).then(onJson);

}

News();
FilmTop();



