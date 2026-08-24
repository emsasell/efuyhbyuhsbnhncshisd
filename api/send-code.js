import nodemailer from 'nodemailer';

// Временное хранилище кодов (в реальном проекте используй DB)
export const codesStore = global.codesStore || new Map();
global.codesStore = codesStore;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Метод не поддерживается' });
  }

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ message: 'Введите корректный email' });
  }

  // Генерация 6-значного случайного кода
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  // Сохраняем код в памяти
  codesStore.set(email, {
    code,
    expiresAt: Date.now() + 5 * 60 * 1000 // Код действителен 5 минут
  });

  // Настройка транспорта Gmail SMTP
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'emsamsell@gmail.com',
      pass: 'Almir210513'
    }
  });

  const mailOptions = {
    from: '"Авторизация" <emsamsell@gmail.com>',
    to: email,
    subject: 'Код подтверждения для входа',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f6f8; border-radius: 10px;">
        <h2 style="color: #1e293b; text-align: center;">Код подтверждения</h2>
        <p style="font-size: 16px; color: #475569; text-align: center;">Ваш код для авторизации в системе:</p>
        <div style="text-align: center; margin: 30px 0;">
          <span style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #3b82f6; background: #ffffff; padding: 12px 24px; border-radius: 8px; border: 1px solid #cbd5e1;">
            ${code}
          </span>
        </div>
        <p style="font-size: 13px; color: #94a3b8; text-align: center;">Код действителен в течение 5 минут. Если вы не запрашивали код, проигнорируйте это письмо.</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: 'Код отправлен на email' });
  } catch (error) {
    console.error('Ошибка отправки Email:', error);
    return res.status(500).json({ 
      message: 'Не удалось отправить письмо. Если включена двухфакторная аутентификация в Google, создайте "Пароль приложения" в настройках аккаунта.' 
    });
  }
}
