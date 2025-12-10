import userM from "../models/user.m.js";
import bcrypt from "bcryptjs";

// 1. Hiển thị trang đăng nhập
export const getLogin = (req, res) => {
  res.render("auth/login", { layout: "auth" });
};

// 2. Hiển thị trang đăng ký
export const getRegister = (req, res) => {
  res.render("auth/register", { layout: "auth" });
};

// 3. Xử lý Đăng xuất
export const getLogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: 'Failed to logout' });
    res.redirect('/auth/login');
  });
};

// 4. Xử lý Đăng nhập (POST)
export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userM.oneByUsername(username);
    if (!user) {
      return res.render("auth/login", { layout: "auth", error: 'Invalid username or password' });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.render("auth/login", { layout: "auth", error: 'Invalid username or password' });
    }

    // Lưu user vào session
    req.session.userId = user.id;
    req.session.user = user; // Lưu thêm thông tin user để dùng ở view

    // Chuyển hướng hoặc hiển thị thông báo
    res.render("auth/loginSuccess", {
      layout: "auth",
      user: { 
          username: user.username, 
          name: user.name, 
          email: user.email,
          initials: user.name.split(' ').map(n => n.charAt(0).toUpperCase()).join('')
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// 5. Xử lý Đăng ký (POST)
export const postRegister = async (req, res) => {
  const { username, name, email, password } = req.body;
  try {
    const existingUser = await userM.oneByUsername(username);
    if (existingUser) {
      return res.render("auth/register", {
        layout: "auth", 
        error: 'Username already taken', 
        form: { username, name, email }
      });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = { username, name, email, password: hashedPassword };
    await userM.add(newUser);

    res.render("auth/loginSuccess", {
      layout: "auth",
      user: { 
          username: username, 
          name: name, 
          email: email,
          initials: name.split(' ').map(n => n.charAt(0).toUpperCase()).join('')
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};