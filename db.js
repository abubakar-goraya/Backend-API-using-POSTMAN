import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const db = await open({
    filename: './db.sqlite',
    driver: sqlite3.Database
});

await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT,
        lastName TEXT,
        age INTEGER
    )
`);

const count = await db.get('SELECT COUNT(*) AS count FROM users');

if (count.count === 0) {

    await db.run(
        `INSERT INTO users (firstName, lastName, age)
         VALUES (?, ?, ?),
                (?, ?, ?),
                (?, ?, ?),
                (?, ?, ?),
                (?, ?, ?),
                (?, ?, ?)`,
        'Ali', 'Hamza', 14,
        'Faris', 'Ham', 33,
        'KHAN', 'Hza', 41,
        'Paul', 'Laym', 20,
        'Lee', 'Ulong', 49,
        'Mark', 'Selby', 48
    );

}

export default db;