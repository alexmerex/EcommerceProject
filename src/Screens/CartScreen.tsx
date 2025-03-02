import { View, Text, Platform, Pressable } from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeadersComponent } from "../Components/HeaderComponents/HeaderComponent";
import { TabsStackScreenProps } from "../Navigation/TabsNavigation";
import { useSelector } from "react-redux";
import { CartState } from "../TypesCheck/productCartTypes";
import DisplayMessage from "../Components/ProductDetails/DisplayMessage";
import { UserType } from "../Components/LoginRegisterComponents/UserContext";

const CartScreen = ({ navigation }: TabsStackScreenProps<"Cart">) => {
  const cart = useSelector((state: CartState) => state.cart.cart);

  console.log("Cart Items:", cart);

  const [message, setMessage] = useState("");
  const [displayMessage, setDisplayMessage] = useState<boolean>(false);

  const { getUserId } = useContext(UserType); // ✅ Lấy userId từ context

  // ✅ Tính tổng tiền đơn hàng
  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const gotoCartScreen = () => {
    if (cart.length === 0) {
      setMessage("Cart is empty. Please add products to cart.");
      setDisplayMessage(true);
      setTimeout(() => {
        setDisplayMessage(false);
      }, 3000);
      navigation.navigate("Home");
    }
  };

  const goToPreviousScreen = () => {
    if (navigation.canGoBack()) {
      console.log("Chuyển về trang trước.");
      navigation.goBack();
    } else {
      console.log("Không thể quay lại, chuyển về trang Home.");
      navigation.navigate("Home");
    }
  };

  // ✅ Xử lý mua hàng: Nếu có user thì chuyển đến màn hình Payment
  const proceed = () => {
    if (!getUserId) {
      // ✅ Nếu chưa đăng nhập, điều hướng đến UserLogin và truyền cả `totalAmount`
      navigation.navigate("UserLogin", {
        redirectTo: "Payment",
        totalAmount, // ✅ Truyền tổng tiền qua màn hình đăng nhập
        previousScreen: "CartScreen"
      });
    } else {
      if (cart.length === 0) {
        navigation.navigate("TabsStack", { screen: "Home" });
      } else {
        // ✅ Đảm bảo tổng tiền được truyền chính xác đến PaymentScreen
        navigation.navigate("Payment", { totalAmount });
      }
    }
  };

  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? 40 : 0,
        flex: 1,
        backgroundColor: "black",
      }}
    >
      {displayMessage && <DisplayMessage message={message} visible={() => setDisplayMessage(!displayMessage)} />}

      <HeadersComponent gotoCartScreen={gotoCartScreen} cartLength={cart.length} gotoPrevious={goToPreviousScreen} />

      {cart.length > 0 ? (
        <View style={{ padding: 20 }}>
          {cart.map((item, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <Text style={{ color: "white", fontSize: 18 }}>Tên sản phẩm: {item.name}</Text>
              <Text style={{ color: "white", fontSize: 16 }}>Giá: ${item.price}</Text>
              <Text style={{ color: "white", fontSize: 16 }}>Màu: {item.color}</Text>
              <Text style={{ color: "white", fontSize: 16 }}>Size: {item.size}</Text>
              <Text style={{ color: "white", fontSize: 16 }}>Số lượng: {item.quantity}</Text>
            </View>
          ))}

          {/* ✅ Hiển thị tổng tiền */}
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold", marginTop: 10 }}>
            Tổng tiền: {totalAmount.toLocaleString()} $
          </Text>
        </View>
      ) : (
        <Text style={{ color: "white", textAlign: "center", marginTop: 20 }}>Giỏ hàng trống</Text>
      )}

      {/* ✅ Nút bấm thanh toán */}
      <Pressable
        onPress={proceed}
        style={{
          backgroundColor: "#FFC72C",
          padding: 10,
          borderRadius: 5,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginTop: 10,
        }}
      >
        <Text style={{ fontSize: 28, fontWeight: "bold", color: "purple" }}>
          Thanh toán ({cart.length})
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default CartScreen;
