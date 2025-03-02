import { View, Text, Platform, Pressable, FlatList, StyleSheet } from "react-native";
import React, { useContext, useState, useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeadersComponent } from "../Components/HeaderComponents/HeaderComponent";
import { TabsStackScreenProps } from "../Navigation/TabsNavigation";
import { useSelector, useDispatch } from "react-redux";
import { CartState } from "../TypesCheck/productCartTypes";
import DisplayMessage from "../Components/ProductDetails/DisplayMessage";
import { UserType } from "../Components/LoginRegisterComponents/UserContext";
import { increaseQuantity, decreaseQuantity, removeFromCart } from "../redux/CartReducer";

const CartScreen = ({ navigation }: TabsStackScreenProps<"Cart">) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: CartState) => state.cart.cart);
  const [message, setMessage] = useState("");
  const [displayMessage, setDisplayMessage] = useState<boolean>(false);
  const { getUserId } = useContext(UserType);

  // ✅ Tính tổng tiền dùng useMemo để tránh re-render không cần thiết
  const totalAmount = useMemo(() =>
    cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cart]
  );

  const gotoCartScreen = () => {
    if (cart.length === 0) {
      setMessage("Giỏ hàng trống. Vui lòng thêm sản phẩm.");
      setDisplayMessage(true);
      setTimeout(() => setDisplayMessage(false), 3000);
      navigation.navigate("Home");
    }
  };

  const goToPreviousScreen = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("Home");
    }
  };

  const proceed = () => {
    if (!getUserId) {
      navigation.navigate("UserLogin", {
        redirectTo: "Payment",
        totalAmount,
        previousScreen: "CartScreen",
      });
    } else {
      cart.length === 0
        ? navigation.navigate("TabsStack", { screen: "Home" })
        : navigation.navigate("Payment", { totalAmount });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {displayMessage && <DisplayMessage message={message} visible={() => setDisplayMessage(!displayMessage)} />}
      <HeadersComponent gotoCartScreen={gotoCartScreen} cartLength={cart.length} gotoPrevious={goToPreviousScreen} />

      {cart.length > 0 ? (
        <FlatList
          data={cart}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Text style={styles.itemText}>🛍️ {item.name}</Text>
              <Text style={styles.itemDetail}>💰 Giá: ${item.price.toLocaleString()}</Text>
              <Text style={styles.itemDetail}>🎨 Màu: {item.color}</Text>
              <Text style={styles.itemDetail}>📏 Size: {item.size}</Text>
              <Text style={styles.itemDetail}>🔢 Số lượng: {item.quantity}</Text>

              {/* ✅ Các nút Tăng/Giảm/Xóa sản phẩm */}
              <View style={styles.actionContainer}>
                <Pressable onPress={() => dispatch(decreaseQuantity(item._id))} style={styles.quantityButton}>
                  <Text style={styles.buttonText}>➖</Text>
                </Pressable>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <Pressable onPress={() => dispatch(increaseQuantity(item._id))} style={styles.quantityButton}>
                  <Text style={styles.buttonText}>➕</Text>
                </Pressable>
                <Pressable onPress={() => dispatch(removeFromCart(item._id))} style={styles.deleteButton}>
                  <Text style={styles.buttonText}>🗑️</Text>
                </Pressable>
              </View>
            </View>
          )}
          contentContainerStyle={{ padding: 20 }}
        />
      ) : (
        <Text style={styles.emptyCartText}>🛒 Giỏ hàng trống</Text>
      )}

      {cart.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.totalText}>💵 Tổng tiền: {totalAmount.toLocaleString()} VNĐ</Text>
          <Pressable onPress={proceed} style={styles.checkoutButton}>
            <Text style={styles.checkoutText}>🛍️ Thanh toán ({cart.length})</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? 40 : 0,
    flex: 1,
    backgroundColor: "#1A1A1A",
  },
  cartItem: {
    backgroundColor: "#292929",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  itemText: {
    color: "#FFD700",
    fontSize: 18,
    fontWeight: "bold",
  },
  itemDetail: {
    color: "#E0E0E0",
    fontSize: 16,
  },
  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  quantityButton: {
    backgroundColor: "#444",
    padding: 8,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  deleteButton: {
    backgroundColor: "#D32F2F",
    padding: 8,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: "#FFD700",
    fontSize: 18,
  },
  quantityText: {
    color: "#FFD700",
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyCartText: {
    color: "#FFD700",
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
  },
  footer: {
    backgroundColor: "#333",
    padding: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
  },
  totalText: {
    color: "#FFD700",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  checkoutButton: {
    backgroundColor: "#FFC72C",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    width: "90%",
  },
  checkoutText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4B0082",
  },
});
