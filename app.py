from flask import Flask
from controller import chatbot
from flask_cors import CORS
import dotenv
import os


dotenv.load_dotenv()
PORT = os.environ.get('PORT')


app = Flask(__name__)
CORS(app)

# Route for the root URL (/)
@app.route('/')

def index():
    """ Returns basic response """
    return "All Good"

app.route('/chat', methods=['POST'])(chatbot)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)
