<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('login', function () {
	//echo "stampo il mio primo percorso";
	return view('login')
		 ->with('csrf_token', csrf_token());
});


Route::post('login', 'LoginController@utente');
	
Route::get ('logout', 'LoginController@esci');

Route::get ('prova', 'LoginController@prova');

Route::get ('news', 'NewsController@news');

Route::get ('collabora', 'CollaboraController@collabora');

Route::get ('catalogo/view', 'CatalogoController@caricamento');

Route::get ('catalogo', 'CatalogoController@catalogo');

Route::get ('ricerca/{titolo}', 'CatalogoController@ricerca');

Route::get ('home', 'HomeController@homepage');
		
Route::get('preferiti', 'CatalogoController@preferiti');

Route::get('pref/{idfilm}/{titolo}', 'CatalogoController@aggiuntaprefe');

Route::get('rim/{id}', 'CatalogoController@rimozioneprefe');

Route::get('aggiorna', 'CatalogoController@aggiornaprefe');

Route::get('api/{titolo}', 'CollaboraController@film_esterno');

Route::get('inserisci/{titolo}/{regista}/{anno}/{genere}/{streaming}/{poster}', 'CollaboraController@inserisci');

Route::get('Film/Popolari','NewsController@film_popolari');

Route::get('News/Db','NewsController@newsDb');

Route::get('prova','NewsController@prova');

Route::get('reg','RegisterController@reg');

Route::post('register','RegisterController@registrazione');

Route::get('suggerisci/{titolo}','CollaboraController@inserisci_suggerimento');

Route::get('richieste','CollaboraController@richieste');


Route::get('database', function () {
	$film=User::all();
	return $film;
});


