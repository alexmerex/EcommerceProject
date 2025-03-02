import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabsStackScreenProps } from "../Navigation/TabsNavigation";
import { UserType } from "../Components/LoginRegisterComponents/UserContext";

const ProfileScreen = ({ navigation }: TabsStackScreenProps<"Profile">) => {
  const { userId, setUserId } = useContext(UserType); // 🔹 Lấy thông tin user từ context

  // ✅ Xử lý đăng xuất
  const handleLogout = () => {
    Alert.alert("Đăng xuất", "Bạn có chắc muốn đăng xuất không?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Đăng xuất",
        onPress: () => {
          setUserId(null); // 🔹 Xóa userId trong context
          navigation.replace("UserLogin"); // 🔹 Chuyển về màn hình đăng nhập
        },
      },
    ]);
  };

  // ✅ Xử lý điều hướng đến màn hình đăng nhập / đăng ký
  const handleLoginRegister = () => {
    console.log("Navigating to LoginRegisterScreen..."); // Debug log
    navigation.navigate("UserLogin", { previousScreen: "ProfileScreen" });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Hồ sơ cá nhân</Text>

      {userId ? (
        // ✅ Nếu đã đăng nhập: Hiển thị thông tin user + nút đăng xuất
        <View style={styles.profileContainer}>
          <Text style={styles.infoText}>Mã người dùng: {userId}</Text>
          <Text style={styles.infoText}>Email: user@example.com</Text>
          <Text style={styles.infoText}>Số điện thoại: 0123456789</Text>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // ✅ Nếu chưa đăng nhập: Hiển thị nút Đăng nhập / Đăng ký
        <View style={styles.authContainer}>
          <Text style={styles.infoText}>Bạn chưa đăng nhập!</Text>
          <TouchableOpacity style={styles.loginButton} onPress={handleLoginRegister}>
            <Text style={styles.loginText}>Đăng nhập / Đăng ký</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ProfileScreen;

// 📌 Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  profileContainer: {
    width: "100%",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  authContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  loginButton: {
    marginTop: 10,
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  loginText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: "#FF3B30",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
