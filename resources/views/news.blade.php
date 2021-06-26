<html>
  <head>
    <title> La rivoluzione dello streaming-Login</title>
	<link rel="stylesheet" href='{{url("css/news.css")}}'/>
	<script src='{{url("js/java.js")}}'defer></script>
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
			<h1>Le ultime News sulle principali piattaforme di Streaming!</h1>
	
	
			
			</article>
			

	</body>
	
	
</html>