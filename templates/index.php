<html>

<head>
	<title>Keyboard Statistics</title>

	<link rel="preconnect" href="https://fonts.gstatic.com">
	<link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="static/css/style.css">

	<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/chart.js@2.9.4/dist/Chart.min.js"></script>
	

</head>

<body>

	<div class="banner">
		<h1>Keyboard Statistics</h1>
	</div>
	
	<div class="flex-container">

		<div class="card" id="distribution">
			<h1>Chart</h1>
			<div class="canvasdiv">
            	<canvas id="distribution_diagram"  width="100px" height="80px"></canvas>
          	</div>
          	<script type="text/javascript" src="static/js/diagram.js"></script>
          	
		</div>

		<div class="card" id="test">
			<h1>Test</h1>
		</div>

	</div>

</body>

</html>