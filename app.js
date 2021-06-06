// rawData 업로드
// 데이터 형식 Array => rawDataArr 에 전화번호만 열거되어 담겨있음
rawData = JSON.parse(JSON.stringify(rawData));
rawData = rawData[0].주소록;
var rawDataArr = new Array();
var myDataArr = new Array();
let filteredData = new Array();
let isFiltered = false;

// Excel Export 를 위한 변수 선언
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

rawData.forEach(function (data, idx) {
  rawDataArr.push(data.phoneNumber);
});

console.log(rawDataArr);

const excelFileInput = document.querySelector('#excelFile');
const downloadButton = document.querySelector('#download-excel');
const filteredJson = document.querySelector('#filtered-json');

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

function filterData() {
  console.log(myDataArr);
  var intersectionData = rawDataArr.filter((phoneNumber) =>
    myDataArr.map((data) => data.휴대폰번호).includes(phoneNumber)
  );

  filteredData = myDataArr.filter((data) => intersectionData.includes(data.휴대폰번호));
  console.log(filteredData);
  isFiltered = true;

  filteredJson.innerHTML = JSON.stringify(filteredData, undefined, 4);
}

function importFileHandler(event) {
  excelExport(event);
  setTimeout(() => {
    filterData();
  }, 1000);
}

/* addEventListener Part */

excelFileInput.addEventListener('change', importFileHandler);
downloadButton.addEventListener('click', () => {
  if (isFiltered) {
    // 이곳에 데이터 다운로드 구현 로직 짜기
    console.log('hihi');
    const filteredSheetData = filteredData;
    const filteredWorkSheet = XLSX.utils.json_to_sheet(filteredSheetData);
    const filteredWorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(filteredWorkBook, filteredWorkSheet, 'filtered Data');
    XLSX.writeFile(filteredWorkBook, '추출.xlsx');
  } else {
    alert('먼저 엑셀파일을 등록해주세요');
    return;
  }
});
