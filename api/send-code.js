const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, code } = req.body;
  if (!email || !code) return res.status(400).json({ error: 'Заполните поля' });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'emsamsell@gmail.com',
      pass: 'Almir210513'
    }
  });

  try {
    await transporter.sendMail({
      from: '"EMSELL" <emsamsell@gmail.com>',
      to: email,
      subject: 'Код подтверждения входа EMSELL',
      html: `
        <div style="background:#0d0e12; color:#fff; padding:30px; font-family:sans-serif; border-radius:16px; max-width:450px; margin:0 auto; border:1px solid #262933;">
          <h2 style="margin:0 0 10px 0; font-size:22px; color:#fff;">EMSELL</h2>
          <p style="color:#aaa; font-size:14px; margin-bottom:20px;">Ваш одноразовый код авторизации:</p>
          <div style="background:#16181e; font-size:32px; font-weight:bold; letter-spacing:8px; text-align:center; padding:16px; border-radius:10px; border:1px solid #262933; color:#fff;">
            ${code}
          </div>
          <p style="color:#666; font-size:12px; margin-top:20px;">Если вы не запрашивали вход, проигнорируйте письмо.</p>
        </div>
      `
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
