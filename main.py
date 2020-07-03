from pynput.keyboard import Key, Listener
import logging
from os import listdir, path, mkdir

data_path = "data"
keys = []

def load_files():
	global data_path, keys
	if not path.exists(data_path):
		mkdir(data_path)
	files = listdir(data_path)
	for file in files:
		keys.append(str(file.replace('.csv', '')))


def on_press(key):
	global keys
	print('key:', key)
	if str(key) not in keys:
		print(key, 'not in', keys)
		global data_path
		open(data_path + '/' + str(key).replace("'", "") + '.csv',"w+")
		print('file created', str(key).replace("'", "") + '.csv')s
		exit()

if __name__ == '__main__':

	load_files()
	print('files loaded:', keys)

	print('listening for keys')
	with Listener(on_press=on_press) as listener:
		listener.join()
	

'''
log_destination = ""
log_name = "log.txt"

logging.basicConfig(filename=(log_destination + log_name), level=logging.DEBUG, format='%(asctime)s >> %(message)s')

def on_press(key):
	print(key)
	x = logging.info(key)
with Listener(on_press=on_press) as listener:
	listener.join()
print(234)'''