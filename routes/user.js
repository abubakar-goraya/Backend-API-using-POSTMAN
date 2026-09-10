import db from '../db.js';

const getUser = async (req, res) => {

    console.log(JSON.stringify(req.url));

    const id = req.url.split('/')[2];

    const user = await db.get('SELECT * FROM users WHERE id = ?', id);

    if (!user) {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 404;

        res.end(JSON.stringify({ message: 'user not found' }));
        return;
    }

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(user));
};

export default getUser;