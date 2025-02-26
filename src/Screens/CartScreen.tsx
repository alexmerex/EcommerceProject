import { View, Text, Platform, Alert } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeadersComponent } from "../Components/HeaderComponents/HeaderComponent";
import { TabsStackScreenProps } from "../Navigation/TabsNavigation";
import { useSelector } from "react-redux";
import { CartState } from "../TypesCheck/productCartTypes";
import DisplayMessage from "../Components/ProductDetails/DisplayMessage";

const CartScreen = ({ navigation, route }: TabsStackScreenProps<"Cart">) => {
  const cart = useSelector((state: CartState) => state.cart.cart);

  // ✅ Thêm state `message` và `displayMessage`
  const [message, setMessage] = React.useState("");
  const [displayMessage, setDisplayMessage] = React.useState<boolean>(false);

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
      <HeadersComponent gotoCartScreen={gotoCartScreen} cartLength={cart.length} gotoPrevious={goToPreviousScreen} />

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
    </SafeAreaView>
  );
};

export default CartScreen;
