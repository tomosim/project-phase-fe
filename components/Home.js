import React, { Component } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import Permissions from 'react-native-permissions'
import TransportCard from "./TransportCard";
import CounterModal from "./CounterModal";
import MenuCard from "./MenuCard"

class Home extends Component {
  state = {
    modalVisible: false,
    mode: "",
    recording: false,
    journey: { startTime: "", endTime: "", coords: [] },
    menuVisible: false,
    locationPermission: '',
  };

  //geolocation and permissions
    getLatLong = () => new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position) => {
          resolve(position.coords);
      }, (error) => {
          reject(error);
      }, { enableHighAccuracy: false, timeout: 30000, maximumAge: 10000 });
    });

    _requestPermission = () => {
      Permissions.request('location').then(response => {
        // Returns once the user has chosen to 'allow' or to 'not allow' access
        // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
        this.setState({ locationoPermission: response })
      })
    }

    _alertForLocationPermission() {
      Alert.alert(
        'Can we access your location?',
        'We need access so we can calculate your carbon emissions when traveling',
        [
          {
            text: 'No way',
            onPress: () => console.log('Permission denied'),
            style: 'cancel',
          },
          this.state.locationPermission == 'undetermined'
            ? { text: 'OK', onPress: this._requestPermission }
            : { text: 'Open Settings', onPress: Permissions.openSettings },
        ],
      )
    }

    async componentDidMount() {
      Permissions.request('location').then(response => {
        // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
        this.setState({ locationPermission: response })
      })
      const { latitude, longitude } = await this.getLatLong();
      console.log(latitude, longitude)
    }



  
  //menu for logout button
  toggleMenu = () => {
    this.setState({
      menuVisible: !this.state.menuVisible
    })
  }

  //counter modal visible and if recording
  toggleRecording = () => {
    this.setState({ recording: !this.state.recording });
  };

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
