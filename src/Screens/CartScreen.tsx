import { View, Text, Platform, Alert, Pressable } from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeadersComponent } from "../Components/HeaderComponents/HeaderComponent";
import { TabsStackScreenProps } from "../Navigation/TabsNavigation";
import { useSelector } from "react-redux";
import { CartState } from "../TypesCheck/productCartTypes";
import DisplayMessage from "../Components/ProductDetails/DisplayMessage";
import { UserType } from "../Components/LoginRegisterComponents/UserContext";

// ✅ Bổ sung useContext để lấy thông tin user
const CartScreen = ({ navigation, route }: TabsStackScreenProps<"Cart">) => {
  const cart = useSelector((state: CartState) => state.cart.cart);

  // ✅ Hiển thị thông tin giỏ hàng trên console
  console.log("Cart Items:", cart);

  // ✅ Thêm state `message` và `displayMessage`
  const [message, setMessage] = useState("");
  const [displayMessage, setDisplayMessage] = useState<boolean>(false);

  // ✅ Lấy thông tin user từ context
  const { getUserId, setGetUserId } = useContext(UserType);

  // ✅ Hàm điều hướng đến giỏ hàng
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

  // ✅ Hàm quay lại màn hình trước
  const goToPreviousScreen = () => {
    if (navigation.canGoBack()) {
      console.log("Chuyển về trang trước.");
      navigation.goBack();
    } else {
      console.log("Không thể quay lại, chuyển về trang Home.");
      navigation.navigate("Home");
    }
  };

  // ✅ Hàm xử lý mua hàng
  const proceed = () => {
    if (getUserId === "") {
      navigation.navigate("UserLogin", { screenTitle: "User Authentication" });
    } else {
      if (cart.length === 0) {
        navigation.navigate("TabsStack", { screen: "Home" });
      } else {
        Alert.alert("Proceeding with checkout...");
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
      {/* ✅ Hiển thị thông báo nếu giỏ hàng trống */}
      {displayMessage && <DisplayMessage message={message} visible={() => setDisplayMessage(!displayMessage)} />}

      {/* ✅ Truyền thêm `gotoCartScreen` và `goToPreviousScreen` */}
      <HeadersComponent gotoCartScreen={gotoCartScreen} cartLength={cart.length} gotoPrevious={goToPreviousScreen} />

      {/* ✅ Hiển thị thông tin sản phẩm nếu có */}
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
          Click to buy ({cart.length})
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default CartScreen;