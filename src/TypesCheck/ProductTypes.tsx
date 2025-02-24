export interface IProductProps {
    item: {
        _id: string;
        name: string;
        images: string[];
        price: number;
        oldPrice: number;
        description: string;
        quantity: number;
        inStock: boolean;
        isFeatured: boolean;
        category: string;
    };
    productProps?: {
        imageBg?: string;
        onPress?: () => void;
        percentageWidth?: number;
    };
    pStyleProps?: {
        width?: number;
        height?: number;
        marginHorizontal?: number;
        marginBottom?: number;
        resizeMode?: "cover" | "contain" | "stretch" | "repeat" | "center";
    };
}
