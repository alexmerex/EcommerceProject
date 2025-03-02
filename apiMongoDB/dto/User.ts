// 📌 Định nghĩa địa chỉ người dùng (Address)
export interface UserAddressProps {
    _id?: string; // ID MongoDB của địa chỉ (nếu có)
    firstName: string;
    lastName: string;
    email: string;
    mobileNo: string;
    address: string;  // 🔥 Đổi từ `deliveryInfo` → `address` (đồng bộ với database)
    region: string;
    city: string;
}

// 📌 Định nghĩa dữ liệu người dùng (User)
export interface UserModelParams {
    _id?: string; // ID MongoDB của User (trả về sau khi đăng ký)
    firstName: string;
    lastName: string;
    email: string;
    mobileNo: string;
    password: string;
    deliveryInfo: UserAddressProps[]; // Danh sách địa chỉ giao hàng
}

// 📌 Định nghĩa thông tin đăng nhập
export interface UserLoginParams {
    email: string;
    password: string;
}
