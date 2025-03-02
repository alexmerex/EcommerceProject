import React, { useState, useEffect, useContext, memo } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabsStackScreenProps } from "../Navigation/TabsNavigation";
import { UserType } from "../Components/LoginRegisterComponents/UserContext";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = ({ navigation, route }: TabsStackScreenProps<"Profile">) => {
  const { setUserId } = useContext(UserType);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (route.params?.userData) {
      setUserData(route.params.userData.user || route.params.userData);
    } else {
      getUserData();
    }
  }, [route.params]);

  const getUserData = async () => {
    try {
      const data = await AsyncStorage.getItem("userData");
      if (data) {
        const parsedData = JSON.parse(data);
        setUserData(parsedData.user || parsedData);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu từ AsyncStorage:", error);
    } finally {
      setLoading(false);
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
    { label: "Email", value: userData?.email || "user@example.com" },
    { label: "Họ", value: userData?.firstName || "Chưa cập nhật" },
    { label: "Tên", value: userData?.lastName || "Chưa cập nhật" },
    { label: "Số điện thoại", value: userData?.mobileNo || "Chưa cập nhật" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Hồ sơ cá nhân</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : userData ? (
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
        <Text style={styles.noDataText}>Không có thông tin người dùng</Text>
      )}
    </SafeAreaView>
  );
};

export default memo(ProfileScreen);

// 🌟 **Thiết kế giao diện**
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5", padding: 20, alignItems: "center" },
  title: { fontSize: 26, fontWeight: "bold", color: "#333", marginBottom: 20 },
  profileContainer: {
    width: "100%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0"
  },
  label: { fontSize: 16, fontWeight: "600", color: "#444" },
  value: { fontSize: 16, color: "#666" },
  logoutButton: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF3B30",
    padding: 14,
    borderRadius: 8
  },
  logoutText: { color: "white", fontSize: 16, fontWeight: "bold", marginLeft: 8 },
  noDataText: { fontSize: 16, color: "#888", marginTop: 20 },
});
