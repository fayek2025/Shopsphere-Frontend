import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';
import { RootStackScreenProps } from '../navigators/RootNavigator';
import { useAuthStore } from '../store/auth/useAuthStore';

const avatar = "/home/fayek/android_app/ecommerce_app/src/assets/image.png";

const SplashScreen = ({ navigation }: RootStackScreenProps<"Splash">) => {
  const fadeAnim = new Animated.Value(0); // For fade-in effect
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      if (isAuthenticated) {
        navigation.replace("TabsStack", { screen: "Home" });
      } else {
        navigation.replace("onBoarding");
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation, isAuthenticated]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={ require(avatar) }
        style={[styles.logo, { opacity: fadeAnim }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default SplashScreen;