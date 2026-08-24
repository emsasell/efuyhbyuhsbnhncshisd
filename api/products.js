const { pool, initDB } = require('./db');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        await initDB();
        const result = await pool.query('SELECT * FROM products ORDER BY id ASC;');
        return res.status(200).json({ success: true, products: result.rows });
    } catch (error) {
        console.error('Products error:', error);
        return res.status(500).json({ success: false, message: 'Ошибка загрузки товаров' });
    }
};
