const distribution_diagram_elem = document.getElementById('distribution_diagram');

var x = [1, 3, 2, 4];
var lbls = ["14.12", "15.12", "16.12", "17.12"];

const distribution_diagram_data = {
  labels: lbls,
  datasets: [
    {
      backgroundColor: '#1EFF94', // '#129ec2',
      borderColor: '#1EFF94', // #129ec2',
      data: x,
    },
  ],
}

const distribution_diagram_options = {
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


const distribution_diagram = new Chart(distribution_diagram_elem, {
  type: 'line',
  data: distribution_diagram_data,
  options: distribution_diagram_options,
});