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
    },
    getPosts: async (req, res) => {
        const db = req.app.get('db');
        const {userposts, search} = req.query
        const {id} = req.session.user
        if (userposts === 'true' && search) {
            console.log(`userposts && search`)
            const searchResults = await db.get_all_search_posts(`%${search}%`)
            res.status(200).send(searchResults)
        } else if (userposts !== 'true' && !search) {
            console.log(`!userposts && !search`)
            const allButUser = await db.all_but_user_posts(id)
            res.status(200).send(allButUser)
        } else if (userposts !== 'true' && search) {
            console.log(`!userposts && search`)
            const onlySearch = await db.only_searched_posts(id, `%${search}%`)
            res.status(200).send(onlySearch)
        } else if (userposts === 'true' && !search) {
            console.log(`userposts && !search`)
            const allPosts = await db.get_all_posts()
            console.log(allPosts)
            res.status(200).send(allPosts)
        } else {
            console.log('default')
            res.sendStatus(500)
        }
        
    },
    getPost: async (req, res) => {
        const db = req.app.get('db');
        const {postid} = req.params
        if (postid) {
            const post = await db.get_post(postid)
            res.status(200).send(post)
        } else {
            res.sendStatus(400)
        }
    },
    addPost: async (req, res) => {
        const db = req.app.get('db');
        const {id} = req.session.user
        const {title, img, content} = req.body
        await db.add_post(title, img, content, id)
        res.sendStatus(200)
    },
    deletePost: async (req, res) => {
        const db = req.app.get('db');
        const {postid} = req.params
        await db.delete_post(postid)
        res.sendStatus(200)
    }
}