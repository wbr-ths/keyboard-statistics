const distribution_diagram_elem = document.getElementById('distribution_diagram');

// var x = ;
// var lbls = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"];

const distribution_diagram_datasets = {
  labels: distribution_diagram_labels,
  datasets: [
    {
      backgroundColor: ["#12c2e9", "#00baf7", "#20afff", "#5ba1ff", "#8a90ff", "#ae81f4", "#cc70e2", "#e55dcb", "#f450af", "#fb4991", "#fc4975", "#f64f59"], // '#129ec2',
      borderColor: '#212329',
      //borderColor: '#1EFF94', // #129ec2',
      data: distribution_diagram_data,
    },
  ],
}

const distribution_diagram_options = {
  plugins: {
    labels: {
      render: 'label',
      fontSize: 14,
      fontStyle: 'bold',
      fontColor: '#000',
      fontFamily: '"Lucida Console", Monaco, monospace'
    },
  },
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
    
  },
  cutoutPercentage: 50,
}


const distribution_diagram = new Chart(distribution_diagram_elem, {
  type: 'pie',
  data: distribution_diagram_datasets,
  options: distribution_diagram_options,
});