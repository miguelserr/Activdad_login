const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const User = require("./user.model");

const Post = sequelize.define(
  "Post",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(250),
      allowNull: false,
      validate: {
        notNull: { msg: "title is required" },
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: "title is required" },
      },
    },
    image: {
      type: DataTypes.STRING(150),
      defaultValue: "post-image.png",
    },
    author_id: {
      type: DataTypes.UUID,
    },
  },
  {
    timestamps: true,
  }
);


module.exports = Post;
