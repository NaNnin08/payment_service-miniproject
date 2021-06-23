const bank_account = (sequelize, DataTypes) => {
  const Bank_account = sequelize.define(
    "bank_account",
    {
      baac_acc_bank: {
        type: DataTypes.STRING(25),
        allowNull: false,
        primaryKey: true,
      },
      baac_owner: {
        type: DataTypes.STRING(85),
        allowNull: false,
      },
      baac_saldo: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      bacc_pin_number: {
        type: DataTypes.STRING(6),
        allowNull: true,
      },
      baac_start_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      baac_end_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      baac_type: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      baac_user_id: {
        type: DataTypes.STRING(30),
        allowNull: true,
        references: {
          model: "users",
          key: "user_id",
        },
      },
      baac_bank_id: {
        type: DataTypes.STRING(3),
        allowNull: false,
        references: {
          model: "bank",
          key: "bank_id",
        },
      },
    },
    {
      sequelize,
      tableName: "bank_account",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "bank_account_pkey",
          unique: true,
          fields: [{ name: "baac_acc_bank" }],
        },
      ],
    }
  );

  Bank_account.associate = (models) => {
    Bank_account.belongsTo(models.Users, { foreignKey: "baac_user_id" });
    Bank_account.belongsTo(models.Bank, { foreignKey: "baac_bank_id" });
  };

  return Bank_account;
};

export default bank_account;
