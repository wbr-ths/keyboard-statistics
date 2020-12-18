from pynput.keyboard import Key, Listener
from datetime import date
import json
import requests
import threading

DISTRIBUTION_FILE = 'distribution.json'
TIME_FILE = 'time.json'
REQUEST_URL = 'http://127.0.0.1:5000/new-data'
SAVE_COUNTER = 10

current_date = ''
time = {}
data = {}
counter = 1

def prefix():
	return '[Listener]'

def get_merged_json(data, time):
	# return REQUEST_URL + '?distribution=' + str(data).replace(' ', '').replace('\'', '%22') + '&time=' + str(time).replace(' ', '').replace('\'', '%22')
	temp = {'distribution': data, 'time': time}
	return json.dumps(temp)

def send_request(data, time):
	try:
		requests.post(REQUEST_URL, data = get_merged_json(data, time))
	except:
		print("Server not running")

def check_date(current_date):
	global data
	temp_date = str(date.today().strftime('%d.%m.%Y'))
	if current_date == '':
		return str(list(time)[-1])
	if temp_date != current_date:
		time[temp_date] = 0
		data = {}
		save_data()
		return temp_date
	return current_date

def save_time():
	global time
	try:
		with open(TIME_FILE, 'w') as f:
			json.dump(time, f)
	except Exception as e:
		print(prefix(), 'could not load file', TIME_FILE)
		print(prefix(), 'no time saved')
		print(e)
		exit(-1)


def load_time():
	global time
	try:
		with open(TIME_FILE, 'r') as f:
			time = json.load(f)
	except Exception as e:
		print(prefix(), 'could not load file', TIME_FILE)
		print(prefix(), 'no time loaded')
		print(prefix(), 'exception:', e)

def save_data():
	global data
	try:
		with open(DISTRIBUTION_FILE, 'w') as f:
			json.dump(data, f)
	except Exception as e:
		print(prefix(), 'could not load file', DISTRIBUTION_FILE)
		print(prefix(), 'no data saved')
		print(e)
		exit(-1)

def load_data():
	global data
	try:
		with open(DISTRIBUTION_FILE, 'r') as f:
			data = json.load(f)
	except Exception as e:
		print(prefix(), 'could not load file', DISTRIBUTION_FILE)
		print(prefix(), 'no data loaded')
		print(prefix(), 'exception:', e)

def count_keystrokes():
	global data
	c = 0
	for key in data:
		c += data[key]
	return c

def on_press(key):
	global data, counter, SAVE_COUNTER, current_date
	key = str(key)
	before = key

	current_date = check_date(current_date)

	# Exit key
	'''if before == '\'p\'':
		print('exited key logger')
		exit(0) '''

	if key.startswith('Key.'):
		key = key.split('.')[1]
	elif key.startswith('<'):
		key = '!' + key.replace('<', '').replace('>', '') # ! means, the key is not plain text
		if key == '!65':
			print('Exit due to Ctrl+Shift+A')
			exit(0)
		# key = 'ctrl_l+alt+' + str(chr(int(key)))
	elif key.startswith('\'\\x'):
		key = '!' + key.replace('\'\\x', '').replace('\'', '') # ! means, the key is not plain text
		# key = 'ctrl_l+' + str(chr(int(key)+64))
	else:
		key = key.replace('\'', '')

	print(before, ' -> ', key)
	
	if key in data:
		data[key] += 1
	else:
		print('new key found:', key)
		data[key] = 1
	
	thread = threading.Thread(target = send_request, args = [data, time,])
	thread.start()

	counter += 1
	if counter >= SAVE_COUNTER:
		counter = 1
		time[current_date] = count_keystrokes()
		save_data()
		save_time()
		print(prefix(), 'data saved:', count_keystrokes(), 'keystrokes')

if __name__ == '__main__':
	load_time()
	load_data()
	print(prefix(), 'data loaded:', data)
	print(prefix(), 'listening for keys')
	with Listener(on_press=on_press) as listener:
		listener.join()
