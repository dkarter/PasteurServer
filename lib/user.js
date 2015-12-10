var bcrypt = require('bcrypt');

module.exports = (db, DataTypes) => {
  var User = db.define('user', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at'
    }
  }, {
    hooks: {
      beforeCreate: function (user, options) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(user.password, salt);
        user.password = hash;
      }
    }
  });

  User.authenticate = function (username, password) {
    return new Promise((resolve, reject) => {
      User.findOne({ where: { username: username } }).then((user) => {
        const authenticated = user === null ? false : bcrypt.compareSync(password, user.password);
        resolve(authenticated);
      });
    });
  };

  return User;
};

