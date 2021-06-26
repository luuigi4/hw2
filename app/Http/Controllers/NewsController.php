<?php

use Illuminate\Routing\Controller as BaseController;

class NewsController extends BaseController
{
		public function news(){
			
			return view("/news")
					  ->with("utente",Session::get("utente"))
					  ->with('amministratore',Session::get('amministratore'));

		}
		
		public function film_popolari(){
			$curl= curl_init();
			curl_setopt($curl, CURLOPT_URL,"https://api.themoviedb.org/3/discover/movie?api_key=ba19f39ba1a719d4d5c62ab7aa10ce20&sort_by=popularity.desc&language=it-en&with_original_language=en&year=2021");
			curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
			$result=curl_exec($curl);
			return $result;
			curl_close($curl);
			mysqli_close($conn);
		}
		
		//const url2='http://localhost/prova/provapi.php';

		public function newsDb(){
			$news=News::all();
			return $news;
			
		}
		
		public function prova(){
			$film=Film::find(1);

			$int= $film->film_utenti()->get();
			return $int;
			//->codice_cat;//->reg();
		}

}
