import React from "react";
import { Button, Text, View, Modal, StyleSheet } from "react-native";
import Counter from "./Counter";

const CounterModal = props => {
  missionFinish = (transport, bool) => {
    props.setModalVisible(transport, bool);
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => {
          missionFinish("", false);
        }}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalCircle}>
            {!props.recording && (
              <Text style={styles.message}>
                Ready to start your mission by {props.modeOfTransport}?
              </Text>
            )}

            {props.recording && (
              <Text style={styles.message}>Recording...</Text>
            )}

            <Counter recording={props.recording} />
            <View style={{ margin: 3 }} />
            <View style={{ flexDirection: "row" }}>
              {!props.recording && (
                <Button
                  title="Let's go!"
                  color="rgb(0,220,90)"
                  onPress={() => props.toggleRecording()}
                />
              )}
              {props.recording && (
                <Button
                  title="Finish"
                  color="rgb(0,220,90)"
                  onPress={() => {
                    props.toggleRecording();
                    missionFinish("", false);
                  }}
                />
              )}
              {!props.recording && <View style={{ width: 4 }} />}
              {!props.recording && (
                <Button
                  title="Nope"
                  color="rgb(0,220,90)"
                  onPress={() => {
                    missionFinish("", false);
                  }}
                />
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  container: {
    flexDirection: "column",
    justifyContent: "center"
  },
  modalCircle: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    width: "90%",
    aspectRatio: 1,
    backgroundColor: "#F5FCFF",
    elevation: 10,
    alignSelf: "center",
    borderRadius: 20000
  },
  message: {
    fontSize: 30,
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 10
  }
});

export default CounterModal;
