const express = require('express');
const { exec } = require('child_process');

const app = express();

// Define an endpoint to execute the Blender command
app.post('/execute-blender', (req, res) => {
  // Execute the Blender command
  exec('blender/blender -b -P testScene.py', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing Blender command: ${error}`);
      res.status(500).send('Failed to execute Blender command');
      return;
    }
    console.log(`Blender command output: ${stdout}`);
    res.send('Blender command executed successfully');
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
