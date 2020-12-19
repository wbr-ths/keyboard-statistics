import json

DISTRIBUTION_FILE = 'distribution.json'
TIME_FILE = 'time.json'

with open(DISTRIBUTION_FILE, 'w') as f:
	json.dump({}, f)

with open(TIME_FILE, 'w') as f:
	json.dump({}, f)
