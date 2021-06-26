let titolo=0;
let regista=0;
let anno=0;
let genre=0;
let poster=0;
let streaming=0;

function Aggiungi(event){//rende visibile il secondo form
	const opzioni=document.querySelector('#options');
	opzioni.classList.remove('nascondi');
	//opzioni.style.top=window.pageYOffset + 'px';
}

function appendi(json){
	console.log(json.Title);
	const contenitore=document.querySelector('#informazioni');
	const ref= contenitore.querySelector('div');
	ref.innerHTML='';
	ref.classList.remove('nascondi');
	
	const intestazione=document.createElement('div');
	intestazione.classList.add('head');
	ref.appendChild(intestazione);

	const tit=document.createElement('h2');
	tit.textContent= json.Title;
	titolo=json.Title;
	const aggiungi=document.createElement('img');
	aggiungi.src='http://localhost/test_laravel/public/img/aggiungi.png';
	aggiungi.classList.add('prefe');
	intestazione.appendChild(tit);
	intestazione.appendChild(aggiungi);
	addEventListener('click', Aggiungi);

	const immagine=document.createElement('img');
	immagine.src=json.Poster;
	//console.log(json.Poster);
	ref.appendChild(immagine);
	poster=json.Poster.substring(36);
	//console.log(poster);
	
	
		const dato0=document.createElement('h4');
		const dato1=document.createElement('h4');
		const dato2=document.createElement('h4');
		const dato3=document.createElement('h4');

		ref.appendChild(dato0);
		ref.appendChild(dato1);
		ref.appendChild(dato2);
		ref.appendChild(dato3);
	
	//const dati=contenitore.querySelectorAll('h3');
	dato0.textContent='Anno di uscita:' + json.Year;
	const year=json.Year;
	anno=year.substring(0,4);
	console.log(anno);
	dato1.textContent='Cast:' + json.Actors;
	dato2.textContent='Genere:' + json.Genre;
	const genere=json.Genre.split(",");
	genre=genere[0];
	
	//console.log(genre);
	
	dato3.textContent='Regista:' + json.Director;
	const reg=json.Director.split(",");
	regista=reg[0];
	console.log(regista);
	if(regista=='N/A'){
		regista=regista.replace("/","-");
	} 
	
	console.log(regista);



	//contenitore.appendChild(immagine);

}

function inserimento(event){
	event.preventDefault();
	const mod2=document.querySelectorAll('form');
	streaming=mod2[1].Streaming.value;
	
	const url='inserisci/'+titolo+'/'+regista+'/'+anno+'/'+genre+'/'+streaming+'/'+poster;
	console.log(url);
	
	fetch(url).then(onResponse,onError).then(onJson2);
}

function onJson2(json){
	console.log(json);
	const corpo=document.querySelector('.wrap');
	const ins=document.querySelector('#options');
	
		if(json===1){
		corpo.classList.add('nascondi');
		ins.classList.add('nascondi');
		//const sezione=document.querySelector('#options');
		const avviso=document.querySelectorAll('h2');
		console.log(avviso);
		//avviso.textContent=json;
		avviso[4].classList.remove('nascondi');
		//appendi(json);
		}else{
			const avviso=document.querySelectorAll('h2');
			//console.log(avviso);
			avviso[5].classList.remove('nascondi');

		}
}

function onJson(json){
	console.log(json);
	if(json.Response=="False"){
		console.log(json.Error);
		const errore=document.querySelectorAll('h2');
		console.log(errore);
		errore[2].classList.remove('nascondi');
		
	}else{
		const errore=document.querySelectorAll('h2');
		errore[2].classList.add('nascondi');
	    appendi(json);

	}
}

function onResponse(response){
	return response.json();
	
}
function onError(error){
	console.log("Error:" +error);
}


function validazione(){//inizia qui la ricerca
	event.preventDefault();
	const avviso=document.querySelectorAll('h2');
	console.log(avviso);
		const opzioni=document.querySelector('#options');
	opzioni.classList.add('nascondi');
	avviso[2].classList.add('nascondi');
	avviso[3].classList.add('nascondi');
	avviso[4].classList.add('nascondi');
	//avviso[5].classList.add('nascondi');
	
	
	const valore=document.querySelector('input');
	const ricerca=valore.value;
	const ric=encodeURIComponent(ricerca);
	console.log(ric);
	if (ric===''){
	

	
	const contenitore=document.querySelector('#informazioni');
	const ref= contenitore.querySelector('div');
	ref.classList.add('nascondi');
	ref.innerHTML='';
	}else{
    //appendo all'url le variabili get
	const url='api/';
	const urldef=url + ric;
	console.log(urldef);
	fetch(urldef).then(onResponse,onError).then(onJson);
}
}

function onJsonRichieste(json){
	
	if(json.length!=0){
		const sezione=document.querySelector('#richieste');
		const lista=document.createElement('ol');
		sezione.appendChild(lista);
		for(let i=0;i<json.length;i++){
			const item=document.createElement('li');
			item.textContent=json[i].Titolo;			
			
			lista.appendChild(item);
			
		}
	}
}

function richieste(){
	fetch('richieste').then(onResponse,onError).then(onJsonRichieste);
}

richieste();

const mod = document.querySelector('form');
//console.log(mod);
mod.addEventListener('submit',validazione);

const mod2=document.querySelectorAll('form');
mod2[1].addEventListener('submit', inserimento);
