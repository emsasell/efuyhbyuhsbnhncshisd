const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, code } = req.body;
  if (!email || !code) return res.status(400).json({ error: 'Email и код обязательны' });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'emsamsell@gmail.com',
      pass: 'Almir210513'
    }
  });

  try {
    await transporter.sendMail({
      from: '"EMSELL Support" <emsamsell@gmail.com>',
      to: email,
      subject: 'EMSELL — Код подтверждения входа',
      html: `
        <div style="background:#0d0e12; color:#ffffff; padding:20px; font-family:sans-serif; border-radius:12px;">
          <h2 style="color:#ffffff;">EMSELL</h2>
          <p>Ваш одноразовый код для входа на платформу:</p>
          <h1 style="background:#16181e; padding:12px; border-radius:8px; letter-spacing:5px; text-align:center;">${code}</h1>
          <p style="color:#888;">Если вы не запрашивали код, просто проигнорируйте это письмо.</p>
        </div>
      `
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
