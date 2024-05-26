import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import FloatingLabel from 'react-bootstrap/FormLabel'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ModelView from './ModelViewer.js'


const P22_PORT = 4056;
const P22_HOST = "localhost";
const UPDATE_PYTHON_SCRIPT_URL = "/update_python_script";
const BLENDER_EXEC_URL = `http://${P22_HOST}:${P22_PORT}${UPDATE_PYTHON_SCRIPT_URL}`;
const LLM_HOST = "192.168.0.101";
const LLM_PORT = 5000;
const LLM_URL = `http://${LLM_HOST}:${LLM_PORT}/chat`;
const LLM_URL_start_new = `http://${LLM_HOST}:${LLM_PORT}/start_new_chat`;
const LLM_RESPONSE_FILE_LOCATION = "/opt/infinigen/testScene.py"
const fs = require('fs');

function writePythonToFile(filepath, content) {
    fs.writeFile(filepath, content, 'utf8', (err) => {
        if (err) {
            console.error(`Error writing to file ${filepath}:`, err);
        } else {
            console.log(`File ${filepath} has been saved.`);
        }
    });
}
const LoggedChatRoute = (props) => {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState('');
  const [content, setContent] = useState('');
  const [failed, setFailed] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = () => {
    // Prevent empty search submission
    if (searchTerm.trim() === '') {
      alert('Please enter a search term.');
      return;
    }
    
    // Navigate to the chat route with the search term
    history.push(`/chat?search=${encodeURIComponent(searchTerm)}`);
  };

  const handleSubmit = (e) => {
        e.preventDefault()
        let status = "fail"
        if (status === "") {
            setContent('')
            setFailed('')
        } else {
            setFailed(status)
        }
    }

    const handleBlenderExecution = async () => {

      
      
      try {
        const writingData = document.getElementById('writing_box').value; // Get data from text box
        const response = await fetch(LLM_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json' // Assuming data is JSON
          },
          body: JSON.stringify({ text: writingData }) // Sending data from text box
        });
        
        console.log('response:', response);
        writePythonToFile(LLM_RESPONSE_FILE_LOCATION, response);
        
        // Clear the text box
        document.getElementById('writing_box').value = ''; 
      } catch (error) {
        console.error('Failed to execute Blender command:', error);
        alert('Failed to execute Blender command');
      }
      
      try {
        const response = await fetch(BLENDER_EXEC_URL);
        
        console.log('response:', response);
        
        // Clear the text box
        document.getElementById('writing_box').value = ''; 
      } catch (error) {
        console.error('Failed to execute Blender command:', error);
        alert('Failed to execute Blender command');
      }
    };
    
  
    const handleDownloadModel = () => {
      const link = document.createElement('a');
      link.href = '/models/scene.gltf'; // Change the path to your model file
      link.download = 'model.gltf';
      link.click();
    };

    
       
  
  
    return (
      <div className="chat">
        <h2>Your 3D model</h2>
        {/* Ensure LoggedChatRoute is rendered only once */}
        <div id="model_viewer"><ModelView /></div>
        <div>
            <Form
                id="comment_form"
                onSubmit={handleSubmit}
                method="POST">
  
                <FloatingLabel
                    label="Write a message">
                    <Form.Control
                        as="textarea"
                        id="writing_box"
                        placeholder="Write our text here"
                        value={content}
                        onChange={(e) => setContent(
                            e.target.value)}
                    />
  
                </FloatingLabel>
            <Button 
            variant="primary" 
            id="btn_send_writing_box" 
            type="submit" 
            onClick={handleBlenderExecution}>
              Send
            </Button>
            <button 
            type="button"
            onClick={handleDownloadModel}
            variant="primary"
            id="btn_download_model">
              Download
            </button>
          </Form>
        </div>
      </div>
    );
  };
  
  export default LoggedChatRoute;
  


 
