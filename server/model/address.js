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
      addr_street_1: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      addr_street_2: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      addr_city: {
        type: DataTypes.STRING(100),
        allowNull: true,
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
  return Addres;
};

export default addres;
