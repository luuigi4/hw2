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
			new_h1.textContent=json[i].titolo;
			const prefe= document.createElement('img');
			prefe.src="http://localhost/test_laravel/public/img/favorites.png";
			prefe.classList.add('prefe');
			prefe.addEventListener('click',Preferiti);
	
			const inte=document.querySelectorAll('.head');
			inte[i].appendChild(new_h1);
			inte[i].appendChild(prefe);
	
	const new_img=document.createElement('img');
	new_img.src=json[i].poster;
	const conte=document.querySelectorAll('.cont');
	conte[i].appendChild(new_img);
	
	const streaming=document.createElement('h4');
	const regista=document.createElement('h4');
	const genere=document.createElement('h4');
	const anno=document.createElement('h4');

	streaming.textContent="Streaming: " + json[i].streaming;
	streaming.classList.add('hidden');
	conte[i].appendChild(streaming);
	
	regista.textContent="Regista: " + json[i].regista;
	regista.classList.add('hidden');
	conte[i].appendChild(regista);
	
	genere.textContent="Genere: " + json[i].genere;
	genere.classList.add('hidden');
	conte[i].appendChild(genere);
	
	anno.textContent="Anno: " + json[i].anno;
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

function onErrore(error){
	console.log("Error:" +error);
}

function onError(error){
	console.log("Error:" +error);
}


fetch('/catalogo').then(onResponse, onErrore).then(onJson);

//FUNZIONI RELATIVE ALLA DESCRIZIONE.OK
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

//EVENTO SULLA BARRA DI RICERCA
const barra=document.querySelector('header input');
barra.addEventListener('keyup',Barra_di_Ricerca);

function onJsonRicerca(json){
	console.log(json);
	const cont=document.querySelectorAll('.struttura .cont');
		for (elemento of json){
		const identificativo=elemento.id;
		cont[identificativo-1].classList.remove('nascondi');
	}
}

function Barra_di_Ricerca(event){
		const ricerca=event.currentTarget.value.toLowerCase();
		//console.log(ricerca);
		const cont=document.querySelectorAll('.struttura .cont');
		for(let i=0;i<cont.length;i++){
		cont[i].classList.add('nascondi');
		}
		
		const url="http://localhost/homework/ricerca.php?nome="+ricerca;
		console.log(url);
		fetch(url).then(onResponse, onError).then(onJsonRicerca);
	
/*	if (ricerca===''){//funzionante con js soltanto
			const cont=document.querySelectorAll('.struttura .cont');

			for(contenitore of cont){
				contenitore.classList.remove('nascondi');
			}
			//controlla_sez_prefe();
		} else{
			const cont=document.querySelectorAll('.struttura .cont');
			console.log(cont);
			for (contenitore of cont) {
				contenitore.classList.add('nascondi');
			}
			console.log("La parola immessa in input è." + ricerca);
			for(let i=0;i<cont.length;i++){
			 const titolo=cont[i].querySelector('h1').textContent.toLowerCase();
			 //console.log(titolo);
			 
			 if(titolo.indexOf(ricerca)!==-1){
					cont[i].classList.remove('nascondi');
			 }
		  }
		
		}*/	
}

function Risposta(response){
	console.log( response.status);
	aggiornapreferiti();
}

function onResponse2(response){
	console.log( response.status);
	aggiornapreferiti();
}

function onError2(error){
	console.log("Error:" +error);


}

function onJson2(){
	console.log(json);
}


function onJsonError(){
			window.alert("Un amministratore non può settare dei preferiti.");
}

function Preferiti(){
	event.currentTarget.src="http://localhost/test_laravel/public/img/remove.jpg";
	event.currentTarget.removeEventListener('click',Preferiti);
	event.currentTarget.addEventListener('click',Rimuovi);
	
	
	
	const identificativo=event.currentTarget.parentNode.parentNode.dataset.ind;
	const tit=event.currentTarget.parentNode.querySelector('h1').textContent;
	const titolo=encodeURIComponent(tit);
	const urlprefe='pref/' + identificativo + '/' + titolo;
	//console.log(urlprefe);
	fetch(urlprefe).then(onResponse2, onError2).then(onJsonError);

	
	
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
			new_cont.dataset.ind=json[i].Id;
			
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
			rem.src="remove.jpg";
			rem.classList.add('prefe');
			rem.addEventListener('click',Rimuovi);
			
			const head_rif=document.querySelectorAll('.head');
			head_rif[i].appendChild(new_titolo);
			head_rif[i].appendChild(rem);
			
			const imm=document.createElement('img');
			imm.src=json[i].Poster;
			cont[i].appendChild(imm);
			
			const streaming=document.createElement('h4');
			const regista=document.createElement('h4');
			const genere=document.createElement('h4');
			const anno=document.createElement('h4');

			streaming.textContent="Streaming: " + json[i].Streaming;
			streaming.classList.add('hidden');
			cont[i].appendChild(streaming);
	
			regista.textContent="Regista: " + json[i].Regista;
			regista.classList.add('hidden');
			cont[i].appendChild(regista);
	
			genere.textContent="Genere: " + json[i].Genere;
			genere.classList.add('hidden');
			cont[i].appendChild(genere);
	
			anno.textContent="Anno: " + json[i].Anno;
			anno.classList.add('hidden');
			cont[i].appendChild(anno);
	
	
			const testo=document.createElement('h3');
			testo.textContent="Leggi la descrizione!";
			cont[i].appendChild(testo);
			//EVENTO SULLA DESCRIZIONE
			testo.addEventListener('click',MostraDescrizione);
			

}
		sincro();	


//Sincronizzo l'icona
/*let ide =[];
for(let i=0;i<json.length;i++){
	 ide[i]= json[i].Id;
}
//console.log(ide);

/*for(let i=0;i<ide.length;i++){
	const contenitor= document.querySelectorAll('.struttura .cont');
	const indice= ide[i];
	console.log("stampo l'indice "+indice);
	const icona=contenitor[indice-1].querySelector('img');
	icona.src="remove.jpg";
	icona.addEventListener('click',Rimuovi);

}*/




}

function aggiornapreferiti(){//la funzione aggiornapreferiti dovrebbe funzio
	fetch('aggiorna').then(onResponse, onError).then(onJson3);
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
		sinc.src="favorites.png";
		/*sinc.addEventListener('click', Preferiti);
		sinc.removeEventListener('click', Rimuovi);*/
	}
	
	event.currentTarget.removeEventListener('click',Rimuovi);
	event.currentTarget.addEventListener('click',Preferiti);
	event.currentTarget.src="http://localhost/test_laravel/public/img/favorites.png";
	
	const indice=event.currentTarget.parentNode.parentNode.dataset.ind;
	console.log("Stampo l'aaaaaaaaaaaa" + indice);
	
	const del="http://localhost/prova/delete.php?id=" + event.currentTarget.parentNode.parentNode.dataset.ind;
	
	fetch(del).then(Risposta, onError2);
	

	
}

function sincro(){
	const preferiti=document.querySelectorAll('#sez_prefe .cont');
	console.log(preferiti);
	for (let i=0;i<preferiti.length;i++){
		const index=preferiti[i].dataset.ind;
		const ic_gruppo=document.querySelectorAll('.struttura .cont');
		const sinc=ic_gruppo[index-1].querySelector('img');
		sinc.src="remove.jpg";
		sinc.removeEventListener('click', Preferiti);
		sinc.addEventListener('click', Rimuovi);
		
	}
	
}