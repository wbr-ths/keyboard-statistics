from pynput.keyboard import Key, Listener
import json

FILE = 'data.json'
SAVE_COUNTER = 1

keys = set()
data = dict()
counter = 0

def prefix():
	return '[Listener]'

def save_data():
	global data
	try:
		with open(FILE, 'w') as f:
			json.dump({'data': data, 'keys': list(keys)}, f)
	except Exception as e:
		print(prefix(), 'could not load file', FILE)
		print(prefix(), 'no data saved')
		print(e)
		exit(-1)

def load_data():
	global data, keys
	try:
		with open(FILE, 'r') as f:
			tmp = json.load(f)
			data = tmp[0]
			keys = tmp[1]
	except Exception as e:
		print(prefix(), 'could not load file', FILE)
		print(prefix(), 'no data loaded')
		print(prefix(), 'exception:', e)

def count_keystrokes():
	global keys, data
	tmp = 0
	for key in keys:
		tmp += data[key]
	return tmp

def on_press(key):
	global keys, data, counter, SAVE_COUNTER
	key = str(key)
	print('key: ', key)
	if key.startswith('Key.'):
		key = key.split('.')[1]
	elif key.startswith('<'):
		key = key.replace('<', '').replace('>', '')
	else:
		key = key.replace('\'','')
	if key not in keys:
		print(prefix(), 'found new key:', key)
		keys.add(key)
		data[key] = 1
	else:
		data[key] += 1
	counter += 1 
	if counter >= SAVE_COUNTER:
		counter = 0
		save_data()
		print(prefix(), 'data saved:', count_keystrokes(), 'keystrokes')

if __name__ == '__main__':
	load_data()
	print(prefix(), 'data loaded:', data)
	print(prefix(), 'listening for keys')
	with Listener(on_press=on_press) as listener:
		listener.join()
