import React, { useState, useEffect, useCallback, useMemo } from "react";
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
  const [loading, setLoading] = useState<boolean>(false);

  // ✅ Lấy dữ liệu từ params hoặc AsyncStorage
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

  // ✅ Hàm chọn phương thức thanh toán tối ưu hóa với useCallback
  const handlePaymentMethodSelect = useCallback((method: string) => {
    setSelectedMethod(method);
  }, []);

  // ✅ Tính toán lại tổng tiền chỉ khi totalAmount thay đổi
  const formattedTotalAmount = useMemo(() => {
    return totalAmount.toLocaleString() + " VNĐ";
  }, [totalAmount]);

  // ✅ Xử lý thanh toán
  const handlePayment = useCallback(() => {
    if (!selectedMethod) {
      Alert.alert("Lỗi", "Vui lòng chọn phương thức thanh toán!");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        "Thanh toán thành công!",
        `Bạn đã thanh toán ${formattedTotalAmount} bằng ${selectedMethod}.`,
        [{ text: "OK", onPress: () => navigateToHome() }]
      );

      AsyncStorage.removeItem("totalAmount");
    }, 2000);
  }, [selectedMethod, formattedTotalAmount]);

  // ✅ Điều hướng chính xác về Home
  const navigateToHome = useCallback(() => {
    navigation.navigate("TabsStack", { screen: "Home" });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chọn phương thức thanh toán</Text>

      {["Ví điện tử", "Thẻ ngân hàng", "Tiền mặt khi nhận hàng"].map((method) => (
        <TouchableOpacity
          key={method}
          style={[
            styles.option,
            selectedMethod === method && styles.selectedOption,
          ]}
          onPress={() => handlePaymentMethodSelect(method)}
          activeOpacity={0.7}
        >
          <Text style={styles.optionText}>
            {method === "Ví điện tử" ? "💳" : method === "Thẻ ngân hàng" ? "🏦" : "💵"} {method}
          </Text>
        </TouchableOpacity>
      ))}

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Tổng tiền: {formattedTotalAmount}</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" style={styles.loadingIndicator} />
      ) : (
        <TouchableOpacity style={styles.payButton} onPress={handlePayment} activeOpacity={0.7}>
          <Text style={styles.payButtonText}>Thanh toán ngay</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PaymentScreen;

// ✅ Style tối ưu và chuyên nghiệp hơn
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F5F9",
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  option: {
    width: "100%",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  selectedOption: {
    borderColor: "#007bff",
    backgroundColor: "#e6f0ff",
  },
  optionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  totalContainer: {
    marginVertical: 20,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  payButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
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
