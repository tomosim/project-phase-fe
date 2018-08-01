import React, { Component } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import Permissions from "react-native-permissions";
import TransportCard from "./TransportCard";
import CounterModal from "./CounterModal";
import MenuCard from "./MenuCard";
import * as api from "../api";
import UserStats from "./UserStats";
import JourneyOverviewModal from "./JourneyOverviewModal";

class Home extends Component {
  state = {
    modalVisible: false,
    mode: "",
    recording: false,
    menuVisible: false,
    locationPermission: "",
    coords: [],
    currentJourney: null,
    loggedJourney: null,
    journey: { startTime: "", endTime: "", coords: [] }, //Is this used?
    journeyModalVisible: false
  };

  //geolocation
  getLatLong = () =>
    new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        position => {
          resolve(position.coords);
        },
        error => {
          reject(error);
        },
        { enableHighAccuracy: false, timeout: 30000, maximumAge: 10000 }
      );
    });

    startCoords = () => {
      this.getLatLong()
        .then((newCoords) => {
          const {latitude, longitude} = newCoords;
          const currentCoords = {lat: latitude, long: longitude, time: Date.now()}
          this.setState({
            coords: [...this.state.coords, currentCoords]
          })
        })
        .catch(console.log)      
    }

    endCoords = () => {
      this.getLatLong()
        .then((newCoords) => {
          const {latitude, longitude} = newCoords;
          const currentCoords = {lat: latitude, long: longitude, time: Date.now()}
          this.setState({
            coords: [...this.state.coords, currentCoords]
          })
          const newJourney = {
            mode: this.state.mode,
            route: this.state.coords,
            belongs_to: this.props.user._id
          }
          return newJourney
        })
        .then((newJourney) => {
          return api.createJourney(newJourney)    
        })
        .then((res) => {
          const {newJourney} = res.data
          this.setState({
            coords: [],
            currentJourney: newJourney
          })
        })
        .catch(console.log)  
      
    }   

    //permissions for geolocation - component did mount alerts for permission
    //when data is first installed, then stores in device's location
    _requestPermission = () => {
      Permissions.request('location').then(response => {
        // Returns once the user has chosen to 'allow' or to 'not allow' access
        // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
        this.setState({ locationoPermission: response })


//   endCoords = () => {
//     this.getLatLong()
//       .then(newCoords => {
//         console.log(newCoords);
//         const { latitude, longitude } = newCoords;
//         const currentCoords = {
//           lat: latitude,
//           long: longitude,
//           time: Date.now()
//         };
//         this.setState({
//           coords: [...this.state.coords, currentCoords]
//         });
//         const newJourney = {
//           mode: this.state.mode,
//           route: this.state.coords,
//           belongs_to: this.props.user._id
//         };
//         console.log(newJourney, "from first .then");
//         return newJourney;
//       })
//       .then(newJourney => {
//         console.log(newJourney, "from second .then");
//         return api.createJourney(newJourney);
//       })
//       .then(res => {
//         console.log(res);
//         const { newJourney } = res.data;
//         this.setState({
//           currentJourney: newJourney
//         });
//         console.log(newJourney);
//       })
//       .catch(console.log);
  };

  //permissions for geolocation - component did mount alerts for permission
  //when data is first installed, then stores in device's location
  _requestPermission = () => {
    Permissions.request("location").then(response => {
      // Returns once the user has chosen to 'allow' or to 'not allow' access
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      this.setState({ locationoPermission: response });
    });
  };

  _alertForLocationPermission() {
    Alert.alert(
      "Can we access your location?",
      "We need access so we can calculate your carbon emissions when traveling",
      [
        {
          text: "No way",
          onPress: () => console.log("Permission denied"),
          style: "cancel"
        },
        this.state.locationPermission == "undetermined"
          ? { text: "OK", onPress: this._requestPermission }
          : { text: "Open Settings", onPress: Permissions.openSettings }
      ]
    );
  }

  componentDidMount() {
    Permissions.request("location").then(response => {
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      this.setState({ locationPermission: response });
    });
    Permissions.check("location").then(response => {
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      this.setState({ locationPermission: response });
    });
  }

  //menu for logout button
  toggleMenu = () => {
    this.setState({
      menuVisible: !this.state.menuVisible
    });
  };

  //counter modal visible and if recording
  toggleRecording = () => {
    this.setState({ recording: !this.state.recording });
  };

  setModalVisible = (bool, transport) => {
    bool
      ? this.setState({ modalVisible: bool, mode: transport })
      : this.setState({ modalVisible: bool });
  };

  setOverviewVisible = () => {
    this.setState({ journeyModalVisible: !this.state.journeyModalVisible });
  };

  render() {
    return (
      <View style={styles.parentView}>
        <View style={styles.menu}>
          <Text style={styles.title}>e-missions</Text>
          <TouchableOpacity onPress={() => this.toggleMenu()}>
            <Image
              style={styles.burger}
              source={require("../assets/logos/burgerMenu.png")}
            />
          </TouchableOpacity>
        </View>

        {this.state.menuVisible && (
          <MenuCard toggleMenu={this.toggleMenu} logout={this.props.logout} />
        )}

        <View style={styles.container}>
          <TransportCard
            setModalVisible={(bool, transport) =>
              this.setModalVisible(bool, transport)
            }
          />
          <UserStats user={this.props.user} />
        </View>

        <JourneyOverviewModal
          journeyModalVisible={this.state.journeyModalVisible}
          setOverviewVisible={this.setOverviewVisible}
        />

        <CounterModal
          recording={this.state.recording}
          toggleRecording={this.toggleRecording}
          modalVisible={this.state.modalVisible}
          modeOfTransport={this.state.mode}
          setModalVisible={(bool, transport) =>
            this.setModalVisible(bool, transport)
          }
          startCoords={this.startCoords}
          endCoords={this.endCoords}
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
    width: "100%"
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
    flex: 9,
    backgroundColor: "#F5FCFF"
  }
});
export default Home;
