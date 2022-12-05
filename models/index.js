const Users = require('./Users');
const Posts = require('./Posts');
const Comments = require('./Comments');

Users.hasMany(Posts,{
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Users.hasMany(Comments,{
    foreignKey: 'user_id',
});

Posts.belongsTo(Users, {
    foreignKey: 'user_id',
});

Comments.belongsTo(Users,{
    foreignKey: 'user_id',
})

Posts.hasMany(Comments,{
    foreignKey: 'post_id',
});

Comments.belongsTo(Posts, {
    foreignKey: 'post_id',
});


module.exports = { Users, Posts, Comments};
