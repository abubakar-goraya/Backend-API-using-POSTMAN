import db from '../db.js';

const createUser = async (req, res) => {

    let body = '';

    req.on('data', chunk => {
        body += chunk;
    });

    req.on('end', async () => {

        const newUser = JSON.parse(body);

        newUser.firstName = String(newUser.firstName);
        newUser.lastName = String(newUser.lastName);
        newUser.age = Number(String(newUser.age));
        
        const result=await db.run(`INSERT INTO users (firstName,lastName,age)
                                                VALUES(?,?,?)`, newUser.firstName,newUser.lastName,newUser.age);
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 201;

        res.end(JSON.stringify({
            message: 'User created and added',
            id: result.lastID,
            user: newUser
        }));
    });
};

export default createUser;