<html>
  <head>
    <title> La rivoluzione dello streaming-Login</title>
	<link rel="stylesheet" href='{{url("css/login1.css")}}'/>
	<script src='{{url("js/login1.js")}}' defer></script>
	</head>
	

   <body>	

			@if(isset($entra))
			<h1>{{$entra}} </h1>
			@endif
			

	<div class='stile'>

			<h1>Accedi</h1>
 	
			@if(isset($errore))
			<h2>{{$errore}} </h2>
			@endif
			
			@if(isset($avviso))
			<h2>{{$avviso}} </h2>
			@endif
			
		<form name='nome_form' method='post'  action='login'>
			<input type='hidden' name='_token' value='{{$csrf_token}}'>
			<label>E-mail <input type='text' name='email' @if(isset($email)) value='{{$email}}'@endif></label>
			<label>Password <input type='password' name='password'></label>
			<label>&nbsp; <input type='submit'></label>
		</form>
		<a href="reg">Non sei ancora registrato? Registrati qui!</a>

	</div>			
		<div class ="overlay"></div>
		
		<h2></h2>
   </body>
</html>	