function onShippingListFormSubmit(e) {
  Logger.log("onFormSubmit function started");

  // Check if the event object is present
  if (!e) {
    Logger.log("No event object received");
    return;
  }
  Logger.log("Event object received: " + JSON.stringify(e));

  // Log the available event object properties
  if (e.response) {
    Logger.log("e.response: " + JSON.stringify(e.response));
    const items = e.response.getItemResponses();
    items.forEach((item, index) => {
      Logger.log(`Item ${index + 1}: ${item.getItem().getTitle()} - ${item.getResponse()}`);
    });
  } else {
    Logger.log("e.response is not present");
    return;
  }

  // Extract and process the responses
  const items = e.response.getItemResponses();
  const responses = items.map(item => item.getResponse());
  
  if (responses.length === 0) {
    Logger.log("No responses received");
    return;
  }

  const [name, tin, rob, msic, badesc, sst, ad, phone, idType, idNum, bEmail, bAd1, bAd2, bAd3, bCity, bPcode, bCountry, bState, currency, ccode, proser, tariff, quantity, measurement, unitPrice, totalSale, discount, discountDesc] = responses;

  // Open the specific Google Sheet by ID
  const spreadsheetId = '1NjIyOD73DLpO2ON7g4_YxwPFUviemb62KXyk_KlFKrQ';
  const spreadsheet = SpreadsheetApp.openById(spreadsheetId);

  Logger.log("Spreadsheet opened: " + spreadsheetId);

  // Create a new sheet with a unique name based on the timestamp
  const sheetName = 'Response_' + new Date().getTime();
  const newSheet = spreadsheet.insertSheet(sheetName);

  Logger.log("New sheet created: " + sheetName);

  if (!newSheet) {
    Logger.log("Failed to create new sheet");
    return;
  }

  // Define where to put each piece of data
  newSheet.getRange('A1').setValue('Timestamp');
  newSheet.getRange('A4').setValue('Supplier Information').setFontWeight('bold');
  newSheet.getRange('A5').setValue('Name').setFontWeight('bold');
  newSheet.getRange('B5').setValue('Tax Identification Number (TIN)').setFontWeight('bold');
  newSheet.getRange('C5').setValue('ROB Number').setFontWeight('bold');
  newSheet.getRange('D5').setValue('MSIC Code').setFontWeight('bold');
  newSheet.getRange('E5').setValue('Business Activity Description').setFontWeight('bold');
  newSheet.getRange('F5').setValue('SST Registration Number').setFontWeight('bold');
  newSheet.getRange('A8').setValue('Branch Address').setFontWeight('bold');
  newSheet.getRange('G8').setValue('Phone Number').setFontWeight('bold');

  newSheet.getRange('A13').setValue('Buyer Information').setFontWeight('bold');
  newSheet.getRange('A14').setValue('ID Type').setFontWeight('bold');
  newSheet.getRange('B14').setValue('ID Number').setFontWeight('bold');
  newSheet.getRange('C14').setValue('Email').setFontWeight('bold');
  newSheet.getRange('D14').setValue('Address').setFontWeight('bold');
  newSheet.getRange('E14').setValue('City').setFontWeight('bold');
  newSheet.getRange('F14').setValue('Postal Code').setFontWeight('bold');
  newSheet.getRange('G14').setValue('Country').setFontWeight('bold');
  newSheet.getRange('H14').setValue('State').setFontWeight('bold');

  newSheet.getRange('J5').setValue('Currency').setFontWeight('bold');
  newSheet.getRange('K5').setValue('Classification Code').setFontWeight('bold');
  newSheet.getRange('L5').setValue('Product or Service').setFontWeight('bold');
  newSheet.getRange('M5').setValue('Product Tariff Code').setFontWeight('bold');
  newSheet.getRange('N5').setValue('Quantity').setFontWeight('bold');
  newSheet.getRange('O5').setValue('Measurement').setFontWeight('bold');
  newSheet.getRange('P5').setValue('Unit Price(RM)').setFontWeight('bold');
  newSheet.getRange('Q5').setValue('Total Sale Amount(RM)').setFontWeight('bold');
  newSheet.getRange('R5').setValue('Discount(%)').setFontWeight('bold');
  newSheet.getRange('S5').setValue('Discount Description').setFontWeight('bold');

  newSheet.getRange('A2').setValue(new Date().getTime());
  newSheet.getRange('A6').setValue(name);
  newSheet.getRange('B6').setValue(tin);
  newSheet.getRange('C6').setValue(rob);
  newSheet.getRange('D6').setValue(msic);
  newSheet.getRange('E6').setValue(badesc);
  newSheet.getRange('F6').setValue(sst);
  newSheet.getRange('A9').setValue(ad);
  newSheet.getRange('B9').setValue(city);
  newSheet.getRange('C9').setValue(pcode);
  newSheet.getRange('D9').setValue(country);
  newSheet.getRange('E9').setValue(state);
  newSheet.getRange('F9').setValue(email);
  newSheet.getRange('G9').setValue(phone);

  newSheet.getRange('A15').setValue(idType);
  newSheet.getRange('B15').setValue(idNum);
  newSheet.getRange('C15').setValue(bEmail);
  newSheet.getRange('D15').setValue(bAd1);
  newSheet.getRange('D16').setValue(bAd2);
  newSheet.getRange('D117').setValue(bAd3);
  newSheet.getRange('E15').setValue(bCity);
  newSheet.getRange('F15').setValue(bPcode);
  newSheet.getRange('G15').setValue(bCountry);
  newSheet.getRange('H15').setValue(bState);

  newSheet.getRange('J6').setValue(currency);
  newSheet.getRange('K6').setValue(ccode);
  newSheet.getRange('L6').setValue(proser);
  newSheet.getRange('M6').setValue(tariff);
  newSheet.getRange('N6').setValue(quantity);
  newSheet.getRange('O6').setValue(measurement);
  newSheet.getRange('P6').setValue(unitPrice);
  newSheet.getRange('Q6').setValue(totalSale);
  newSheet.getRange('R6').setValue(discount);
  newSheet.getRange('S6').setValue(discountDesc);

  Logger.log("Response written to new sheet: " + sheetName);
}

