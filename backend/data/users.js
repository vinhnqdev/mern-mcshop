import bcrypt from "bcrypt";
const users = [
  {
    name: "Vinh Ngo",
    email: "vinh@gmail.com",
    password: bcrypt.hashSync("vinh@123", 8),
    isAdmin: true,
  },
  {
    name: "Tam Ngo",
    email: "tam@gmail.com",
    password: bcrypt.hashSync("tam@123", 8),
  },
  {
    name: "Long Le",
    email: "long@gmail.com",
    password: bcrypt.hashSync("long@123", 8),
  },
];

export default users;
