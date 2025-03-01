import React, { useState } from "react";
import {
    View, Text, SafeAreaView, TextInput, TouchableOpacity,
    KeyboardAvoidingView, Alert, StyleSheet, ScrollView
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootStackScreenProps } from "../Navigation/RootNavigator";

const UserAuth = ({ navigation }: RootStackScreenProps<"UserLogin">) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const [isRegisterMode, setIsRegisterMode] = useState(false); // 🔥 Fix lỗi

    // 📌 Chuyển giữa đăng nhập & đăng ký
    const toggleAuthMode = () => {
        setIsRegisterMode(!isRegisterMode);
        setIsRegistering(false); // 🔥 Đặt lại trạng thái để tránh nút bị treo
        setIsSubmitting(false);
        setEmail("");
        setPassword("");
        setUsername("");
    };

    // 📌 Đăng nhập
    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) {
            Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin");
            return;
        }
        setIsSubmitting(true);

        try {
            const response = await axios.post("http://192.168.100.202:9000/user/loginUser", { email, password });
            const token = response.data.token;
            await AsyncStorage.setItem("authToken", token);
            Alert.alert("Đăng nhập thành công!");
            navigation.navigate("TabsStack", { screen: "Cart" });
        } catch (error) {
            Alert.alert("Lỗi đăng nhập", error.response?.data?.message || "Có lỗi xảy ra");
        } finally {
            setIsSubmitting(false);
        }
    };

    // 📌 Đăng ký
    const handleRegister = async () => {
        if (!username.trim() || !email.trim() || !password.trim()) {
            Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin đăng ký");
            return;
        }
        setIsRegistering(true);

        try {
            const response = await axios.post("http://192.168.100.202:9000/user/registerUser", { username, email, password });

            if (response.status === 201 || response.status === 200) {
                Alert.alert("Đăng ký thành công!", "Bạn có thể đăng nhập ngay bây giờ");
                setUsername("");
                setEmail("");
                setPassword("");
                setIsRegistering(false);
                setIsRegisterMode(false); // 🔥 Quay về trang đăng nhập
            }
        } catch (error) {
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
                        <TextInput
                            style={styles.input}
                            placeholder="Tên đăng nhập"
                            value={username}
                            onChangeText={setUsername}
                        />
                    )}
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Mật khẩu"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />

                    {isRegisterMode ? (
                        <TouchableOpacity
                            style={[styles.button, isRegistering && styles.buttonDisabled]}
                            onPress={handleRegister}
                            disabled={isRegistering}
                        >
                            <Text style={styles.buttonText}>{isRegistering ? "Đang xử lý..." : "Đăng ký"}</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            style={[styles.button, isSubmitting && styles.buttonDisabled]}
                            onPress={handleLogin}
                            disabled={isSubmitting}
                        >
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f9f9f9"
    },
    innerContainer: {
        width: "80%",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    input: {
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: "#fff"
    },
    button: {
        backgroundColor: "#007bff",
        padding: 15,
        borderRadius: 8,
        alignItems: "center"
    },
    buttonDisabled: {
        backgroundColor: "#ccc"
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16
    },
    switchText: {
        textAlign: "center",
        marginTop: 15,
        color: "#007bff",
        fontWeight: "bold"
    }
});

export default UserAuth;