function setupShippingListTrigger() {
  Logger.log("Setting up trigger");
  const formId = '1Ql5g61i1yS5rkOOgur4cMlegR00tX4CpDVExYhZC-00';
  const form = FormApp.openById(formId);

  const triggers = ScriptApp.getUserTriggers(form);
  triggers.forEach(trigger => {
    if (trigger.getHandlerFunction() === 'onShippingListFormSubmit') {
      ScriptApp.deleteTrigger(trigger);
    }
  });

  ScriptApp.newTrigger('onShippingListFormSubmit')
    .forForm(form)
    .onFormSubmit()
    .create();

  Logger.log("Trigger created successfully");
}

function testOnFormSubmit() {
  Logger.log("Test onFormSubmit started");
  const mockEvent = {
    values: ['2024-07-26 12:34:56', 'John Doe', 'john.doe@example.com', 'This is a test message'],
    namedValues: {
      'Timestamp': ['2024-07-26 12:34:56'],
      'Name': ['John Doe'],
      'Email': ['john.doe@example.com'],
      'Message': ['This is a test message']
    }
  };
  onShippingListFormSubmit(mockEvent);
  Logger.log("Test onFormSubmit completed");
}

function removeAllSheets() {
  Logger.log("Removing all sheets");
  const spreadsheetId = '1s5efNqX5cpuHCYAyz_O1ugKJw1Mtykptf7jvlifNVn4';
  const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  const sheets = spreadsheet.getSheets();

  sheets.forEach(sheet => {
    if (sheet.getName() !== 'My Profile') { // Change 'Sheet1' to the name of your default sheet
      spreadsheet.deleteSheet(sheet);
    }
  });

  Logger.log("All sheets removed except the default one.");
}
