const { pool, initDB } = require('./db');

function getAvatarColor(username) {
    const colors = ['#ef4444', '#f97316', '#f59e0b', '#10b981', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899'];
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
        hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
}

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Метод не поддерживается' });

    try {
        await initDB();
        const { chatId, username, code } = req.body;

        // Поиск валидного кода в базе данных
        const checkCode = await pool.query(
            'SELECT * FROM auth_codes WHERE chat_id = $1 AND code = $2 AND expires_at > NOW() ORDER BY id DESC LIMIT 1',
            [chatId, code]
        );

        if (checkCode.rows.length === 0) {
            return res.status(400).json({ success: false, message: 'Неверный или просроченный код!' });
        }

        // Удаляем использованный код
        await pool.query('DELETE FROM auth_codes WHERE chat_id = $1', [chatId]);

        // Сохранение или обновление пользователя в БД
        const avatarColor = getAvatarColor(username);
        let userResult = await pool.query(
            `INSERT INTO users (username, chat_id, avatar_color) 
             VALUES ($1, $2, $3) 
             ON CONFLICT (username) DO UPDATE SET chat_id = EXCLUDED.chat_id 
             RETURNING *`,
            [username, chatId, avatarColor]
        );

        const user = userResult.rows[0];

        return res.status(200).json({
            success: true,
            message: 'Авторизация прошла успешно!',
            user: {
                id: user.id,
                username: user.username,
                chatId: user.chat_id,
                avatarColor: user.avatar_color,
                balance: user.balance
            }
        });

    } catch (error) {
        console.error('Verify error:', error);
        return res.status(500).json({ success: false, message: 'Ошибка сервера при проверке авторизации.' });
    }
};
