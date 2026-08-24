const { Pool } = require('@neondatabase/serverless');

// Используется стандартная переменная POSTGRES_URL из Vercel Postgres / Neon DB
const pool = new Pool({
    connectionString: process.env.POSTGRES_URL || process.env.DATABASE_URL
});

async function initDB() {
    const client = await pool.connect();
    try {
        // Таблица пользователей
        await client.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(64) UNIQUE NOT NULL,
                chat_id VARCHAR(64) NOT NULL,
                avatar_color VARCHAR(16) NOT NULL,
                balance INT DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Таблица кодов авторизации
        await client.query(`
            CREATE TABLE IF NOT EXISTS auth_codes (
                id SERIAL PRIMARY KEY,
                chat_id VARCHAR(64) NOT NULL,
                code VARCHAR(10) NOT NULL,
                expires_at TIMESTAMP NOT NULL
            );
        `);

        // Таблица товаров
        await client.query(`
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                name VARCHAR(128) NOT NULL,
                category VARCHAR(64) NOT NULL,
                price INT NOT NULL,
                image_url TEXT,
                description TEXT
            );
        `);

        // Заполнение базовыми товарами
        const productCheck = await client.query('SELECT COUNT(*) FROM products;');
        if (parseInt(productCheck.rows[0].count) === 0) {
            await client.query(`
                INSERT INTO products (name, category, price, image_url, description) VALUES
                ('Кобра Высшего Качества (Кобрет)', 'weapons', 1200, '/img.png', 'Улучшенное редкое оружие Metro Royale.'),
                ('Броня Кобра (6 Уровень)', 'armor', 2500, '/img.png', 'Максимальная защита от тяжелого урона.'),
                ('Золотой Слиток 100k', 'items', 800, '/img.png', 'Ценный предмет для продажи на черном рынке.'),
                ('Патроны 7.62mm (Подрывные)', 'ammo', 450, '/img.png', 'Специальные боеприпасы с увеличенным пробитием.');
            `);
        }
    } finally {
        client.release();
    }
}

module.exports = { pool, initDB };
