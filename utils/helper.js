const { ExpressHandlebars } = require('express-handlebars');

module.exports = {
    format_date: (date) => {
        return date.toLocaleDateString();
    }
};