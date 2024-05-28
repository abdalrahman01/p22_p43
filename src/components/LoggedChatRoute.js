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

      
      
      const writingData = document.getElementById('writing_box').value; // Get data from text box
      
      try {
        const response = await fetch(`${BLENDER_EXEC_URL}?text=${writingData}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        document.getElementById('writing_box').value = ''; 
      } catch (error) {
        console.error('Failed to execute Blender command:', error);
        alert('Failed to execute Blender command');
      }
    };
    
  
    const handleDownloadModel = () => {
      const link = document.createElement('a');
      link.href = '/models/cup_dish.glb'; // Change the path to your model file
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
  


 
