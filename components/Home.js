import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import TransportCard from "./TransportCard";
import CounterModal from "./CounterModal";

class Home extends Component {
  state = { modalVisible: false, mode: "" };

  setModalVisible(transport, bool) {
    console.log(transport, bool);
    bool
      ? this.setState({ modalVisible: bool, mode: transport })
      : this.setState({ modalVisible: bool, mode: "" });
  }

  render() {
    return (
      <View style={styles.parentView}>
        <Text style={styles.title}>e-missions</Text>
        <View style={styles.container}>
          <TransportCard
            setModalVisible={(transport, bool) =>
              this.setModalVisible(transport, bool)
            }
          />
        </View>
        <CounterModal
          modalVisible={this.state.modalVisible}
          modeOfTransport={this.state.mode}
          setModalVisible={(transport, bool) =>
            this.setModalVisible(transport, bool)
          }
        />
      </View>
    );
  }
}

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
