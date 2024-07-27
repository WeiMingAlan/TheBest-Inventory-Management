function onMyProfileFormSubmit(e) {
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

  const [name, tin, rob, msic, badesc, sst, branchAd, phone] = responses;

  // Open the specific Google Sheet by ID
  const spreadsheetId = '1s5efNqX5cpuHCYAyz_O1ugKJw1Mtykptf7jvlifNVn4';
  const spreadsheet = SpreadsheetApp.openById(spreadsheetId);

  Logger.log("Spreadsheet opened: " + spreadsheetId);

  // Access the existing sheet named "My Profile"
  const sheetName = 'My Profile';
  const sheet = spreadsheet.getSheetByName(sheetName);

  if (!sheet) {
    Logger.log(`Sheet named "${sheetName}" not found`);
    return;
  }

  Logger.log(`Sheet opened: ${sheetName}`);

  sheet.getRange('A4').setValue(name);
  sheet.getRange('A7').setValue(tin);
  sheet.getRange('B7').setValue(rob);
  sheet.getRange('C7').setValue(msic);
  sheet.getRange('D7').setValue(badesc);
  sheet.getRange('E7').setValue(sst);
  sheet.getRange('A10').setValue(branchAd);
  sheet.getRange('B10').setValue(phone);

  Logger.log(`Response written to sheet: ${sheetName}`);
}

function setupMyProfileTrigger() {
  Logger.log("Setting up trigger");
  const formId = '1BzPH36u-C-S3nkwPIJIAIPKQDgAXM4EY9qzN5SlgnYc';
  const form = FormApp.openById(formId);

  const triggers = ScriptApp.getUserTriggers(form);
  triggers.forEach(trigger => {
    if (trigger.getHandlerFunction() === 'onMyProfileFormSubmit') {
      ScriptApp.deleteTrigger(trigger);
    }
  });

  ScriptApp.newTrigger('onMyProfileFormSubmit')
    .forForm(form)
    .onFormSubmit()
    .create();

  Logger.log("Trigger created successfully");
}
