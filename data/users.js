import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin",
    email: "admin@gmail.com",
    phone: "639568721584",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "User",
    email: "user@gmail.com",
    phone: "639568721584",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "angeline",
    email: "angeline@gmail.com",
    phone: "639568721584",
    password: bcrypt.hashSync("LesliesAdminOnly", 10),
    isAdmin: true,
  },
];

export default users;
