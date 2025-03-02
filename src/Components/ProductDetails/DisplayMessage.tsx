import { View, Text, Dimensions, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import Animated, { useSharedValue, withTiming, useAnimatedStyle, Easing } from "react-native-reanimated";

interface DisplayMessageProps {
    message?: string;
    visible?: boolean; // Chuyển thành boolean thay vì function
}

const { width } = Dimensions.get("window");

const DisplayMessage: React.FC<DisplayMessageProps> = ({ message, visible }) => {
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(30); // Hiệu ứng trượt từ dưới lên

    useEffect(() => {
        if (visible) {
            opacity.value = withTiming(1, { duration: 300, easing: Easing.out(Easing.exp) });
            translateY.value = withTiming(0, { duration: 300 });
        } else {
            opacity.value = withTiming(0, { duration: 300 });
            translateY.value = withTiming(30, { duration: 300 });
        }
    }, [visible]);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ translateY: translateY.value }],
    }));

    return (
        <Animated.View style={[styles.container, animatedStyle]}>
            <Text style={styles.text}>{message}</Text>
        </Animated.View>
    );
};

export default DisplayMessage;

const styles = StyleSheet.create({
    container: {
        zIndex: 9999,
        backgroundColor: "rgba(0, 0, 0, 0.8)", // Màu nền tối chuyên nghiệp hơn
        position: "absolute",
        bottom: 100,
        width: width * 0.9, // Giảm bớt chiều rộng để có padding đẹp hơn
        alignSelf: "center",
        paddingVertical: 15,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    text: {
        fontSize: 18,
        fontWeight: "600",
        color: "#fff",
        textAlign: "center",
        paddingHorizontal: 20,
    },
});