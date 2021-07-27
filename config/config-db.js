import Sequelize from "sequelize";
import config from "./config";

// // config database
// const sequelize = new Sequelize(
//   config.db_name,
//   config.db_username,
//   config.db_password,
//   {
//     dialect: "postgres",
//   }
// );

const sequelize = new Sequelize({
  database: "d1npm8r613si1",
  username: "badugvmmuiktnp",
  password: "7644bd5514993de4227f29b4c098f5a25523c85b648d4e59994918899a05f883",
  host: "ec2-35-170-85-206.compute-1.amazonaws.com",
  port: 5432,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true, // This will help you. But you will see nwe error
      rejectUnauthorized: false, // This line will fix new error
    },
  },
});

sequelize
  .authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch((err) => console.log(err));

export { sequelize };
