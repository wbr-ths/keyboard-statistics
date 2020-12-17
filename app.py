from flask import Flask, render_template
import json

app = Flask(__name__)

DISTRIBUTION_FILE = 'distribution.json'
TIME_FILE = 'time.json'
distribution, time = {}, {}

def load_distribution():
	"""returns keys and values from distribution json file"""
	with open(DISTRIBUTION_FILE) as f:
		distribution = json.load(f)
		values, keys = [distribution[d] for d in distribution], [d for d in distribution]
	values, keys = zip(*sorted(zip(values, keys), reverse=True))
	return list(keys), list(values)

def load_time():
	"""returns keys and values from time json file"""
	with open(TIME_FILE) as f:
		time = json.load(f)
		values, keys = [time[d] for d in time], [d for d in time]
	return list(keys), list(values)
	

@app.route('/')
def main():
	return render_template('index.php',
							time_diagram_data=time['values'],
							time_diagram_labels=time['keys'],
							distribution_diagram_data=distribution['values'],
							distribution_diagram_labels=distribution['keys'],
							)

if __name__ == '__main__':
	
	keys, values = load_distribution()
	distribution['keys'], distribution['values'] = keys, values

	keys, values = load_time()
	time['keys'], time['values'] = keys, values

	app.run()
