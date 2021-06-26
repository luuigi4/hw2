<?php 
use Illuminate\Database\Eloquent\Model;

class Film extends Model{
	
	protected $table="film";
	public $timestamps=false;
	
	
		public function film_utenti(){
		return $this->belongsToMany("User","Preferiti",$Id_Film,$Id_Utente);
	}
	
		public function codice_cat(){
		return $this->belongsTo("Catalogo","Catalogo");//potrebbe andare sull'altro models
	}
	
	
	/*	public function reg(){
		return $this->hasOne("Regista","Id","id");//potrebbe andare sull'altro models
	}N.B. DEVI CORREGGERE HASONE CON UN HAS MANY*/
	
	
	public function reg(){
		return $this->belongsTo("Regista","Regista");//potrebbe andare sull'altro models
	}
}


?>