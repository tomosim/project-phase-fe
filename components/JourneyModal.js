import React from 'react';
import { Button, Text, View, Modal, StyleSheet } from "react-native";


const JourneyModal = (props) => {
  const {journey} = props 
  return(
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.journeyVisible}
        onRequestClose={() => {
          missionFinish("", false);
        }}
      > 
        <View>
            <Text>    
                MAP GOES HERE
            </Text>
        </View>
        <View>
            <Text>STATS GO HERE</Text>
        </View>
      </Modal>
  )
};

export default JourneyModal;