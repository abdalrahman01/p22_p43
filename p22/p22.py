from flask import Flask
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
@app.route('/')
def hello():
    return 'Hello, World!'


@app.route('/update_python_script')
def update_python_script():
    for i in range(10):
        os.system(f'echo "Hello {i}"')
    os.system('/opt/infinigen/blender/blender -b -P /opt/infinigen/testScene.py')
    return 'Update Python Script!'

if __name__ == '__main__':
    app.run(port=4056)