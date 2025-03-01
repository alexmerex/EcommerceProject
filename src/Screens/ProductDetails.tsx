import {
    View, Image, Text, Platform, ScrollView, Dimensions, Pressable, SafeAreaView, ImageBackground
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { RootStackScreenProps } from '../Navigation/RootNavigator';
import { HeadersComponent } from '../Components/HeaderComponents/HeaderComponent';
import DisplayMessage from '../Components/ProductDetails/DisplayMessage';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { CartState } from '../TypesCheck/productCartTypes';
import { ProductListParams } from '../TypesCheck/HomeProps';
import { addToCart } from '../redux/CartReducer';

const { width, height } = Dimensions.get("window");

const ProductDetails = ({ navigation, route }: RootStackScreenProps<"productDetails">) => {
    const { _id, images, name, price, oldPrice, inStock, color, size, description, quantity } = route.params;

    // Log thông tin sản phẩm nhận được từ route.params
    useEffect(() => {
        console.log("Product details received:", {
            _id,
            images,
            name,
            price,
            oldPrice,
            inStock,
            color,
            size,
            description,
            quantity
        });
    }, [route.params]);

    const cart = useSelector((state: CartState) => state.cart.cart);
    const dispatch = useDispatch();

    const [addedToCart, setAddedToCart] = useState(false);
    const [message, setMessage] = useState("");
    const [displayMessage, setDisplayMessage] = useState<boolean>(false);

    // Hàm thêm sản phẩm vào giỏ hàng
    const addItemToCart = (ProductItemObj: ProductListParams) => {
        if (ProductItemObj.quantity <= 0) {
            setMessage("Product is out of stock.");
            setDisplayMessage(true);
            setTimeout(() => setDisplayMessage(false), 3000);
        } else {
            const findItem = cart.find((product) => product._id === _id);
            if (findItem) {
                setMessage("Product is already in cart.");
                setDisplayMessage(true);
                setTimeout(() => setDisplayMessage(false), 3000);
            } else {
                setAddedToCart(!addedToCart);
                dispatch(addToCart(ProductItemObj));
                setMessage("Product added to cart successfully.");
                setDisplayMessage(true);
                setTimeout(() => setDisplayMessage(false), 3000);
            }
        }
    };

    // Hàm điều hướng đến màn hình giỏ hàng
    const gotoCartScreen = () => {
        if (cart.length === 0) {
            setMessage("Cart is empty. Please add products to cart.");
            setDisplayMessage(true);
            setTimeout(() => setDisplayMessage(false), 3000);
        } else {
            navigation.navigate("TabsStack", { screen: "Cart" });
        }
    };

    // Hàm quay lại trang trước
    const goToPreviousScreen = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            navigation.navigate("OnBoardingScreen");
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white", paddingTop: Platform.OS === 'android' ? 20 : 0 }}>
            {displayMessage && <DisplayMessage message={message} visible={() => setDisplayMessage(!displayMessage)} />}
            <HeadersComponent gotoCartScreen={gotoCartScreen} cartLength={cart.length} gotoPrevious={goToPreviousScreen} />

            <ScrollView style={{ paddingHorizontal: 15, backgroundColor: "pink" }}>
                {/* Discount Badge */}
                {oldPrice && (
                    <View style={{
                        position: "absolute", top: 10, left: 10, backgroundColor: "#FF6347", padding: 5, borderRadius: 10,
                        zIndex: 1  // Đảm bảo phần giảm giá nằm trên hình ảnh
                    }}>
                        <Text style={{ color: "white", fontWeight: "bold" }}>
                            {((1 - price / oldPrice) * 100).toFixed(1)}% off
                        </Text>
                    </View>
                )}

                {/* Product Image */}
                <View style={{
                    flexDirection: "row", justifyContent: "center", alignItems: "center", paddingTop: 20, position: "relative"
                }}>
                    <Image
                        style={{
                            width: '100%',
                            height: undefined,
                            aspectRatio: 1, // Giữ tỷ lệ hình ảnh phù hợp
                            resizeMode: 'contain', // Đảm bảo hình ảnh không bị kéo dài hoặc méo
                            borderRadius: 10
                        }}
                        source={{ uri: images[0] }}
                    />
                </View>

                {/* Product Name and Description */}
                <View style={{ marginTop: 20 }}>
                    <Text style={{ fontSize: 28, fontWeight: "bold", textAlign: "center", color: "#333" }}>{name}</Text>
                    <Text style={{ fontSize: 20, textAlign: "center", color: "#33a02c", marginVertical: 5 }}>Price: {price} $</Text>
                    {oldPrice && <Text style={{ fontSize: 16, textAlign: "center", color: "red", textDecorationLine: "line-through" }}>Old Price: {oldPrice} $</Text>}
                    {description && <Text style={{ fontSize: 16, textAlign: "center", color: "#555", marginVertical: 10 }}>{description}</Text>}
                    <Text style={{ fontSize: 16, textAlign: "center", color: "#333" }}>Stock: {inStock ? "Available" : "Out of stock"}</Text>
                    {color && <Text style={{ fontSize: 16, textAlign: "center", color: "#333" }}>Color: {color}</Text>}
                    {size && <Text style={{ fontSize: 16, textAlign: "center", color: "#333" }}>Size: {size}</Text>}
                    <Text style={{ fontSize: 16, textAlign: "center", color: "#333", marginBottom: 20 }}>Quantity: {quantity}</Text>

                    {/* Favorite Button */}
                    <Pressable style={{
                        position: "absolute", bottom: 60, left: 15, backgroundColor: "#E0E0E0", padding: 10, borderRadius: 30
                    }}>
                        <AntDesign name='heart' size={25} color="grey" />
                    </Pressable>

                    {/* Add to Cart Button */}
                    <Pressable
                        style={{
                            backgroundColor: "#33a02c", paddingVertical: 15, alignItems: "center", justifyContent: "center",
                            borderRadius: 10, margin: 20
                        }}
                        onPress={() => addItemToCart(route.params)}
                    >
                        <Text style={{ color: addedToCart ? "violet" : "white", fontSize: 18, fontWeight: "bold" }}>
                            Add to Cart
                        </Text>
                    </Pressable>

                    {/* Delivery Information */}
                    <View style={{
                        backgroundColor: "#FFCC00", padding: 10, borderRadius: 10, marginTop: 20
                    }}>
                        <Text style={{ color: "black", fontWeight: "bold" }}>Delivery is Available</Text>
                        <Text style={{ color: "black" }}>
                            Delivery to: CAMPUS THANH THAI 7/1 Thanh Thai, Ward 14, District 10, Ho Chi Minh City
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ProductDetails;
