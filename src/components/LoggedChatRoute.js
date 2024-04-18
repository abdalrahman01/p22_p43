import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import FloatingLabel from 'react-bootstrap/FormLabel'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ModelView from './ModelViewer.js'
import axios from 'axios';

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
      try {
        const response = await fetch(BLENDER_EXEC_URL); 
        console.log('response:', response);   
      } catch (error) {
        console.error('Failed to execute Blender command:', error);
        alert('Failed to execute Blender command');
      }
    };
  
    return (
      <div className="chat">
        <h2>Search for 3D model</h2>
        <div id="ModelViewer">
          <ModelView />
        </div>
        <div>
          <Form id="comment_form" onSubmit={handleSubmit} method="POST">
            <FloatingLabel label="Write a message">
              <Form.Control
                as="textarea"
                id="writing_box"
                placeholder="Write our text here"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </FloatingLabel>
            <Button variant="primary" id="btn_send_writing_box" type="submit">
              Send
            </Button>
          </Form>
          
          <button onClick={handleBlenderExecution}>Execute Blender Command</button>
        </div>
      </div>
    );
  };
  
  export default LoggedChatRoute;
  