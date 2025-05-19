// 스프레드시트 ID를 여기에 입력하세요
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID';
const SHEET_NAME = '이메일 목록';

function doPost(e) {
  try {
    // POST 데이터 파싱
    const data = JSON.parse(e.postData.contents);
    const email = data.email;
    
    // 스프레드시트 열기
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    // 시트가 없으면 생성
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      sheet.getRange('A1:C1').setValues([['이메일', '등록일시', 'IP 주소']]);
    }
    
    // 현재 시간과 IP 주소 가져오기
    const timestamp = new Date();
    const ipAddress = e.parameter.ip || '';
    
    // 데이터 추가
    sheet.appendRow([email, timestamp, ipAddress]);
    
    // 성공 응답
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success',
      'message': '이메일이 성공적으로 저장되었습니다.'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // 오류 응답
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput('이 웹 앱은 POST 요청만 처리합니다.');
} 