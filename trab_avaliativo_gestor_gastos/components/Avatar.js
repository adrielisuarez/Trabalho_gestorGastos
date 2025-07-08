import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

export default function Avatar({ imageUrl }) {
  const defaultImage = 'https://randomuser.me/api/portraits/lego/1.jpg';

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageUrl || defaultImage }}
        style={styles.avatar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#ccc',
  },
});
