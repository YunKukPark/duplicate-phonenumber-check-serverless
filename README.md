# duplicate-phonenumber-check-serverless

> 사용된 더미데이터는 개인 신상이라 업로드 하지 않았습니다. (app.js 에서 rawData 에 담겨있는 json 파일)
>
> > json file 을 js 로 저장 후 html 에 업로드 하여 사용

## 1. 사용자로부터 받은 데이터 처리

> `EventListener('change',function)` 으로 처리

## 2. 내가 가지고 있는 엑셀 파일 처리 (비교 할 원 데이터)

> 이부분이 까다롭고 해결이 잘 안된다.

- 변환 되어야 할 object 데이터가 무시되고 다음 함수가 실행된다.

- - 해결 : myData 를 담아주는 함수가 비동기 함수라서 처리 할 때 까지 시간이 걸리는 문제가 있었다. => setTimeout 을 통해 데이터가 잘 들어오게 처리 하였다.

## 3. 데이터 가공 (중복체크)

1. 함께 가지고 있는 데이터 검색

```javascript
var intersectionData = rawDataArr.filter((phoneNumber) =>
  myDataArr.map((data) => data.휴대폰번호).includes(phoneNumber)
);
```

2. 함께 가지고 있는 데이터를 myData 에서 추려내기

```javascript
filteredData = myDataArr.filter((data) => intersectionData.includes(data.휴대폰번호));
console.log(filteredData);
```

3. 필터링된 데이터가 DownLoad 할 수 있는 환경이 되었음

```javasript
is Filtered = true;
```

## 4. Data Download

```javascript
if (isFiltered) {
  // 1. excel sheet 에 저장될 데이터를 저장합니다. (현재 json object 파일)
  const filteredSheetData = filteredData;

  // 2. excel sheet 를 json_to_sheet format의 데이터로 생성합니다.
  const filteredWorkSheet = XLSX.utils.json_to_sheet(filteredSheetData);

  // 3. scratch로 부터 새로운 workbook을 생성합니다.
  // workbook 은 sheetNames 를 가지며, Sheets 와 sheet name 이 매핑된 값을 가지고 있습니다.
  const filteredWorkBook = XLSX.utils.book_new();

  // 4. workbook worksheet 에 'filtered Data' 라는 제목으로 지정하여 추가합니다.
  XLSX.utils.book_append_sheet(filteredWorkBook, filteredWorkSheet, 'filtered Data');

  // 5. '추출.xlsx' 라는 이름을 가진 파일을 생성합니다.
  XLSX.writeFile(filteredWorkBook, '추출.xlsx');
} else {
  alert('먼저 엑셀파일을 등록해주세요');
  return;
}
```
