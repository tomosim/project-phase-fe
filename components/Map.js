import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import MapView from "react-native-maps";

export default class MyApp extends Component {
  render() {
    const { region } = this.props;
    console.log(region);

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={{
            latitude: 53.50825,
            longitude: -2.24,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
          }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});
