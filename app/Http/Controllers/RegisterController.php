<?php

use Illuminate\Routing\Controller as BaseController;


class RegisterController extends BaseController
{
	public function reg(){
			return view('register')
				->with('csrf_token', csrf_token());
	}

	public function registrazione(){
		$email=Request::post("email");
	
		 $utente=User::where("email",Request::post("email"))->count();
		 if($utente!=0){
			 //L'email è stata già utilizzata
			 return view("register")
			 		 ->with('csrf_token', csrf_token())
					 ->with('errore',"L'email è stata già utilizzata");
			 }else{
			 //L'email è nuova dunque si può passare alla registrazione in dB
			 $indice=User::all()->count();
			 $new_utente=new User;
			 $new_utente->id=$indice+1;
			 $new_utente->Nome=Request::post("nome");
			 $new_utente->Email=Request::post("email");
			 $new_utente->password=Request::post("password");
			 $new_utente->save();
			 
			 return view("login")
			 		 ->with('csrf_token', csrf_token())
					 ->with('avviso',"Registrazione effettuata! Accedi");


			 //echo "L'utente è stato inserito correttamente";
		 }
	}


}