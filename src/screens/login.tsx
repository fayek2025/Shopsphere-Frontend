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
const avatar = "https://images.unsplash.com/photo-1521577352947-9bb58764b69a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=986&q=80"


const Login = ({ navigation }: RootStackScreenProps<"Login">) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    Alert.alert(`Logging in as ${username}`);
  };

  const handleSignUp = () => {
    navigation.navigate("signUp"); // Ensure "SignUp" is a registered route in your navigation stack
  };

  return (
    <SafeAreaView style={styles.safeArea}>
  <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <Image
      source={{uri : avatar}}
      style={styles.image}
      resizeMode="contain"
    />

    <View style={styles.content}>
      <Text style={styles.welcomeText}>Welcome To Real Scout</Text>

      <Text style={styles.headingText}>
        Let's Get You Closer To {"\n"}
        <Text style={styles.highlightText}>Your Ideal Home</Text>
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
    color: "#FF6B6B",
  },
});

export default Login;
