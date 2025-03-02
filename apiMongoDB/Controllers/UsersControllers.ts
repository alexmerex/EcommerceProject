import { Request, Response } from "express";
import multer from "multer";
import User from "../Models/UserModel"; // Import model User

// Cấu hình multer để xử lý form-data
const upload = multer();

// 📌 Đăng ký người dùng (dùng form-data)
export const userRegistration = [
    upload.none(), // Xử lý form-data không có file
    async (req: Request, res: Response): Promise<void> => {
        const { firstName, lastName, email, mobileNo, password } = req.body;

        try {
            // Kiểm tra email đã tồn tại chưa
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                res.status(400).json({ error: "Email đã tồn tại!" });
                return;
            }

            // Tạo người dùng mới
            const newUser = new User({ firstName, lastName, email, mobileNo, password });
            await newUser.save();

            res.status(201).json({
                message: "User registered successfully!",
                _id: newUser._id,  // Trả về _id của người dùng mới
                email: newUser.email
            });
        } catch (error: unknown) {
            const err = error as Error;
            res.status(500).json({ error: err.message });
        }
    }
];

// 📌 Đăng nhập người dùng (dùng form-data)
export const userLogin = [
    upload.none(),
    async (req: Request, res: Response): Promise<void> => {
        const { email, password } = req.body;

        try {
            // Tìm user trong database
            const user = await User.findOne({ email, password });

            if (!user) {
                res.status(401).json({ error: "Email hoặc mật khẩu không đúng!" });
                return;
            }

            // Trả về toàn bộ thông tin user
            res.status(200).json({
                message: "Login successful!",
                user: user // Trả về toàn bộ thông tin của user
            });
        } catch (error: unknown) {
            const err = error as Error;
            res.status(500).json({ error: err.message });
        }
    }
];

