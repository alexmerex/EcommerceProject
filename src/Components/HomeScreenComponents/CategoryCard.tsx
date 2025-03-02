import {
    View,
    Text,
    Pressable,
    ImageBackground,
    Image,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import React from "react";
import { ICatProps } from "../../TypesCheck/CategoryTypes";

export const CategoryCard = ({ item, catProps, catStyleProps }: ICatProps) => {
    let isActive = item._id === catProps.activeCat;
    let activeButtonColor = isActive ? "#FF6F00" : "#F5F5F5"; // Màu sắc chuyên nghiệp hơn

    return (
        <View style={styles.container}>
            {catProps.imageBg ? (
                <Pressable
                    style={styles.imageContainer}
                    key={item._id}
                    onPress={catProps.onPress}
                >
                    <ImageBackground
                        source={{ uri: catProps.imageBg }}
                        style={[
                            styles.imageBg,
                            { height: catStyleProps?.imageBgHt ?? 150 } // ✅ Đặt giá trị mặc định nếu undefined
                        ]}
                    >
                        <Image
                            source={{ uri: item?.images?.[0] || "https://via.placeholder.com/150" }} // ✅ Ảnh mặc định nếu không có ảnh
                            style={[
                                styles.image,
                                {
                                    width: catStyleProps?.width ?? 100, // ✅ Nếu width không có, mặc định là 100
                                    height: catStyleProps?.height ?? 100, // ✅ Nếu height không có, mặc định là 100
                                    borderRadius: catStyleProps?.radius ?? 10, // ✅ Nếu radius không có, mặc định là 10
                                },
                            ]}
                            resizeMode={catStyleProps?.resizeMode || "cover"} // ✅ Nếu resizeMode không có, mặc định là "cover"
                        />
                    </ImageBackground>
                </Pressable>
            ) : (
                <TouchableOpacity
                    style={[styles.touchableStyle, { backgroundColor: activeButtonColor }]}
                    key={item._id}
                    onPress={catProps.onPress}
                >
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: item?.images?.[0] || "https://via.placeholder.com/150" }} // ✅ Ảnh mặc định nếu không có ảnh
                            style={[
                                styles.image,
                                {
                                    width: catStyleProps?.width ?? 100, // ✅ Giá trị mặc định nếu thiếu
                                    height: catStyleProps?.height ?? 100,
                                    borderRadius: catStyleProps?.radius ?? 10,
                                },
                            ]}
                            resizeMode={catStyleProps?.resizeMode || "cover"} // ✅ Giá trị mặc định nếu thiếu
                        />
                    </View>
                </TouchableOpacity>
            )}
            <Text style={styles.catName}>{item?.name || "No Name"}</Text>
            {/* ✅ Nếu name bị thiếu, sẽ hiển thị "No Name" */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        marginHorizontal: 5,
    },
    imageContainer: {
        borderRadius: 50,
        padding: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        backgroundColor: "#FFF",
    },
    imageBg: {
        borderRadius: 11,
        overflow: "hidden",
    },
    image: {
        borderRadius: 10,
    },
    catName: {
        fontSize: 10,
        fontWeight: "bold",
        color: "#333",
        marginTop: 5,
    },
    touchableStyle: {
        alignItems: "center",
        padding: 7,
        borderRadius: 20,
        margin: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
});
