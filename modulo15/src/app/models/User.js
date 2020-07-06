import Sequelize, { Model } from "sequelize";
import bcrypt from "bcryptjs";

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    this.addHook("beforeSave", async (model) => {
      if (model.password) {
        model.password_hash = await bcrypt.hash(model.password, 8);
      }
    });

    return this;
  }

  static associate(models) {
    // file_id pertence à model File
    this.belongsTo(models.File, { foreignKey: "file_id", as: "file" });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
