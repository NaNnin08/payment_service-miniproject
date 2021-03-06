import bank_accounts from "./bank_account";
import bank from "./bank";
import payment_account from "./payment_account";
import payment_transaction from "./payment_transaction";
import users from "./users";
import Sequelize from "sequelize";
import { sequelize } from "../../config/config-db";
import addres from "./address";

const models = {
  Users: users(sequelize, Sequelize),
  Bank: bank(sequelize, Sequelize),
  Bank_Accounts: bank_accounts(sequelize, Sequelize),
  Payment_Account: payment_account(sequelize, Sequelize),
  Payment_Transaction: payment_transaction(sequelize, Sequelize),
  Addres: addres(sequelize, Sequelize),
};

Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

export default models;
