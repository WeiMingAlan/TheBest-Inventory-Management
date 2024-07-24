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

  if (!pageBreakExists('Supplier Information')) {
    form.addPageBreakItem()
      .setTitle('Supplier Information')
      .setHelpText(null);
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

  if (!questionExists('ID Type')) {
    form.addListItem()
      .setTitle('ID Type')
      .setChoiceValues(['NRIC', 'Passport Number', 'BRN', 'Army'])
      .setRequired(true);
  }

  if (!questionExists('ID Number')) {
    form.addTextItem()
      .setTitle('ID Number')
      .setRequired(true);
  }

  if (!questionExists('Tax Identification Number (TIN)')) {
    form.addTextItem()
      .setTitle('Tax Identification Number (TIN)')
      .setValidation(FormApp.createTextValidation()
        .requireTextMatchesPattern('^\\d{12}$')
        .build())
      .setRequired(true);
  }

  if (!questionExists('Name')) {
    form.addTextItem()
      .setTitle('Name')
      .setRequired(true);
  }

  if (!questionExists('SST Registration Number')) {
    form.addTextItem()
      .setTitle('SST Registration Number')
      .setRequired(false);
  }

  if (!questionExists('Email')) {
    form.addTextItem()
      .setTitle('Email')
      .setValidation(FormApp.createTextValidation()
        .requireTextIsEmail()
        .build())
      .setRequired(false);
  }

  if (!questionExists('Phone Number')) {
    form.addTextItem()
      .setTitle('Phone Number')
      .setValidation(FormApp.createTextValidation()
        .requireTextMatchesPattern('^\\+60[0-9]{9,11}$')
        .build())
      .setRequired(true);
  }

  if (!questionExists('Address Line 1')) {
    form.addTextItem()
      .setTitle('Address Line 1')
      .setRequired(true);
  }

  if (!questionExists('Address Line 2')) {
    form.addTextItem()
      .setTitle('Address Line 2')
      .setRequired(false);
  }

  if (!questionExists('Address Line 3')) {
    form.addTextItem()
      .setTitle('Address Line 3')
      .setRequired(false);
  }

  if (!questionExists('City')) {
    form.addTextItem()
      .setTitle('City')
      .setRequired(true);
  }

  if (!questionExists('Postal Code')) {
    form.addTextItem()
      .setTitle('Postal Code')
      .setRequired(false);
  }

  function fetchCountries() {
    var url = 'https://restcountries.com/v3.1/all';
    var response = UrlFetchApp.fetch(url);
    var data = JSON.parse(response.getContentText());
    var countries = data.map(function (country) {
      return country.name.common;
    });

    // exportCountriesToSheet(countries);

    return countries;
  }

  // function exportCountriesToSheet(countries) {
  //   var sheetId = 'your-sheet-id';  // Replace with your Google Sheet ID
  //   var sheet = SpreadsheetApp.openById(sheetId).getActiveSheet();

  //   // Clear existing data
  //   sheet.clear();

  //   // Write country names to sheet
  //   countries.forEach(function (country, index) {
  //     sheet.getRange(index + 1, 1).setValue(country);
  //   });
  // }

  function fetchStates(countryCode) {
    var url = 'https://app.ecwid.com/api/v3/storeId/states?countryCode=' + countryCode;
    var options = {
      'method': 'GET',
      'headers': {
        'accept': 'application/json',
        'Authorization': 'Bearer e***s0'
      },
      'muteHttpExceptions': true  // Enable to get full response on failure
    };

    try {
      var response = UrlFetchApp.fetch(url, options);
      var data = JSON.parse(response.getContentText());

      // Check if the response contains the expected data
      if (data && Array.isArray(data)) {
        var states = data.map(function (state) {
          return state.name;
        });
        return states;
      } else {
        Logger.log('Unexpected response format: ' + JSON.stringify(data));
        return [];
      }
    } catch (e) {
      Logger.log('Error fetching states: ' + e.message);
      return [];
    }
  }

  function fetchCountriesAndCodes() {
    var sheetId = '1nfCxIwvSKdwPyTDCKKzgP-IadxFUQ26tj76A068fsuI';
    var sheet = SpreadsheetApp.openById(sheetId).getActiveSheet();
    var data = sheet.getDataRange().getValues();
    
    var countryCodeMap = {};
    for (var i = 0; i < data.length; i++) {
      var countryName = data[i][0];
      var countryCode = data[i][1];
      if (countryName && countryCode) {
        countryCodeMap[countryName] = countryCode;
      }
    }
    return countryCodeMap;
  }

  // Get predefined country codes
  var countryCodeMap = fetchCountriesAndCodes();
  Logger.log(countryCodeMap)

  if (!questionExists('Country')) {
    var countryDropdown = form.addListItem()
      .setTitle('Country')
      .setRequired(true);

    var sortedCountries = Object.keys(countryCodeMap).sort();

    var preferredCountries = ['Malaysia', 'Singapore', 'Thailand', 'Indonesia', 'Brunei'];
    var dropdownChoices = preferredCountries.concat(sortedCountries.filter(function(country) {
      return preferredCountries.indexOf(country) === -1;
    }));

    countryDropdown.setChoiceValues(dropdownChoices);
  }

  if (!questionExists('State')) {
    form.addListItem()
      .setTitle('State')
      .setRequired(true)
      .setChoiceValues([]); // Initially empty, will be filled dynamically
  }

  Logger.log('Form URL: ' + form.getEditUrl());

}
