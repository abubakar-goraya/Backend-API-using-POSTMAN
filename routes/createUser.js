const fs = require('fs/promises');
const path = require('path');

const createUser = async (req, res) => {

    let body = '';

    req.on('data', chunk => {
        body += chunk;
    });

    req.on('end', async () => {

        const newUser = JSON.parse(body);

        const allUsersText = await fs.readFile(
            path.resolve(__dirname, '../users.txt'),
            'utf8'
        );

        const allUsers = allUsersText.split('\r\n');

        const newUserLine =
            `${newUser.firstName};${newUser.lastName};${newUser.age}`;

        allUsers.push(newUserLine);

        await fs.writeFile(
            path.resolve(__dirname, '../users.txt'),
            allUsers.join('\r\n')
        );

        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 201;

        res.end(JSON.stringify({
            message: 'User created and added',
            user: newUser
        }));
    });
};

module.exports = createUser;