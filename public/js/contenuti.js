function onJson(json){
	console.log(json);
		
		let count=0;
		for(let i=0; i<json.length;i++){
			count++;
		}
		
		const sistema=document.querySelector('.struttura');
		console.log(count);
		const numero=(count/4);
		console.log(numero);
		const altezza=Math.ceil(numero);
		console.log(altezza);
		const def= (altezza*450);
		console.log(def);
		sistema.style.height=def + 'px';
	
		//1 CREAZIONE DIV CONT
		for(let i=0; i<json.length;i++){
			const div_cont=document.createElement('div');
			div_cont.classList.add('cont');
			div_cont.dataset.ind=json[i].id;//segnalo i blocchi contenitori con un indice
			const struct=document.querySelector('.struttura');				
			struct.appendChild(div_cont);
				
		}

		//2 CREAZIONE DIV HEAD
		for (let i=0;i<json.length;i++){
			const div_head=document.createElement('div');
			div_head.classList.add('head');//aggiungo la classe head	
	
			const conte=document.querySelectorAll('.cont');
			conte[i].appendChild(div_head);
		}
			
		//3 CREAZIONE CONTENUTO DINAMICO
		for (let i=0;i<json.length;i++){
			const new_h1=document.createElement('h1');
			new_h1.textContent=json[i].Nome;
			const prefe= document.createElement('img');
			prefe.src="http://localhost/test_laravel/public/img/favorites.png";
			prefe.classList.add('prefe');
			prefe.addEventListener('click',Preferiti);
	
			const inte=document.querySelectorAll('.head');
			inte[i].appendChild(new_h1);
			inte[i].appendChild(prefe);
	
	const new_img=document.createElement('img');
	if(json[i].Poster.indexOf("http")!==-1){
			new_img.src=json[i].Poster;
			new_img.addEventListener('click',onThumbnailClick);
	}else{
			new_img.src="http://localhost/test_laravel/public/img/"+json[i].Poster;
			new_img.addEventListener('click',onThumbnailClick);

	}
	const conte=document.querySelectorAll('.cont');
	conte[i].appendChild(new_img);
	
	const streaming=document.createElement('h4');
	const regista=document.createElement('h4');
	const genere=document.createElement('h4');
	const anno=document.createElement('h4');

	streaming.textContent="Streaming: " + json[i].Streaming;
	streaming.classList.add('hidden');
	conte[i].appendChild(streaming);
	
	regista.textContent="Regista: " + json[i].Regista;
	regista.classList.add('hidden');
	conte[i].appendChild(regista);
	
	genere.textContent="Genere: " + json[i].Genere;
	genere.classList.add('hidden');
	conte[i].appendChild(genere);
	
	anno.textContent="Anno: " + json[i].Anno;
	anno.classList.add('hidden');
	conte[i].appendChild(anno);
	
	
	const testo=document.createElement('h3');
	testo.textContent="Leggi la descrizione!";
	conte[i].appendChild(testo);
	//EVENTO SULLA DESCRIZIONE
	testo.addEventListener('click',MostraDescrizione);
}
	aggiornapreferiti();	
}

function onResponse(response){
	return response.json();
	
}

function onError(error){
	console.log("Error:" +error);
}

fetch('catalogo/view').then(onResponse, onError).then(onJson);

function onJsonRicerca(json){
		//console.log(json);
		
			if(json.length==0){
				const errore=document.querySelector('#error');
				errore.classList.remove('nascondi');
			}else{
				const errore=document.querySelector('#error');
				errore.classList.add('nascondi');
			}
		
			const sistema=document.querySelector('.struttura');
			const lunghezza=json.length;
			const numero=lunghezza/4;
			const prop=Math.ceil(numero);
			const def= (prop*450);
			sistema.style.height=def + 'px';

			const cont=document.querySelectorAll('.struttura .cont');
			for (elemento of json){	
			const identificativo=elemento.id;
			cont[identificativo-1].classList.remove('nascondi');
			}

}

function Barra_di_Ricerca(event){
		const ricerca=event.currentTarget.value.toLowerCase();
		
		if(ricerca==''){
			
			const errore=document.querySelector('#error');
			errore.classList.add('nascondi');
			
			const cont=document.querySelectorAll('.struttura .cont');
			console.log(cont);
			
			const sistema=document.querySelector('.struttura');
			const numero=(cont.length)/4;
			const prop=Math.ceil(numero);
			const def= (prop*450);
			sistema.style.height=def + 'px';
			
			for (let i=0;i<cont.length;i++){
			cont[i].classList.remove('nascondi');
			}
		
		}else{
			const cont=document.querySelectorAll('.struttura .cont');
			for(let i=0;i<cont.length;i++){
				cont[i].classList.add('nascondi');
			}
			fetch('ricerca/'+ricerca).then(onResponse, onError).then(onJsonRicerca);
		}
}

