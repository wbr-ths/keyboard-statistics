from logger import start_logger
from app import start_app
import threading

if __name__ == '__main__':
	logger = threading.Thread(target=start_logger)
	app = threading.Thread(target=start_app)
	logger.start()
	app.start()