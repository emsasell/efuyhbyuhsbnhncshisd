import { codesStore } from './send-code.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Метод не поддерживается' });
  }

  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).json({ message: 'Укажите email и код' });
  }

  const savedData = codesStore.get(email);

  if (!savedData) {
    return res.status(400).json({ message: 'Код не запрашивался или время его действия истекло' });
  }

  if (Date.now() > savedData.expiresAt) {
    codesStore.delete(email);
    return res.status(400).json({ message: 'Срок действия кода истек, запросите новый' });
  }

  if (savedData.code !== code.trim()) {
    return res.status(400).json({ message: 'Введен неверный код' });
  }

  // Очищаем код после успешного входа
  codesStore.delete(email);

  return res.status(200).json({ success: true, message: 'Авторизация прошла успешно' });
}
