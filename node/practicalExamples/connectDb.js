const Sequelize = require('sequelize')
const dbName = process.env.NODE_ENV === 'test' ? 'test' : 'todoApp'
const sequelize = new Sequelize('postgres://jeevanndc:keepguessing@localhost:5432/'+ dbName)

module.exports = sequelize
