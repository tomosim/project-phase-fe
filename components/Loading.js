import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";

const Loading = () => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color={"#00DC5A"}/>
    </View>
  )
};

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Loading;