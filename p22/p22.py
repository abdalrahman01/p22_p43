from flask import Flask, request
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
@app.route('/')
def hello():
    return 'Hello, World!'


@app.route('/update_python_script', methods=['POST'])
def update_python_script():
    user_text = request.form.get('writing_box')
    os.system('/opt/infinigen/blender/blender -b -P /opt/infinigen/testScene.py')
    if user_text:
        return f'{user_text} Update Python Script!'
    else:
        return 'No user text provided.'

if __name__ == '__main__':
    app.run(port=4056)