function createGoogleForm() {
  var form = FormApp.create('New Form');
  form.setTitle('Sample Form')
    .setDescription('This is a sample form created by Google Apps Script.');

  form.addTextItem().setTitle('What is your name?');
  form.addMultipleChoiceItem()
    .setTitle('Do you like Google Apps Script?')
    .setChoiceValues(['Yes', 'No']);

  Logger.log('Form URL: ' + form.getEditUrl());
}

function deleteAllSectionsAndQuestions() {
  var formId = '1Ql5g61i1yS5rkOOgur4cMlegR00tX4CpDVExYhZC-00'; 
  var form = FormApp.openById(formId);
  
  // Get all items from the form
  var items = form.getItems();
  
  // Loop through each item and delete it
  for (var i = items.length - 1; i >= 0; i--) {
    var item = items[i];
    form.deleteItem(item);
  }
  
  Logger.log('All sections and questions have been deleted from the form.');
}







