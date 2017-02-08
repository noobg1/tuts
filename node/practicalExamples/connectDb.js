const Sequelize = require('sequelize')
const sequelize = new Sequelize('postgres://jeevanndc:keepguessing@localhost:5432/todoApp')

module.exports = sequelize
