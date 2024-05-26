from flask import Flask, request
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
@app.route('/')
def hello():
    return 'Hello, World!'


@app.route('/update_python_script')
def update_python_script():
    os.system('/opt/infinigen/blender/blender -b -P /opt/infinigen/testScene.py')
    return "update_python_script"
if __name__ == '__main__':
    app.run(port=4056)
