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
            {catProps.imageBg !== undefined ? (
                <Pressable
                    style={styles.imageContainer}
                    key={item._id}
                    onPress={catProps.onPress}
                >
                    <ImageBackground
                        source={{ uri: catProps?.imageBg }}
                        style={[styles.imageBg, { height: catStyleProps.imageBgHt }]}
                    >
                        <Image
                            source={{ uri: item?.images[0] }}
                            style={[
                                styles.image,
                                {
                                    width: catStyleProps.width,
                                    height: catStyleProps.height,
                                    borderRadius: catStyleProps.radius,
                                },
                            ]}
                            resizeMode={catStyleProps.resizeMode}
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
                            source={{ uri: item?.images[0] }}
                            style={[
                                styles.image,
                                {
                                    width: catStyleProps.width,
                                    height: catStyleProps.height,
                                    borderRadius: catStyleProps.radius,
                                },
                            ]}
                            resizeMode={catStyleProps?.resizeMode}
                        />
                    </View>
                </TouchableOpacity>
            )}
            <Text style={styles.catName}>{item?.name}</Text>
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
