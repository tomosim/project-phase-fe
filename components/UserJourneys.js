import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const UserJourneys = (props) => {
  const { journeys } = props.journeyObj.data

  getLongLatCoords = () => {
    const missionsArr = journeys.map(journey => {
      const latArr = [];
      const longArr = [];
      const timeArr = [];
      // Here I access each journey the user has ever taken
      journey.route.forEach(coords => {
        latArr.push(coords.lat)
        longArr.push(coords.long)
        timeArr.push(coords.time)
      })
      return {
        latArr,
        longArr,
        timeArr
      }
    })
    console.dir(missionsArr)
  }

  return (
    <View>
      <TouchableOpacity onPress={this.getLongLatCoords}>
      <Text style={{ marginHorizontal: 20 }}>User journey stats</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserJourneys;