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
    validate: {
      isUrl: true
    },
    route: function(){
      var url = this.getDataValue('urlTitle');
      return '/wiki/' + url;
    }
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
  },


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

module.exports = {
  Page: pageTable,
  User: userTable
}

