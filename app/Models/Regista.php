<?php 
use Illuminate\Database\Eloquent\Model;

class Regista extends Model{
	
	protected $table="regista";
	public $timestamps=false;
	protected $autoIncrement=false;
	
	
	
		public function reg(){
		return $this->hasMany("Film");
	}
}

	

?>