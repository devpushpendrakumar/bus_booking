import sequelize from "../db/db";
import { DataTypes } from "sequelize";
const Booking = sequelize.define(
  "Booking",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bus_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    seat_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    booking_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: true,
  }
);

export default Booking;
