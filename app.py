from flask import Flask, render_template, request
from flask_socketio import SocketIO
import json
import threading

DISTRIBUTION_FILE = 'distribution.json'
TIME_FILE = 'time.json'
distribution, time = {}, {}

app = Flask(__name__)
socketio = SocketIO(app, async_mode=None, logger=True, engineio_logger=True)
app_loaded = False

def load_distribution(DISTRIBUTION_FILE, data=None):
    """Returns keys and values from distribution json file."""
    if data != None:
        distribution = data
    else:
        with open(DISTRIBUTION_FILE) as f:
            distribution = json.load(f)
    if len(distribution) == 0:
        return [], []
    values = [distribution[d] for d in distribution]
    keys = distribution
    values, keys = zip(*sorted(zip(values, keys), reverse=True))
    return list(keys), list(values)


def load_time(TIME_FILE, data=None):
    """Returns keys and values from time json file."""
    if data != None:
        time = data
    else:
        with open(TIME_FILE) as f:
            time = json.load(f)
    if len(time) == 0:
        return [], []
    values = [time[d] for d in time]
    keys = time
    return list(keys), list(values)


def send_data():
    """Sends data to client."""
    global app_loaded
    if app_loaded:
        time_labels = time['keys']
        time_data = time['values']
        distribution_labels = distribution['keys']
        distribution_data = distribution['values']

        print(time_labels)
        dat = {'time_labels': time_labels,
                'time_data': time_data,
                'distribution_labels': distribution_labels,
                'distribution_data': distribution_data}
        socketio.emit('new_data', {'data': str(json.dumps(dat))}, namespace='/live-updates')


@socketio.on('connect', namespace='/live-updates')
def test_connect():
    """Receive connection from client."""
    print('Client connected')
    # socketio.start_background_task(send_data)

@app.route('/new-data', methods=['GET']) # change to POST
def new_data():
    global distribution, time

    keys, values = load_distribution(None, data=json.loads(request.args['distribution']))
    distribution['keys'], distribution['values'] = keys, values

    keys, values = load_time(None, data=json.loads(request.args['time']))
    time['keys'], time['values'] = keys, values

    threading.Thread(target=send_data).start()

    return 'success'

@app.route('/')
def main():
    """Get request for root folder."""
    return render_template('index.php',
                            time_diagram_data=time['values'],
                            time_diagram_labels=time['keys'],
                            distribution_diagram_data=distribution['values'],
                            distribution_diagram_labels=distribution['keys'],)


def start_app():
    global app_loaded, distribution, time
    keys, values = load_distribution(DISTRIBUTION_FILE)
    distribution['keys'], distribution['values'] = keys, values

    keys, values = load_time(TIME_FILE)
    time['keys'], time['values'] = keys, values

    app_loaded = True
    app.run()

if __name__ == '__main__':
    start_app()