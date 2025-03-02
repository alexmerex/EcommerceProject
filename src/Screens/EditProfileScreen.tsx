import React, { useState, useContext, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserType } from "../Components/LoginRegisterComponents/UserContext";

const EditProfileScreen = ({ navigation, route }: any) => {
    const { userData } = route.params;
    const { setUserId } = useContext(UserType);
    const [userInfo, setUserInfo] = useState(userData);

    const handleChange = (field: string, value: string) => {
        setUserInfo({ ...userInfo, [field]: value });
    };

    const handleSave = async () => {
        try {
            await AsyncStorage.setItem("userData", JSON.stringify(userInfo));
            setUserId(userInfo); // Cập nhật Context
            Alert.alert("Thành công", "Thông tin đã được cập nhật!");
            navigation.goBack();
        } catch (error) {
            console.error("Lỗi khi lưu thông tin:", error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Chỉnh sửa thông tin</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={userInfo.email}
                editable={false} // Không cho sửa email
            />
            <TextInput
                style={styles.input}
                placeholder="Họ"
                value={userInfo.firstName}
                onChangeText={(text) => handleChange("firstName", text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Tên"
                value={userInfo.lastName}
                onChangeText={(text) => handleChange("lastName", text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Số điện thoại"
                value={userInfo.mobileNo}
                keyboardType="phone-pad"
                onChangeText={(text) => handleChange("mobileNo", text)}
            />

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveText}>Lưu thay đổi</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F5F5F5", padding: 20 },
    title: { fontSize: 24, fontWeight: "bold", color: "#333", marginBottom: 20, textAlign: "center" },
    input: {
        backgroundColor: "#fff",
        padding: 12,
        marginBottom: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    saveButton: {
        backgroundColor: "#007AFF",
        padding: 14,
        borderRadius: 8,
        alignItems: "center",
    },
    saveText: { color: "white", fontSize: 16, fontWeight: "bold" },
});
