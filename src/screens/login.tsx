import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import images from "../Constants/images";
import icons from "../Constants/icons";
import { useNavigation } from "@react-navigation/native";
import { RootStackScreenProps } from "../navigators/RootNavigator";
import { useLogin } from "../api";
import { useAuthStore } from "../store/auth/useAuthStore";



const avatar = "https://images.unsplash.com/photo-1521577352947-9bb58764b69a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=986&q=80"


const Login = ({ navigation }: RootStackScreenProps<"Login">) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { mutate: login, error } = useLogin();
  const  storeLogin = useAuthStore((state) => state.login);
  

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
  
            // Ensure the API response includes a `user` object
            if (!data.user) {
              throw new Error("User data is missing in the API response.");
            }
  
            // Store user data in Zustand
            await storeLogin({
               // Ensure `data.user` is present in the API response
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
  //   const handleLogin = () =>
  // {
  //   navigation.navigate('TabsStack', { screen: 'Home' });
  // }

  const handleSignUp = () => {
    navigation.navigate("signUp"); // Ensure "SignUp" is a registered route in your navigation stack
  };

  return (
    <SafeAreaView style={styles.safeArea}>
  <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    

    <View style={styles.content}>
      <Text style={styles.welcomeText}>Welcome To ShopSphere</Text>

      <Text style={styles.headingText}>
        Discover  {"\n"}
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

      <Text style={styles.orText}>OR</Text>

      <TouchableOpacity onPress={handleLogin} style={styles.googleButton}>
        <View style={styles.buttonContent}>
          <Image
            // source={require(icons.google)}
            style={styles.googleIcon}
            resizeMode="contain"
          />
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSignUp} style={styles.signUpButton}>
        <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  </ScrollView>
</SafeAreaView>

  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "white",
    flex: 1,
    paddingVertical: 40
  },
  scrollView: {
    height: "100%",
  },
  image: {
    width: "100%",
    height: "66.66%", // 4/6 of the screen height
  },
  content: {
    paddingHorizontal: 40, // equivalent to Tailwind's px-10
  },
  welcomeText: {
    fontSize: 16, // text-base
    textAlign: "center",
    textTransform: "uppercase",
    fontFamily: "Rubik", // Replace with your font file configuration
    color: "#A0A0A0", // Tailwind's text-black-200
  },
  headingText: {
    fontSize: 24, // text-3xl
    fontFamily: "Rubik-Bold", // Replace with your bold font configuration
    color: "#505050", // Tailwind's text-black-300
    textAlign: "center",
    marginTop: 8, // mt-2
  },
  highlightText: {
    color: "black",
    fontWeight: "800" // Tailwind's text-primary-300
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: "Rubik", // Regular font
    color: "#505050",
    marginTop: 16,
  },
  button: {
    backgroundColor: "black", // Tailwind's text-primary-300
    borderRadius: 8,
    width: "100%",
    paddingVertical: 16, // py-4
    marginTop: 20, // mt-5
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
  buttonText: {
    fontSize: 18, // text-lg
    fontFamily: "Rubik-Medium", // Medium font
    color: "white",
  },
  orText: {
    fontSize: 16,
    fontFamily: "Rubik",
    color: "#A0A0A0",
    textAlign: "center",
    marginVertical: 16,
  },
  googleButton: {
    backgroundColor: "white",
    shadowColor: "#A0A0A0", // Tailwind's shadow-zinc-300
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    borderRadius: 8,
    width: "100%",
    paddingVertical: 16,
  },
  googleIcon: {
    width: 20, // w-5
    height: 20, // h-5
  },
  googleButtonText: {
    fontSize: 18,
    fontFamily: "Rubik-Medium",
    color: "#505050",
    marginLeft: 8,
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
