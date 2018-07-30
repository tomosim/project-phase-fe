import React, { Component } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import TransportCard from "./TransportCard";
import CounterModal from "./CounterModal";
import MenuCard from "./MenuCard"
import UserStats from "./UserStats";

class Home extends Component {
  state = {
    modalVisible: false,
    mode: "",
    recording: false,
    journey: { startTime: "", endTime: "", coords: [] },
    menuVisible: false
  };

  toggleRecording = () => {
    this.setState({ recording: !this.state.recording });
  };

  toggleMenu = () => {
    this.setState({
      menuVisible: !this.state.menuVisible
    })
  }

  setModalVisible = (transport, bool) => {
    console.log(transport, bool);
    bool
      ? this.setState({ modalVisible: bool, mode: transport })
      : this.setState({ modalVisible: bool, mode: "" });
  };

  render() {
    return (
      <View style={styles.parentView}>
       <View style={styles.menu}>
          <Text style={styles.title}>e-missions</Text>
          <TouchableOpacity onPress={() => this.toggleMenu()}>
          <Image style={styles.burger} source={require("../assets/logos/burgerMenu.png")}/>
          </TouchableOpacity>
       </View>

      {this.state.menuVisible && <MenuCard toggleMenu={this.toggleMenu}
      logout={this.props.logout}/>}

        <View style={styles.container}>
          <TransportCard
            setModalVisible={(transport, bool) =>
              this.setModalVisible(transport, bool)
            }
          />
        </View>

        <View>
          <UserStats userObj={this.props.userObj}/>
        </View>

        <CounterModal
          recording={this.state.recording}
          toggleRecording={this.toggleRecording}
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
  burger: {
    flex: 1,
    height: "100%",
    aspectRatio: 1,
    margin: 10
  },
  menu: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  parentView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch"
  },
  title: {
    flex: 8,
    fontFamily: "Pacifico-Regular",
    fontSize: 48,
    color: "#F5FCFF",
    textAlign: "center",
    margin: -30,
    paddingBottom: 20,
    elevation: 10,
    paddingLeft: 30
  },
  container: {
    flex: 6,
    backgroundColor: "#F5FCFF"
  }
});
export default Home;
