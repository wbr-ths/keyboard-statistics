const distribution_diagram_elem = document.getElementById('distribution_diagram');

var x = [1, 3, 2, 4];
var lbls = [1, 2, 3, 4];

const distribution_diagram_data = {
  labels: lbls,
  datasets: [
    {
      backgroundColor: '#E38A39', // '#129ec2',
      borderColor: '#E38A39', // #129ec2',
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