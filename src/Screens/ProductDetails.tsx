import {
    View, Image, Text, Platform, ScrollView, Dimensions, Pressable, SafeAreaView
} from 'react-native';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { RootStackScreenProps } from '../Navigation/RootNavigator';
import { HeadersComponent } from '../Components/HeaderComponents/HeaderComponent';
import DisplayMessage from '../Components/ProductDetails/DisplayMessage';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { CartState } from '../TypesCheck/productCartTypes';
import { ProductListParams } from '../TypesCheck/HomeProps';
import { addToCart } from "../redux/CartReducer";

const { width } = Dimensions.get("window");

const ProductDetails = ({ navigation, route }: RootStackScreenProps<"productDetails">) => {
    const {
        _id, images, name, price, oldPrice, inStock, color, size, description, quantity
    } = route.params;

    const cart = useSelector((state: CartState) => state.cart.cart);
    const dispatch = useDispatch();

    const [addedToCart, setAddedToCart] = useState(false);
    const [message, setMessage] = useState("");
    const [displayMessage, setDisplayMessage] = useState<boolean>(false);

    useEffect(() => {
        console.log("Product details:", route.params);
    }, [route.params]);

    const isItemInCart = useMemo(() => cart.some((item) => item._id === _id), [cart, _id]);

    const addItemToCart = useCallback(() => {
        if (quantity <= 0) {
            setMessage("Product is out of stock.");
        } else if (isItemInCart) {
            setMessage("Product is already in cart.");
        } else {
            dispatch(addToCart(route.params));
            setAddedToCart(true);
            setMessage("Product added to cart successfully.");
        }
        setDisplayMessage(true);
        setTimeout(() => setDisplayMessage(false), 3000);
    }, [dispatch, isItemInCart, quantity, route.params]);

    const gotoCartScreen = useCallback(() => {
        if (cart.length === 0) {
            setMessage("Cart is empty. Please add products to cart.");
            setDisplayMessage(true);
            setTimeout(() => setDisplayMessage(false), 3000);
        } else {
            navigation.navigate("TabsStack", { screen: "Cart" });
        }
    }, [cart.length, navigation]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F5F5", paddingTop: Platform.OS === 'android' ? 20 : 0 }}>
            {displayMessage && <DisplayMessage message={message} visible={() => setDisplayMessage(false)} />}
            <HeadersComponent gotoCartScreen={gotoCartScreen} cartLength={cart.length} gotoPrevious={navigation.goBack} />

            <ScrollView contentContainerStyle={{ padding: 15 }}>
                {/* Discount Badge */}
                {oldPrice && (
                    <View style={{
                        position: "absolute", top: 10, left: 10, backgroundColor: "#FF3B30", padding: 6, borderRadius: 8,
                        zIndex: 1
                    }}>
                        <Text style={{ color: "white", fontWeight: "bold" }}>
                            {((1 - price / oldPrice) * 100).toFixed(1)}% OFF
                        </Text>
                    </View>
                )}

                {/* Product Image */}
                <View style={{ alignItems: "center", marginBottom: 20 }}>
                    <Image
                        style={{
                            width: width * 0.9,
                            height: width * 0.9,
                            resizeMode: 'contain',
                            borderRadius: 10,
                            backgroundColor: "#fff"
                        }}
                        source={{ uri: images[0] }}
                    />
                </View>

                {/* Product Details */}
                <View style={{ paddingHorizontal: 15 }}>
                    <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center", color: "#222" }}>{name}</Text>
                    <Text style={{ fontSize: 22, textAlign: "center", color: "#28A745", marginVertical: 5 }}>
                        ${price.toFixed(2)}
                    </Text>
                    {oldPrice && (
                        <Text style={{ fontSize: 16, textAlign: "center", color: "red", textDecorationLine: "line-through" }}>
                            ${oldPrice.toFixed(2)}
                        </Text>
                    )}
                    <Text style={{ fontSize: 16, textAlign: "center", color: "#555", marginVertical: 10 }}>{description}</Text>
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
                            backgroundColor: isItemInCart ? "#6C757D" : "#28A745",
                            paddingVertical: 15, alignItems: "center", justifyContent: "center",
                            borderRadius: 10, marginTop: 20
                        }}
                        onPress={addItemToCart}
                        disabled={isItemInCart}
                    >
                        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
                            {isItemInCart ? "Already in Cart" : "Add to Cart"}
                        </Text>
                    </Pressable>

                    {/* Delivery Information */}
                    <View style={{
                        backgroundColor: "#FFC107", padding: 10, borderRadius: 10, marginTop: 20
                    }}>
                        <Text style={{ color: "black", fontWeight: "bold" }}>Delivery Available</Text>
                        <Text style={{ color: "black" }}>
                            Delivery to: CAMPUS THANH THAI, 7/1 Thanh Thai, Ward 14, District 10, Ho Chi Minh City
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ProductDetails;
