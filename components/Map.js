import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import Mapbox from "@mapbox/react-native-mapbox-gl";
// import { lstat } from "fs";

Mapbox.setAccessToken(
  "pk.eyJ1IjoidG9tb3NpbSIsImEiOiJjams4Zm9remQyY3M2M2xrY2dqcm1iY2s0In0.3wRLt9WKywixIt_htoH-8Q"
);

export default class Map extends Component<{}> {
  state = {
    coordinates: null,
    midPoint: [-2.2426, 53.48],
    zoom:10,
  }

  componentDidMount() {
    let setZoom = 0;
    let maxLat = 0;
    let minLat = 0;
    let maxLong = 0;
    let minLong = 0;
    journeyObjCoords = this.props.journeyObj.route.map((ping, index) => {
      if (index === 0) {
        maxLong = ping.long;
        minLong = ping.long;
        maxLat = ping.lat;
        minLat = ping.lat;
      } else {
        if (ping.long > maxLong) {
          maxLong = ping.long
        }
        if (ping.long < minLong) {
          minLong = ping.long
        }
        if (ping.lat > maxLat) {
          maxLat = ping.lat
        }
        if (ping.lat < minLat) {
          minLat = ping.lat
        }
      }
      return [
        ping.long,
        ping.lat,
      ]
    })

    const avgLat = (((maxLat + 180) + (minLat + 180)) / 2) - 180
    const avgLong = (((maxLong + 180) + (minLong + 180)) / 2) - 180
    const centreCoords = [ avgLong, avgLat ]
    
    const latDiff = ((maxLat + 180) - (minLat + 180))
    const longDiff = ((maxLong + 180) - (minLong + 180))
    const coordDiff = latDiff >= longDiff ? latDiff : longDiff
    
    if (coordDiff > 128) {
      setZoom = 0
    } else if (coordDiff > 64) {
      setZoom = 1
    } else if (coordDiff > 32) {
      setZoom = 2
    } else if (coordDiff > 16) {
      setZoom = 3
    } else if (coordDiff > 8) {
      setZoom = 4
    } else if (coordDiff > 4) {
      setZoom = 5
    } else if (coordDiff > 2) {
      setZoom = 6
    } else if (coordDiff > 1) {
      setZoom = 7
    } else if (coordDiff > 0.5) {
      setZoom = 8
    } else if (coordDiff > 0.25) {
      setZoom = 9
    } else if (coordDiff > 0.125) {
      setZoom = 10
    } else if (coordDiff > 0.0625) {
      setZoom = 11
    } else if (coordDiff > 0.03125) {
      setZoom = 12
    } else if (coordDiff > 0.015265) {
      setZoom = 13
    } else if (coordDiff > 0.0076325) {
      setZoom = 14
    } else if (coordDiff > 0.00381625) {
      setZoom = 15
    } else if (coordDiff > 0.001908125) {
      setZoom = 16
    }

    this.setState({
      coordinates: journeyObjCoords,
      zoom: setZoom,
      midPoint: centreCoords,
    })
  }

  renderAnnotation(counter) {
    const id = `pointAnnotation${counter}`;
    const coordinate = this.state.coordinates[counter];
    const title = `Longitude: ${this.state.coordinates[counter][0]} Latitude: ${this.state.coordinates[counter][1]}`;
    let tag;
    if (counter === 0) {
      tag = 'Start'
    } else if (counter + 1 === this.state.coordinates.length) {
      tag = 'End'
    } else {
      tag = title
    }

    return (
      <Mapbox.PointAnnotation
        key={id}
        id={id}
        title={tag}
        coordinate={coordinate}>

        <View style={styles.annotationContainer}>
          <View style={styles.annotationFill} />
        </View>
        <Mapbox.Callout title={tag} />
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
          zoomLevel={this.state.zoom}
          centerCoordinate={this.state.midPoint}
          style={styles.container}
          scrollEnabled={false}
          zoomEnabled={false}
          pitchEnabled={false}
          rotateEnabled={false}
          logoEnabled={false}
          showUserLocation={true}
        >
          {this.state.coordinates && this.renderAnnotations()}
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
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 15
  },
  annotationFill: {
    width: 20,
    height: 20,
    borderRadius: 15,
    backgroundColor: "orange",
    transform: [{ scale: 0.6 }]
  }
});
