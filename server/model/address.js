const addres = (sequelize, DataTypes) => {
  const Addres = sequelize.define(
    "address",
    {
      addr_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      addr_street: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      addr_user_id: {
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
      tableName: "address",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "address_pkey",
          unique: true,
          fields: [{ name: "addr_id" }],
        },
      ],
    }
  );

  Addres.associate = (models) => {
    Addres.belongsTo(models.Users, { foreignKey: "addr_user_id" });
  };

  return Addres;
};

export default addres;
