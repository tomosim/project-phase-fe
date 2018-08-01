import React from "react";
import { Modal, StyleSheet, Text, View, Button } from "react-native";
import Map from "./Map";

const JourneyOverviewModal = props => {
  toggleModal = () => {
    props.setOverviewVisible();
  };
  return (
    <Modal
      animationType={"slide"}
      transparent={false}
      visible={props.journeyModalVisible}
      onRequestClose={this.toggleModal}
    >
      <View style={styles.container}>
        <View style={styles.map}>
          <Map journeyObj={props.journeyObj}/>
        </View>
        <View style={StyleSheet.body}>
          <Text>journey data goes here</Text>
          <Button title="close" onPress={() => this.toggleModal()} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "column", justifyContent: "center" },
  map: { flex: 1 },
  body: { height: 200 }
});

export default JourneyOverviewModal;
