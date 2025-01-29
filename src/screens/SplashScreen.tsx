import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';
import { RootStackScreenProps } from '../navigators/RootNavigator';
import { useAuthStore } from '../store/auth/useAuthStore';

const avatar = "/home/fayek/ecommerce_app/src/assets/image2.png";

const SplashScreen = ({ navigation }: RootStackScreenProps<"Splash">) => {
  const fadeAnim = new Animated.Value(0.5); // Start with a higher initial opacity
  const { isAuthenticated , loggedOut } = useAuthStore();
  const [hasShownSplash, setHasShownSplash] = useState(false); // Splash control state

  useEffect(() => {
    if (hasShownSplash) {
      navigateToNextScreen();
      return;
    }

    // Show Splash with Fade-in Animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      setHasShownSplash(true);
      navigateToNextScreen();
    }, 3000); // 3 seconds splash duration

    return () => clearTimeout(timer);
  }, [navigation, isAuthenticated]);

  const navigateToNextScreen = () => {
    if (isAuthenticated) {
      navigation.replace("TabsStack", { screen: "Home" });
    } else if (loggedOut) {
      navigation.replace("Login");
    }
    
    
    
    else {
      navigation.replace("onBoarding");
    }
  };

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require(avatar)}
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
    backgroundColor: '#f5f5f5',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default SplashScreen;