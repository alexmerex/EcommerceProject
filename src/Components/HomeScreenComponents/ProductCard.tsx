import React from "react";
import {
    View,
    Text,
    Pressable,
    ImageBackground,
    Image,
    StyleSheet,
} from "react-native";
import { IProductProps } from "../../TypesCheck/ProductTypes";

export const ProductCard = ({ item, productProps, pStyleProps }: IProductProps) => {
    return (
        <View style={[styles.cardContainer, { width: pStyleProps?.width, marginHorizontal: pStyleProps?.marginHorizontal, marginBottom: pStyleProps?.marginBottom }]}>
            {/* Ảnh nền */}
            <ImageBackground
                source={{ uri: productProps?.imageBg }}
                style={[styles.imageBg, { height: pStyleProps?.height }]}
                imageStyle={{ borderRadius: 8 }}
            >
                <Pressable key={item._id} onPress={productProps?.onPress} style={styles.pressableContainer}>
                    <Image
                        source={{ uri: item?.images[0] }}
                        style={[
                            styles.productImage,
                            { resizeMode: pStyleProps?.resizeMode, width: 80 },
                        ]}
                    />
                </Pressable>
            </ImageBackground>

            {/* Tên sản phẩm */}
            <Text style={styles.productName}>{item?.name}</Text>

            {/* Thanh tiến trình */}
            {productProps?.percentageWidth !== undefined && (
                <>
                    <Text style={styles.stockText}>{item?.quantity} items left</Text>
                    <View style={styles.progressBarContainer}>
                        <View style={[styles.progressBar, { width: productProps?.percentageWidth }]} />
                    </View>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        backgroundColor: "#fff",
        padding: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // Hiệu ứng nổi trên Android
    },
    imageBg: {
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
    },
    pressableContainer: {
        alignItems: "center",
    },
    productImage: {
        height: "100%",
        width: 80,
    },
    productName: {
        textAlign: "center",
        fontSize: 14,
        fontWeight: "600",
        marginTop: 8,
        color: "#333",
    },
    stockText: {
        fontSize: 12,
        textAlign: "center",
        color: "#777",
        marginTop: 6,
    },
    progressBarContainer: {
        width: "100%",
        height: 8,
        backgroundColor: "#e0e0e0",
        borderRadius: 50,
        marginTop: 6,
        overflow: "hidden",
    },
    progressBar: {
        height: "100%",
        backgroundColor: "#4CAF50",
        borderRadius: 50,
    },
});

export default ProductCard;
