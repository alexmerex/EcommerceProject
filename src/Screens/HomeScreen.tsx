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

const HomeScreen = ({ navigation }: TabsStackScreenProps<"Home">) => {
  // Điều hướng đến giỏ hàng
  const gotoCartScreen = () => {
    navigation.navigate("Cart");
  };

  // Danh sách hình ảnh slider
  const sliderImages = [
    "https://gomsuhcm.com/wp-content/uploads/2023/12/Tho-tet-2-cau-hai-huoc-cho-nam-2024.jpg",
    "https://cdn-media.sforum.vn/storage/app/media/wp-content/uploads/2023/10/tho-chuc-tet-hai-huoc-thumbnail.jpg",
    "https://i.ytimg.com/vi/OvUoIzf0lQc/maxresdefault.jpg",
    "https://bizweb.dktcdn.net/thumb/1024x1024/100/408/770/products/d373f758-620f-4da0-b31e-6c993c0195fe.jpg",
  ];

  // State quản lý dữ liệu danh mục và sản phẩm
  const [getCategory, setGetCategory] = useState<ProductListParams[]>([]);
  const [getProductsByCatID, setGetProductsByCatID] = useState<ProductListParams[]>([]);
  const [activeCat, setActiveCat] = useState<string>("");
  const [trendingProducts, setTrendingProducts] = useState<ProductListParams[]>([]);

  // Gọi API lấy dữ liệu danh mục và sản phẩm xu hướng khi mở màn hình
  useEffect(() => {
    fetchCategories({ setGetCategory });
    fetchTrendingProducts({ setTrendingProducts });
  }, []);

  // Gọi API lấy sản phẩm theo danh mục khi `activeCat` thay đổi
  useEffect(() => {
    if (activeCat) {
      fetchProductsByCatID({ setGetProductsByCatID, catID: activeCat });
    }
  }, [activeCat]);

  // Cập nhật danh mục mỗi khi màn hình được focus
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
      {/* Header */}
      <HeadersComponent gotoCartScreen={gotoCartScreen} />

      {/* Slider */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ backgroundColor: "#efg" }}>
        <ImageSlider images={sliderImages} />
      </ScrollView>

      <View style={{ backgroundColor: "yellow", flex: 1 }}>
        <Text>Hello</Text>

        {/* Danh sách danh mục sản phẩm */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          style={{ marginTop: 4 }}
        >
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

        {/* Phần "Trending Deals of the Week" */}
        <View style={{
          backgroundColor: "purple",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
        }}>
          <Text style={{ color: "yellow", fontSize: 14, fontWeight: "bold", padding: 10 }}>
            Trending Deals of the Week
          </Text>
        </View>

        {/* Hiển thị sản phẩm xu hướng */}
        <View style={{
          backgroundColor: "#fff",
          borderWidth: 7,
          borderColor: "green",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          marginTop: 10,
        }}>
          {trendingProducts.map((item, index) => {
            const bgImg = item?.images?.length > 0 ? item.images[0] : ""; // Lấy ảnh đầu tiên hoặc để trống
            return (
              <ProductCard
                key={index}
                item={{
                  _id: item?._id || index.toString(),
                  name: item?.name || "No Name",
                  images: item?.images || [""],
                  price: item?.price || 0,
                  oldPrice: item?.oldPrice || item?.price || 0,
                  description: item?.description || "No description available",
                  quantity: item?.quantity ?? 1,
                  inStock: item?.inStock ?? true,
                  isFeatured: Boolean(item?.isFeatured),
                  category: item?.category?.toString() || "Uncategorized",
                }}
                pStyleProps={{ resizeMode: "contain", width: 100, height: 90, marginBottom: 5 }}
                productProps={{
                  imageBg: bgImg,
                  percentageWidth: 100,
                  onPress: () => navigation.navigate("productDetails", item), // ✅ Fixed: Moved inside productProps
                }}
              />
            );
          })}
        </View>

        {/* Danh sách sản phẩm theo danh mục */}
        <View style={{
          backgroundColor: "#fff",
          borderWidth: 7,
          borderColor: "green",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          marginTop: 10,
        }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {getProductsByCatID.length > 0 ? (
              getProductsByCatID.map((item, index) => (
                <CategoryCard
                  key={index}
                  item={{ name: item.name, images: item.images, _id: item._id }}
                  catStyleProps={{
                    height: 100,
                    width: 100,
                    radius: 10,
                    resizeMode: "contain",
                  }}
                  catProps={{
                    onPress: () => Alert.alert(item.name),
                    imageBg: item.images.length > 0 ? item.images[0] : "",
                  }}
                />
              ))
            ) : (
              <Text>Không có sản phẩm nào</Text>
            )}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
