const router = require('express').Router();

const { Users, Posts, Comments } = require('../../models');

// create new post
router.post('/', async (req, res) => {
    try {
        const postData = await Posts.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id,
        });
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// updates a post
router.put('/:id', async (req, res) => {
   try {
    const updatePost = await Posts.update(
        {
        title: req.body.title,
        content: req.body.content,
    },
    {
        where: {
            id: req.params.id,
        }
    },
    )
    res.status(200).json(updatePost)
   } catch (err) {
    res.status(500).json(err)
   }
});

// delete a post
router.delete('/:id', async (req, res) => {
    try {
        const postData = await Posts.destroy({
            where: {
                id: req.params.id,
            },
        });
        if(!postData){
            res.status(404).json({message: 'No post found with that id'});
            return;
        }
        res.status(200).json(postData)
    } catch (err) {
        res.status(500).json(err)
    }
});



module.exports = router;