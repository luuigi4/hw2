<?php

use Illuminate\Routing\Controller as BaseController;

class CollaboraController extends BaseController
{
		public function collabora(){
			if(Session::get('amministratore')!=NULL){
				return view("/collabora")
					->with("amministratore",Session::get("amministratore"));	
			}else{
				return view("/login")
			 		 ->with('csrf_token', csrf_token())
					 ->with('entra','Accedi per usare i nostri servizi');
				
			}

		}
		
		public function film_esterno($titolo){
				$curl= curl_init();
				$nome=urlencode($titolo);
				$url="http://www.omdbapi.com/?i=tt3896198&apikey=c64fe1d3&t=".$nome;
				//echo $url;
				curl_setopt($curl, CURLOPT_URL,$url);
				curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
				$result=curl_exec($curl);
						curl_close($curl);
				return $result;
		}

		public function inserisci($titolo,$regista,$anno,$genere,$streaming,$poster){
			$reg=Regista::where('Nome',$regista)->count();
			//return $reg;
			
			if($reg!=0){//echo "regista trovato";
				
				//$regia=Regista::all();
				$regia=Regista::where('Nome',$regista)->get();
				$id=$regia[0]->Id;
			//	return $id;
			//	return $regia;

			
			}else{
				//echo "Regista non trovato!";
				$indice=Regista::all()->count();
				$re=new Regista;
				$re->Id=$indice+1;
				$re->Nome=$regista;
				$re->save();
				
				$id=$re->Id;
			//	echo"sono entrato nel ramo else";
				
			}//nella variabile $id è salvato l'indice del regista.Fino a qui ok
			//return $id;

			$codice=Catalogo::where('NomeStreaming',$streaming)->get();
			//return $codice;
			
			$film_esistente=Film::where('Nome',$titolo)->count();
			
			if($film_esistente!=0){
				//il film è già presente in db
				return 0;//"Il film è già presente nel database";
			}else{
				//il film deve essere aggiunto nel db
				$numero=Film::all()->count();

				
				$film=new Film;
				$film->Nome=$titolo;
				$film->Regista=$id;
				$film->Catalogo=$codice[0]->Codice;
				$film->Genere=$genere;
				$film->Anno=$anno;
				$film->Poster="https://m.media-amazon.com/images/M/".$poster;
				$film->id=$numero+1;
				$film->save();
				
				//echo $film->Poster;
				return 1;

			}
			
		}

		public function inserisci_suggerimento($titolo){
			$numero=Suggerimenti::all()->count();

			$suggerimento=new Suggerimenti;
			$suggerimento->Id=$numero+1;
			$suggerimento->Nome_Utente=session('utente');
			$suggerimento->Titolo=$titolo;
			$suggerimento->save();
			
			return 1;
		}

		public function richieste(){
			$richieste=Suggerimenti::all();
			return $richieste;
		}

	
}