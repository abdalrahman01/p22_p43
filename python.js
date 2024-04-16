const {exec} = require ('child_process');

const pythonCommand = 'python3 python3.py';
exec(pythonCommand, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error executing Python script: ${error.message}`);
        return;
    }

    // Process the output (stdout) or handle success
    console.log(`Python script output:\n${stdout}`);
});