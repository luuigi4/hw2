<?php

use Illuminate\Routing\Controller as BaseController;

class CatalogoController extends BaseController
{
		public function caricamento(){
			$film=DB::table('film') 
					->join('regista','regista.id','=','film.regista')
					->join('catalogo','catalogo.codice','=','film.catalogo')
					->select('Film.id','Film.Nome','Regista.Nome as Regista','Catalogo.NomeStreaming as Streaming','Film.Genere','Film.Anno','Film.Poster')
					->orderBy("Film.id")
					->get();
			return $film;

		}
	
		public function catalogo(){
			if((Session::get('utente'))||(Session::get('amministratore'))!=NULL){
				return view("catalogo")
					->with("utente",Session::get("utente"))
					->with('amministratore',Session::get('amministratore'));

			}else{
				return view("/login")
			 		 ->with('csrf_token', csrf_token())
					 ->with('entra','Accedi per usare i nostri servizi');
				
			}

		}
		
		public function ricerca($titolo){
			$titoli=Film::where('Nome','like','%'.$titolo.'%')->get();
			return $titoli;
		}
		
		public function preferiti(){
			$preferiti=Preferiti::all();
			return $preferiti;
		}
		
		public function aggiuntaprefe($idfilm,$titolo){
			$count=Preferiti::all()->count();
			
			//aggiuntarecord in caso di amministratore
			if(session('amministratore')!==NULL){
				return 0;
			}else{
			
			//aggiuntarecord in caso di utente
			$filmprefe= new Preferiti;
			$filmprefe->Id_Prefe=$count+1;
			$filmprefe->Id_Utente=session('id');
			$filmprefe->Nome_Utente=session('utente');
			$filmprefe->Titolo=$titolo;
			$filmprefe->Id_Film=$idfilm;
			$filmprefe->save();
			return 1;
			}
		}	
		
		public function rimozioneprefe($id){
			/*$row=Preferiti::where('Id_Film',$id)
						  ->where('Nome_Utente',session('utente'))
						  ->get();
			//return($row);
			//aa();
			$row->delete();	*/
		
		DB::table('preferiti')->where('Id_Film',$id)
							  ->where('Nome_Utente',session('utente'))
							  ->delete();
			
		}
		
		public function aggiornaprefe(){
						//$query=" select p.Id_Film, p.Titolo, f.Regista, f.streaming, f.genere, f.anno, f.poster 
						//from preferiti p join contenuti f on f.id=p.Id_Film where Id_utente=".$_SESSION["id"];                 
				
				
						$preferiti=DB::table('film')
						->join('preferiti','preferiti.Id_Film','=','film.id')
						->join('catalogo','catalogo.codice','=','film.catalogo')
						->join('regista','regista.id','=','film.regista')
						->select('preferiti.Id_Film','preferiti.Titolo','regista.nome as regista',
								'catalogo.NomeStreaming','film.genere','film.anno', 'film.poster')
						->where('preferiti.Id_Utente',session('id'))
						->get();
		
						return($preferiti);
		}							
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
}
