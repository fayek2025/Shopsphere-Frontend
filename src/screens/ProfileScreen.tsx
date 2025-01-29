import React from "react";
import {
  Alert,
  Image,
  ImageSourcePropType,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";


import { useAuthStore } from "../store/auth/useAuthStore";
import { fetchUserInfo } from "../api";
import { useQuery , QueryClient } from "@tanstack/react-query";
import { User } from "../entities/Todo";
import icons from "../Constants/icons";
import { settings } from "../Constants/data";
import Icons from '@expo/vector-icons/MaterialIcons'
import { RootStackScreenProps } from "../navigators/RootNavigator";
import { TabsStackScreenProps } from "../navigators/TabsNavigator";
import { useTheme } from "@react-navigation/native";

const avatar = "https://instagram.fdac12-1.fna.fbcdn.net/v/t51.2885-19/471905802_565543123116499_7645982300228500794_n.jpg?stp=dst-jpg_s320x320_tt6&_nc_ht=instagram.fdac12-1.fna.fbcdn.net&_nc_cat=107&_nc_ohc=uu5Ic6ixsjoQ7kNvgERgJJE&_nc_gid=86480d39b04c49bc9aee40260f735330&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AYAQJSUUfr7zw5ak2ZzOqD-xFWrRKA21UFyC-aYG2UbpMg&oe=679FBC09&_nc_sid=8b3546"
interface SettingsItemProp {
  icon?: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: object;
  showArrow?: boolean;
  iconName?: string;
  navigation?: any;
}



const SettingsItem = ({
  icon,
  title,
  onPress,
  textStyle,
  showArrow = true,
  iconName
}: SettingsItemProp) => (
  <TouchableOpacity onPress={onPress} style={styles.settingsItem}>
    <View style={styles.settingsItemLeft}>
     <Icons name={iconName} size={24} color="black" />
      <Text style={[styles.settingsText, textStyle]}>{title}</Text>
      <View
      style = {{
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
      }}
      >
      <Icons name="keyboard-arrow-right" size={24} color="black" />
      </View>
      
    </View>
    {showArrow && <Image  style={styles.iconSmall} />}
  </TouchableOpacity>
);



const Profile = ({navigation} : TabsStackScreenProps<"Profile">) => {
  const { colors } = useTheme();
  const queryClient = new QueryClient();
  const {data: userInfo = []} = useQuery<User[]>({
      queryKey: ['user'],
      queryFn:  fetchUserInfo,
      staleTime: Infinity,
      refetchOnMount: 'always',
      refetchOnWindowFocus: 'always',
    })
const logoutHandler = async () => {
  try {
    await useAuthStore.getState().logout();
    // navigation.navigate("Login");
    console.log("User logged out successfully!");
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
        

          <Text style={styles.headerTitle}>Profile</Text>
          
        </View>

        {/* Profile Image */}
        <View style={styles.profileContainer}>
          <View style={styles.profileInner}>
            <Image
              source={{ uri: avatar }}
              style={styles.profileImage}
            />
            
            <Text style={styles.profileName}>{userInfo.full_name}</Text>
            <Text style={styles.emailName}>{userInfo.email}</Text>
            <TouchableOpacity style={styles.editButton}
            onPress={() => navigation.navigate("EditProfile" , {name: userInfo.full_name, email: userInfo.email, username: userInfo.username})}
            >
              <Text
                style = {{
                  color: "white",
                  fontSize: 16,
                  fontWeight: "700",
                }}
              >Edit Profile</Text>
            </TouchableOpacity>
          </View>
          
        </View>

        {/* Settings */}
        
        <View style={styles.section}>
          <SettingsItem  title="My Cart" iconName="shopping-cart" onPress={() => navigation.navigate("CartScreen")} />
          <SettingsItem  title="Transactions" iconName="payments" onPress={() => {navigation.navigate('Transaction')}}   />
          <SettingsItem   iconName = "favorite" title="My Favorites" onPress={() => {navigation.navigate('Wish')}}  />
          <SettingsItem   iconName = "favorite" title="About Us" onPress={() => {navigation.navigate('AboutUs')}}  />
        </View>

        {/* Additional Settings */}
        <View style={styles.section}>
          {/* {settings.slice(2).map((item, index) => (
            <SettingsItem key={index} {...item} />
          ))} */}
        </View>

        {/* Logout */}
        <View style={styles.section}>
          <SettingsItem
          
            title="Logout"
            iconName="logout"
            textStyle={styles.logoutText}
            showArrow={false}
            onPress={logoutHandler}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContent: {
    paddingBottom: 32,
    paddingHorizontal: 7,
    marginVertical: 50
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    gap: 10,
    paddingHorizontal: 20
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
   
  },
  iconSmall: {
    width: 24,
    height: 24,
  },
  iconMedium: {
    width: 36,
    height: 36,
  },
  profileContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 5,
    marginVertical: 20,
  },
  profileInner: {
    alignItems: "center",
    marginTop: 5,
  },
  profileImage: {
    width: 176,
    height: 176,
    borderRadius: 88,
  },
  editButton: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5314b",
    width: 100,
    height: 50,
    borderRadius: 15,
  },
  profileName: {
    fontSize: 22,
    fontWeight: '800',
    fontFamily: "Rubik-Bold",
    marginTop: 8,
  },
  emailName : {
    fontSize: 16,
    fontFamily: "Rubik-Medium",
    color: "#a9aaab",
    marginTop: 8,
  },
  section: {
    marginTop: 10,
    
    borderTopColor: "#CCCCCC",
    paddingTop: 10,
  },
  settingsItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 6,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#f5f8fa',
    borderRadius: 10,
  },
  settingsItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingsText: {
    fontSize: 16,
    fontFamily: "Rubik-Medium",
    color: "#333333",
    marginLeft: 12,
  },
  logoutText: {
    color: "red",
  },
});

export default Profile;
