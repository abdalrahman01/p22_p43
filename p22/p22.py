from flask import Flask, request
import os
from flask_cors import CORS
import requests
import subprocess

LLM_HOST = "localhost" # change with actuall IP for LLM_HOSt
LLM_PORT = "5000"
LLM_CHAT = "/chat"
LLM_NEW_CHAT = "/start_new_chat"
LLM_RESPONSE_FILE_LOCATION = "/opt/infinigen/testScene.py"

def invoke_command():
    subprocess.run(["/opt/infinigen/blender/blender", "-b", "-P", "/opt/infinigen/testScene.py"]) 
        
def send_request_to_server(content, host, port):
    payload = {"text", content}
    headers = {'Content-Type': 'application/json'}
    res = requests.get(f"http://{host}:{port}{LLM_CHAT}?text={content}")
    print(res.url)
    print(res.headers)
    print(res.json)
    
    return res
    
def write_to_file(filepath, content):
    with open(filepath, "w") as g:
        g.write(content)




app = Flask(__name__)
CORS(app)
@app.route('/')
def hello():
    return 'Hello, World!'


@app.route('/update_python_script')
def update_python_script():
    text = request.args.get('text', '')
    res = send_request_to_server(text, LLM_HOST, LLM_PORT)
    write_to_file(LLM_RESPONSE_FILE_LOCATION, res.text)
    invoke_command()
    return "success"
    



if __name__ == '__main__':
    app.run(port=4056)
