const router = require('express').Router();

const { Users, Posts, Comments } = require('../models');

// Renders homepage
router.get('/', async (req, res) => {
    try {
        const currentPosts = await Users.findAll({
            attributes: {
                exclude: [
                    'password',
                ],
            },
            include: [{model: Posts}]
        });
        const posts = currentPosts.map((post) => post.get({ plain: true }))
        const loggedIn = req.session.logged_in
        console.log(loggedIn)
        res.render('home',{
            posts,
            loggedIn
        });
    } catch (err) {
        console.log(err);
        res.status(400).json(err)
    }
});

router.get('/dashboard', async (req, res) => {
    try {
        const currentBoard = await Users.findByPk(req.session.user_id, {
            attributes: {exclude: ['password']},
            include: [{model: Posts}, {model: Comments}],
        });
        const loggedIn = req.session.logged_in;
        const user = req.session.user_id;

        const thisDash = currentBoard.get({plain: true})
        
        res.render('dashboard', {
            thisDash,
            loggedIn,
            user,
        });

    } catch (err) {
        res.status(400).json(err);
    }
});


router.get('/post/:id', async (req,res) => {
    try {
        const postData = await Posts.findByPk(req.params.id, {
            include: [{model: Comments}]
        });
        const thisPost = postData.get({plain: true})
        const loggedIn = req.session.logged_in
        res.render('post', {
            thisPost,
            loggedIn
        })
    } catch (err) {
        res.status(404).json(err)
    }
});











// Renders login page
router.get('/login', (req,res)=> {
    if(req.session.logged_in){
        res.redirect('/');
        return;
    }
    res.render('login');
});





module.exports = router;