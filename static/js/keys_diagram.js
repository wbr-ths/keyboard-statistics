const distribution_diagram_elem = document.getElementById('distribution_diagram');

var x = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
var lbls = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"];

const distribution_diagram_data = {
  labels: lbls,
  datasets: [
    {
      backgroundColor: ["#12c2e9", "#00baf7", "#20afff", "#5ba1ff", "#8a90ff", "#ae81f4", "#cc70e2", "#e55dcb", "#f450af", "#fb4991", "#fc4975", "#f64f59"], // '#129ec2',
      borderColor: '#212329',
      //borderColor: '#1EFF94', // #129ec2',
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
    xAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'Usage per key in %',
      },
    }],
  },
  cutoutPercentage: 50,
}


const distribution_diagram = new Chart(distribution_diagram_elem, {
  type: 'pie',
  data: distribution_diagram_data,
  options: distribution_diagram_options,
});