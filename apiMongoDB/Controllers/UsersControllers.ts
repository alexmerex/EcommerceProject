import { Request, Response } from "express";
import { userModelParams, userLoginParams } from "../dto/User"; // Đảm bảo import đúng kiểu dữ liệu

export const userRegistration = async (
    req: Request<{}, any, userModelParams>,
    res: Response
): Promise<void> => {
    const { firstName, lastName, email, mobileNo, password, confirmPassword } = req.body;

    try {
        // Xử lý đăng ký người dùng ở đây
        res.status(201).json({ message: "User registered successfully!" });
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
    }
};

export const userLogin = async (
    req: Request<{}, any, userLoginParams>,
    res: Response
): Promise<void> => {
    const { email, password } = req.body;

    try {
        // Xử lý đăng nhập ở đây
        res.status(200).json({ message: "Login successful!" });
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
    }
};