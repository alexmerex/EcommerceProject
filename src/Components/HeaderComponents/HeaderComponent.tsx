import { View, Text, StyleSheet, Pressable, TextInput, FlatList } from "react-native";
import React, { useState } from "react";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { GoBack } from "./GoBackButton";

interface IHeaderParams {
    pageTitle?: string;
    gotoPrevious?: () => void;
    cartLength?: number;
    gotoCartScreen?: () => void;
}

const API_URL = "http://10.106.21.117:9000/searchProductsByName";

export const HeadersComponent = ({
    pageTitle,
    gotoPrevious,
    cartLength = 0,
    gotoCartScreen,
}: IHeaderParams) => {
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (text: string) => {
        setSearchText(text);

        if (text.trim().length > 0) {
            setLoading(true);
            try {
                const response = await fetch(`${API_URL}?name=${text}`);
                if (!response.ok) throw new Error("Server không phản hồi");

                const data = await response.json();
                setSearchResults(data);
            } catch (error) {
                console.error("❌ Lỗi khi tìm kiếm sản phẩm:", error);
                setSearchResults([]);
            } finally {
                setLoading(false);
            }
        } else {
            setSearchResults([]); // Xóa kết quả nếu input trống
        }
    };

    return (
        <View style={styles.container}>
            {/* Nút quay lại */}
            {gotoPrevious && <GoBack onPress={gotoPrevious} />}

            {/* Tiêu đề trang */}
            {pageTitle && <Text style={styles.pageTitle}>{pageTitle}</Text>}

            {/* Thanh tìm kiếm */}
            <View style={styles.searchContainer}>
                <Pressable style={styles.searchIcon} onPress={() => handleSearch(searchText)}>
                    <AntDesign name="search1" size={18} color="gray" />
                </Pressable>
                <TextInput
                    value={searchText}
                    onChangeText={handleSearch}
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

            {/* Hiển thị kết quả tìm kiếm */}
            {searchResults.length > 0 && (
                <View style={styles.searchResultsContainer}>
                    <FlatList
                        data={searchResults}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => (
                            <Pressable style={styles.searchResultItem}>
                                <Text style={styles.searchResultText}>{item.name}</Text>
                            </Pressable>
                        )}
                    />
                </View>
            )}

            {/* Loading Indicator */}
            {loading && <Text style={styles.loadingText}>🔎 Đang tìm kiếm...</Text>}
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
        flex: 1,
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
    searchResultsContainer: {
        position: "absolute",
        top: 60,
        left: 10,
        right: 10,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
        zIndex: 10,
    },
    searchResultItem: {
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    searchResultText: {
        fontSize: 14,
        color: "#000",
    },
    loadingText: {
        position: "absolute",
        top: 60,
        left: "50%",
        transform: [{ translateX: -50 }],
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 10,
        color: "#000",
    },
});
