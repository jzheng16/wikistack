var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging:false
});

var pageTable = db.define('page', {
  title : {
    type: Sequelize.STRING,
    allowNull: false
  },
  urlTitle: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open','closed')
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
}, {
  hooks: {
    beforeValidate: function(page, options){
      page.urlTitle = generateUrlTitle(page.title)
    }
  },
  getterMethods: {
    route: function(){
      var url = this.getDataValue('urlTitle');
      return '/wiki/' + url;
    }
  }
});

var userTable = db.define('user',{
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
});

function generateUrlTitle (title) {
  if (title) {
    // Removes all non-alphanumeric characters from title
    // And make whitespace underscore
    return title.replace(/\s+/g, '_').replace(/\W/g, '');
  } else {
    // Generates random 5 letter string
    return Math.random().toString(36).substring(2, 7);
  }
}

module.exports = {
  Page: pageTable,
  User: userTable
}

