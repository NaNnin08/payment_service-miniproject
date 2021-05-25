const users = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "users",
    {
      user_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      user_name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      user_email: {
        type: DataTypes.STRING(55),
        allowNull: false,
      },
      user_password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      user_salt: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      user_birthdate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      user_gender: {
        type: DataTypes.STRING(6),
        allowNull: true,
      },
      user_avatar: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      user_desc: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      user_phone: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      user_id_card: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "users",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "users_pkey",
          unique: true,
          fields: [{ name: "user_id" }],
        },
      ],
    }
  );

  Users.associate = (models) => {
    Users.hasMany(models.Bank_Accounts, {
      foreignKey: "baac_user_id",
      onDelete: "CASCADE",
    });
    Users.hasOne(models.Payment_Account, {
      foreignKey: "pacc_user_id",
      onDelete: "CASCADE",
    });
  };

  return Users;
};

export default users;
