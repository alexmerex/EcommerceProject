import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TabsStackScreenProps } from "../Navigation/TabsNavigation";

const PaymentScreen = ({ navigation, route }: TabsStackScreenProps<"Payment">) => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false); // 🆕 Thêm trạng thái loading

  // 📌 Nhận `totalAmount` từ `route.params` hoặc lấy từ AsyncStorage
  useEffect(() => {
    const fetchTotalAmount = async () => {
      try {
        if (route.params?.totalAmount) {
          setTotalAmount(route.params.totalAmount);
          await AsyncStorage.setItem("totalAmount", route.params.totalAmount.toString());
        } else {
          const savedAmount = await AsyncStorage.getItem("totalAmount");
          if (savedAmount) setTotalAmount(parseFloat(savedAmount));
        }
      } catch (error) {
        console.error("Lỗi khi lấy tổng tiền:", error);
      }
    };
    fetchTotalAmount();
  }, [route.params?.totalAmount]);

  // 📌 Xử lý khi chọn phương thức thanh toán
  const handlePaymentMethodSelect = (method: string) => {
    setSelectedMethod(method);
  };

  // 📌 Xử lý thanh toán
  const handlePayment = () => {
    if (!selectedMethod) {
      Alert.alert("Lỗi", "Vui lòng chọn phương thức thanh toán!");
      return;
    }

    setLoading(true); // 🆕 Hiển thị loading

    // 🔥 Giả lập quá trình thanh toán (có thể thay bằng API thực tế)
    setTimeout(() => {
      setLoading(false); // 🆕 Ẩn loading
      Alert.alert(
        "Thanh toán thành công!",
        `Bạn đã thanh toán ${totalAmount.toLocaleString()} VNĐ bằng ${selectedMethod}.`,
        [{ text: "OK", onPress: () => navigateToHome() }]
      );

      // 🗑️ Xóa totalAmount sau khi thanh toán thành công
      AsyncStorage.removeItem("totalAmount");
    }, 2000);
  };

  // 📌 ✅ Điều hướng chính xác về Home trong TabsStack
  const navigateToHome = () => {
    navigation.navigate("TabsStack", { screen: "Home" }); // ✅ Điều hướng chính xác về Home trong TabsStack

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chọn phương thức thanh toán</Text>

      <TouchableOpacity
        style={[
          styles.option,
          selectedMethod === "Ví điện tử" && styles.selectedOption,
        ]}
        onPress={() => handlePaymentMethodSelect("Ví điện tử")}
      >
        <Text style={styles.optionText}>💳 Ví điện tử</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.option,
          selectedMethod === "Thẻ ngân hàng" && styles.selectedOption,
        ]}
        onPress={() => handlePaymentMethodSelect("Thẻ ngân hàng")}
      >
        <Text style={styles.optionText}>🏦 Thẻ ngân hàng</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.option,
          selectedMethod === "Tiền mặt khi nhận hàng" && styles.selectedOption,
        ]}
        onPress={() => handlePaymentMethodSelect("Tiền mặt khi nhận hàng")}
      >
        <Text style={styles.optionText}>💵 Tiền mặt khi nhận hàng</Text>
      </TouchableOpacity>

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Tổng tiền: {totalAmount.toLocaleString()} VNĐ</Text>
      </View>

      {/* Hiển thị Loading khi đang xử lý thanh toán */}
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" style={styles.loadingIndicator} />
      ) : (
        <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
          <Text style={styles.payButtonText}>Thanh toán ngay</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PaymentScreen;

// 📌 Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  option: {
    width: "100%",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  selectedOption: {
    borderColor: "#007bff",
    backgroundColor: "#e6f0ff",
  },
  optionText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  totalContainer: {
    marginVertical: 20,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  payButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  payButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  loadingIndicator: {
    marginTop: 10,
  },
});
