const fetch = require('node-fetch');
const { pool, initDB } = require('./db');

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || 'YOUR_TELEGRAM_BOT_TOKEN';

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Метод не поддерживается' });
    }

    try {
        await initDB();
        const { chatId, username } = req.body;

        if (!chatId || !username) {
            return res.status(400).json({ success: false, message: 'Укажите Username и Chat ID!' });
        }

        const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // Действителен 5 минут

        // Сохранение кода в базу данных
        await pool.query(
            'INSERT INTO auth_codes (chat_id, code, expires_at) VALUES ($1, $2, $3)',
            [chatId, generatedCode, expiresAt]
        );

        // Отправка в Telegram
        const messageText = `🔐 *Код авторизации в магазине*\n\n` +
            `👤 Пользователь: ${username}\n` +
            `🔢 Ваш код: \`${generatedCode}\`\n\n` +
            `Код действителен 5 минут.`;

        const tgRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chatId, text: messageText, parse_mode: 'Markdown' })
        });

        const tgData = await tgRes.json();

        if (!tgData.ok) {
            return res.status(400).json({ success: false, message: 'Ошибка отправки Telegram API. Проверьте Chat ID.' });
        }

        return res.status(200).json({ success: true, message: 'Код успешно отправлен в Telegram и сохранен в БД!' });

    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ success: false, message: 'Ошибка сервера при обращении к базе данных.' });
    }
};
