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

function modifyExistingForm() {
  var formId = '1Ql5g61i1yS5rkOOgur4cMlegR00tX4CpDVExYhZC-00';
  var form = FormApp.openById(formId);
  
  form.setTitle('Updated Form Title')
      .setDescription('This is an updated description.');

  form.addCheckboxItem()
      .setTitle('Select your favorite fruits')
      .setChoiceValues(['Apple', 'Banana', 'Cherry']);
  
  Logger.log('Form URL: ' + form.getEditUrl());
}
