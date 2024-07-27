// function onFormSubmit(e) {
//   Logger.log("onFormSubmit function started");

//   // Check if the event object is present
//   if (!e) {
//     Logger.log("No event object received");
//     return;
//   }
//   Logger.log("Event object received: " + JSON.stringify(e));

//   // Log the available event object properties
//   if (e.response) {
//     Logger.log("e.response: " + JSON.stringify(e.response));
//     const items = e.response.getItemResponses();
//     items.forEach((item, index) => {
//       Logger.log(`Item ${index + 1}: ${item.getItem().getTitle()} - ${item.getResponse()}`);
//     });
//   } else {
//     Logger.log("e.response is not present");
//   }

//   // If the responses are available, extract and process them
//   if (e.response) {
//     const responses = e.response.getItemResponses().map(item => item.getResponse());
//     if (responses.length === 0) {
//       Logger.log("No responses received");
//       return;
//     }

//     // Example: Assuming responses contain ['Timestamp', 'Name', 'Email', 'Message']
//     const timestamp = responses[0];
//     const name = responses[1];
//     const email = responses[2];
//     const message = responses[3];

//     // Log the individual responses
//     Logger.log('Timestamp: ' + timestamp);
//     Logger.log('Name: ' + name);
//     Logger.log('Email: ' + email);
//     Logger.log('Message: ' + message);

//     // Open the specific Google Sheet by ID
//     const spreadsheetId = '1sx36fMzwTftkgT41nJz8xoIlGGRhyhmxIqcg6CUbU_0';
//     const spreadsheet = SpreadsheetApp.openById(spreadsheetId);

//     // Log the spreadsheet open attempt
//     Logger.log("Spreadsheet opened: " + spreadsheetId);

//     // Create a new sheet with a unique name based on the timestamp
//     const sheetName = 'Response_' + new Date().getTime();
//     const newSheet = spreadsheet.insertSheet(sheetName);

//     // Log the new sheet creation attempt
//     Logger.log("New sheet created: " + sheetName);

//     if (!newSheet) {
//       Logger.log("Failed to create new sheet");
//       return;
//     }

//     // Define where to put each piece of data
//     newSheet.getRange('A5').setValue('Timestamp');
//     newSheet.getRange('B5').setValue('Name');
//     newSheet.getRange('C5').setValue('Email');
//     newSheet.getRange('D5').setValue('Message');

//     newSheet.getRange('A2').setValue(timestamp);
//     newSheet.getRange('B2').setValue(name);
//     newSheet.getRange('C2').setValue(email);
//     newSheet.getRange('D2').setValue(message);

//     Logger.log("Response written to new sheet: " + sheetName);
//   } else {
//     Logger.log("No response data to process");
//   }
// }


// function setupTrigger() {
//   Logger.log("Setting up trigger");
//   const formId = '11it1DzNHlF4rAwt4t3NAPtherN1xiFzvXYllxXbrI3Q'; // Replace with your Form ID
//   const form = FormApp.openById(formId);

//   ScriptApp.newTrigger('onFormSubmit')
//            .forForm(form)
//            .onFormSubmit()
//            .create();

//   Logger.log("Trigger created successfully");
// }

// function testOnFormSubmit() {
//   Logger.log("Test onFormSubmit started");
//   const mockEvent = {
//     values: ['2024-07-26 12:34:56', 'John Doe', 'john.doe@example.com', 'This is a test message'],
//     namedValues: {
//       'Timestamp': ['2024-07-26 12:34:56'],
//       'Name': ['John Doe'],
//       'Email': ['john.doe@example.com'],
//       'Message': ['This is a test message']
//     }
//   };
//   onFormSubmit(mockEvent);
//   Logger.log("Test onFormSubmit completed");
// }

// function removeAllSheets() {
//   Logger.log("Removing all sheets");
//   const spreadsheetId = '1sx36fMzwTftkgT41nJz8xoIlGGRhyhmxIqcg6CUbU_0';
//   const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
//   const sheets = spreadsheet.getSheets();

//   sheets.forEach(sheet => {
//     if (sheet.getName() !== 'Sheet1') { // Change 'Sheet1' to the name of your default sheet
//       spreadsheet.deleteSheet(sheet);
//     }
//   });

//   Logger.log("All sheets removed except the default one.");
// }
