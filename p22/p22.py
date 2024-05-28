from flask import Flask, request
import os
from flask_cors import CORS
import requests
import subprocess

LLM_HOST = "192.168.0.101" # change with actuall IP for LLM_HOSt # 192.168.0.101
LLM_PORT = "5000"
LLM_CHAT = "/chat"
LLM_NEW_CHAT = "/start_new_chat"
LLM_RESPONSE_FILE_LOCATION = "/opt/infinigen/testScene.py" # if running locally use th is "/home/atieh/school/p43/infinigen/testScene.py"
BLENDER_BIN_PATH = "/opt/infinigen/blender/blender" # if running locallay use this "/home/atieh/school/p43/infinigen/blender/blender"  


def invoke_command():
    print("running Command: ", [BLENDER_BIN_PATH, "-b", "-P", LLM_RESPONSE_FILE_LOCATION])
    subprocess.run([BLENDER_BIN_PATH, "-b", "-P", LLM_RESPONSE_FILE_LOCATION]) 
        
def send_request_to_server(content, host, port):
    payload = {"text", content}
    headers = {'Content-Type': 'application/json'}
    res = requests.get(f"http://{host}:{port}{LLM_CHAT}?text={content}")
    print("****************\n*Sending Request*\n****************")
    print(res.url)
    print(res.headers)
    print(res.json)
    print("****************\n*Request Sent*\n****************")
    
    return res
    
def write_to_file(filepath, content):
    print("****************\n*Writing to File*\n****************")
    with open(filepath, "w") as g:
        g.write(content)
    print("****************\n*Written to File*\n****************")




app = Flask(__name__)
cors = CORS(app, resources={r"/update_python_script": {"origins": "*"}})
@app.route('/')
def hello():
    return 'Hello, World!'


@app.route('/update_python_script', methods=["GET"])
def update_python_script():
    text = request.args.get('text', '')
    res = send_request_to_server(text, LLM_HOST, LLM_PORT)
    write_to_file(LLM_RESPONSE_FILE_LOCATION, res.text)
    invoke_command()
    return "200 ok"
    



if __name__ == '__main__':
    app.run(port=4056, host="*")
