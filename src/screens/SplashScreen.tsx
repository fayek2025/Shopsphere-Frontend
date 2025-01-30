import React, { useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { RootStackScreenProps } from '../navigators/RootNavigator';
import { useAuthStore } from '../store/auth/useAuthStore';
import useSplashStore from '../store/useSplashStore';

const avatar = "/home/fayek/android_app/ecommerce_app/src/assets/image2.png";

const SplashScreen: React.FC<RootStackScreenProps<"Splash">> = ({ navigation }) => {
  const fadeAnim = new Animated.Value(0.8); // Start with a higher initial opacity
  const { isAuthenticated, loggedOut } = useAuthStore();
  const { hasShownSplash, checkSplashShown, setSplashShown } = useSplashStore();

  useEffect(() => {
    const initializeSplash = async () => {
      await checkSplashShown();
      if (hasShownSplash) {
        navigateToNextScreen();
      } else {
        showSplash();
      }
    };

    initializeSplash();
  }, []); // Removed dependencies to ensure it runs only once on mount

  const showSplash = () => {
    // Show Splash with Fade-in Animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(async () => {
      await setSplashShown();
      navigateToNextScreen();
    }, 3000); // 8 seconds splash duration

    return () => clearTimeout(timer);
  };

  const navigateToNextScreen = () => {
    if (isAuthenticated) {
      navigation.replace("TabsStack", { screen: "Home" });
    } else if (loggedOut) {
      navigation.replace("Login");
    } else {
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