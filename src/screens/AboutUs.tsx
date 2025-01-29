import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, Linking } from 'react-native';

const AboutUs = () => {
  const handleEmailPress = (email) => {
    Linking.openURL(`mailto:${email}`);
  };

  const teamMembers = [
    { name: 'Nahin Ehsan Nilav', roll: '31', email: 'ehsannilav@gmail.com', image: 'https://scontent-sin11-1.cdninstagram.com/v/t51.2885-19/472168774_990457619579254_3804829550344607006_n.jpg?_nc_ht=scontent-sin11-1.cdninstagram.com&_nc_cat=110&_nc_ohc=-xlI3sKzjIUQ7kNvgHnIgBE&_nc_gid=a805476d48f3424d9533d14094dffe6d&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AYBe961rrZnQLhikyAN8yX-UCtoEuM0vcwURqL1tl_ULBw&oe=679FBD33&_nc_sid=7a9f4b' },
    { name: 'Fayek Ahmed Rahat', roll: '57', email: 'fayekahmedrahat90@gmail.com', image: 'https://instagram.fdac12-1.fna.fbcdn.net/v/t51.2885-19/471905802_565543123116499_7645982300228500794_n.jpg?stp=dst-jpg_s320x320_tt6&_nc_ht=instagram.fdac12-1.fna.fbcdn.net&_nc_cat=107&_nc_ohc=uu5Ic6ixsjoQ7kNvgERgJJE&_nc_gid=86480d39b04c49bc9aee40260f735330&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AYAQJSUUfr7zw5ak2ZzOqD-xFWrRKA21UFyC-aYG2UbpMg&oe=679FBC09&_nc_sid=8b3546' },
    
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>About Us</Text>

      {teamMembers.map((member, index) => (
        <View key={index} style={styles.card}>
          <Image source={{ uri: member.image }} style={styles.image} />
          <Text style={styles.name}>{member.name}</Text>
          <Text style={styles.roll}>Roll - {member.roll}</Text>
          <TouchableOpacity onPress={() => handleEmailPress(member.email)}>
            <Text style={styles.email}>Email: {member.email}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
    justifyContent:'center',
    alignItems : 'center'
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#37474f',
  },
  card: {
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 15,
    elevation: 4,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: '#263238',
  },
  roll: {
    fontSize: 16,
    marginBottom: 8,
    color: '#607d8b',
  },
  email: {
    fontSize: 16,
    color: 'red',
    
    fontWeight: '800',
  },
});

export default AboutUs;