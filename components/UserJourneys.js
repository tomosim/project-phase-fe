import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const UserJourneys = (props) => {
  const millisecondsInAWeek = 604800000;
  const millisecondsIn4Weeks = millisecondsInAWeek * 4;
  let totalKmTraveled;
  let xp;
  let xpLast7Days;
  let xpLast4Weeks;
  let rank;
  let { journeys } = props.journeyObj.data

    if (journeys[0].route.length < 1) {
      console.log('user journey data not complete - UserJourney.js')
      console.log('route length')
    }
    if (journeys[0].route[0] === undefined) {
      console.log('user journey data not complete - UserJourney.js')
      console.log('route undefined')
    }
    if (journeys[0].route[0].lat === undefined) {
      console.log('user journey data not complete - UserJourney.js')
      console.log('coords undefined')
    }

    // rank decided based on XP
    // if (xp === 0)

 
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

    // totalPointsPerMissionArr is the points scored for each mission
    const totalPointsPerMissionArr = missionDetails.map((mission, index) => {
      let carbonRatio;
      let totalPoints = 0;
      // let last7DaysPoints = 0;
      // let last4WeeksPoints = 0;

      mission.forEach(dist => {
        switch(journeys[index].mode) {
          case 'walk':
          case 'foot':
          case 'foot 👣':
          case 'bicycle':
          case 'bicycle 🚲':
          case 'cycle':
            carbonRatio = 0;
            break;
          case 'bus':
          case 'bus 🚌':
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
          case 'taxi 🚕':
            carbonRatio = 0.17;
            break;
          default:
            console.log(journeys[index].mode, 'is a mode not in switch statement - UserJourneys.js')
        }
        const baseline = dist * 0.183;
        const yourTrip = dist * carbonRatio;
        totalPoints += (baseline - yourTrip);
      })
      return totalPoints
    })

    // xp - all missions points. To 3 decimal places
    xp = totalPointsPerMissionArr.reduce((acc, scores) => {
      acc += scores
      return acc
    },0).toFixed(1)

    // xpLast7Days - all mission points from the last 7 days.
    xpLast7Days = totalPointsPerMissionArr.reduce((acc, scores, index) => {
      if ((Date.now() - journeys[index].route[0].time) <= millisecondsInAWeek) {
        acc += scores;
      }
      return acc;
    },0).toFixed(1)

    // xpLast4Weeks - all mission points from the last 4 weeks
    xpLast4Weeks = totalPointsPerMissionArr.reduce((acc, scores, index) => {
      if ((Date.now() - journeys[index].route[0].time) <= millisecondsIn4Weeks) {
        acc += scores
      }
      return acc;
    },0).toFixed(1)
    
    // totalKmTraveled is a sum of the users total kms travelled.
    totalKmTraveled = totalMissionDistance.reduce((acc, mission) => {
      acc += mission
      return acc
    },0).toFixed(2)
  }

  getLongLatDetails()
  
  return (
    <View>
      <View>
      <Text style={{ marginHorizontal: 20 }}>User journey stats</Text>
      </View>
      <View>
        <Text style={{marginHorizontal: 20}}>{`Total distance: ${totalKmTraveled}kms`}</Text>
      </View>
      <View>
        <Text style={{ marginHorizontal: 20 }}>{`Total missions: ${props.journeyObj.data.journeys.length}`}</Text>
      </View>
      <View style={{ marginHorizontal: 20 }}>
        <Text>{`XP: ${xp}`}</Text>
      </View>
      <View style={{ marginHorizontal: 20 }}>
        <Text>{`This weeks XP: ${xpLast7Days}`}</Text>
      </View>
      <View style={{ marginHorizontal: 20 }}>
        <Text>{`This months XP: ${xpLast4Weeks}`}</Text>
      </View>
    </View>
  );
};

export default UserJourneys;