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
} from "react-native";
import images from "../Constants/images";
import { RootStackScreenProps } from "../navigators/RootNavigator";

const SignUp = ({ navigation }: RootStackScreenProps<"signUp">) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    Alert.alert("Account created!", `Welcome, ${username}`);
  };

  const handleSignIn = () => {
    navigation.navigate("Login"); // Ensure "Login" is a registered route in your navigation stack
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Image
          // source={require(images.onboarding)}
          style={styles.image}
          resizeMode="contain"
        />

        <View style={styles.content}>
          <Text style={styles.welcomeText}>Create Your Account</Text>

          <Text style={styles.headingText}>
            Let's Get Started With {"\n"}
            <Text style={styles.highlightText}>Your New Home</Text>
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

          <TouchableOpacity onPress={handleSignUp} style={styles.button}>
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSignIn} style={styles.signInButton}>
            <Text style={styles.signInText}>Already have an account? Sign In</Text>
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
    color: "#FF6B6B", // Tailwind's text-primary-300
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
    backgroundColor: "#FF6B6B", // Tailwind's text-primary-300
    borderRadius: 8,
    width: "100%",
    paddingVertical: 16, // py-4
    marginTop: 20, // mt-5
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18, // text-lg
    fontFamily: "Rubik-Medium", // Medium font
    color: "white",
  },
  signInButton: {
    marginTop: 16,
    alignItems: "center",
  },
  signInText: {
    fontSize: 16,
    fontFamily: "Rubik",
    color: "#FF6B6B",
  },
});

export default SignUp;
