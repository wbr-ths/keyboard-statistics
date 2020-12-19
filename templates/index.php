<html>

<head>
	<title>Keyboard Statistics 🔥</title>

	<!-- stylesheets -->
	<link href="https://fonts.gstatic.com" rel="preconnect">
	<link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="static/images/keyboard-icon.png" type="image/png" rel="icon"/>

    <!-- custom stylesheets -->
    <link href="static/css/style.css" type="text/css" rel="stylesheet">

    <!-- scripts -->
	<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/chart.js@2.9.4/dist/Chart.min.js"></script>
	<script type="text/javascript" src="static/js/chartjs-plugin-labels.min.js"></script>
	<script type="text/javascript" src="//code.jquery.com/jquery-3.3.1.min.js"></script>
	<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/socket.io/1.3.6/socket.io.min.js"></script>

	<!-- custom scripts -->
	<script type="text/javascript" src="static/js/util.js"></script>
	<script type="text/javascript" src="static/js/live-updater.js"></script>

</head>

<body>

	<br>
	<div class="banner">
		<h1>Keyboard Statistics</h1>
	</div>
	
	<div class="flex-container">

		<div class="card">
			<h1><span class="material-icons">timeline</span>  Usage over time</h1>
			<div class="canvasdiv">
            	<canvas id="time_diagram"  width="100px" height="80px"></canvas>
          	</div>
          	<script type="text/javascript">
          		let time_diagram_data = {{time_diagram_data}};
          		let time_diagram_labels = {{time_diagram_labels}};
          	</script>
          	<script type="text/javascript" src="static/js/time_diagram.js"></script>
          	
		</div>

		<div class="card">
			<h1><span class="material-icons">pie_chart</span>  Usage By Key Today</h1>
			<div class="canvasdiv">
            	<canvas id="distribution_diagram"  width="100px" height="80px"></canvas>
          	</div>
          	<script type="text/javascript">
          		let distribution_diagram_data = {{distribution_diagram_data}};
          		let distribution_diagram_labels = {{distribution_diagram_labels}};
          	</script>
          	<script type="text/javascript" src="static/js/distribution_diagram.js"></script>
		</div>

	</div>

</body>

</html>