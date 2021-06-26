<!DOCTYPE>
	<html>
	<head>
		<title>Quale piattaforma streaming ha il film? </title>
		<meta name="viewport"content="width=device-width, initial-scale=1"> 
		<link rel="stylesheet" href='{{url("css/catalogo.css")}}'/>
		<script src='{{url("js/contenuti.js")}}' defer></script>
	
	
		
		<link rel="preconnetti" href="https://fonts.gstatic.com">
		<link href="https://fonts.googleapis.com/css2? family=Alata&family=Lateef&family=Overlock&famiglia=Ubuntu&display=swap" rel="stylesheet">
		<link rel="preconnetti" href="https://fonts.gstatic.com">
		<link href="https://fonts.googleapis.com/css2? family=Roboto&display=swap" rel="foglio di stile">	

	</head>
	

	<body>

			<nav>
			<a href="home">Home</a>
			<a href="catalogo">Catalogo</a>
				@if(isset($amministratore))
				<a href="collabora">Collabora</a>
				@endif
			<a href="news">News</a>
					
				@if(isset($utente)||isset($amministratore))
						<a href='logout'><img src='{{url("img/logout.png")}}'>Logout</a>
				@else
						<a href='login'><img src='{{url("img/login.png")}}'>Login</a>
				@endif
			
            
            
            </nav>
					@if($utente!=NULL)
						<div id='profilo'> 
						<img src='{{url("img/utente.png")}}'/>
						<h2>Benvenuto {{$utente}}</h2 >
						</div>
					@endif

		 <article>
			<header>
			<h1> Vuoi vedere un film, ma non sai quale piattaforma ha i diritti?</h1>
			<h1>Cerca qui il film che desideri e scoprilo!</h1> 
			<span>Cerca </span> <input type="text"> 
			
			</header>
			
			
			<section id="sez_prefe" class="hidden layout">
			<h1>I tuoi film preferiti sono:</h1>
			<div ></div>
			</section>
			
			<section id="modal-view" class="hidden">
			</section>
			
			<section class="struttura">
				<form id="error" class="nascondi">
				<h2>Nessun film corrisponde ai criteri di ricerca!</h2></br>
				@if(isset($utente))
				<h2>Aiutaci ad ingrandire il nostro database</br>
				 Lascia il titolo di un film e verrà subito aggiunto al Database</br></h2>
				<span><textarea value='Titolo'></textarea><input type='submit'><span>
				@endif
				</form>
			</section>

			
		 </article>
		 <footer> 
			 <div>3)La rivoluzione dello streaming-Luigi Finocchiaro O46002054</div>
			 <address>Università degli Studi di Catania- Ingegneria Informatica</address>
		 </footer>
 

	</body>
	</html>