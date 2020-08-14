const bcrypt = require('bcrypt');

module.exports = {
    register: async (req, res) => {
        const db = req.app.get('db');
        const {username, password} = req.body;
        const alreadyExists = await db.check_user(username);
        if(alreadyExists.length){
            return res.status(409).send('Username Taken')
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const [newUser] = await db.create_user([username, hash, `https://robohash.org/${username}.png`])
        req.session.user = {
            id: newUser.id,
            username: newUser.username,
            profilePicture: newUser.profile_pic
        }
        res.status(200).send(req.session.user)
        console.log(req.session.user)
    },

    login: async (req, res) => {
        const db = req.app.get('db');
        const {username, password} = req.body;
        console.log('backend', req.body)
        const [user] = await db.check_user(username);
        console.log(user)
        if(!user){
            return res.status(401).send('Could not find that username, please check your spelling.')
        } else {
            const authenticated = bcrypt.compareSync(password, user.password);
            console.log('authenticated pw', password, user.password)
            if (authenticated) {
                req.session.user = {
                    id: user.id,
                    username: user.username,
                    profilePicture: user.profile_pic
                }
                res.status(200).send(req.session.user)
            } else {
                res.status(403).send('Incorrect login information.')
            }
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    },
    
    getUser: (req, res) => {
        if(req.session.user){
            res.status(200).send(req.session.user)
        } else {
            res.sendStatus(404)
        }
    }
}