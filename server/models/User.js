// // User.js

// import { DataTypes } from 'sequelize';
// import sequelize from '../config/database.js';
// import Note from './Note.js';
// import Drawing from './Drawing.js';

// const User = sequelize.define('Users', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false
//   }
// }, {
//   tableName: 'Users' // Specify the table name
// });

//  User.hasMany(Note, { foreignKey: 'userId' });
//  User.hasMany(Drawing, { foreignKey: 'userId' });

// export default User;