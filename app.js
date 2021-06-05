var phoneObj = new Array();

function excelExport(event) {
  var input = event.target;
  var reader = new FileReader();
  var test = 0;
  reader.onload = function () {
    var fileData = reader.result;
    var wb = XLSX.read(fileData, { type: 'binary' });
    wb.SheetNames.forEach(function (sheetName) {
      var rowObj = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
      console.log(JSON.stringify(rowObj));
      test = JSON.stringify(rowObj);
    });
  };
  console.log(test);
  reader.readAsBinaryString(input.files[0]);
}
