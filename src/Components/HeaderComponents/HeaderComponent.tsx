import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    TextInput,
    FlatList,
    ActivityIndicator
} from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { GoBack } from "./GoBackButton";
import { useNavigation } from "@react-navigation/native";

const API_URL = "http://10.106.21.117:9000/product/searchProductsByName";

interface IHeaderParams {
    pageTitle?: string;
    gotoPrevious?: () => void;
    cartLength?: number;
    gotoCartScreen?: () => void;
}

export const HeadersComponent = ({
    pageTitle,
    gotoPrevious,
    cartLength = 0,
    gotoCartScreen,
}: IHeaderParams) => {
    // Sử dụng useNavigation để điều hướng đến trang productDetails
    const navigation = useNavigation<any>();

    // Quản lý trạng thái tìm kiếm hoàn toàn bên trong HeadersComponent
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (text: string) => {
        setSearchText(text);
        if (text.trim().length > 0) {
            setLoading(true);
            try {
                // Sử dụng encodeURIComponent để đảm bảo tham số truyền vào URL không gây lỗi
                const response = await fetch(`${API_URL}?name=${encodeURIComponent(text)}`);
                if (!response.ok) {
                    console.error("Response status:", response.status);
                    throw new Error("Server không phản hồi");
                }
                const data = await response.json();
                // Chuyển đổi URL hình ảnh từ "http://localhost" thành "http://10.106.21.117"
                const fixedData = data.map((item: any) => ({
                    ...item,
                    images: item.images.map((img: string) =>
                        img.replace("http://localhost", "http://10.106.21.117")
                    )
                }));
                setSearchResults(fixedData);
            } catch (error: any) {
                console.error("❌ Lỗi khi tìm kiếm sản phẩm:", error.message);
                setSearchResults([]);
            } finally {
                setLoading(false);
            }
        } else {
            // Xóa kết quả nếu input trống
            setSearchResults([]);
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
                            <Pressable
                                style={styles.searchResultItem}
                                onPress={() => navigation.navigate("productDetails", item)}
                            >
                                <Text style={styles.searchResultText}>{item.name}</Text>
                            </Pressable>
                        )}
                    />
                </View>
            )}

            {/* Loading Indicator */}
            {loading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="small" color="#000" />
                    <Text style={styles.loadingText}>Đang tìm kiếm...</Text>
                </View>
            )}
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
    loadingContainer: {
        position: "absolute",
        top: 60,
        left: 10,
        right: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
    },
    loadingText: {
        marginLeft: 10,
        color: "#000",
    },
});
