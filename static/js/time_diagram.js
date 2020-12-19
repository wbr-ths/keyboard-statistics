const timeDiagramElem = document.getElementById('time_diagram');

// var x = [1, 3, 2, 4];
// var lbls = ["14.12", "15.12", "16.12", "17.12"];

const timeDiagramDatasets = {
  labels: time_diagram_labels,
  datasets: [
    {
      backgroundColor: 'rgba(18, 194, 233, 0.2)', // '#212329',
      borderColor: '#12c2e9', // #129ec2',
      data: time_diagram_data,
    },
  ],
}

const timeDiagramOptions = {
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
      },
    }],
    xAxes: [{
      scaleLabel: {
        display: true,
      },
    }],
  },
}


const timeDiagram = new Chart(timeDiagramElem, {
  type: 'line',
  data: timeDiagramDatasets,
  options: timeDiagramOptions,
});
