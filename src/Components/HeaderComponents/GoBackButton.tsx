import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export interface IGoBack {
    onPress?: () => void;
}

export const GoBack = ({ onPress }: IGoBack) => {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        >
            <Ionicons name="chevron-back" size={24} color="#fff" />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Màu nền mờ
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    pressed: {
        opacity: 0.7, // Hiệu ứng nhấn
    },
});
