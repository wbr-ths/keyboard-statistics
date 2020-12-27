$(document).ready(function() {
  // connect to the socket server.
  const socket = io.connect('http://' + document.domain + ':' + location.port + '/live-updates');

  // receive data from server
  socket.on('new_data', function(msg) {
    // get data
    const data = JSON.parse(msg.data);

    // update total distinct keys
    document.getElementById("total_distinct_keys").innerHTML = data['distribution_data'].length;

    // update time-diagram
    timeDiagram.data.datasets[0].data = data['time_data'];
    timeDiagram.data.labels = data['time_labels'];
    timeDiagram.update();

    // update distribution-diagram
    distributionDiagram.data.datasets[0].data = data['distribution_data'];
    distributionDiagram.data.labels = data['distribution_labels'];
    const len = distributionDiagram.data.datasets[0].data.length;
    const all = timeDiagram.data.datasets[0].data[timeDiagram.data.datasets[0].data.length-1];
    let other = 0;
    for (let i = 0; i < len; i++) {
      if (distributionDiagram.data.datasets[0].data[i]/all < 0.015){
        for (let j = i; j < distributionDiagram.data.datasets[0].data.length; j++) {
          other += distributionDiagram.data.datasets[0].data[j];
        }
        distributionDiagram.data.datasets[0].data.splice(i, len-i);
        distributionDiagram.data.labels.splice(i, len-i);
        distributionDiagram.data.datasets[0].data.push(other);
        distributionDiagram.data.labels.push('other');
        i = Infinity;
      }
    }
    let colors = interpolateColors("rgb(18, 194, 233)", "rgb(246, 79, 89)", distributionDiagram.data.labels.length);
    distributionDiagram.data.datasets[0].backgroundColor = colors;
    distributionDiagram.update();

    // update total keys today
    document.getElementById("total_today").innerHTML = all;
  
  });
});