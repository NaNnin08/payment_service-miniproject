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
        type: DataTypes.STRING(30),
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

  Payment_account.associate = (models) => {
    Payment_account.belongsTo(models.Users, { foreignKey: "pacc_user_id" });
    Payment_account.hasMany(models.Payment_Transaction, {
      foreignKey: "payt_paac_account_number",
    });
  };

  return Payment_account;
};

export default payment_account;
