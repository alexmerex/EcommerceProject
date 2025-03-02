import React, { useState, useRef } from "react";
import {
    View,
    Image,
    Animated,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import { useInterval } from "../../Hooks/UseInterval";

const Max_Width = Dimensions.get("screen").width;
const Max_Height = 220; // Chiều cao cố định

interface ImageProps {
    images: string[];
}

const ImageSlider = ({ images }: ImageProps) => {
    const animation = useRef(new Animated.Value(0)).current;
    const [currentImage, setCurrentImage] = useState(0);

    const handleAnimation = (index?: number) => {
        let newIndex = index !== undefined ? index : currentImage + 1;
        if (newIndex >= images.length) {
            newIndex = 0;
        }

        Animated.timing(animation, {
            toValue: -Max_Width * newIndex,
            duration: 400, // Mượt hơn
            useNativeDriver: true,
        }).start();

        setCurrentImage(newIndex);
    };

    useInterval(() => handleAnimation(), 3000); // Tự động chuyển ảnh mỗi 3 giây

    return (
        <View>
            <Animated.View
                style={[
                    styles.imageContainer,
                    { transform: [{ translateX: animation }] },
                ]}
            >
                {images.map((image, index) => (
                    <Image key={index} source={{ uri: image }} style={styles.image} />
                ))}
            </Animated.View>

            {/* Chỉ mục ảnh */}
            <View style={styles.indicatorContainer}>
                {images.map((_, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handleAnimation(index)}
                        style={[
                            styles.indicator,
                            index === currentImage ? styles.activeIndicator : undefined,
                        ]}
                    />
                ))}
            </View>
        </View>
    );
};

export default ImageSlider;

const styles = StyleSheet.create({
    imageContainer: {
        flexDirection: "row",
        backgroundColor: "#fff",
        alignItems: "center",
    },
    image: {
        resizeMode: "cover",
        height: Max_Height,
        width: Max_Width,
        borderRadius: 10, // Bo góc ảnh
        marginHorizontal: 5, // Khoảng cách giữa ảnh
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
    },
    indicatorContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    indicator: {
        width: 12,
        height: 12,
        borderRadius: 6,
        borderColor: "#bbb",
        borderWidth: 1,
        marginHorizontal: 4,
        backgroundColor: "#ddd",
    },
    activeIndicator: {
        backgroundColor: "#FF6F00",
        borderColor: "#FF6F00",
        transform: [{ scale: 1.2 }], // Làm nổi bật khi active
    },
});
