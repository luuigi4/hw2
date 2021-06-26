<?php

use Illuminate\Routing\Controller as BaseController;


class LoginController extends BaseController
{
	public function utente(){
				$email=Request::post("email");
				$password=Request::post("password");

				$utente=User::where('email',$email)
							//->where('password',$password)
							->first();

				if($utente===NULL){
					$dipendente=Dipendenti::where('email',$email)
										  ->where('password',$password)
										  ->first();
						if($dipendente!==NULL){
							Session::put("amministratore",$dipendente->Nome);
							Session::put("Cf",$dipendente->CF);

							return view("home")
									->with('amministratore',$dipendente->Nome);
							
						}else{
								return view("login")
									->with('csrf_token', csrf_token())
									->with('errore','Email non presente');
						}
				}else {//L'EMAIL E' GIUSTA, CONFRONTO LA PASSWORD
					$pass=$utente->password;
					if($pass!=$password){  
						return view("login")
								->with('csrf_token', csrf_token())
								->with('errore','Password errata!')
								->with('email',Request::post("email"));						
						}else{
							//C'è un record corrispondente";
							Session::put("id",$utente->id);
							Session::put("utente",$utente->Nome);
							return redirect("/home");
						}
				}
	}

	public function esci(){
		Session::flush();
		return redirect ("/login");
	}


	public function prova(){
		return (Session::get("utente"));
	}

}
