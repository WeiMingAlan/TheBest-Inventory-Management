function modifyExistingShippingForm() {
  var formId = '1Ql5g61i1yS5rkOOgur4cMlegR00tX4CpDVExYhZC-00';
  var form = FormApp.openById(formId);

  form.setTitle('Shipping List').setDescription(null);

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

  if (!pageBreakExists('Supplier Information')) {
    form.addPageBreakItem().setTitle('Supplier Information').setHelpText(null);
  }

  if (!questionExists('Name')) {
    form.addTextItem().setTitle('Name').setRequired(true);
  }

  if (!questionExists('Tax Identification Number (TIN)')) {
    form.addTextItem()
      .setTitle('Tax Identification Number (TIN)')
      .setValidation(FormApp.createTextValidation().requireNumber().requireTextMatchesPattern('^\\d{12}$').build())
      .setRequired(true);
  }

  if (!questionExists('ROB Number')) {
    form.addTextItem()
      .setTitle('ROB Number')
      .setValidation(FormApp.createTextValidation().requireNumber().requireTextMatchesPattern('^\\d{12}$').build())
      .setRequired(true);
  }

  if (!questionExists('MSIC Code')) {
    form.addTextItem()
      .setTitle('MSIC Code')
      .setValidation(FormApp.createTextValidation().requireNumber().requireTextMatchesPattern('^\\d{5}$').build())
      .setRequired(true);
  }

  if (!questionExists('Business Activity Description')) {
    form.addTextItem().setTitle('Business Activity Description').setRequired(true);
  }

  if (!questionExists('SST Registration Number')) {
    form.addTextItem()
      .setTitle('SST Registration Number')
      .setValidation(FormApp.createTextValidation().requireNumber().requireTextMatchesPattern('^[A-Z0-9]{15}$').build())
      .setRequired(true);
  }

  if (!questionExists('Branch Address')) {
    form.addTextItem().setTitle('Branch Address').setRequired(true);
  }

  if (!questionExists('Phone Number')) {
    form.addTextItem()
      .setTitle('Phone Number')
      .setValidation(FormApp.createTextValidation().requireTextMatchesPattern('^\\+[0-9]{11,12}$').build())
      .setRequired(true);
  }

  if (!pageBreakExists('Buyer Information')) {
    form.addPageBreakItem().setTitle('Buyer Information').setHelpText(null);
  }

  if (!questionExists('ID Type')) {
    form.addListItem().setTitle('ID Type').setChoiceValues(['NRIC', 'Passport Number', 'BRN', 'Army']).setRequired(true);
  }

  if (!questionExists('ID Number')) {
    form.addTextItem().setTitle('ID Number').setRequired(true);
  }

  if (!questionExists('Tax Identification Number (TIN)')) {
    form.addTextItem()
      .setTitle('Tax Identification Number (TIN)')
      .setValidation(FormApp.createTextValidation().requireTextMatchesPattern('^\\d{12}$').build())
      .setRequired(true);
  }

  if (!questionExists('Name')) {
    form.addTextItem().setTitle('Name').setRequired(true);
  }

  if (!questionExists('SST Registration Number')) {
    form.addTextItem().setTitle('SST Registration Number').setRequired(false);
  }

  if (!questionExists('Email')) {
    form.addTextItem()
      .setTitle('Email')
      .setValidation(FormApp.createTextValidation().requireTextIsEmail().build())
      .setRequired(false);
  }

  if (!questionExists('Phone Number')) {
    form.addTextItem()
      .setTitle('Phone Number')
      .setValidation(FormApp.createTextValidation().requireTextMatchesPattern('^\\+60[0-9]{9,11}$').build())
      .setRequired(true);
  }

  if (!questionExists('Address Line 1')) {
    form.addTextItem().setTitle('Address Line 1').setRequired(true);
  }

  if (!questionExists('Address Line 2')) {
    form.addTextItem().setTitle('Address Line 2').setRequired(false);
  }

  if (!questionExists('Address Line 3')) {
    form.addTextItem().setTitle('Address Line 3').setRequired(false);
  }

  if (!questionExists('City')) {
    form.addTextItem().setTitle('City').setRequired(true);
  }

  if (!questionExists('Postal Code')) {
    form.addTextItem().setTitle('Postal Code').setRequired(false);
  }

  function fetchCountries() {
    var url = 'https://restcountries.com/v3.1/all';
    var response = UrlFetchApp.fetch(url);
    var data = JSON.parse(response.getContentText());

    // Extract common names of countries
    return data.map(function (country) {
      return country.name.common;
    });
  }

  if (!questionExists('Country')) {
    var countries = fetchCountries();
    var customCountries = ['Malaysia', 'Singapore', 'Thailand', 'Indonesia', 'Brunei'];
    var otherCountries = countries.filter(function (country) {
      return !customCountries.includes(country);
    }).sort();  // Sort the remaining countries alphabetically

    var sortedCountries = customCountries.concat(otherCountries);  // Combine the lists

    form.addListItem()
      .setTitle('Country')
      .setChoiceValues(sortedCountries)
      .setRequired(true);
  }

  if (!questionExists('State')) {
    form.addTextItem().setTitle('State').setRequired(true);
  }

  function fetchCurrenciesFromSheet() {
    var sheetId = '1nfCxIwvSKdwPyTDCKKzgP-IadxFUQ26tj76A068fsuI';
    var sheet = SpreadsheetApp.openById(sheetId).getSheetByName('Currency');
    var data = sheet.getRange('A:A').getValues();
    var currencies = data.flat().filter(function (currency) {
      return currency && currency !== 'Currency'; // Remove empty and header values
    });
    return currencies;
  }

  if (!pageBreakExists('Line Items')) {
    form.addPageBreakItem().setTitle('Line Items').setHelpText(null);
  }

  if (!questionExists('Currency')) {
    var currencies = fetchCurrenciesFromSheet();
    form.addListItem()
      .setTitle('Currency')
      .setChoiceValues(['RM'].concat(currencies.filter(currency => currency !== 'RM')))
      .setRequired(true)
      .setHelpText('Preset to RM');
  }

  if (!questionExists('Classification Code')) {
    form.addTextItem().setTitle('Classification Code').setRequired(true);
  }

  if (!questionExists('Product or Service')) {
    form.addTextItem().setTitle('Product or Service').setRequired(true);
  }

  if (!questionExists('Product Tariff Code')) {
    form.addTextItem().setTitle('Product Tariff Code').setRequired(false);
  }

  if (!questionExists('Quantity')) {
    form.addTextItem().setTitle('Quantity').setRequired(true);
  }

  if (!questionExists('Measurement')) {
    form.addTextItem().setTitle('Measurement').setRequired(true);
  }

  if (!questionExists('Unit Price(RM)')) {
    form.addTextItem().setTitle('Unit Price(RM)').setRequired(true);
  }

  if (!questionExists('Total Sale Amount(RM)')) {
    form.addTextItem().setTitle('Total Sale Amount(RM)').setRequired(true);
  }

  if (!questionExists('Discount(%)')) {
    form.addTextItem().setTitle('Discount(%)').setRequired(false);
  }

  if (!questionExists('Discount Description')) {
    form.addTextItem().setTitle('Discount Description').setRequired(false);
  }

  if (!questionExists('Charge Rate')) {
    form.addTextItem().setTitle('Charge Rate').setRequired(false);
  }

  if (!questionExists('Charge Description')) {
    form.addTextItem().setTitle('Charge Description').setRequired(false);
  }

  if (!questionExists('Amount Exempted from Tax(RM)')) {
    form.addTextItem().setTitle('Amount Exempted from Tax(RM)').setRequired(false);
  }

  if (!questionExists('Amount of Tax Exempted(RM)')) {
    form.addTextItem().setTitle('Amount of Tax Exempted(RM)').setRequired(false);
  }

  if (!questionExists('Tax Exemption Reason')) {
    form.addTextItem().setTitle('Tax Exemption Reason').setRequired(false);
  }

  Logger.log('Form URL: ' + form.getEditUrl());
}



