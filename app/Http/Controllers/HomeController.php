<?php

use Illuminate\Routing\Controller as BaseController;

class HomeController extends BaseController
{

	public function homepage(){
	//echo "sono passato da un redirect e dunque sono nel controller HOME";
	
		return view("/home")
				->with("utente",Session::get("utente"))
				->with('amministratore',Session::get('amministratore'));

	} 
}
