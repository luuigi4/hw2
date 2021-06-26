<html>
  <head>
    <title> La rivoluzione dello streaming-Login</title>
	<link rel="stylesheet" href='{{url("css/login1.css")}}'/>
	<script src='{{url("js/register1.js")}}' defer></script>
	</head>
	

   <body>	

		<div id='contenitore' class='stile2'>
					<h1>Registrati</h1>

			@if(isset($errore))
			<h2>{{$errore}} </h2>
			@endif

			<form id="reg" name='Registrazione' method='post' action='register'>
				<input type='hidden' name='_token' value='{{$csrf_token}}'>
				<label>Nome <input type='text' name='nome'></label>
				<label>E-mail <input type='text' name='email'></label>
				<label>Password <input type='password' name='password'></label>
				<label>&nbsp; <input type='submit'></label>
			</form>
			<a href="login">Sei già registrato? Clicca qui per accedere</a>
			<h4 class="hidden">Compila tutti i campi!</h4>
			<h4 class="hidden">La password deve contenere almeno 6 e massimo 12 caratteri alfanumerici</h4>

		</div>
		
		<div class ="overlay"></div>
		
		<h2><span></span></h2>
   </body>
</html>	