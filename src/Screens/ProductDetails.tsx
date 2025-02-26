import {
    View, Image, Text, Platform, ScrollView, Dimensions, Pressable, Alert, SafeAreaView, ImageBackground
} from 'react-native';
import React from 'react';
import { RootStackScreenProps } from '../Navigation/RootNavigator';
import { HeadersComponent } from '../Components/HeaderComponents/HeaderComponent';
import DisplayMessage from '../Components/ProductDetails/DisplayMessage';
import { AntDesign, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { CartState } from '../TypesCheck/productCartTypes';
import { ProductListParams } from '../TypesCheck/HomeProps';
import { addToCart } from '../redux/CartReducer';

const { width, height } = Dimensions.get("window");

const ProductDetails = ({ navigation, route }: RootStackScreenProps<"productDetails">) => {
    const { _id, images, name, price, oldPrice, inStock, color, size, description, quantity } = route.params;

    const cart = useSelector((state: CartState) => state.cart.cart);
    const dispatch = useDispatch();

    const [addedToCart, setAddedToCart] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [displayMessage, setDisplayMessage] = React.useState<boolean>(false);

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

    const gotoCartScreen = () => {
        if (cart.length === 0) {
            setMessage("Cart is empty. Please add products to cart.");
            setDisplayMessage(true);
            setTimeout(() => setDisplayMessage(false), 3000);
        } else {
            navigation.navigate("TabsStack", { screen: "Cart" });
        }
    };

    const goToPreviousScreen = () => {
        if (navigation.canGoBack()) {
            console.log("Chuyển về trang trước.");
            navigation.goBack();
        } else {
            console.log("Không thể quay lại, chuyển về trang Onboarding.");
            navigation.navigate("OnBoardingScreen");
        }
    };

    return (
        <SafeAreaView style={{ paddingTop: Platform.OS === 'android' ? 20 : 0, flex: 1, backgroundColor: "white" }}>

            {/* ✅ Thêm DisplayMessage trước HeadersComponent */}
            {displayMessage && <DisplayMessage message={message} visible={() => setDisplayMessage(!displayMessage)} />}

            <HeadersComponent gotoCartScreen={gotoCartScreen} cartLength={cart.length} gotoPrevious={goToPreviousScreen} />

            <ScrollView style={{ backgroundColor: "pink" }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <ImageBackground style={{ width, height, marginTop: 25 }}>
                        <View style={{ padding: 3, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <View style={{
                                width: 40, height: 40, borderRadius: 20, backgroundColor: "#C60C30",
                                flexDirection: "row", justifyContent: "center", alignItems: "center"
                            }}>
                                <Text style={{ color: "yellow", textAlign: "center", fontWeight: "600", fontSize: 12 }}>
                                    {oldPrice ? ((1 - price / oldPrice) * 100).toFixed(1) : 0}% off
                                </Text>
                            </View>

                            <View style={{
                                width: 40, height: 40, borderRadius: 20, backgroundColor: "#E0E0E0",
                                flexDirection: "row", justifyContent: "center", alignItems: "center"
                            }}>
                                <MaterialCommunityIcons name='share-variant' size={25} color="green" />
                            </View>
                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", paddingLeft: 20 }}>
                            <Image style={{ width: 300, height: 300, resizeMode: "contain" }} source={{ uri: images[0] }} />
                        </View>

                        <View style={{
                            width: 40, height: 40, borderRadius: 20, backgroundColor: "#E0E0E0",
                            flexDirection: "row", justifyContent: "center", alignItems: "center",
                            marginTop: "auto", marginBottom: 1000, marginLeft: 20
                        }}>
                            <AntDesign style={{ paddingLeft: 0, paddingTop: 2 }} name='heart' size={25} color="grey" />
                        </View>
                    </ImageBackground>
                </ScrollView>
            </ScrollView>

            <View style={{ backgroundColor: "white", paddingBottom: 0 }}>
                <Pressable
                    style={{
                        backgroundColor: "green", padding: 15, alignItems: "center",
                        justifyContent: "center", borderRadius: 10, margin: 10
                    }}
                    onPress={() => addItemToCart(route.params)}
                >
                    <Text style={{ color: addedToCart ? "violet" : "orange", fontSize: 20, fontWeight: "bold" }}>
                        Add to Cart
                    </Text>
                </Pressable>
            </View>

        </SafeAreaView>
    );
};

export default ProductDetails;
