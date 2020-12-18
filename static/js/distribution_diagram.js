const distributionDiagramElem = document.
                                  getElementById('distribution_diagram');

// var x = ;
// var lbls = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l'];

const distributionDiagramDatasets = {
  labels: distribution_diagram_labels,
  datasets: [
    {
      backgroundColor: ['#12c2e9', '#00baf7', '#20afff', '#5ba1ff', '#8a90ff',
                        '#ae81f4', '#cc70e2', '#e55dcb', '#f450af', '#fb4991',
                        '#fc4975', '#f64f59'], // '#129ec2',
      borderColor: '#212329',
      data: distribution_diagram_data,
    },
  ],
}

const distributionDiagramOptions = {
  plugins: {
    labels: {
      render: 'label',
      fontSize: 14,
      fontStyle: 'bold',
      fontColor: '#000',
      fontFamily: '"Lucida Console", Monaco, monospace',
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
  cutoutPercentage: 50,
}


const distribution_diagram = new Chart(distributionDiagramElem, {
  type: 'pie',
  data: distributionDiagramDatasets,
  options: distributionDiagramOptions,
});
