import sequelize from "../db/db.js";
import { DataTypes } from "sequelize";

const Bus = sequelize.define(
  "Bus",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    bus_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    total_seats: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    empty_seats: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export default Bus;
