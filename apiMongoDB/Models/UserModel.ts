import mongoose, { Schema, Document } from "mongoose";

// 🔥 Giao diện thông tin giao hàng (Đồng bộ với DTO)
interface UserAddressProps {
    firstName: string;
    lastName: string;
    email: string;
    mobileNo: string;
    deliveryInfo: string; // Thay vì "address" → Đúng theo DTO
    region: string;
    city: string;
}

// 🔥 Giao diện User (Đồng bộ với `UserModelParams` DTO)
interface UserDocument extends Document {
    firstName: string;
    lastName: string;
    email: string;
    mobileNo: string;
    password: string;
    deliveryInfo: UserAddressProps[]; // ✅ Đồng bộ với DTO
}

// ✅ Định nghĩa Schema cho User (Chuẩn theo DTO)
const UserSchema = new Schema<UserDocument>(
    {
        firstName: { type: String, required: true, trim: true },
        lastName: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, trim: true },
        mobileNo: { type: String, required: true, trim: true },
        password: { type: String, required: true },
        deliveryInfo: {
            type: [
                {
                    firstName: { type: String, required: true, trim: true },
                    lastName: { type: String, required: true, trim: true },
                    email: { type: String, required: true, trim: true },
                    mobileNo: { type: String, required: true, trim: true },
                    deliveryInfo: { type: String, required: true, trim: true }, // ✅ Theo DTO
                    region: { type: String, required: true, trim: true },
                    city: { type: String, required: true, trim: true },
                },
            ],
            default: [],
        },
    },
    { timestamps: true } // ✅ MongoDB tự động lưu thời gian tạo & cập nhật
);

// ✅ Xuất model User
const User = mongoose.model<UserDocument>("User", UserSchema);
export default User;
