import React from "react";
import { Button, Text, View, Modal, TouchableHighlight } from "react-native";

const CounterModal = props => {
  missionFinish = (transport, bool) => {
    props.setModalVisible(transport, bool);
  };

  return (
    <View style={{ flexDirection: "column", justifyContent: "center" }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => {
          missionFinish("", false);
        }}
      >
        <View style={{ flex: 1, justifyContent: "center" }}>
          <View
            style={{
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
            }}
          >
            <Text
              style={{
                fontFamily: "Pacifico-Regular",
                fontSize: 30,
                textAlign: "center"
              }}
            >
              {props.modeOfTransport}
            </Text>

            <Button
              title="close"
              color="rgb(0,220,90)"
              onPress={() => {
                missionFinish("", false);
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CounterModal;
