function shippingListPrefilledForm() {
  // Define the base URL of the form
  var baseUrl = 'https://docs.google.com/forms/d/1Ql5g61i1yS5rkOOgur4cMlegR00tX4CpDVExYhZC-00/viewform?usp=pp_url';
  
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
  prefilledUrl += '&entry.761817346=' + encodeURIComponent(name);
  prefilledUrl += '&entry.131797697=' + encodeURIComponent(tin);
  prefilledUrl += '&entry.1913939882=' + encodeURIComponent(rob);
  prefilledUrl += '&entry.1480522936=' + encodeURIComponent(msic);
  prefilledUrl += '&entry.1750631362=' + encodeURIComponent(badesc);
  prefilledUrl += '&entry.1471201190=' + encodeURIComponent(sst);
  prefilledUrl += '&entry.1675857727=' + encodeURIComponent(branchAd);
  prefilledUrl += '&entry.1784861253=' + encodeURIComponent(phone);
  prefilledUrl += '&entry.1863542548=NRIC';
  prefilledUrl += '&entry.2004026755=Malaysia';
  prefilledUrl += '&entry.168708493=RM+(Ringgit+Malaysia)';

  Logger.log(prefilledUrl);
  return prefilledUrl;
}


