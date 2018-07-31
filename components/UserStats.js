import React, { Component} from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import * as api from '../api'
import UserJourneys from './UserJourneys'

class UserStats extends Component {
  state = {
    userJourneys : null
  };

componentDidMount() {
  this.getUserJourneys(this.props.user._id)
}


getUserJourneys = (id) => {
  api.getJourneysByUser(id)
  .then(journeyData => {
    this.setState({
      userJourneys: journeyData
    })
  })
}
  render() {
    const { username, achievements, avatar, xp, _id } = this.props.user
    return (
      <View style={styles.card}>

        <View style={{ flexDirection: 'row' }}>
          <Image
            style={{marginHorizontal: 20, width: 50, height: 50}}
            source={{ uri: `${avatar}` }}
            />
          <Text style={styles.title}>{username}</Text>
        </View>

        <View>
          <Text style={styles.title}>{`XP: ${xp}`}</Text>
        </View>

        <View>
          <Text style={styles.title}>Achievements</Text>
          {achievements.map((achievement, index) => {
            return <Text key={index} style={{marginHorizontal: 20}}>{achievement}</Text>
          })}
        </View>
        {this.state.userJourneys !== null && <UserJourneys journeyObj={this.state.userJourneys}/>}
      </View>
    )
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
  },
  row: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    margin: 1
  },
  cardTitle: { flex: 1, marginTop: -10 },
  title: { marginHorizontal: 20, fontSize: 20, color: "rgb(0,220,90)" },
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

export default UserStats;
