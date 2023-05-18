function runBulkBackgroundRemoval() {
  // Establecer la carpeta de origen que contiene las imágenes
  alert("Necesito que selecciones la carpeta con las imagenes,a las cuales, le querés sacar el fondo");
  var sourceFolder = Folder.selectDialog("Selecciona la carpeta de entrada");

  if (sourceFolder == null) {
    var result = confirm("¿Deseas cancelar el proceso de apertura en lote?");
    if (result) {
      alert("Proceso cancelado. Saliendo del script.");
      // Salir de la función si se cancela
      return;
    } else {
      sourceFolder = Folder.selectDialog("Selecciona la carpeta de entrada");
      if (sourceFolder == null) {
        alert("No se ha seleccionado una carpeta de entrada. Saliendo del script.");
        // Salir de la función si no se selecciona una carpeta de entrada
        return;
      }
    }
  }

  // Establecer la carpeta de salida para las imágenes procesadas
  alert("Genial, en este ultimo paso, seleccioná la carpeta en la cual se van a guardar todas las imagenes sin el fondo");
  var outputFolder = Folder.selectDialog("Selecciona la carpeta de salida");

  if (outputFolder == null) {
    var result = confirm("¿Deseas cancelar el proceso y salir?");
    if (result) {
      alert("Proceso cancelado. Saliendo del script.");
      // Salir de la función si se cancela
      return;
    } else {
      outputFolder = Folder.selectDialog("Selecciona la carpeta de salida");
      if (outputFolder == null) {
        alert("No se ha seleccionado una carpeta de salida. Saliendo del script.");
        // Salir de la función si no se selecciona una carpeta de salida
        return;
      }
    }
  }

  // Obtener todos los archivos en la carpeta de origen
  var files = sourceFolder.getFiles();

  // Establecer el nombre de la acción que deseas ejecutar
  var actionName = "Background Eraser"; // Reemplaza con el nombre de tu acción

  // Recorrer cada archivo
  for (var i = 0; i < files.length; i++) {
    var file = files[i];

    // Abrir el archivo
    var doc = open(file);

    // Ejecutar la acción
    app.doAction(actionName, "Jedi Folder");

    // Guardar la imagen procesada en la carpeta de salida
    var saveOptions = new PNGSaveOptions();
    saveOptions.transparency = true;
    doc.saveAs(new File(outputFolder + "/" + doc.name), saveOptions);

    // Cerrar el archivo sin guardar cambios
    doc.close(SaveOptions.DONOTSAVECHANGES);
  }

  alert("¡Ejecución de la acción completada en todos los archivos y guardada en la carpeta de salida!");
}

runBulkBackgroundRemoval(); // Ejecutar el script
