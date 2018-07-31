import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import auth from "../config/config"
import ErrorPopUp from './ErrorPopUp'

const MenuCard = (props) => {
  return (
    <View>
      <TouchableOpacity onPress={
        () => {
          props.toggleMenu()
          auth.signOut()
          .then(() => {
          props.logout()
        }
        )
        .catch(err => {
          ErrorPopUp(err)
        })
          }}>
        <Text>Logout</Text>    
      </TouchableOpacity>
    </View>
  );
};

export default MenuCard;