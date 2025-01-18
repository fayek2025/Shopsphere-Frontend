import { StatusBar } from "expo-status-bar";
import React from "react";


import {TouchableOpacity, View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackScreenProps } from "../navigators/RootNavigator";

const AVATAR_URL = "https://plus.unsplash.com/premium_photo-1671641797851-0e11e9271439?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"


const OnboardingScreen = ({navigation} : RootStackScreenProps<"onBoarding">) => {

    const handleLogin = () => {
        navigation.navigate('Login')
    };
  

  return (
    <SafeAreaView style={styles.safeArea}>
    

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.container}>
          <Image
            // source={images.logo}
            style={styles.logo}
            resizeMode="contain"
          />

          <Image
           source={{uri : AVATAR_URL}}
            style={styles.cards}
            resizeMode="contain"
          />

          <View style={styles.textContainer}>
            <Text style={styles.mainText}>
              Discover Endless{"\n"}
              Possibilities with{" "}
              <Text style={styles.highlightText}>ShopSphere</Text>
            </Text>

            <Image
            //   source={images.path}
              style={styles.pathImage}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.subtitle}>
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with ShopSphere
          </Text>

           <TouchableOpacity onPress={handleLogin} style={styles.button}>
                  <View style={styles.buttonContent}>
                    <Text style={styles.buttonText}>Login</Text>
                  </View>
                </TouchableOpacity>
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#fff", // bg-primary
    flex: 1,
  },
  scrollContainer: {
    height: "100%",
  },
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    paddingHorizontal: 16, // px-4
  },
  logo: {
    width: 130,
    height: 84,
  },
  cards: {
    maxWidth: 600,
    width: "100%",
    height: 298,
  },
  textContainer: {
    position: "relative",
    marginTop: 20, // mt-5
  },
  mainText: {
    fontSize: 24, // text-3xl
    color: "black", // text-white
    fontWeight: "bold",
    textAlign: "center",
  },
  highlightText: {
    color: "black", // text-secondary-200
  },
  pathImage: {
    width: 136,
    height: 15,
    position: "absolute",
    bottom: -8,
    right: -32,
  },
  subtitle: {
    fontSize: 14, // text-sm
    fontFamily: "Rubik-Regular", // font-pregular
    color: "#B0B0B0", // text-gray-100
    marginTop: 28, // mt-7
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 28, // mt-7
    width: "100%",
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
  },
  buttonText: {
    fontSize: 18, // text-lg
    fontFamily: "Rubik-Medium", // Medium font
    color: "white",
  },
});

export default OnboardingScreen;
