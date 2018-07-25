import React from "react";
import { View, StyleSheet, Text } from "react-native";
import TransportCard from "./TransportCard";

const Home = props => {
  return (
    <View style={styles.parentView}>
      <Text style={styles.title}>e-missions</Text>
      <View style={styles.container}>
        <TransportCard />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parentView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch"
  },
  title: {
    flex: 1,
    fontFamily: "Pacifico-Regular",
    fontSize: 48,
    color: "#F5FCFF",
    textAlign: "center",
    margin: -30,
    paddingBottom: 20,
    elevation: 10
  },
  container: {
    flex: 6,
    backgroundColor: "#F5FCFF"
  }
});
export default Home;
