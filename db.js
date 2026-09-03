import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

let dbPromise;

export function openDb() {

    if (!dbPromise) {

        dbPromise = open({
            filename: './db.sqlite',
            driver: sqlite3.Database
        }).then(async db => {

            await db.exec(`
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    firstName TEXT,
                    lastName TEXT,
                    age INTEGER
                )
            `);

            return db ;
        });

    }

    return dbPromise;
}