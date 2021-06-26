<html>
	<head>
		<title>Quale piattaforma streaming ha il film? </title>
		<meta name="viewport"content="width=device-width, initial-scale=1"> 
		<link rel="stylesheet" href='{{url("css/collabora.css")}}'/>
		<script src='{{url("js/collabora.js")}}' defer></script>
	


	</head>
	

	<body>
			<nav>
			<a href="home">Home</a>
			<a href="catalogo">Catalogo</a>
			<a href="collabora">Collabora</a>
			<a href="news">News</a>
			<a href='logout'><img src='{{url("img/logout.png")}}'>Logout</a>
			
            </nav>
					@if(isset($amministratore))
						<div id='profilo'> 
						<img src='{{url("img/utente.png")}}'/>
						<h2>Benvenuto {{$amministratore}}</h2 >
						</div>
					@endif
					
			<h1>Ecco le nuove richieste di film da inserire nel database!</h1>
			<section id='richieste'>
			</section>
			<h2>Cerca un film non ancora in catalogo</h2>
	
					<form  name='nome_form' method='post'> 
					<label><span>Titolo</span><input type='text' name='titolo'></label>
					<label>&nbsp; <input type='submit'></label>
					</form>
				
				<h2 class="nascondi">Film non trovato!</h2>

			<section>
				<div id="informazioni" >
					<div class="wrap nascondi">
		
					</div>
				</div>
			</section>
			
			<section id="options" class="nascondi">
			<h1>Quale piattaforma di streaming ha i diritti?</h1>
				<form  name='streaming' method='post'> 
				<select name='Streaming'>
				<option value='Amazon prime'>Amazon Prime Video</option>
				<option value='Disney'>Disney+</option>
				<option value='Infinity'>Infinity</option>
				<option value='Netflix'>Netflix</option>
				<option value='Now Tv'>Now Tv</option>
				</select>
				<label>&nbsp; <input type='submit'></label>
				</form>

			</section>
			<h2 class="nascondi">Film inserito correttamente</h2>
				<h2 class="nascondi">Film già presente in database</h2>
			
	</body>