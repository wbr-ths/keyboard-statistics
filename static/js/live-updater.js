$(document).ready(function() {
  // connect to the socket server.
  const socket = io.connect('http://' + document.domain + ':' + location.port + '/live-updates');

  // receive data from server
  socket.on('new_data', function(msg) {
    // get data
    const data = JSON.parse(msg.data);

    // update time-diagram
    timeDiagram.data.datasets[0].data = data['time_data']
    timeDiagram.data.labels = data['time_labels']
    timeDiagram.update()

    console.log(data)

    //alert('updated')
    //timeDiagram.data.labels = []

    /*

    // update current profit label
    const tmp = data['profit_history'];
    currentProfit = Math.round((tmp[tmp.length-1] + Number.EPSILON) *
                   100) / 100
    elem = document.getElementById('current_profit_label')
    if (currentProfit >= 0) {
      elem.style.color = '#79B473'
      elem.text = '+' + currentProfit + '%';
    } else {
      elem.style.color = '#b44356'
      elem.text = currentProfit + '%';
    }

    // update current profit diagram
    profitDiagram.data.datasets[0].data = data['profits']
    profitDiagram.data.labels = data['profits_label']

    profitDiagram.update()

    // update profitday diagram
    profitdayDiagram.data.datasets[0].data = data['profit_history']
    profitdayDiagram.data.labels = data['profit_time']
    profitdayDiagram.update()
    */
  });
});