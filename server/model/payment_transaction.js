const Sequelize = require("sequelize");
const payment_transaction = (sequelize, DataTypes) => {
  const Payment_transaction = sequelize.define(
    "payment_transaction",
    {
      payt_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      payt_trx_number: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: Sequelize.fn("pyt_trx"),
      },
      payt_trx_number_ref: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      payt_order_number: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      payt_bacc_acc_bank: {
        type: DataTypes.STRING(25),
        allowNull: true,
      },
      payt_date: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      payt_dabet: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      payt_credit: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      payt_desc: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      payt_type: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      payt_paac_account_number: {
        type: DataTypes.TEXT,
        allowNull: false,
        references: {
          model: "payment_account",
          key: "paac_account_number",
        },
      },
    },
    {
      sequelize,
      tableName: "payment_transaction",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "payment_transaction_pkey",
          unique: true,
          fields: [{ name: "payt_id" }],
        },
      ],
    }
  );
  return Payment_transaction;
};

export default payment_transaction;
