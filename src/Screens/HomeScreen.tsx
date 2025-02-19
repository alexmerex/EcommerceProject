import { View, Text, Platform, ScrollView, SectionList, Pressable, Alert } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { TabsStackScreenProps } from "../Navigation/TabsNavigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeadersComponent } from "../Components/HeaderComponents/HeaderComponent";
import ImageSlider from "../Components/HomeScreenComponents/ImageSlider";
import { ProductListParams } from "../TypesCheck/HomeProps";
import { CategoryCard } from "../Components/HomeScreenComponents/CategoryCard";
import { fetchCategories, fetchProductsByCatID } from '../MiddeleWares/HomeMiddeWare';
import { useFocusEffect } from '@react-navigation/native';

type Props = {};

const HomeScreen = ({ navigation, route }: TabsStackScreenProps<"Home">) => {
  const gotoCartScreen = () => {
    navigation.navigate("Cart")
  }

  const sliderImages = [
    "https://gomsuhcm.com/wp-content/uploads/2023/12/Tho-tet-2-cau-hai-huoc-cho-nam-2024.jpg",
    "https://cdn-media.sforum.vn/storage/app/media/wp-content/uploads/2023/10/tho-chuc-tet-hai-huoc-thumbnail.jpg",
    "https://i.ytimg.com/vi/OvUoIzf0lQc/maxresdefault.jpg",
    "https://bizweb.dktcdn.net/thumb/1024x1024/100/408/770/products/d373f758-620f-4da0-b31e-6c993c0195fe.jpg",
  ];

  const [getCategory, setGetCategory] = useState<ProductListParams[]>([]);
  const [getProductsByCatID, setGetProductsByCatID] = useState<ProductListParams[]>([]);
  const [activeCat, setActiveCat] = useState<string>("");

  useEffect(() => {
    fetchCategories({ setGetCategory });
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
      <HeadersComponent gotoCartScreen={gotoCartScreen} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ backgroundColor: "#efg" }}>
        <ImageSlider images={sliderImages} />
      </ScrollView>
      <View style={{ backgroundColor: "yellow", flex: 1 }}>
        <Text>
          Hello
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          style={{ marginTop: 4 }}
        >
          {getCategory.map((item, index) => (
            <CategoryCard
              key={index}
              item={{ "name": item.name, "images": item.images, _id: item._id }}
              catStyleProps={{
                "height": 50,
                "width": 55,
                "radius": 20,
                "resizeMode": "contain"
              }}
              catProps={{
                "activeCat": activeCat, "onPress": () => setActiveCat(item._id)
              }}
            />
          ))}
        </ScrollView>

        {/* Danh sách sản phẩm theo danh mục */}
        <View style={{
          backgroundColor: "#fff",
          borderWidth: 7,
          borderColor: "green",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          marginTop: 10
        }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {getProductsByCatID.length > 0 ? (
              getProductsByCatID.map((item, index) => (
                <CategoryCard
                  key={index}
                  item={{ "name": item.name, "images": item.images, "_id": item._id }}
                  catStyleProps={{
                    "height": 100,
                    "width": 100,
                    "radius": 10,
                    "resizeMode": "contain"
                  }}
                  catProps={{
                    "onPress": () => Alert.alert(item.name),
                    "imageBg": item.images.length > 0 ? item.images[0] : ""
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
