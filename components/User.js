import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import * as api from "../api";
import UserJourneys from "./UserJourneys";
import XPBar from "./XPBar";

class User extends Component {
  //Jamie make this work please!
  rank;

  ranks = {};

  state = {
    userJourneys: null
  };

  componentDidMount() {
    this.getUserJourneys(this.props.user._id);
  }

  componentDidUpdate(prevProps) {
    if(this.props.updateStats) {
      this.getUserJourneys(this.props.user._id)
      this.props.setUpdatedStats(false)
    }
  }

  getUserJourneys = id => {
    api.getJourneysByUser(id).then(journeyData => {
      this.setState({
        userJourneys: journeyData
      });
    });
  };

  render() {
    const { username, achievements, avatar, _id } = this.props.user;

    return (
      <View style={styles.container}>
        <View style={styles.head}>
          <Image style={styles.avatar} source={{ uri: `${avatar}` }} />
          <View>
            <Text style={styles.name}>{username.toUpperCase()}</Text>
            <Text style={styles.rank}>{`RANK: Bamboo!`}</Text>
          </View>
        </View>
        <View style={styles.body}>
          <View style={{ minHeight: 40 }}>
            {this.state.userJourneys !== null && (
              <UserJourneys journeyObj={this.state.userJourneys} />
            )}
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
    borderRadius: 50
  },
  name: {
    fontSize: 24,
    fontFamily: "Righteous-Regular",
    marginLeft: 15
  },
  rank: {
    fontSize: 16,
    fontStyle: "italic",
    marginLeft: 15
  },
  stats: {
    backgroundColor: "#F5FCFF",
    marginVertical: 10,
    padding: 5,
    paddingTop: 10,
    paddingBottom: 3,
    elevation: 1
  }
});

export default User;
