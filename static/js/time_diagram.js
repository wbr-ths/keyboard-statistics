const time_diagram_elem = document.getElementById('time_diagram');

var x = [1, 3, 2, 4];
var lbls = ["14.12", "15.12", "16.12", "17.12"];

const time_diagram_data = {
  labels: lbls,
  datasets: [
    {
      backgroundColor: 'rgba(18, 194, 233, 0.2)',//'#212329',
      borderColor: '#12c2e9', // #129ec2',
      data: x,
    },
  ],
}

const time_diagram_options = {
  legend: {
    display: false,
    labels: {
      // This more specific font property overrides the global property
      fontColor: 'white',
      defaultFontColor: 'white',
      scaleFontColor: '#FFFFFF',
    },
  },
  tooltips: {
    enabled: true,
  },
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true,
      },
      scaleLabel: {
        display: true,
        labelString: 'y-Axis label',
      },
    }],
    xAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'x-Axis label',
      },
    }],
  },
}


const time_diagram = new Chart(time_diagram_elem, {
  type: 'line',
  data: time_diagram_data,
  options: time_diagram_options,
});