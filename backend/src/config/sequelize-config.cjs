require('dotenv').config();

module.exports = {
  development: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host:     process.env.DB_HOST || 'db',
    port:     3306,
    dialect:  'mysql'
  },
  test: {
    
  },
  production: {
    
  }
};
