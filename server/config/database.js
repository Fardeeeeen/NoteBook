import  Sequelize  from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

let sequelize;

if (process.env.DB_URL) {
  sequelize = new Sequelize(process.env.DB_URL, {
    dialect: 'postgres',
    ssl: true,
  });

   sequelize.authenticate()
    .then(() => {
      console.log('Database connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
      process.exit(1); // Exit the application if the connection fails
    });
    
} else {
  console.error("DB_URL is not available. Please check your environment configuration.");
  process.exit(1); // Exit the application if DB_URL is not available
}

console.log('Sequelize Options:', sequelize.config);


export default sequelize;