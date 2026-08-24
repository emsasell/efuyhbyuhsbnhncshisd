document.addEventListener('DOMContentLoaded', () => {
  const phoneForm = document.getElementById('phone-form');
  const codeForm = document.getElementById('code-form');
  const phoneInput = document.getElementById('phone-input');
  const codeInput = document.getElementById('code-input');
  const sendBtn = document.getElementById('send-code-btn');
  const verifyBtn = document.getElementById('verify-code-btn');
  const errorBox = document.getElementById('error-box');

  let currentPhone = '';

  // Отправка кода на телефон
  phoneForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const phone = phoneInput.value.trim();
    if (!phone) return;

    setLoading(sendBtn, true);
    hideError();

    try {
      const response = await fetch('/api/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
      });

      const data = await response.json();

      if (response.ok) {
        currentPhone = phone;
        phoneForm.classList.add('hidden');
        codeForm.classList.remove('hidden');
      } else {
        showError(data.message || 'Ошибка отправки кода');
      }
    } catch (err) {
      showError('Сетевая ошибка. Проверьте соединение.');
    } finally {
      setLoading(sendBtn, false);
    }
  });

  // Проверка введенного кода
  codeForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const code = codeInput.value.trim();
    if (!code) return;

    setLoading(verifyBtn, true);
    hideError();

    try {
      const response = await fetch('/api/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: currentPhone, code })
      });

      const data = await response.json();

      if (response.ok) {
        window.location.href = '/dashboard'; // перенаправление после успешного входа
      } else {
        showError(data.message || 'Неверный код');
      }
    } catch (err) {
      showError('Ошибка сервера при проверке');
    } finally {
      setLoading(verifyBtn, false);
    }
  });

  function setLoading(btn, isLoading) {
    if (isLoading) {
      btn.classList.add('loading');
      btn.disabled = true;
    } else {
      btn.classList.remove('loading');
      btn.disabled = false;
    }
  }

  function showError(msg) {
    errorBox.textContent = msg;
    errorBox.classList.remove('hidden');
  }

  function hideError() {
    errorBox.textContent = '';
    errorBox.classList.add('hidden');
  }
});
