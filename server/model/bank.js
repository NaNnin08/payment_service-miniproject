const bank = (sequelize, DataTypes) => {
  const Bank = sequelize.define(
    "bank",
    {
      bank_id: {
        type: DataTypes.STRING(3),
        allowNull: false,
        primaryKey: true,
      },
      bank_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "bank",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "bank_pkey",
          unique: true,
          fields: [{ name: "bank_id" }],
        },
      ],
    }
  );

  Bank.associate = (models) => {
    Bank.hasMany(models.Bank_Accounts, {
      foreignKey: "baac_bank_id",
      onDelete: "CASCADE",
    });
  };

  return Bank;
};

export default bank;
