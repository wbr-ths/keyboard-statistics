from pynput.keyboard import Key, Listener

def on_press(key):
	global keys
	print('key:', key)

if __name__ == '__main__':

	print('listening for keys')
	with Listener(on_press=on_press) as listener:
		listener.join()