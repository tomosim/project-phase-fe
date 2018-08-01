import React, { Component } from "react";
import { TouchableOpacity, View, Image, StyleSheet, Text } from "react-native";

class TransportCard extends Component {
  state = {};

  missionStarter = (bool, transport) => {
    this.props.setModalVisible(bool, transport);
  };

  render() {
    return (
      <View style={styles.card}>
        <View style={styles.cardTitle}>
          <Text style={styles.title}>START A MISSION</Text>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.missionStarter(true, "foot 👣")}
          >
            <Image
              style={styles.icon}
              source={require("../assets/logos/walk.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.missionStarter(true, "bicycle 🚲")}
          >
            <Image
              style={styles.icon}
              source={require("../assets/logos/bike.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.missionStarter(true, "bus 🚌")}
          >
            <Image
              style={styles.icon}
              source={require("../assets/logos/bus.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.missionStarter(true, "tram 🚊")}
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
            onPress={() => this.missionStarter(true, "motorbike")}
          >
            <Image
              style={styles.icon}
              source={require("../assets/logos/motorbike.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.missionStarter(true, "electric car 🚗⚡️")}
          >
            <Image
              style={styles.icon}
              source={require("../assets/logos/electric_car.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.missionStarter(true, "train 🚂")}
          >
            <Image
              style={styles.icon}
              source={require("../assets/logos/train.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.missionStarter(true, "taxi 🚕")}
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
    backgroundColor: "#F5FCFF",
    marginTop: 10,
    padding: 5,
    paddingTop: 10,
    paddingBottom: 3,
    elevation: 1,
    borderRadius: 5,
    height: 220
  },
  row: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    margin: 1
  },
  cardTitle: {
    flex: 1,
    marginTop: -10,
    alignItems: "center"
  },
  title: {
    fontSize: 20,
    fontFamily: "Righteous-Regular"
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
