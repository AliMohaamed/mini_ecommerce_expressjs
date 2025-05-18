const Role = require("../DB/models/RoleModel.js");
const User = require("../DB/models/UserModel.js");

const seedRoles = async () => {
  const roles = ["admin", "buyer", "customer", "user"];
  for (const role of roles) {
    const exists = await Role.findOne({ name: role });
    if (!exists) {
      await Role.create({ name: role });
    }
  }

  const adminRole = await Role.findOne({ name: "admin" });

  const adminExists = await User.findOne({ roles: adminRole._id });

  if (!adminExists) {
    const admin = new User({
      name: "admin",
      email: "admin@gmail.com",
      password: "Admin@123",
      roles: [adminRole._id],
    });

    await admin.save();

    console.log("Admin created");
  }
};

module.exports = seedRoles;
