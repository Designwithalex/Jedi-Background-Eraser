// Set the source folder containing the images
var sourceFolder = Folder.selectDialog("Select the source folder");

// Set the output folder for processed images
var outputFolder = Folder.selectDialog("Select the output folder");

// Get all the files in the source folder
var files = sourceFolder.getFiles();

// Set the name of the action you want to execute
var actionName = "YourActionName"; // Replace with the name of your action

// Loop through each file
for (var i = 0; i < files.length; i++) {
  var file = files[i];

  // Open the file
  var doc = open(file);

  // Execute the action
  app.doAction(actionName, "Default Actions");

  // Save the processed image in the output folder
  var saveOptions = new PNGSaveOptions();
  saveOptions.transparency = true;
  doc.saveAs(new File(outputFolder + "/" + doc.name), saveOptions);

  // Close the file without saving changes
  doc.close(SaveOptions.DONOTSAVECHANGES);
}

alert("Action execution completed on all files and saved in the output folder!");
