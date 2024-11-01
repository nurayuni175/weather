// Import required modules from Electron
const { app, BrowserWindow } = require('electron'); // For creating a window in the Electron app
const fs = require('fs'); // File system module to handle file operations
const path = require('path'); // Module for handling and transforming file paths

// Get references to HTML elements
var btnCreate = document.getElementById('btnCreate'); // Button to create a new file
var btnUpdate = document.getElementById('btnUpdate'); // Button to update an existing file
var btnRead = document.getElementById('btnRead'); // Button to read an existing file
var btnDelete = document.getElementById('btnDelete'); // Button to delete a file
var fileName = document.getElementById('fileName'); // Input field for the file name
var fileActivity = document.getElementById('fileActivity'); // Textarea for file contents

// Define the directory where files will be stored
let pathName = path.join(__dirname, 'Files'); // Path to the 'Files' directory in the current directory

// Event listener for the Create button
btnCreate.addEventListener('click', function() {  
  // Construct the full file path
  let file = path.join(pathName, fileName.value); 
  let contents = fileActivity.value; // Get the contents from the textarea
  
  // Write the contents to the file
  fs.writeFile(file, contents, function(err) { 
    if (err) { 
      return console.log(err); // Log any error that occurs
    } 
    // Alert the user that the file has been created
    var txtfile = document.getElementById("fileName").value; 
    alert(txtfile + " text file was created");     
    console.log("The file was created"); 
  }); 
});

// Event listener for the Update button
btnUpdate.addEventListener('click', function() {  
  // Construct the full file path
  let file = path.join(pathName, fileName.value);
  let contents = fileActivity.value; // Get the contents from the textarea
  
  // Write the new contents to the file, overwriting if it exists
  fs.writeFile(file, contents, function(err) {  
    if (err) {
      return console.log(err); // Log any error that occurs
    }
    // Alert the user that the file has been updated
    alert(fileName.value + " text file was updated");
    console.log("The file was updated!"); // Log the successful update
  });
});

// Event listener for the Read button
btnRead.addEventListener('click', function() {  
  // Construct the full file path
  let file = path.join(pathName, fileName.value); 
  
  // Read the contents of the file
  fs.readFile(file, function(err, data) {  
    if (err) { 
      return console.log(err); // Log any error that occurs
    } 
    // Set the contents of the textarea to the data read from the file
    fileActivity.value = data; 
    console.log("The file was read!"); // Log the successful read
  }); 
});

// Event listener for the Delete button
btnDelete.addEventListener('click', function() {   
  // Construct the full file path
  let file = path.join(pathName, fileName.value); 
  
  // Delete the specified file
  fs.unlink(file, function(err) {  
    if (err) { 
      return console.log(err); // Log any error that occurs
    } 
    // Clear the input and textarea fields
    fileName.value = ""; 
    fileActivity.value = ""; 
    console.log("The file was deleted!"); // Log the successful deletion
  });
});
