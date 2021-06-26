<?php use Illuminate\Database\Eloquent\Model;

class User extends Model{
	
	protected $table="utenti";
	public $timestamps=false;
	protected $hidden=['password'];
	
	
	public function film_utenti(){
		return $this->belongsToMany("Film","Preferiti",$Id_Utente,$Id_Film);
	}
	
}


?>