function generateAndOpenPrefilledForm() {
  // Define the base URL of the form
  var baseUrl = 'https://docs.google.com/forms/d/1BzPH36u-C-S3nkwPIJIAIPKQDgAXM4EY9qzN5SlgnYc/viewform?usp=pp_url';
  
  // Get the data from the sheet
  var sheet = SpreadsheetApp.openById('1s5efNqX5cpuHCYAyz_O1ugKJw1Mtykptf7jvlifNVn4').getSheetByName('My Profile');
  var name = sheet.getRange('A4').getValue();
  var tin = sheet.getRange('A7').getValue();
  var rob = sheet.getRange('B7').getValue();
  var msic = sheet.getRange('C7').getValue();
  var badesc = sheet.getRange('D7').getValue();
  var sst = sheet.getRange('E7').getValue();
  var branchAd = sheet.getRange('A10').getValue();
  var phone = sheet.getRange('B10').getValue();

  // Construct the pre-filled URL
  var prefilledUrl = baseUrl;
  prefilledUrl += '&entry.1844840223=' + encodeURIComponent(name);
  prefilledUrl += '&entry.2001418182=' + encodeURIComponent(tin);
  prefilledUrl += '&entry.294912569=' + encodeURIComponent(rob);
  prefilledUrl += '&entry.854933794=' + encodeURIComponent(msic);
  prefilledUrl += '&entry.1193746348=' + encodeURIComponent(badesc);
  prefilledUrl += '&entry.10761846=' + encodeURIComponent(sst);
  prefilledUrl += '&entry.588384756=' + encodeURIComponent(branchAd);
  prefilledUrl += '&entry.1481104569=' + encodeURIComponent(phone);

  Logger.log(prefilledUrl);


  // Use a template to pass the prefilled URL to the HTML file
  // var template = HtmlService.createTemplateFromFile('ShippingHTML');
  // template.prefilledUrl = prefilledUrl;
  // return template.evaluate();
}
