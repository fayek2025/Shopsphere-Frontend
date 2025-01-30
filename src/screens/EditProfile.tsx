import React, { useState } from "react";
import {
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Alert,
  Image,
} from "react-native";
import { RootStackScreenProps } from "../navigators/RootNavigator";
import { useUpdateUserProfile } from "../api";
import { UserProfileUpdate } from "../entities/Todo";

// Assuming the logo is a local file, you can import it like this:
const logo = require("/home/fayek/android_app/ecommerce_app/src/assets/image-removebg.png"); // Adjust the path as necessary

const EditProfile = ({ navigation, route: { params: { name: routeName, email: routeEmail, username: routeUsername } } }: RootStackScreenProps<"EditProfile">) => {
  const [name, setName] = useState(routeName || "");
  const [email, setEmail] = useState(routeEmail || "");
  const [username, setUsername] = useState(routeUsername || "");

  const mutation = useUpdateUserProfile();

  const handleSave = () => {
    if (!username || !email || !name) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    const updatedProfileData: UserProfileUpdate = {
      username,
      email,
      full_name: name,
    };

    mutation.mutate(updatedProfileData, {
      onSuccess: () => {
        Alert.alert("Success", "Profile updated successfully!");
        navigation.goBack();
      },
      onError: (error: any) => {
        Alert.alert(
          "Error",
          error.message || "Failed to update the profile. Please try again."
        );
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.title}>Edit Profile</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 12,
    marginVertical: 10,
    fontSize: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  saveButton: {
    backgroundColor: "#f5314b",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default EditProfile;