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

  form.setTitle('Purchase Order')
    .setDescription(null);

  function questionExists(title) {
    var items = form.getItems();
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (item.getTitle() === title) {
        return true;
      }
    }
    return false;
  }

  function pageBreakExists(title) {
    var items = form.getItems(FormApp.ItemType.PAGE_BREAK);
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (item.getTitle() === title) {
        return true;
      }
    }
    return false;
  }

  if (!questionExists('Name')) {
    form.addTextItem()
      .setTitle('Name')
      .setRequired(true);
  }

  if (!questionExists('Tax Identification Number (TIN)')) {
    form.addTextItem()
      .setTitle('Tax Identification Number (TIN)')
      .setValidation(FormApp.createTextValidation()
        .requireNumber()
        .requireTextMatchesPattern('^\\d{12}$')
        .build())
      .setRequired(true);
  }

  if (!questionExists('ROB Number')) {
    form.addTextItem()
      .setTitle('ROB Number')
      .setValidation(FormApp.createTextValidation()
        .requireNumber()
        .requireTextMatchesPattern('^\\d{12}$')
        .build())
      .setRequired(true);
  }

  if (!questionExists('MSIC Code')) {
    form.addTextItem()
      .setTitle('MSIC Code')
      .setValidation(FormApp.createTextValidation()
        .requireNumber()
        .requireTextMatchesPattern('^\\d{5}$')
        .build())
      .setRequired(true);
  }

  if (!questionExists('Business Activity Description')) {
    form.addTextItem()
      .setTitle('Business Activity Description')
      .setRequired(true);
  }

  if (!questionExists('SST Registration Number')) {
    form.addTextItem()
      .setTitle('SST Registration Number')
      .setValidation(FormApp.createTextValidation()
        .requireNumber()
        .requireTextMatchesPattern('^[A-Z0-9]{15}$')
        .build())
      .setRequired(true);
  }

  if (!questionExists('SST Registration Number')) {
    form.addTextItem()
      .setTitle('SST Registration Number')
      .setValidation(FormApp.createTextValidation()
        .requireNumber()
        .requireTextMatchesPattern('^[A-Z0-9]{15}$')
        .build())
      .setRequired(true);
  }

  if (!questionExists('Branch Address')) {
    form.addTextItem()
      .setTitle('Branch Address')
      .setRequired(true);
  }

  if (!questionExists('Phone Number')) {
    form.addTextItem()
      .setTitle('Phone Number')
      .setValidation(FormApp.createTextValidation()
        .requireTextMatchesPattern('^\\+[0-9]{11,12}$')
        .build())
      .setRequired(true);
  }

  if (!pageBreakExists('Buyer Information')) {
    form.addPageBreakItem()
      .setTitle('Buyer Information')
      .setHelpText(null);
  }

  Logger.log('Form URL: ' + form.getEditUrl());
}














