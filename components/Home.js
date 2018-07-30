import React, { Component } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import Permissions from 'react-native-permissions';
import BackgroundGeolocation from "react-native-background-geolocation";
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

    componentDidMount(){
      Permissions.check('location').then(response => {
        // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
        this.setState({ locationPermission: response })
      })
    }


    componentWillMount() {
      ////
      // 1.  Wire up event-listeners
      //
  
      // This handler fires whenever bgGeo receives a location update.
      BackgroundGeolocation.on('location', this.onLocation, this.onError);
    }

    //listeners
    onLocation(location) {
      console.log('- [event] location: ', location);
    }
    onError(error) {
      console.warn('- [event] location error ', error);
    }
    onActivityChange(activity) {
      console.log('- [event] activitychange: ', activity);  // eg: 'on_foot', 'still', 'in_vehicle'
    }
    onProviderChange(provider) {
      console.log('- [event] providerchange: ', provider);    
    }
    onMotionChange(location) {
      console.log('- [event] motionchange: ', location.isMoving, location);
    }

    trackLocation = () => {
      ////
      // 2.  Execute #ready method (required)
      //
      console.log('i am in track location in home.js line 83')
      BackgroundGeolocation.getCurrentPosition((location) => {
        console.log('- current position: ', location);
      }, (error) => {
        console.log('- location error: ', error);
      }, {samples: 1, persist: false});

      BackgroundGeolocation.

      const options = {
        // Geolocation Config
        desiredAccuracy: 0,
        distanceFilter: 0,
        locationUpdateInterval: 1000,
        // Activity Recognition
        stopTimeout: 2,
        // Application config
        debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
        logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
        stopOnTerminate: false,   // <-- Allow the background-service to continue tracking when user closes the app.
        startOnBoot: true,        // <-- Auto start tracking when device is powered-up.
      }

      // BackgroundGeolocation.ready(options, (state) => {
      //   console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);
  
      //   if (!state.enabled) {
      //     ////
      //     // 3. Start tracking!
      //     //
      //     BackgroundGeolocation.start(function() {
      //       console.log("- Start success");
      //     });
      //   }
      // });
    }
  
    // You must remove listeners when your component unmounts
    trackLocationStop = () => {    
      BackgroundGeolocation.removeListeners();
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
          trackLocation = {this.trackLocation}
          trackLocationStop = {this.trackLocationStop}
        />
     </View>
    );
  };
};

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
