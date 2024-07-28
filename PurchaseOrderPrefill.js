function purchaseOrderPrefilledForm() {
  // Define the base URL of the form
  var baseUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSegNYk_OIj_0q_qtGxyNtl_m3tYewI0ucuZJo8JEp6iOErQ8g/viewform?usp=pp_url';
  
  // Get the data from the sheet
  // var sheet = SpreadsheetApp.openById('1s5efNqX5cpuHCYAyz_O1ugKJw1Mtykptf7jvlifNVn4').getSheetByName('Response_1722025527618');
  // var name = sheet.getRange('A5').getValue();
  // var tin = sheet.getRange('B5').getValue();
  // var rob = sheet.getRange('C5').getValue();
  // var msic = sheet.getRange('D5').getValue();
  // var badesc = sheet.getRange('E5').getValue();
  // var sst = sheet.getRange('F5').getValue();
  // var ad1 = sheet.getRange('A8').getValue();
  // var ad2 = sheet.getRange('A9').getValue();
  // var ad3 = sheet.getRange('A10').getValue();
  // var city = sheet.getRange('B8').getValue();
  // var pcode = sheet.getRange('C8').getValue();
  // var country = sheet.getRange('D8').getValue();
  // var state = sheet.getRange('E8').getValue();
  // var email = sheet.getRange('F8').getValue();
  // var phone = sheet.getRange('G8').getValue();
  // var currency = sheet.getRange('I5').getValue();

  // Construct the pre-filled URL
  var prefilledUrl = baseUrl;
  // prefilledUrl += '&entry.1894908532=' + encodeURIComponent(name);
  // prefilledUrl += '&entry.1269106132=' + encodeURIComponent(tin);
  // prefilledUrl += '&entry.1469503501=' + encodeURIComponent(rob);
  // prefilledUrl += '&entry.1825449203=' + encodeURIComponent(msic);
  // prefilledUrl += '&entry.1641305319=' + encodeURIComponent(badesc);
  // prefilledUrl += '&entry.156838176=' + encodeURIComponent(sst);
  // prefilledUrl += '&entry.837862742=' + encodeURIComponent(ad1);
  // prefilledUrl += '&entry.1520991864=' + encodeURIComponent(ad2);
  // prefilledUrl += '&entry.873258630=' + encodeURIComponent(ad3);
  // prefilledUrl += '&entry.801643116=' + encodeURIComponent(city);
  // prefilledUrl += '&entry.1204793812=' + encodeURIComponent(pcode);
  prefilledUrl += '&entry.1424973380=Malaysia';
  // prefilledUrl += '&entry.323062835=' + encodeURIComponent(state);
  // prefilledUrl += '&entry.606619746=' + encodeURIComponent(email);
  // prefilledUrl += '&entry.302116465=' + encodeURIComponent(phone);
  prefilledUrl += '&entry.671335058=RM';

  Logger.log(prefilledUrl);
  return prefilledUrl;

}

