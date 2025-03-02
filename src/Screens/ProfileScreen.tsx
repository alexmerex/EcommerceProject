import React, { useState, useEffect, useContext, memo } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabsStackScreenProps } from "../Navigation/TabsNavigation";
import { UserType } from "../Components/LoginRegisterComponents/UserContext";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = ({ navigation, route }: TabsStackScreenProps<"Profile">) => {
  const { setUserId } = useContext(UserType);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    if (route.params?.userData) {
      console.log("🔹 Nhận dữ liệu từ navigation:", route.params.userData);
      setUserData(route.params.userData.user || route.params.userData);
    } else {
      console.log("⚠️ Không có userData từ navigation, lấy từ AsyncStorage...");
      getUserData();
    }
  }, [route.params]);

  const getUserData = async () => {
    try {
      const data = await AsyncStorage.getItem("userData");
      if (data) {
        const parsedData = JSON.parse(data);
        console.log("✅ Dữ liệu từ AsyncStorage:", parsedData);

        // Kiểm tra nếu có thuộc tính `user`, lấy `user`, nếu không lấy toàn bộ parsedData
        setUserData(parsedData.user || parsedData);
      } else {
        console.log("⚠️ Không tìm thấy userData trong AsyncStorage");
      }
    } catch (error) {
      console.error("❌ Lỗi khi lấy dữ liệu từ AsyncStorage:", error);
    }
  };

  const handleLogout = async () => {
    Alert.alert("Đăng xuất", "Bạn có chắc muốn đăng xuất không?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Đăng xuất",
        onPress: async () => {
          await AsyncStorage.removeItem("userData");
          setUserId(null);
          navigation.replace("UserLogin");
        },
      },
    ]);
  };

  const userInfo = [
    { label: "Mã người dùng", value: userData?._id || "Không có dữ liệu" },
    { label: "Email", value: userData?.email || "user@example.com" },
    { label: "Họ", value: userData?.firstName || "Không có dữ liệu" },
    { label: "Tên", value: userData?.lastName || "Không có dữ liệu" },
    { label: "Số điện thoại", value: userData?.mobileNo || "0123456789" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Hồ sơ cá nhân</Text>
      {userData ? (
        <View style={styles.profileContainer}>
          <FlatList
            data={userInfo}
            keyExtractor={(item) => item.label}
            renderItem={({ item }) => (
              <View style={styles.infoRow}>
                <Text style={styles.label}>{item.label}:</Text>
                <Text style={styles.value}>{item.value}</Text>
              </View>
            )}
          />
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color="white" />
            <Text style={styles.logoutText}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text>Đang tải dữ liệu...</Text>
      )}
    </SafeAreaView>
  );
};

export default memo(ProfileScreen);

// 🎨 CSS Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9", padding: 20, alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", color: "#333", marginBottom: 20 },
  profileContainer: { width: "100%", padding: 20, backgroundColor: "#fff", borderRadius: 12, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 6, elevation: 5 },
  infoRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#ddd" },
  label: { fontSize: 16, fontWeight: "bold", color: "#555" },
  value: { fontSize: 16, color: "#666" },
  logoutButton: { marginTop: 20, flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#FF3B30", padding: 12, borderRadius: 8 },
  logoutText: { color: "white", fontSize: 16, fontWeight: "bold", marginLeft: 8 },
});
