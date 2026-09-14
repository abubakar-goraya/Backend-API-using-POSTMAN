import db from "../db.js";

const deleteUser = async (req, res) => {

    const id = Number(req.url.split('/')[2]);

    const user = await db.get('select * from users where id=?', id);

    if (user === undefined) {

        res.statusCode = 404;

        res.setHeader('Content-Type', 'application/json');

        res.end(JSON.stringify({
            message: "USER NOT FOUND!!"
        }));

        return;
    }

    const result = await db.run('Delete from users where id=?',id);

        res.setHeader('Content-Type', 'application/json');

    res.end(JSON.stringify({
        message: `USER ${id} DELETED SUECCFULLY !!`
    }));
};
export default deleteUser;