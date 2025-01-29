import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import images from "../Constants/images"; // Assuming you have a central place for images
import { RootStackScreenProps } from "../navigators/RootNavigator";
import { useSignup } from "../api";
import { useAuthStore } from "../store/auth/useAuthStore";

// Assuming the logo is a local file, you can import it like this:
const logo = require("../assets/image-removebg.png"); // Adjust the path as necessary

const SignUp = ({ navigation }: RootStackScreenProps<"signUp">) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [full_name, setFull_name] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: signupUser } = useSignup();

  const handleSignup = async () => {
    try {
      // Call signupUser with credentials
      await signupUser({ username, email, password });

      // On success, navigate to the desired screen
      console.log("Signup successful!");
      navigation.navigate("TabsStack", { screen: "Home" });
    } catch (error: any) {
      // On error, show an alert
      Alert.alert("Signup Failed", "Please check your details and try again.");
    }
  };

  const handleSignIn = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.content}>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.welcomeText}>Create Your Account</Text>

            <Text style={styles.headingText}>
              Start Your Journey With {"\n"}
              <Text style={styles.highlightText}>ShopSphere</Text>
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#A0A0A0"
              value={full_name}
              onChangeText={setFull_name}
            />

            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#A0A0A0"
              value={username}
              onChangeText={setUsername}
            />

            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#A0A0A0"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#A0A0A0"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <TouchableOpacity onPress={handleSignup} style={styles.button}>
              <View style={styles.buttonContent}>
                <Text style={styles.buttonText}>Sign Up</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSignIn} style={styles.signInButton}>
              <Text style={styles.signInText}>
                Already have an account? Sign In
              </Text>
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
  scrollView: {
    flexGrow: 1,
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
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Rubik-Medium",
    color: "white",
  },
  signInButton: {
    marginTop: 16,
    alignItems: "center",
  },
  signInText: {
    fontSize: 16,
    fontFamily: "Rubik",
    color: "black",
    fontWeight: "800",
  },
});

export default SignUp;