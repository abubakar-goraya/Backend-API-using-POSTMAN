import db from '../db.js';

const updateUser = async (req, res) => {

    const id = Number(req.url.split('/')[2]);
    let body = '';

    req.on('data', chunk => {
        body += chunk;
    });

    req.on('end', async () => {

        const updateData = JSON.parse(body);

        const user = await db.get('SELECT * FROM users WHERE id = ?', id);

        if (user === undefined) {
            res.statusCode = 404;

            res.setHeader(
                'Content-Type',
                'application/json'
            );

            res.end(JSON.stringify({
                message: 'USER NOT FOUND !!'
            }));

            return;
        }

     
            updateData.age = Number(updateData.age);
        

        const result = await db.run(`UPDATE users
                    SET firstName = COALESCE(?, firstName),
                        lastName = COALESCE(?, lastName),
                        age = COALESCE(?, age)
                        WHERE id = ?`,
            updateData.firstName,
            updateData.lastName,
            updateData.age,
            id);

        res.setHeader('Content-Type', 'application/json');

        res.end(JSON.stringify({ message: 'USER UPDATED SUCCESSFULLY !!' }));
    });
};

export default updateUser;
