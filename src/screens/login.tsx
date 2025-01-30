import React, { useState } from "react";
import { SafeAreaView, Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackScreenProps } from "../navigators/RootNavigator";
import { useLogin } from "../api";
import { useAuthStore } from "../store/auth/useAuthStore";

// Assuming the logo is a local file, you can import it like this:
const logo = require("/home/fayek/android_app/ecommerce_app/src/assets/image-removebg.png"); // Adjust the path as necessary

const Login = ({ navigation }: RootStackScreenProps<"Login">) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { mutate: login, error } = useLogin();
  const storeLogin = useAuthStore((state) => state.login);

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert("Error", "Please enter both username and password.");
      return;
    }

    login(
      { username, password },
      {
        onSuccess: async (data) => {
          try {
            console.log("Login successful!", data);

            if (!data.user) {
              throw new Error("User data is missing in the API response.");
            }

            // Store user data in Zustand
            await storeLogin({
              accessToken: data.access_token,
              refreshToken: data.refresh_token,
            });

            // Navigate to the home screen
            navigation.navigate("TabsStack", { screen: "Home" });
          } catch (error) {
            console.error("Error saving user data to Zustand:", error);
            Alert.alert("Error", "Something went wrong. Please try again.");
          }
        },
        onError: (error) => {
          console.error("Login error:", error);
          Alert.alert("Login Failed", "Please check your credentials and try again.");
        },
      }
    );
  };

  const handleSignUp = () => {
    navigation.navigate("signUp");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.content}>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.welcomeText}>Welcome To ShopSphere</Text>
            <Text style={styles.headingText}>
              Discover {"\n"}
              <Text style={styles.highlightText}>Your Inner Desire</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#A0A0A0"
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#A0A0A0"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
              <View style={styles.buttonContent}>
                <Text style={styles.buttonText}>Login</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSignUp} style={styles.signUpButton}>
              <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "white",
    flex: 1,
    paddingVertical: 60,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 40,
    alignItems: "center", // Center the content horizontally
  },
  logo: {
    width: 150, // Adjust the width as needed
    height: 150, // Adjust the height as needed
    marginBottom: 5, // Space between the logo and the welcome text
  },
  welcomeText: {
    fontSize: 16,
    textAlign: "center",
    textTransform: "uppercase",
    fontFamily: "Rubik",
    color: "#A0A0A0",
  },
  headingText: {
    fontSize: 24,
    fontFamily: "Rubik-Bold",
    color: "#505050",
    textAlign: "center",
    marginTop: 8,
  },
  highlightText: {
    color: "black",
    fontWeight: "800",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: "Rubik",
    color: "#505050",
    marginTop: 16,
    width: "100%", // Ensure the input fields take full width
  },
  button: {
    backgroundColor: "black",
    borderRadius: 8,
    width: "100%",
    paddingVertical: 16,
    marginTop: 20,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Rubik-Medium",
    color: "white",
  },
  signUpButton: {
    marginTop: 16,
    alignItems: "center",
  },
  signUpText: {
    fontSize: 16,
    fontFamily: "Rubik",
    color: "black",
    fontWeight: "800",
  },
});

export default Login;