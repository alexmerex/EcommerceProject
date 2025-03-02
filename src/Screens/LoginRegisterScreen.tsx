import React, { useState, useCallback } from "react";
import {
    View, SafeAreaView, KeyboardAvoidingView, Alert, StyleSheet, ScrollView
} from "react-native";
import { TextInput, Button, Text, HelperText, ActivityIndicator } from "react-native-paper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootStackScreenProps } from "../Navigation/RootNavigator";

const UserAuth = ({ navigation, route }: RootStackScreenProps<"UserLogin">) => {
    const [user, setUser] = useState({ firstName: "", lastName: "", email: "", mobileNo: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [isRegisterMode, setIsRegisterMode] = useState(false);
    const totalAmount = route.params?.totalAmount ?? 0;
    const previousScreen = route.params?.previousScreen ?? "";

    // 📌 Xử lý nhập dữ liệu
    const handleChange = (key: keyof typeof user, value: string) => {
        setUser({ ...user, [key]: value });
    };

    // 📌 Kiểm tra lỗi
    const hasError = (field: keyof typeof user) => !user[field].trim();

    // 📌 Chuyển giữa đăng nhập & đăng ký
    const toggleAuthMode = useCallback(() => {
        setIsRegisterMode(prev => !prev);
        setUser({ firstName: "", lastName: "", email: "", mobileNo: "", password: "" });
    }, []);

    // 📌 Xử lý điều hướng sau đăng nhập
    const handleLoginSuccess = async (userData: any) => {
        console.log("Dữ liệu userData nhận được:", userData); // Log dữ liệu userData

        try {
            await AsyncStorage.setItem("userData", JSON.stringify(userData));
            Alert.alert("Đăng nhập thành công!");

            if (previousScreen === "CartScreen") {
                console.log("Chuyển hướng đến Payment với totalAmount:", totalAmount);
                navigation.replace("Payment", { totalAmount });
            } else {
                console.log("Chuyển hướng đến Profile với userData:", userData);
                navigation.navigate("TabsStack", { screen: "Profile", params: { userData } });
            }
        } catch (error) {
            console.error("Lỗi khi lưu dữ liệu vào AsyncStorage:", error);
        }
    };




    // 📌 Đăng nhập
    const handleLogin = async () => {
        if (hasError("email") || hasError("password")) {
            Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin");
            return;
        }
        setLoading(true);
        try {
            const { data } = await axios.post("http://172.168.11.225:9000/user/loginUser", user);
            handleLoginSuccess(data);  // Lưu toàn bộ thông tin user vào AsyncStorage
        } catch (error) {
            Alert.alert("Lỗi đăng nhập", error.response?.data?.message || "Có lỗi xảy ra");
        } finally {
            setLoading(false);
        }
    };


    // 📌 Đăng ký
    const handleRegister = async () => {
        if (Object.keys(user).some(key => hasError(key as keyof typeof user))) {
            Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin đăng ký");
            return;
        }
        setLoading(true);
        try {
            const { status } = await axios.post("http://172.168.11.225:9000/user/registerUser", user);
            if (status === 201 || status === 200) {
                Alert.alert("Đăng ký thành công!", "Bạn có thể đăng nhập ngay bây giờ");
                toggleAuthMode();
            }
        } catch (error) {
            Alert.alert("Lỗi đăng ký", error.response?.data?.message || "Có lỗi xảy ra");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior="padding" style={styles.innerContainer}>
                <ScrollView contentContainerStyle={{ padding: 20 }}>
                    <Text variant="headlineMedium" style={styles.title}>
                        {isRegisterMode ? "Đăng Ký" : "Đăng Nhập"}
                    </Text>

                    {isRegisterMode && (
                        <>
                            <TextInput
                                label="Họ"
                                value={user.firstName}
                                onChangeText={value => handleChange("firstName", value)}
                                style={styles.input}
                                error={hasError("firstName")}
                            />
                            <HelperText type="error" visible={hasError("firstName")}>Họ không được để trống</HelperText>

                            <TextInput
                                label="Tên"
                                value={user.lastName}
                                onChangeText={value => handleChange("lastName", value)}
                                style={styles.input}
                                error={hasError("lastName")}
                            />
                            <HelperText type="error" visible={hasError("lastName")}>Tên không được để trống</HelperText>

                            <TextInput
                                label="Số điện thoại"
                                value={user.mobileNo}
                                onChangeText={value => handleChange("mobileNo", value)}
                                keyboardType="phone-pad"
                                style={styles.input}
                                error={hasError("mobileNo")}
                            />
                            <HelperText type="error" visible={hasError("mobileNo")}>Số điện thoại không hợp lệ</HelperText>
                        </>
                    )}

                    <TextInput
                        label="Email"
                        value={user.email}
                        onChangeText={value => handleChange("email", value)}
                        keyboardType="email-address"
                        style={styles.input}
                        error={hasError("email")}
                    />
                    <HelperText type="error" visible={hasError("email")}>Email không hợp lệ</HelperText>

                    <TextInput
                        label="Mật khẩu"
                        value={user.password}
                        onChangeText={value => handleChange("password", value)}
                        secureTextEntry
                        style={styles.input}
                        error={hasError("password")}
                    />
                    <HelperText type="error" visible={hasError("password")}>Mật khẩu không được để trống</HelperText>

                    <Button
                        mode="contained"
                        onPress={isRegisterMode ? handleRegister : handleLogin}
                        loading={loading}
                        style={styles.button}
                    >
                        {loading ? "Đang xử lý..." : isRegisterMode ? "Đăng Ký" : "Đăng Nhập"}
                    </Button>

                    <Button onPress={toggleAuthMode} mode="text">
                        {isRegisterMode ? "Đã có tài khoản? Đăng nhập" : "Chưa có tài khoản? Đăng ký ngay"}
                    </Button>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

// 📌 Styles tối ưu
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f4f4f4" },
    innerContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
    title: { fontWeight: "bold", textAlign: "center", marginBottom: 20 },
    input: { marginBottom: 10, backgroundColor: "white" },
    button: { marginVertical: 10 },
});

export default UserAuth;
