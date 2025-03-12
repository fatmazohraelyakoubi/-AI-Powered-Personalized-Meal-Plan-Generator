import User from "../models/userModel.js"; // تأكد من صحة المسار
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
      console.log("🔍 Request Body:", req.body);  // 🔴 تحقق من البيانات المرسلة
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
          return res.status(400).json({ message: "المستخدم غير موجود" });
      }

      console.log("✅ User Found:", user);  // 🔴 تحقق من استرجاع المستخدم

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ message: "كلمة المرور غير صحيحة" });
      }

      console.log("🔐 Password Matched!");  // 🔴 تحقق من تطابق كلمة المرور

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

      res.json({ token, user });
  } catch (error) {
      console.error("🔥 Login Error:", error);  // 🔴 اطبع الخطأ الحقيقي
      res.status(500).json({ message: "Server error" });
  }
};
