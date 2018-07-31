import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import Mapbox from "@mapbox/react-native-mapbox-gl";

Mapbox.setAccessToken(
  "pk.eyJ1IjoidG9tb3NpbSIsImEiOiJjams4Zm9remQyY3M2M2xrY2dqcm1iY2s0In0.3wRLt9WKywixIt_htoH-8Q"
);

export default class App extends Component<{}> {
  // renderAnnotations() {
  //   return (
  //     <Mapbox.PointAnnotation
  //       key="pointAnnotation"
  //       id="pointAnnotation"
  //       coordinate={[-2.254, 53.48]}
  //     >
  //       <View style={styles.annotationContainer}>
  //         <View style={styles.annotationFill} />
  //       </View>
  //       <Mapbox.Callout title="Look! An annotation!" />
  //     </Mapbox.PointAnnotation>
  //   );
  // }

  render() {
    return (
      <View style={styles.container}>
        <Mapbox.MapView
          styleURL={Mapbox.StyleURL.Dark}
          zoomLevel={10}
          centerCoordinate={[-2.2426, 53.48]}
          style={styles.container}
          scrollEnabled={false}
          zoomEnabled={false}
          pitchEnabled={false}
          rotateEnabled={false}
          logoEnabled={false}
        >
          {/* {this.renderAnnotations()} */}
        </Mapbox.MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  annotationContainer: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 15
  },
  annotationFill: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "orange",
    transform: [{ scale: 0.6 }]
  }
});
