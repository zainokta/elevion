'use strict';
module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define('Token', {
    user_id: DataTypes.INTEGER,
    token: DataTypes.STRING,
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'tokens'
  });
  Token.associate = function (models) {
    // associations can be defined here
  };
  return Token;
};