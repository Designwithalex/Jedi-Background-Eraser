function runBulkBackgroundRemoval() {
  // Set the source folder containing the images
  alert("Choose an input directory");
  var sourceFolder = Folder.selectDialog("Select the input folder");

  if (sourceFolder == null) {
    var result = confirm("Do you want to cancel the bulk opening process?");
    if (result) {
      alert("Process canceled. Exiting the script.");
      // Exit the function if canceled
      return;
    } else {
      sourceFolder = Folder.selectDialog("Select the input folder");
      if (sourceFolder == null) {
        alert("No input folder selected. Exiting the script.");
        // Exit the function if no input folder selected
        return;
      }
    }
  }

  // Set the output folder for processed images
  alert("Choose an output directory");
  var outputFolder = Folder.selectDialog("Select the output folder");

  if (outputFolder == null) {
    var result = confirm("Do you want to cancel the process and exit?");
    if (result) {
      alert("Process canceled. Exiting the script.");
      // Exit the function if canceled
      return;
    } else {
      outputFolder = Folder.selectDialog("Select the output folder");
      if (outputFolder == null) {
        alert("No output folder selected. Exiting the script.");
        // Exit the function if no output folder selected
        return;
      }
    }
  }

  // Get all the files in the source folder
  var files = sourceFolder.getFiles();

  // Set the name of the action you want to execute
  var actionName = "Background Eraser"; // Replace with the name of your action

  // Loop through each file
  for (var i = 0; i < files.length; i++) {
    var file = files[i];

    // Open the file
    var doc = open(file);

    // Execute the action
    app.doAction(actionName, "Jedi Folder");

    // Save the processed image in the output folder
    var saveOptions = new PNGSaveOptions();
    saveOptions.transparency = true;
    doc.saveAs(new File(outputFolder + "/" + doc.name), saveOptions);

    // Close the file without saving changes
    doc.close(SaveOptions.DONOTSAVECHANGES);
  }

  alert("Action execution completed on all files and saved in the output folder!");
}

runBulkBackgroundRemoval(); // Execute the script
