import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import Mapbox from "@mapbox/react-native-mapbox-gl";

Mapbox.setAccessToken(
  "pk.eyJ1IjoidG9tb3NpbSIsImEiOiJjams4Zm9remQyY3M2M2xrY2dqcm1iY2s0In0.3wRLt9WKywixIt_htoH-8Q"
);

export default class Map extends Component<{}> {
  state = {
    coordinates: [
      [-2.254, 53.48],
      [-2.254, 53.58],
      [-2.354, 53.48]
    ]
  }

  renderAnnotation(counter) {
    const id = `pointAnnotation${counter}`;
    const coordinate = this.state.coordinates[counter];
    const title = `Longitude: ${this.state.coordinates[counter][0]} Latitude: ${this.state.coordinates[counter][1]}`;

    return (
      <Mapbox.PointAnnotation
        key={id}
        id={id}
        title='Test'
        coordinate={coordinate}>

        <View style={styles.annotationContainer}>
          <View style={styles.annotationFill} />
        </View>
      </Mapbox.PointAnnotation>
    );
  }

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

  renderAnnotations() {
    const items = [];

    for (let i = 0; i < this.state.coordinates.length; i++) {
      items.push(this.renderAnnotation(i));
    }

    return items;
  }

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
          showUserLocation={true}
        >
          {this.renderAnnotations()}
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
