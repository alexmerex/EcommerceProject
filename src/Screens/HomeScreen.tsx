import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  Platform,
  ScrollView,
  Alert,
  StyleSheet,
} from "react-native";
import { TabsStackScreenProps } from "../Navigation/TabsNavigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";

import ImageSlider from "../Components/HomeScreenComponents/ImageSlider";
import { CategoryCard } from "../Components/HomeScreenComponents/CategoryCard";
import { ProductCard } from "../Components/HomeScreenComponents/ProductCard";
import DisplayMessage from "../Components/ProductDetails/DisplayMessage";
import { HeadersComponent } from "../Components/HeaderComponents/HeaderComponent";

import {
  fetchCategories,
  fetchProductsByCatID,
  searchProductsByName,
} from "../MiddeleWares/HomeMiddeWare";

import { ProductListParams } from "../TypesCheck/HomeProps";
import { CartState } from "../TypesCheck/productCartTypes";

const HomeScreen = ({ navigation }: TabsStackScreenProps<"Home">) => {
  const cart = useSelector((state: { cart: CartState }) => state.cart);

  const [message, setMessage] = useState("");
  const [displayMessage, setDisplayMessage] = useState<boolean>(false);

  const [getCategory, setGetCategory] = useState<ProductListParams[]>([]);
  const [getProductsByCatID, setGetProductsByCatID] = useState<ProductListParams[]>([]);
  const [activeCat, setActiveCat] = useState<string>("");

  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<ProductListParams[]>([]);

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

  const gotoCartScreen = () => {
    if (cart.length === 0) {
      Alert.alert("Thông báo", "Cart is empty. Please add products to cart.");
    } else {
      navigation.navigate("TabsStack", { screen: "Cart" });
    }
  };

  const handleSearch = async (text: string) => {
    setSearchText(text);
    if (text.trim().length > 0) {
      await searchProductsByName({ name: text, setSearchResults });
    } else {
      setSearchResults([]);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {displayMessage && (
        <DisplayMessage
          message={message}
          visible={() => setDisplayMessage(!displayMessage)}
        />
      )}

      {/* Sử dụng HeadersComponent */}
      <HeadersComponent
        pageTitle="Home"
        searchText={searchText}
        setSearchText={handleSearch}
        cartLength={cart.length}
        gotoCartScreen={gotoCartScreen}
      />

      <ScrollView>
        {/* Kết quả tìm kiếm */}
        {searchResults.length > 0 && (
          <View style={styles.searchResultsContainer}>
            <Text style={styles.sectionTitle}>Search Results</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.productScroll}
            >
              {searchResults.map((item, index) => (
                <ProductCard
                  key={index}
                  item={{ name: item.name, images: item.images, _id: item._id }}
                  onPress={() => navigation.navigate("productDetails", item)}
                />
              ))}
            </ScrollView>
          </View>
        )}

        {/* Image Slider */}
        <ImageSlider
          images={[
            "https://gomsuhcm.com/wp-content/uploads/2023/12/Tho-tet-2-cau-hai-huoc-cho-nam-2024.jpg",
            "https://cdn-media.sforum.vn/storage/app/media/wp-content/uploads/2023/10/tho-chuc-tet-hai-huoc-thumbnail.jpg",
            "https://i.ytimg.com/vi/OvUoIzf0lQc/maxresdefault.jpg",
            "https://bizweb.dktcdn.net/thumb/1024x1024/100/408/770/products/d373f758-620f-4da0-b31e-6c993c0195fe.jpg",
          ]}
        />

        {/* Danh mục sản phẩm */}
        <View style={styles.categoriesContainer}>
          <Text style={styles.categoriesTitle}>Categories</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScroll}
          >
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

        {/* Sản phẩm theo danh mục */}
        <View style={styles.productSection}>
          <Text style={styles.sectionTitle}>Products from Selected Category</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productScroll}
          >
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
      </ScrollView>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  safeArea: {
    paddingTop: Platform.OS === "android" ? 40 : 0,
    flex: 1,
    backgroundColor: "black",
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
  searchResultsContainer: {
    marginTop: 10,
    backgroundColor: "lightgray",
    padding: 10,
  },
});

export default HomeScreen;
