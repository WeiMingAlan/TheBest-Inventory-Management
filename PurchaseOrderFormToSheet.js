function onFormSubmit(e) {
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

  const [name, tin, rob, msic, badesc, sst, ad1, ad2, ad3, city, pcode, country, state, email, phone, currency, ccode, proser, tariff, quantity, measurement, unitPrice, totalSale, discount, discountDesc] = responses;

  // Open the specific Google Sheet by ID
  const spreadsheetId = '1s5efNqX5cpuHCYAyz_O1ugKJw1Mtykptf7jvlifNVn4';
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
  newSheet.getRange('A4').setValue('Name').setFontWeight('bold');
  newSheet.getRange('B4').setValue('Tax Identification Number (TIN)').setFontWeight('bold');
  newSheet.getRange('C4').setValue('ROB Number').setFontWeight('bold');
  newSheet.getRange('D4').setValue('MSIC Code').setFontWeight('bold');
  newSheet.getRange('E4').setValue('Business Activity Description').setFontWeight('bold');
  newSheet.getRange('F4').setValue('SST Registration Number').setFontWeight('bold');
  newSheet.getRange('A7').setValue('Address').setFontWeight('bold');
  newSheet.getRange('B7').setValue('City').setFontWeight('bold');
  newSheet.getRange('C7').setValue('Postal Code').setFontWeight('bold');
  newSheet.getRange('D7').setValue('Country').setFontWeight('bold');
  newSheet.getRange('E7').setValue('State').setFontWeight('bold');
  newSheet.getRange('F7').setValue('Email').setFontWeight('bold');
  newSheet.getRange('G7').setValue('Phone Number').setFontWeight('bold');

  newSheet.getRange('I4').setValue('Currency').setFontWeight('bold');
  newSheet.getRange('J4').setValue('Classification Code').setFontWeight('bold');
  newSheet.getRange('K4').setValue('Product or Service').setFontWeight('bold');
  newSheet.getRange('L4').setValue('Product Tariff Code').setFontWeight('bold');
  newSheet.getRange('M4').setValue('Quantity').setFontWeight('bold');
  newSheet.getRange('N4').setValue('Measurement').setFontWeight('bold');
  newSheet.getRange('O4').setValue('Unit Price(RM)').setFontWeight('bold');
  newSheet.getRange('P4').setValue('Total Sale Amount(RM)').setFontWeight('bold');
  newSheet.getRange('Q4').setValue('Discount(%)').setFontWeight('bold');
  newSheet.getRange('R4').setValue('Discount Description').setFontWeight('bold');

  newSheet.getRange('A2').setValue(new Date());
  newSheet.getRange('A5').setValue(name);
  newSheet.getRange('B5').setValue(tin);
  newSheet.getRange('C5').setValue(rob);
  newSheet.getRange('D5').setValue(msic);
  newSheet.getRange('E5').setValue(badesc);
  newSheet.getRange('F5').setValue(sst);
  newSheet.getRange('A8').setValue(ad1);
  newSheet.getRange('A9').setValue(ad2);
  newSheet.getRange('A10').setValue(ad3);
  newSheet.getRange('B8').setValue(city);
  newSheet.getRange('C8').setValue(pcode);
  newSheet.getRange('D8').setValue(country);
  newSheet.getRange('E8').setValue(state);
  newSheet.getRange('F8').setValue(email);
  newSheet.getRange('G8').setValue(phone);

  newSheet.getRange('I5').setValue(currency);
  newSheet.getRange('J5').setValue(ccode);
  newSheet.getRange('K5').setValue(proser);
  newSheet.getRange('L5').setValue(tariff);
  newSheet.getRange('M5').setValue(quantity);
  newSheet.getRange('N5').setValue(measurement);
  newSheet.getRange('O5').setValue(unitPrice);
  newSheet.getRange('P5').setValue(totalSale);
  newSheet.getRange('Q5').setValue(discount);
  newSheet.getRange('R5').setValue(discountDesc);

  Logger.log("Response written to new sheet: " + sheetName);
}

function setupTrigger() {
  Logger.log("Setting up trigger");
  const formId = '1P3Vhztca8IuIwFqdixhSOrdkx0Gbb7p72APWXjgC5ao';
  const form = FormApp.openById(formId);

  const triggers = ScriptApp.getUserTriggers(form);
  triggers.forEach(trigger => {
    if (trigger.getHandlerFunction() === 'onFormSubmit') {
      ScriptApp.deleteTrigger(trigger);
    }
  });

  ScriptApp.newTrigger('onFormSubmit')
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
  onFormSubmit(mockEvent);
  Logger.log("Test onFormSubmit completed");
}

function removeAllSheets() {
  Logger.log("Removing all sheets");
  const spreadsheetId = '1s5efNqX5cpuHCYAyz_O1ugKJw1Mtykptf7jvlifNVn4';
  const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  const sheets = spreadsheet.getSheets();

  sheets.forEach(sheet => {
    if (sheet.getName() !== 'Sheet1') { // Change 'Sheet1' to the name of your default sheet
      spreadsheet.deleteSheet(sheet);
    }
  });

  Logger.log("All sheets removed except the default one.");
}
