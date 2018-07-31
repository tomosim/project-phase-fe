import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const UserJourneys = (props) => {
  let totalKmTraveled;
  let { journeys } = props.journeyObj.data
  
  // filters out incorrectly formatted route data. If missed by backend model
  // journeys = journeys.reduce((acc, journey) => {
  //   if (journey.route.length > 0 && journey.route[0] !== undefined && journey.route[0].lat !== undefined) {
  //     acc.push(journey)
  //   }
  //   return acc;
  // },[])

 
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
  getDistanceBetweenCoordinates = (mission) => {
    const { latArr, longArr } = mission
    const distanceTraveled = [];
    latArr.forEach((l, index) => {
      const pos = latArr.length - 2;
      if (index <= pos) {
        distanceTraveled.push(distance(latArr[index], longArr[index], latArr[index + 1], longArr[index + 1]));
      }
    })
    return distanceTraveled
  }

  getLongLatDetails = () => {
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

    // missionDetails is an array of arrays. Each array is a list of distances between each set of coordinates from a mission.
    const missionDetails = missionsArrCoords.map(mission => {
      return getDistanceBetweenCoordinates(mission)
    })


    // totalMissionDistance is an array of the total distance covered for each mission
    const totalMissionDistance = missionDetails.map(mission => {
      return mission.reduce((acc,dist) =>{
        acc += dist
        return acc
      },0)
    })

    // totalPointsPerMissionArr is the total distance for each mission multiplied by it's mode ratio.
    const totalPointsPerMissionArr = missionDetails.map((mission, index) => {
      let carbonRatio;
      let totalPoints = 0;

      mission.forEach(dist => {
        switch(journeys[index].mode) {
          case 'walk':
          case 'foot':
          case 'foot 👣':
          case 'bicycle':
          case 'bicycle 🚲':
            carbonRatio = 0;
            break;
          case 'bus':
          case 'bus 🚌':
          case 'bus 🚌 ':
            carbonRatio = 0.069;
            break;
          case 'tram':
          case 'tram 🚊':
            carbonRatio = 0.042;
            break;
          case 'motorbike':
            carbonRatio = 0.094;
            break;
          case 'car-electric':
          case 'electric car':
          case 'electric car 🚗⚡️':
            carbonRatio = 0.043;
            break;
          case 'train':
          case 'train 🚂':
            carbonRatio = 0.06;
            break;
          case 'taxi':
          case 'taxi 🚕"':
            carbonRatio = 0.17;
            break;
          default:
            console.log(journeys[index].mode, 'is a mode not in switch statement - UserJourneys.js')
        }
        totalPoints +=  (mission - (mission * carbonRatio))
      })
      return totalPoints
    })
    console.log(totalPointsPerMissionArr)
    
    // totalKmTraveled is a sum of the users total kms travelled.
    totalKmTraveled = totalMissionDistance.reduce((acc, mission) => {
      acc += mission
      return acc
    },0).toFixed(3)
  }

  getLongLatDetails()
  
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