//EVENTO SULLA BARRA DI RICERCA
const barra=document.querySelector('header input');
barra.addEventListener('keyup',Barra_di_Ricerca);

function VisualizzaMeno(){
	event.currentTarget.textContent="Leggi la descrizione!";
	const mostra= event.currentTarget.parentNode.querySelectorAll('h4');
	for (let i=0;i<mostra.length;i++){
		mostra[i].classList.add('hidden');
	}
	event.currentTarget.addEventListener('click',MostraDescrizione);
	event.currentTarget.removeEventListener('click', VisualizzaMeno);	
}
function MostraDescrizione(){
	console.log("Mi trovo qui");
	event.currentTarget.textContent="Mostra di meno!";
	const mostra= event.currentTarget.parentNode.querySelectorAll('h4');
	console.log(mostra);
	for (let i=0;i<mostra.length;i++){
	mostra[i].classList.remove('hidden');
	}
	event.currentTarget.removeEventListener('click',MostraDescrizione);
	event.currentTarget.addEventListener('click', VisualizzaMeno);
}

function onResponse2(response){
	console.log( response.status);
	return response.json();
	//aggiornapreferiti();
}

function onJprova(json){
	console.log(json);
	if(json===0){
	window.alert("Un amministratore non può impostare dei preferiti");
	aggiornaicona();
	}else{

	aggiornapreferiti();
  }
}
function onError2(error){
	console.log("Error:" +error);
}

function Risposta(response){
	console.log( response.status);
	aggiornapreferiti();
}

function Preferiti(event){//aggiunge ai preferiti, non restituisce nulla
	event.currentTarget.src="http://localhost/test_laravel/public/img/remove.jpg";
	event.currentTarget.removeEventListener('click',Preferiti);
	event.currentTarget.addEventListener('click',Rimuovi);
	
	
	
	const identificativo=event.currentTarget.parentNode.parentNode.dataset.ind;
	const tit=event.currentTarget.parentNode.querySelector('h1').textContent;
	const titolo=encodeURIComponent(tit);
	const urlprefe='pref/' + identificativo + '/' + titolo + "";
	console.log(urlprefe);
	fetch(urlprefe).then(onResponse2, onError2).then(onJprova);
}

function onJson2(){
	console.log(json);
}

function Rimuovi(){
	//controllo se mi trovo sui preferiti
	const riferimento=event.currentTarget.parentNode.parentNode.parentNode.parentNode;
	const prefer_sec=document.querySelector('#sez_prefe')
	
	//se sono sui preferiti devo modificare l'icona della sezione
	if(riferimento===prefer_sec){
		const icona_gruppo=document.querySelectorAll('.struttura .cont');
		const ind_pref=event.currentTarget.parentNode.parentNode.dataset.ind;
		const sinc=icona_gruppo[ind_pref-1].querySelector('img');
		sinc.src="http://localhost/test_laravel/public/img/favorites.png";
		/*sinc.addEventListener('click', Preferiti);
		sinc.removeEventListener('click', Rimuovi);*/
	}
	
	event.currentTarget.removeEventListener('click',Rimuovi);
	event.currentTarget.addEventListener('click',Preferiti);
	event.currentTarget.src="http://localhost/test_laravel/public/img/favorites.png";
	
	const indice=event.currentTarget.parentNode.parentNode.dataset.ind;
	//console.log("Stampo l'aaaaaaaaaaaa" + indice);
	
	const del="rim/" + event.currentTarget.parentNode.parentNode.dataset.ind;
	
	fetch(del).then(Risposta, onError2);
}

