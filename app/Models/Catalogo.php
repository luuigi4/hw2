<?php 
use Illuminate\Database\Eloquent\Model;

class Catalogo extends Model{
	
	protected $table="catalogo";
	protected $primaryKey="Codice";
	protected $autoIncrement=false;
	public $timestamps=false;
	
	public function codice_cat(){
		return $this->hasMany("Film");
	}
}


?>