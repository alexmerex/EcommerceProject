import { View, Text, Platform, ScrollView, Alert } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { TabsStackScreenProps } from "../Navigation/TabsNavigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeadersComponent } from "../Components/HeaderComponents/HeaderComponent";
import ImageSlider from "../Components/HomeScreenComponents/ImageSlider";
import { ProductListParams } from "../TypesCheck/HomeProps";
import { CategoryCard } from "../Components/HomeScreenComponents/CategoryCard";
import { fetchCategories, fetchProductsByCatID, fetchTrendingProducts } from "../MiddeleWares/HomeMiddeWare";
import { useFocusEffect } from "@react-navigation/native";
import { ProductCard } from "../Components/HomeScreenComponents/ProductCard";
import { useSelector } from "react-redux";
import { CartState } from "../TypesCheck/productCartTypes";
import DisplayMessage from "../Components/ProductDetails/DisplayMessage";

// ✅ Cập nhật nhận thêm `route`
const HomeScreen = ({ navigation, route }: TabsStackScreenProps<"Home">) => {
  const cart = useSelector((state: CartState) => state.cart.cart);

  // ✅ Thêm state `message` và `displayMessage`
  const [message, setMessage] = React.useState("");
  const [displayMessage, setDisplayMessage] = React.useState<boolean>(false);

  const gotoCartScreen = () => {
    if (cart.length === 0) {
      Alert.alert("Thông báo", "Cart is empty. Please add products to cart.");
    } else {
      navigation.navigate("TabsStack", { screen: "Cart" });
    }
  };

  const goToPreviousScreen = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("OnBoardingScreen");
    }
  };

  const sliderImages = [
    "https://gomsuhcm.com/wp-content/uploads/2023/12/Tho-tet-2-cau-hai-huoc-cho-nam-2024.jpg",
    "https://cdn-media.sforum.vn/storage/app/media/wp-content/uploads/2023/10/tho-chuc-tet-hai-huoc-thumbnail.jpg",
    "https://i.ytimg.com/vi/OvUoIzf0lQc/maxresdefault.jpg",
    "https://bizweb.dktcdn.net/thumb/1024x1024/100/408/770/products/d373f758-620f-4da0-b31e-6c993c0195fe.jpg",
  ];

  const [getCategory, setGetCategory] = useState<ProductListParams[]>([]);
  const [getProductsByCatID, setGetProductsByCatID] = useState<ProductListParams[]>([]);
  const [activeCat, setActiveCat] = useState<string>("");
  const [trendingProducts, setTrendingProducts] = useState<ProductListParams[]>([]);

  useEffect(() => {
    fetchCategories({ setGetCategory });
    fetchTrendingProducts({ setTrendingProducts });
  }, []);

  useEffect(() => {
    if (activeCat) {
      fetchProductsByCatID({ setGetProductsByCatID, catID: activeCat });
    }
  }, [activeCat]);

  useFocusEffect(
    useCallback(() => {
      fetchCategories({ setGetCategory });
      if (activeCat) {
        fetchProductsByCatID({ setGetProductsByCatID, catID: activeCat });
      }
    }, [activeCat])
  );

  return (
    <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? 40 : 0, flex: 1, backgroundColor: "black" }}>
      {/* ✅ Hiển thị thông báo nếu `displayMessage` = true */}
      {displayMessage && <DisplayMessage message={message} visible={() => setDisplayMessage(!displayMessage)} />}

      {/* ✅ Cập nhật `HeadersComponent` để truyền thêm `cartLength` */}
      <HeadersComponent gotoCartScreen={gotoCartScreen} cartLength={cart.length} gotoPrevious={goToPreviousScreen} />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ backgroundColor: "#efg" }}>
        <ImageSlider images={sliderImages} />
      </ScrollView>

      <View style={{ backgroundColor: "yellow", flex: 1 }}>
        <Text>Hello</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15 }} style={{ marginTop: 4 }}>
          {getCategory.map((item, index) => (
            <CategoryCard
              key={index}
              item={{ name: item.name, images: item.images, _id: item._id }}
              catStyleProps={{
                height: 50,
                width: 55,
                radius: 20,
                resizeMode: "contain",
              }}
              catProps={{
                activeCat: activeCat,
                onPress: () => setActiveCat(item._id),
              }}
            />
          ))}
        </ScrollView>

        <View style={{ backgroundColor: "purple", flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
          <Text style={{ color: "yellow", fontSize: 14, fontWeight: "bold", padding: 10 }}>Trending Deals of the Week</Text>
        </View>

        <View style={{ backgroundColor: "#fff", borderWidth: 7, borderColor: "green", flexDirection: "row", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", marginTop: 10 }}>
          {trendingProducts.map((item, index) => {
            const bgImg = item?.images?.length > 0 ? item.images[0] : "";

            return (
              <ProductCard
                key={index}
                item={{
                  ...item,
                  oldPrice: item.oldPrice ?? 0,
                  description: item.description ?? "",
                  inStock: item.inStock ?? false,
                  isFeatured: item.isFeatured ?? false,
                  category: item.category ?? "",
                }}
                pStyleProps={{ resizeMode: "contain", width: 100, height: 90, marginBottom: 5 }}
                productProps={{
                  imageBg: bgImg,
                  percentageWidth: 100,
                  onPress: () => navigation.navigate("productDetails", item),
                }}
              />
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
