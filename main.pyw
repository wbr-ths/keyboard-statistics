from pynput.keyboard import Key, Listener
import pickle

FILE = 'data.pickle'
SAVE_COUNTER = 100

keys = set()
data = dict()
counter = 0

def save_data():
	global data
	try:
		with open(FILE, 'wb') as f:
			pickle.dump([data, keys], f)
	except:
		print('could not load file', FILE)
		print('no data saved')
		exit(-1)

def load_data():
	global data, keys
	try:
		with open(FILE, 'rb') as f:
			tmp = pickle.load(f)
			data = tmp[0]
			keys = tmp[1]
	except Exception as e:
		print('could not load file', FILE)
		print('no data loaded')
		print('exception:', e)

def count_keystrokes():
	global keys, data
	tmp = 0
	for key in keys:
		tmp += data[key]
	return tmp

def on_press(key):
	global keys, data, counter, SAVE_COUNTER
	print('key:', key)
	if key not in keys:
		print('found new key:', key)
		keys.add(key)
		data[key] = 1
	else:
		data[key] += 1
	counter += 1
	if counter >= SAVE_COUNTER:
		counter = 0
		save_data()
		print('data saved:', count_keystrokes(), 'keystrokes')

if __name__ == '__main__':
	load_data()
	print('data loaded:', data)
	print('listening for keys')
	with Listener(on_press=on_press) as listener:
		listener.join()