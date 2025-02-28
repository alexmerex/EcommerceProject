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
      navigation.navigate("Home"); // Điều hướng fallback nếu không quay lại được
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
        // Xử lý thanh toán ở đây...
        Alert.alert("Proceeding with checkout...");
      }
    }
  };

  // ✅ Nhận params từ navigation
  const { _id, images, name, price, color, size, quantity } = route.params || {};

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
      <HeadersComponent
        gotoCartScreen={gotoCartScreen}
        cartLength={cart.length}
        gotoPrevious={goToPreviousScreen}
      />

      {/* ✅ Hiển thị thông tin sản phẩm nếu có */}
      {name ? (
        <View style={{ padding: 20 }}>
          <Text style={{ color: "white", fontSize: 18 }}>Tên sản phẩm: {name}</Text>
          <Text style={{ color: "white", fontSize: 16 }}>Giá: ${price}</Text>
          <Text style={{ color: "white", fontSize: 16 }}>Màu: {color}</Text>
          <Text style={{ color: "white", fontSize: 16 }}>Size: {size}</Text>
          <Text style={{ color: "white", fontSize: 16 }}>Số lượng: {quantity}</Text>
        </View>
      ) : (
        <Text style={{ color: "white", textAlign: "center", marginTop: 20 }}>
          Giỏ hàng trống
        </Text>
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
