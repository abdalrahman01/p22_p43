from flask import Flask, request
import os
from flask_cors import CORS
import requests
import subprocess

LLM_HOST = ""
LLM_PORT = "5000"
LLM_CHAT = "/chat"
LLM_NEW_CHAT = "/start_new_chat"
LLM_RESPONSE_FILE_LOCATION = "/opt/infinigen/testScene.py"
POST = 1
GET = 2
app = Flask(__name__)
CORS(app)
@app.route('/')
def hello():
    return 'Hello, World!'


@app.route('/update_python_script',  methods=['POST'])
def update_python_script():
    data = request.get_json()
    if not data or 'text' not in data:
        return jsonify({"error": "Missing 'text' field in request"}), 400
    text = data['text']
    res = send_requst_to_server(text, LLM_HOST, LLM_PORT)
    write_to_file(LLM_RESPONSE_FILE_LOCATION, res.text)
    invoke_command()
    return "success"
    

def send_request_to_server(content, host, port, method=POST)
    payload = {"text", content}
    res = requests.post(f"{host}:{port}{LLM_CHAT}", payload)
    return res
    
def write_to_file(filepath, content):
    with open(filepath, "w") as g:
        g.write(content)

def invoke_command():
    subprocess.run(["/opt/infinigen/blender/blender", "-b", "-P", "/opt/infinigen/testScene.py"]) 
        


if __name__ == '__main__':
    app.run(port=4056)