function onJson3(json){
	console.log(json);
	
	const pref=document.querySelector('#sez_prefe');
	//pref.innerHTML='';
	if (json.length!==0){
		pref.classList.remove('hidden');
	}else{
		pref.classList.add('hidden');		
	}
	
		const contenuti= document.querySelector('#sez_prefe div');	
		contenuti.innerHTML='';

//per ogni elemento presente nell'array creo un elemento da mettere poi nei preferiti		
		for (let i=0;i<json.length;i++){
			const new_cont=document.createElement('div');//creo l'elemento contenitore 
			new_cont.classList.add('cont');			
			new_cont.dataset.ind=json[i].Id_Film;
			
			const sez=document.querySelector('#sez_prefe div');
			sez.appendChild(new_cont);//appendo il contenitore nella sezione preferiti
		
			const new_head=document.createElement('div');
			new_head.classList.add('head');
		
			const cont=document.querySelectorAll('#sez_prefe .cont');
			cont[i].appendChild(new_head);//creo il contenitore e l'intestazione di un singolo film preferito e appendo
//in questo modo, a seconda della lunghezza dell'array creo i vari div contenitori e gli head			

			const new_titolo=document.createElement('h1');
			new_titolo.textContent=json[i].Titolo;
			
			const rem=document.createElement('img');
			rem.src="http://localhost/test_laravel/public/img/remove.jpg";
			rem.classList.add('prefe');
			rem.addEventListener('click',Rimuovi);
			
			const head_rif=document.querySelectorAll('.head');
			head_rif[i].appendChild(new_titolo);
			head_rif[i].appendChild(rem);
			
			const imm=document.createElement('img');
			
			if(json[i].poster.indexOf("http")!==-1){
				imm.src=json[i].poster;
					}else{
				imm.src="http://localhost/test_laravel/public/img/"+json[i].poster;
			}
			//imm.src=json[i].poster;
			cont[i].appendChild(imm);
			
			const streaming=document.createElement('h4');
			const regista=document.createElement('h4');
			const genere=document.createElement('h4');
			const anno=document.createElement('h4');

			streaming.textContent="Streaming: " + json[i].NomeStreaming;
			streaming.classList.add('hidden');
			cont[i].appendChild(streaming);
	
			regista.textContent="Regista: " + json[i].regista;
			regista.classList.add('hidden');
			cont[i].appendChild(regista);
	
			genere.textContent="Genere: " + json[i].genere;
			genere.classList.add('hidden');
			cont[i].appendChild(genere);
	
			anno.textContent="Anno: " + json[i].anno;
			anno.classList.add('hidden');
			cont[i].appendChild(anno);
	
	
			const testo=document.createElement('h3');
			testo.textContent="Leggi la descrizione!";
			cont[i].appendChild(testo);
			//EVENTO SULLA DESCRIZIONE
			testo.addEventListener('click',MostraDescrizione);
			

}
		sincro();	

}

function aggiornapreferiti(){//la funzione aggiornapreferiti 
	fetch('aggiorna').then(onResponse, onError).then(onJson3);
}

function sincro(){
	const preferiti=document.querySelectorAll('#sez_prefe .cont');
	console.log(preferiti);
	for (let i=0;i<preferiti.length;i++){
		const index=preferiti[i].dataset.ind;
		const ic_gruppo=document.querySelectorAll('.struttura .cont');
		const sinc=ic_gruppo[index-1].querySelector('img');
		sinc.src="http://localhost/test_laravel/public/img/remove.jpg";
		sinc.removeEventListener('click', Preferiti);
		sinc.addEventListener('click', Rimuovi);
		
	}
	
}

function aggiornaicona(){
	const icona=document.querySelectorAll('.prefe');
	//console.log(icona);
	for(let i=0;i<icona.length;i++){
		icona[i].src="http://localhost/test_laravel/public/img/favorites.png";
	}
}

function JsonSugg(event){
	const suggerimento = document.querySelector('#error');
	suggerimento.textContent='Grazie per la tua segnalazione';
}

function Suggerimenti(event){
	event.preventDefault();
	const valore=document.querySelector('textarea');
	console.log(valore.value);
	fetch('suggerisci/'+valore.value).then(onResponse, onError).then(JsonSugg);
}

const suggerimento = document.querySelector('#error');
console.log(suggerimento);
suggerimento.addEventListener('submit',Suggerimenti);

function onModalClick(){
	document.body.classList.remove('no-scroll');
	modalView.classList.add('hidden');
	modalView.innerHTML = '';
}

function onThumbnailClick(event){
	const image=document.createElement('img');
	image.src=event.currentTarget.src;
	document.body.classList.add('no-scroll');
	modalView.style.top=window.pageYOffset + 'px';
	modalView.appendChild(image);
	modalView.classList.remove('hidden');

}


const modalView=document.querySelector('#modal-view');
modalView.addEventListener('click',onModalClick);




















