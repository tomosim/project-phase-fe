import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import * as api from "../api";
import UserJourneys from "./UserJourneys";

class User extends Component {
  state = {
    userJourneys: null
  };

  componentDidMount() {
    this.getUserJourneys(this.props.user._id);
  }

  getUserJourneys = id => {
    api.getJourneysByUser(id).then(journeyData => {
      this.setState({
        userJourneys: journeyData
      });
    });
  };

  render() {
    const { username, achievements, avatar, xp, _id } = this.props.user;
    return (
      <View style={styles.container}>
        <View style={styles.head}>
          <Image style={styles.avatar} source={{ uri: `${avatar}` }} />
          <Text style={styles.name}>{username.toUpperCase()}</Text>
        </View>
        <View style={styles.body}>
          {/* this is where the xp bar/rank will go */}
          <View style={styles.stats}>
            <View>
              <Text style={styles.title}>STATS</Text>
            </View>
            <View>
              {this.state.userJourneys !== null && (
                <UserJourneys journeyObj={this.state.userJourneys} />
              )}
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  head: {
    flexDirection: "row",
    backgroundColor: "#F5FCFF",
    alignItems: "center",
    elevation: 1
  },
  avatar: {
    margin: 5,
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#F5FCFF"
  },
  name: {
    fontSize: 24,
    fontFamily: "Righteous-Regular",
    marginLeft: 15
  },
  title: {
    fontSize: 24,
    fontFamily: "Righteous-Regular",
    textAlign: "center"
  },
  stats: {
    backgroundColor: "#F5FCFF",
    margin: 10,
    padding: 5,
    paddingTop: 10,
    paddingBottom: 3,
    elevation: 1,
    borderRadius: 5
  }
});

export default User;
