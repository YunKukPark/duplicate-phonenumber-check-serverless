// rawData 업로드
// 데이터 형식 Array => rawDataArr 에 전화번호만 열거되어 담겨있음
rawData = JSON.parse(JSON.stringify(rawData));
rawData = rawData[0].주소록;
var rawDataArr = new Array();
var myDataArr = new Array();

rawData.forEach(function (data, idx) {
  rawDataArr.push(data.phoneNumber);
});

console.log(rawDataArr);

const excelFileInput = document.querySelector('#excelFile');

/* Function Component Archive */
function excelExport(event) {
  var input = event.target;
  var reader = new FileReader();
  reader.onload = function () {
    var fileData = reader.result;
    var wb = XLSX.read(fileData, { type: 'binary' });
    wb.SheetNames.forEach((sheetName) => {
      //myDataArr 는 배열 형태의 아웃풋
      myDataArr = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
    });
  };
  reader.readAsBinaryString(input.files[0]);
}

function importFileHandler(event) {
  excelExport(event);
  setTimeout(() => {
    console.log(myDataArr);
    var intersectionData = rawDataArr.filter((phoneNumber) =>
      myDataArr.map((data) => data.휴대폰번호).includes(phoneNumber)
    );

    console.log(intersectionData);

    let filtered = myDataArr.filter((data) => intersectionData.includes(data.휴대폰번호));
    console.log(JSON.stringify(filtered));
    //refinedArr = myDataArr.map((data) => data.휴대폰번호);
    //console.log(refinedArr);
  }, 1000);
}

/* addEventListener Part */

excelFileInput.addEventListener('change', importFileHandler);
