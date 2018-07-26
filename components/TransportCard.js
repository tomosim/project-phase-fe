import React, { Component } from "react";
import { TouchableOpacity, View, Image, StyleSheet } from "react-native";

class TransportCard extends Component {
  state = {};

  missionStarter = (transport, bool) => {
    this.props.setModalVisible(transport, bool);
  };

  render() {
    return (
      <View style={styles.card}>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.missionStarter("foot 👣", true)}
          >
            <Image
              style={styles.icon}
              source={require("../assets/logos/walk.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.missionStarter("bicycle 🚲", true)}
          >
            <Image
              style={styles.icon}
              source={require("../assets/logos/bike.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.missionStarter("bus 🚌", true)}
          >
            <Image
              style={styles.icon}
              source={require("../assets/logos/bus.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.missionStarter("tram 🚊", true)}
          >
            <Image
              style={styles.icon}
              source={require("../assets/logos/tram.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.missionStarter("motorbike", true)}
          >
            <Image
              style={styles.icon}
              source={require("../assets/logos/motorbike.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.missionStarter("electric car 🚗⚡️", true)}
          >
            <Image
              style={styles.icon}
              source={require("../assets/logos/electric_car.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.missionStarter("train 🚂", true)}
          >
            <Image
              style={styles.icon}
              source={require("../assets/logos/train.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.missionStarter("taxi 🚕", true)}
          >
            <Image
              style={styles.icon}
              source={require("../assets/logos/taxi.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  card: {
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "rgb(240, 240, 240)",
    marginTop: 10,
    padding: 5,
    paddingTop: 10,
    paddingBottom: 3,
    elevation: 1,
    borderRadius: 5,
    height: 220
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    margin: 1
  },
  button: {
    backgroundColor: "green",
    height: "75%",
    aspectRatio: 1,
    borderRadius: 20000
  },
  icon: {
    height: "100%",
    aspectRatio: 1
  }
});
export default TransportCard;
