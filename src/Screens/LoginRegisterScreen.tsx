import React, { useState } from "react";
import {
    View, Text, SafeAreaView, TextInput, TouchableOpacity,
    KeyboardAvoidingView, Alert, StyleSheet, ScrollView
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootStackScreenProps } from "../Navigation/RootNavigator";

const UserAuth = ({ navigation, route }: RootStackScreenProps<"UserLogin">) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const [isRegisterMode, setIsRegisterMode] = useState(false);

    // 📌 Nhận các tham số từ `route.params`
    const totalAmount = route.params?.totalAmount ?? 0;
    const previousScreen = route.params?.previousScreen ?? "";
    console.log("🚀 previousScreen:", previousScreen); // 👀 Debug giá trị previousScreen

    // 📌 Chuyển giữa đăng nhập & đăng ký
    const toggleAuthMode = () => {
        setIsRegisterMode(!isRegisterMode);
        setIsRegistering(false);
        setIsSubmitting(false);
        setFirstName("");
        setLastName("");
        setEmail("");
        setMobileNo("");
        setPassword("");
    };

    // 📌 Xử lý điều hướng sau khi đăng nhập
    const handleLoginSuccess = async (userId: string) => {
        await AsyncStorage.setItem("userId", userId);
        Alert.alert("Đăng nhập thành công!");

        if (previousScreen === "CartScreen") {
            navigation.replace("Payment", { totalAmount }); // ✅ Chuyển đến Payment nếu đến từ Cart
        } else if (previousScreen === "ProfileScreen") {
            navigation.navigate("TabsStack", { screen: "Profile", userId });
        } else {
            navigation.navigate("TabsStack", { screen: "Profile" }); // ✅ Mặc định quay về CartScreen
        }
    };

    // 📌 Đăng nhập
    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) {
            Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin");
            return;
        }
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        try {
            const response = await axios.post("http://192.168.100.202:9000/user/loginUser", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            const userId = response.data._id;
            if (!userId) throw new Error("Không nhận được _id từ server!");

            handleLoginSuccess(userId);
        } catch (error) {
            console.error("❌ Lỗi đăng nhập:", error.response?.data || error.message);
            Alert.alert("Lỗi đăng nhập", error.response?.data?.message || "Có lỗi xảy ra");
        } finally {
            setIsSubmitting(false);
        }
    };

    // 📌 Đăng ký
    const handleRegister = async () => {
        if (!firstName.trim() || !lastName.trim() || !email.trim() || !mobileNo.trim() || !password.trim()) {
            Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin đăng ký");
            return;
        }
        setIsRegistering(true);

        const formData = new FormData();
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("email", email);
        formData.append("mobileNo", mobileNo);
        formData.append("password", password);

        try {
            const response = await axios.post("http://192.168.100.202:9000/user/registerUser", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.status === 201 || response.status === 200) {
                Alert.alert("Đăng ký thành công!", "Bạn có thể đăng nhập ngay bây giờ");
                toggleAuthMode();
            }
        } catch (error) {
            console.error("❌ Lỗi đăng ký:", error.response?.data || error.message);
            Alert.alert("Lỗi đăng ký", error.response?.data?.message || "Có lỗi xảy ra");
        } finally {
            setIsRegistering(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior="padding" style={styles.innerContainer}>
                <ScrollView>
                    <Text style={styles.title}>{isRegisterMode ? "Đăng Ký" : "Đăng Nhập"}</Text>

                    {isRegisterMode && (
                        <>
                            <TextInput style={styles.input} placeholder="Họ" value={firstName} onChangeText={setFirstName} />
                            <TextInput style={styles.input} placeholder="Tên" value={lastName} onChangeText={setLastName} />
                            <TextInput style={styles.input} placeholder="Số điện thoại" keyboardType="phone-pad" value={mobileNo} onChangeText={setMobileNo} />
                        </>
                    )}
                    <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" value={email} onChangeText={setEmail} />
                    <TextInput style={styles.input} placeholder="Mật khẩu" secureTextEntry value={password} onChangeText={setPassword} />

                    {isRegisterMode ? (
                        <TouchableOpacity style={[styles.button, isRegistering && styles.buttonDisabled]} onPress={handleRegister} disabled={isRegistering}>
                            <Text style={styles.buttonText}>{isRegistering ? "Đang xử lý..." : "Đăng ký"}</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={[styles.button, isSubmitting && styles.buttonDisabled]} onPress={handleLogin} disabled={isSubmitting}>
                            <Text style={styles.buttonText}>{isSubmitting ? "Đang xử lý..." : "Đăng nhập"}</Text>
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity onPress={toggleAuthMode}>
                        <Text style={styles.switchText}>
                            {isRegisterMode ? "Đã có tài khoản? Đăng nhập" : "Chưa có tài khoản? Đăng ký ngay"}
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

// 📌 Styles
const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f9f9f9" },
    innerContainer: { width: "80%" },
    title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
    input: { width: "100%", height: 50, borderWidth: 1, borderColor: "#ccc", borderRadius: 8, paddingHorizontal: 10, marginBottom: 15, backgroundColor: "#fff" },
    button: { backgroundColor: "#007bff", padding: 15, borderRadius: 8, alignItems: "center" },
    buttonDisabled: { backgroundColor: "#ccc" },
    buttonText: { color: "white", fontWeight: "bold", fontSize: 16 },
    switchText: { textAlign: "center", marginTop: 15, color: "#007bff", fontWeight: "bold" }
});

export default UserAuth;
