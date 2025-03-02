import React, { useContext, memo } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabsStackScreenProps } from "../Navigation/TabsNavigation";
import { UserType } from "../Components/LoginRegisterComponents/UserContext";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = ({ navigation }: TabsStackScreenProps<"Profile">) => {
  const { userId, setUserId } = useContext(UserType);

  const handleLogout = () => {
    Alert.alert("Đăng xuất", "Bạn có chắc muốn đăng xuất không?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Đăng xuất",
        onPress: () => {
          setUserId(null);
          navigation.replace("UserLogin");
        },
      },
    ]);
  };

  const userInfo = [
    { label: "Mã người dùng", value: userId },
    { label: "Email", value: "user@example.com" },
    { label: "Số điện thoại", value: "0123456789" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Hồ sơ cá nhân</Text>
      {userId ? (
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
        <View style={styles.authContainer}>
          <Text style={styles.infoText}>Bạn chưa đăng nhập!</Text>
          <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate("UserLogin", { previousScreen: "ProfileScreen" })}>
            <Text style={styles.loginText}>Đăng nhập / Đăng ký</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default memo(ProfileScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  profileContainer: {
    width: "100%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
  },
  value: {
    fontSize: 16,
    color: "#666",
  },
  authContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  loginButton: {
    marginTop: 10,
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  loginText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF3B30",
    padding: 12,
    borderRadius: 8,
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
});
