const router = require('express').Router();

const { Users, Posts, Comments } = require('../../models');

// creates a comment
router.post('/',  async (req, res) => {
    try {
        const commentData = await Comments.create({
            name: req.session.username,
            comment: req.body.comment,
            post_id: req.body.post_id,
            user_id: req.session.user_id,
        });
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err)
    }
});


// deletes a comment
router.delete('/:id', async (req, res) => {
    try {
        const commentData = await Comments.destroy({
            where: {
                id: req.params.id,
            },
        });
        if(!commentData){
            res.status(404).json({message: 'No comment found with that id'});
            return;
        }
        res.status(200).json(commentData)
    } catch (err) {
        res.status(500).json(err)
    }
});





module.exports = router;