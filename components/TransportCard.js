import React, { Component } from "react";
import {
  TouchableWithoutFeedback,
  View,
  Image,
  StyleSheet
} from "react-native";

class TransportCard extends Component {
  state = {};

  missionStarter = transport => {
    console.log(transport);
  };

  render() {
    return (
      <View style={styles.card}>
        <View style={styles.row}>
          <TouchableWithoutFeedback onPress={() => this.missionStarter("walk")}>
            <Image
              style={styles.icon}
              source={require("../assets/logos/walk.png")}
              resizeMode="contain"
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.missionStarter("bike")}>
            <Image
              style={styles.icon}
              source={require("../assets/logos/bike.png")}
              resizeMode="contain"
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.missionStarter("bus")}>
            <Image
              style={styles.icon}
              source={require("../assets/logos/bus.png")}
              resizeMode="contain"
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.missionStarter("tram")}>
            <Image
              style={styles.icon}
              source={require("../assets/logos/tram.png")}
              resizeMode="contain"
            />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.row}>
          <TouchableWithoutFeedback
            onPress={() => this.missionStarter("motorbike")}
          >
            <Image
              style={styles.icon}
              source={require("../assets/logos/motorbike.png")}
              resizeMode="contain"
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => this.missionStarter("electric_car")}
          >
            <Image
              style={styles.icon}
              source={require("../assets/logos/electric_car.png")}
              resizeMode="contain"
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => this.missionStarter("train")}
          >
            <Image
              style={styles.icon}
              source={require("../assets/logos/train.png")}
              resizeMode="contain"
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.missionStarter("taxi")}>
            <Image
              style={styles.icon}
              source={require("../assets/logos/taxi.png")}
              resizeMode="contain"
            />
          </TouchableWithoutFeedback>
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
  icon: {
    margin: 5,
    width: "17%"
  }
});
export default TransportCard;
