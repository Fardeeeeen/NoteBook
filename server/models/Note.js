import { DataTypes } from 'sequelize';
import db from '../config/database.js';


const Note = db.define('note', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    defaultValue: 'white',
  },
  reminder: {
    type: DataTypes.DATE,
    defaultValue: null,
  },
   labels: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [], 
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, 
  },
  archived: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, 
  },
   image_data: {
    type: DataTypes.BLOB, 
    allowNull: true,
  },
}, {
  timestamps: false, // Disable timestampsA
});


export default Note;