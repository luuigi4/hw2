<?php 
use Illuminate\Database\Eloquent\Model;

class Dipendenti extends Model{
	
	protected $table="Dipendenti";
	protected $primaryKey="CF";
	protected $autoIncrement=false;
	protected $keyType="string";
	public $timestamps=false;

}


?>