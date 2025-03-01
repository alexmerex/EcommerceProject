import { View, Text, Platform, ScrollView, Alert, StyleSheet, TextInput } from "react-native";
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
import ProductDetails from "../Screens/ProductDetails"; // Đảm bảo rằng bạn đã có màn hình ProductDetails


const HomeScreen = ({ navigation, route }: TabsStackScreenProps<"Home">) => {
  const cart = useSelector((state: { cart: CartState }) => state.cart);
  const [message, setMessage] = useState("");
  const [displayMessage, setDisplayMessage] = useState<boolean>(false);
  const [getCategory, setGetCategory] = useState<ProductListParams[]>([]);
  const [getProductsByCatID, setGetProductsByCatID] = useState<ProductListParams[]>([]);
  const [activeCat, setActiveCat] = useState<string>("");
  const [trendingProducts, setTrendingProducts] = useState<ProductListParams[]>([]);

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
    <SafeAreaView style={styles.safeArea}>
      {displayMessage && <DisplayMessage message={message} visible={() => setDisplayMessage(!displayMessage)} />}

      {/* Header with Search and Cart */}
      <View style={styles.header}>
        <TextInput style={styles.searchInput} placeholder="search Items ..." placeholderTextColor="white" />
        <Text onPress={gotoCartScreen} style={styles.cartIcon}>🛒</Text>
      </View>

      {/* Image Slider */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageSliderContainer}>
        <ImageSlider images={[
          "https://gomsuhcm.com/wp-content/uploads/2023/12/Tho-tet-2-cau-hai-huoc-cho-nam-2024.jpg",
          "https://cdn-media.sforum.vn/storage/app/media/wp-content/uploads/2023/10/tho-chuc-tet-hai-huoc-thumbnail.jpg",
          "https://i.ytimg.com/vi/OvUoIzf0lQc/maxresdefault.jpg",
          "https://bizweb.dktcdn.net/thumb/1024x1024/100/408/770/products/d373f758-620f-4da0-b31e-6c993c0195fe.jpg"
        ]} />
      </ScrollView>

      {/* Categories Section */}
      <View style={styles.categoriesContainer}>
        <Text style={styles.categoriesTitle}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
          {getCategory.map((item, index) => (
            <CategoryCard
              key={index}
              item={{ name: item.name, images: item.images, _id: item._id }}
              catStyleProps={styles.categoryCard}
              catProps={{ activeCat, onPress: () => setActiveCat(item._id) }}
            />
          ))}
        </ScrollView>
      </View>

      {/* Products from Selected Category */}
      <View style={styles.productSection}>
        <Text style={styles.sectionTitle}>Products from Selected Category</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.productScroll}>
          {getProductsByCatID.length > 0 ? (
            getProductsByCatID.map((item, index) => (
              <CategoryCard
                key={index}
                item={{ name: item.name, images: item.images, _id: item._id }}
                catStyleProps={styles.productCard}
                catProps={{ onPress: () => navigation.navigate("productDetails", item) }}
              />
            ))
          ) : (
            <Text>No products available</Text>
          )}
        </ScrollView>
      </View>

      {/* Trending Deals Section */}
      <View style={styles.trendingDealsSection}>
        <Text style={styles.sectionTitle}>Trending Deals of the Week</Text>
        <View style={styles.productListContainer}>
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
                pStyleProps={styles.productCard}
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

const styles = StyleSheet.create({
  safeArea: {
    paddingTop: Platform.OS === "android" ? 40 : 0,
    flex: 1,
    backgroundColor: "black",
  },
  header: {
    backgroundColor: "#333",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    justifyContent: "space-between",
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#555",
    color: "white",
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },
  cartIcon: {
    color: "white",
    fontSize: 30,
  },
  imageSliderContainer: {
    marginTop: 10,
  },
  categoriesContainer: {
    marginTop: 20,
    backgroundColor: "yellow",
  },
  categoriesTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 15,
    marginBottom: 10,
  },
  categoryScroll: {
    paddingHorizontal: 10,
  },
  categoryCard: {
    height: 70,
    width: 70,
    borderRadius: 10,
    resizeMode: "contain",
  },
  productSection: {
    marginTop: 10,
    backgroundColor: "pink",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 15,
    marginVertical: 10,
  },
  productScroll: {
    paddingHorizontal: 10,
  },
  productCard: {
    height: 100,
    width: 100,
    borderRadius: 10,
    margin: 5,
  },
  trendingDealsSection: {
    marginTop: 10,
    backgroundColor: "purple",
  },
  productListContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  bottomNavigation: {
    backgroundColor: "#333",
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 10,
  },
  navItem: {
    color: "white",
    fontSize: 20,
  },
});

export default HomeScreen;
