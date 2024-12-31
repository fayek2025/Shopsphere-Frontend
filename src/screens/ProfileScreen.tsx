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



import icons from "../Constants/icons";
import { settings } from "../Constants/data";

const avatar = "https://images.unsplash.com/photo-1521577352947-9bb58764b69a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=986&q=80"

interface SettingsItemProp {
  icon?: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: object;
  showArrow?: boolean;
}

const SettingsItem = ({
  icon,
  title,
  onPress,
  textStyle,
  showArrow = true,
}: SettingsItemProp) => (
  <TouchableOpacity onPress={onPress} style={styles.settingsItem}>
    <View style={styles.settingsItemLeft}>
      <Image source={icon} style={styles.iconSmall} />
      <Text style={[styles.settingsText, textStyle]}>{title}</Text>
    </View>
    {showArrow && <Image  style={styles.iconSmall} />}
  </TouchableOpacity>
);

const Profile = () => {
//   const { user, refetch } = useGlobalContext();

//   const handleLogout = async () => {
//     const result = await logout();
//     if (result) {
//       Alert.alert("Success", "Logged out successfully");
//       refetch();
//     } else {
//       Alert.alert("Error", "Failed to logout");
//     }
//   };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <Image  style={styles.iconSmall} />
        </View>

        {/* Profile Image */}
        <View style={styles.profileContainer}>
          <View style={styles.profileInner}>
            <Image
              source={{ uri: avatar }}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editButton}>
              <Image style={styles.iconMedium} />
            </TouchableOpacity>
            <Text style={styles.profileName}>Name</Text>
          </View>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <SettingsItem  title="My Bookings" />
          <SettingsItem  title="Payments" />
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
            textStyle={styles.logoutText}
            showArrow={false}
            onPress={() => Alert.alert("Logout", "Are you sure you want to logout?")}
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
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "Rubik-Bold",
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
    position: "absolute",
    bottom: 11,
    right: -2,
  },
  profileName: {
    fontSize: 22,
    fontFamily: "Rubik-Bold",
    marginTop: 8,
  },
  section: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#CCCCCC",
    paddingTop: 10,
  },
  settingsItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
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
