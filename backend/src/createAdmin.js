const mongoose = require("mongoose");
const User = require("./models/userModel");

mongoose.connect("mongodb://localhost:27017/hcshop")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ Connection error:", err));

const createAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ role: "admin" });
    if (existingAdmin) {
      console.log("⚠️ Admin đã tồn tại:", existingAdmin.email);
      process.exit();
    }

    const password = "Admin@123"; // 👈 mật khẩu gốc, không mã hóa

    const admin = await User.create({
      name: "Administrator",
      email: "admin@hcshop.com",
      password: password,
      passwordConfirm: password, // 👈 khớp nhau để validation pass
      role: "admin",
      active: "active",
      address: [],
      balance: 0
    });

    console.log("✅ Tạo admin thành công!");
    console.log("Email:", admin.email);
    console.log("Mật khẩu:", password);
    process.exit();
  } catch (err) {
    console.error("❌ Lỗi khi tạo admin:", err);
    process.exit(1);
  }
};

createAdmin();
