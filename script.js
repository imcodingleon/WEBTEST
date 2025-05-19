// Google Apps Script 웹 앱 URL을 여기에 입력하세요
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxUjMr6uY5pkNzmGOdsGl7bDv6gQ_IyrhxZ5zuFku-lfObIxmYzfkbgBOVvoHQvlEKD/exec';

async function submitEmail(event) {
    event.preventDefault();
    
    const emailInput = document.getElementById('email');
    const messageDiv = document.getElementById('message');
    const email = emailInput.value.trim();
    
    // 이메일 유효성 검사
    if (!isValidEmail(email)) {
        showMessage('올바른 이메일 주소를 입력해주세요.', 'error');
        return false;
    }
    
    try {
        // 구글 앱스 스크립트로 데이터 전송
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email })
        });

        // 성공 메시지 표시
        showMessage('이메일이 성공적으로 등록되었습니다!', 'success');
        emailInput.value = ''; // 입력 필드 초기화
    } catch (error) {
        console.error('Error:', error);
        showMessage('등록 중 오류가 발생했습니다. 다시 시도해주세요.', 'error');
    }
    
    return false;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showMessage(message, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.className = `message ${type}`;
} 
