const pays = (sequelize, DataTypes) => {
  const Pays = sequelize.define(
    "payment_save",
    {
      pays_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      pays_amount: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      pays_order_number: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      pays_desc: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "payment_save",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "payment_save_pkey",
          unique: true,
          fields: [{ name: "pays_id" }],
        },
      ],
    }
  );

  return Pays;
};

export default pays;
