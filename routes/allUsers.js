import db from '../db.js';

const allUsers = async (req, res) => {

    const users = await db.all('SELECT * FROM users');

    res.setHeader('Content-Type', 'application/json');

    res.end(JSON.stringify(users));

};

export default allUsers;