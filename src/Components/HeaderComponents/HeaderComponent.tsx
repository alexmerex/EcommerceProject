import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import React, { useState } from "react";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { GoBack } from "./GoBackButton";

interface IHeaderParams {
    pageTitle?: string;
    gotoPrevious?: () => void;
    search?: () => void;
    cartLength?: number;
    gotoCartScreen?: () => void;
}

export const HeadersComponent = ({
    pageTitle,
    gotoPrevious,
    search,
    cartLength = 0,
    gotoCartScreen,
}: IHeaderParams) => {
    const [searchInput, setSearchInput] = useState("");

    return (
        <View style={styles.container}>
            {/* Nút quay lại */}
            <GoBack onPress={gotoPrevious} />

            {/* Tiêu đề trang */}
            {pageTitle && <Text style={styles.pageTitle}>{pageTitle}</Text>}

            {/* Thanh tìm kiếm */}
            <View style={styles.searchContainer}>
                <Pressable style={styles.searchIcon} onPress={search}>
                    <AntDesign name="search1" size={18} color="gray" />
                </Pressable>
                <TextInput
                    value={searchInput}
                    onChangeText={setSearchInput}
                    placeholder="Tìm kiếm sản phẩm..."
                    placeholderTextColor="gray"
                    style={styles.searchInput}
                />
            </View>

            {/* Giỏ hàng */}
            <Pressable onPress={gotoCartScreen} style={styles.cartButton}>
                {cartLength > 0 && (
                    <View style={styles.cartBadge}>
                        <Text style={styles.cartBadgeText}>{cartLength}</Text>
                    </View>
                )}
                <MaterialIcons name="shopping-cart" size={24} color="white" />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#000",
        padding: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    pageTitle: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 10,
        flex: 1, // Để tránh chồng lên thanh tìm kiếm
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 20,
        flex: 1,
        marginHorizontal: 10,
        paddingHorizontal: 12,
        height: 38,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 3,
    },
    searchIcon: {
        paddingRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: "#333",
    },
    cartButton: {
        position: "relative",
        padding: 5,
    },
    cartBadge: {
        position: "absolute",
        top: -5,
        right: -5,
        backgroundColor: "red",
        borderRadius: 12,
        paddingHorizontal: 6,
        paddingVertical: 2,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
    },
    cartBadgeText: {
        color: "white",
        fontSize: 12,
        fontWeight: "bold",
    },
});
