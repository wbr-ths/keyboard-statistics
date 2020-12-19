const distributionDiagramElem = document.
                                  getElementById('distribution_diagram');


// distribution_diagram_data, distribution_diagram_labels
const len = distribution_diagram_data.length
const all = timeDiagram.data.datasets[0].data[timeDiagram.data.datasets[0].data.length-1];
let other = 0;
for (let i = 0; i < len; i++) {
  if (distribution_diagram_data[i]/all < 0.015){
    for (let j = i; j < distribution_diagram_data.length; j++) {
      other += distribution_diagram_data[j];
    }
    distribution_diagram_data.splice(i, len-i);
    distribution_diagram_labels.splice(i, len-i);
    distribution_diagram_data.push(other);
    distribution_diagram_labels.push('other');
    i = Infinity;
  }
}
//console.log(all);

const distributionDiagramDatasets = {
  labels: distribution_diagram_labels,
  datasets: [
    {
      //backgroundColor: ['#12c2e9', '#00baf7', '#20afff', '#5ba1ff', '#8a90ff',
      //                  '#ae81f4', '#cc70e2', '#e55dcb', '#f450af', '#fb4991',
      //                  '#fc4975', '#f64f59'], // '#129ec2',
      backgroundColor: interpolateColors("rgb(18, 194, 233)", "rgb(246, 79, 89)", distribution_diagram_labels.length),
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


const distributionDiagram = new Chart(distributionDiagramElem, {
  type: 'pie',
  data: distributionDiagramDatasets,
  options: distributionDiagramOptions,
});
