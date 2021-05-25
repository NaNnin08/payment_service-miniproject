const Sequelize = require("sequelize");
const payment_account = (sequelize, DataTypes) => {
  const Payment_account = sequelize.define(
    "payment_account",
    {
      paac_account_number: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: Sequelize.fn("pacc_id"),
        primaryKey: true,
      },
      pacc_saldo: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      pacc_pin_number: {
        type: DataTypes.STRING(6),
        allowNull: true,
      },
      pacc_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "user_id",
        },
      },
    },
    {
      sequelize,
      tableName: "payment_account",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "payment_account_pkey",
          unique: true,
          fields: [{ name: "paac_account_number" }],
        },
      ],
    }
  );
  return Payment_account;
};

export default payment_account;
