import React, { useContext, useEffect, useState } from "react";
import {
    View, Text, SafeAreaView, ScrollView, Platform, Pressable, Alert,
    KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootStackScreenProps } from "../Navigation/RootNavigator";
import { HeadersComponent } from "../Components/HeaderComponents/HeaderComponent";
import { UserType } from "../Components/LoginRegisterComponents/UserContext";

const UserAuth = ({ navigation, route }: RootStackScreenProps<"UserLogin">) => {
    const [userLoginForm, setUserLoginForm] = useState({
        email: "",
        password: ""
    });

    const [userSignupForm, setUserSignupForm] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showRegistrationScreen, setShowRegistrationScreen] = useState(false);

    const userRegistrationParams = {
        username: "",
        email: "",
        password: ""
    };

    const SubmitUserLoginForm = (userLoginParams?: any) => {
        axios
            .post("http://10.0.2.2:9000/user/loginUser", userLoginParams)
            .then((response) => {
                console.log(response);
                const token = response.data.token;
                AsyncStorage.setItem("authToken", token);
                Alert.alert("Login Successfully!");
                navigation.navigate("TabsStack", { screen: "Cart" });
            })
            .catch((err) => {
                Alert.alert("Login Error", err.message);
                console.log(err);
            });
    };

    const SubmitRegistrationForm = () => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        axios
            .post("http://10.0.2.2:9000/user/registerUser", userSignupForm)
            .then((response) => {
                console.log(response);
                Alert.alert("User Registration Completed Successfully");
                setShowRegistrationScreen(false);
                setUserSignupForm(userRegistrationParams);
            })
            .catch((err) => {
                console.log(err.request); // Logs request details
                console.log(err.response); // Logs response details (if any)
                const errorMessage =
                    err.response?.data?.message || "An unexpected error occurred";
                Alert.alert("Registration Error", errorMessage);
            })
            .finally(() => setIsSubmitting(false)); // Re-enable the button
    };

    return (
        <SafeAreaView>
            <Text>User Login Screen</Text>
            {/* Thêm form nhập email, password */}
        </SafeAreaView>
    );
};

export default UserAuth;
