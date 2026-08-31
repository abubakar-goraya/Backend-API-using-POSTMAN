const fs = require('fs/promises');
const path = require('path');

const updateUser = async (req, res) => {

    const id = Number(req.url.split('/')[2]);
    let body = '';

    req.on('data', chunk => {
        body += chunk;
    });

    req.on('end', async () => {
        const updateData = JSON.parse(body);
        //this is just a shortcut for path
        const filePath = path.resolve(__dirname, '../users.txt');
        

        const allUsersText = await fs.readFile(filePath, 'utf8');
        const allUsers = allUsersText.split('\r\n');

        if (allUsers[id - 1] === undefined) {
            res.statusCode = 404;

            res.setHeader(
                'Content-Type', 'application/json'
            );

            res.end(JSON.stringify({
                message: "USER NOT FOUND !!"
            }));
            return;
        };

        const split = allUsers[id - 1].split(';');
        if (updateData.firstName !== undefined) {
            split[0] = updateData.firstName;
        }
        if (updateData.lastName !== undefined) {
            split[1] = updateData.lastName;
        }
        if (updateData.age !== undefined) {
            split[2] = updateData.age;
        }
        allUsers[id - 1] = split.join(';');

        await fs.writeFile(filePath, allUsers.join('\r\n'));

        res.setHeader('Content-Type','application/json');

        res.end(JSON.stringify({
            message: "USER UPDATED SUCCESSFULLY"
        }));
    });
};

module.exports = updateUser;