import React, { useState } from "react";
import {
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackScreenProps } from "../navigators/RootNavigator";
import { useUpdateUserProfile } from "../api";
import { UserProfileUpdate } from "../entities/Todo";

const EditProfile = ({ navigation , route: {params : {name:routeName , email:routeEmail , username:routeUsername }} }: RootStackScreenProps<"EditProfile"> ) => {
  const [name, setName] = useState(routeName || "");
  const [email, setEmail] =  useState(routeEmail || "");
  const [username, setUsername] = useState(routeUsername || "");

  const mutation = useUpdateUserProfile();

  // Handle save button click
  const handleSave = () => {
    // Basic validation
    if (!username || !email || !name) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    // Prepare data
    const updatedProfileData: UserProfileUpdate = {
      username,
      email,
      full_name: name,
    };

    // Trigger mutation
    mutation.mutate(updatedProfileData, {
      onSuccess: () => {
        Alert.alert("Success", "Profile updated successfully!");
        navigation.goBack(); // Navigate back to the profile screen
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
        <View 
        style = {{
            justifyContent: "center",
            alignItems: "center",
            
        }}
        >
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
    backgroundColor: "white",
    alignContent: "center",
    justifyContent  : "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
   
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#f5314b",
    padding: 15,
    borderRadius: 10,
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
