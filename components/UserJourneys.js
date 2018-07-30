import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const UserJourneys = (props) => {
  let totalKmTraveled;
  if (props.journeyObj.data) {
    const { journeys } = props.journeyObj.data
 
  const distance = (lat1, long1, lat2, long2) => {
    const deg2rad = Math.PI / 180
    const cos = Math.cos;
    lat1 *= deg2rad;
    long1 *= deg2rad;
    lat2 *= deg2rad;
    long2 *= deg2rad;
    const a = (
      (1 - cos(lat2 - lat1)) +
      (1 - cos(long2 - long1)) *
      cos(lat1) * cos(lat2)
    ) / 2;
    return 12742 * Math.asin(Math.sqrt(a));
  }

  // Takes mission composing of 3 arrays. latArr, longArr, timeArr
  getDistanceTraveled = (mission) => {
    const { latArr, longArr } = mission
    return distance(latArr[0], longArr[0], latArr[1], longArr[1]);
  }

  getLongLatCoords = () => {
    const missionsArrCoords = journeys.map(journey => {
      const latArr = [];
      const longArr = [];
      const timeArr = [];
      // Access each journey the user has ever taken
      journey.route.forEach(coords => {
        // All lats to the lats array. etc
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

    const missionDetails = missionsArrCoords.map(mission => {
      return getDistanceTraveled(mission)
    })
    
    totalKmTraveled = missionDetails.reduce((acc, dist) => {
      acc += dist
      return acc
    },0).toFixed(2)
  }
  
}
  getLongLatCoords()
  return (
    <View>
      <TouchableOpacity>
      <Text style={{ marginHorizontal: 20 }}>User journey stats</Text>
      </TouchableOpacity>
      <View>
        <Text style={{marginHorizontal: 20}}>{`Total ${totalKmTraveled}kms`}</Text>
      </View>
      <View>
        <Text style={{marginHorizontal: 20}}>{`Total ${props.journeyObj.data.journeys.length} missions`}</Text>
      </View>
    </View>
  );
};

export default UserJourneys;