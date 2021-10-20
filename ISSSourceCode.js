import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  StatusBar,
  ImageBackground,
  Image,
  Alert,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

export default class IssLocationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {},
    };
  }
  componentDidMount() {
    this.whereAreYou();
  }

  whereAreYou = () => {
    axios
      .get('https://api.wheretheiss.at/v1/satellites/25544')
      .then(response => {
        this.setState({ location: response.data });
      })
      .catch(error => {
        Alert.alert(error.message);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea} />
        <ImageBackground
          source={require('../assets/bg_image.png')}
          style={styles.backgroundImage}>
          <View style={styles.titleBar}>
            <Text style={styles.titleText}>"ISS Tracker - UP"</Text>
          </View>
          <View style={styles.container2}>
            <MapView
              style={styles.mapStyle}
              region={{
                latitude: this.state.location.latitude,
                longitude: this.state.location.longitude,
                latitudeDelta: 100,
                longitudeDelta: 100
              }}>
              <Marker
                coordinate={{
                  latitude: this.state.location.latitude,
                  longitude: this.state.location.longitude
                }}>
                <Image
                  source={require('../assets/iss_icon.png')}
                  style={{ height: 50, width: 50 }}
                />
              </Marker>
            </MapView>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  issImg: {
    width: 20,
    height: 20,
  },
  container2: {
    flex: 0.7,
  },
  safeArea: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  rootCard: {
    flex: 1300,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 50,
    borderRadius: 30,
    backgroundColor: 'white',
    width: 300,
    height: 100,
  },
  titleBar: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  rootText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 75,
    paddingLeft: 30,
  },
  knowMore: {
    paddingLeft: 30,
    color: 'red',
    fontSize: 15,
  },
  bgDigit: {
    position: 'absolute',
    color: 'rgba(183, 183, 183, 0.5)',
    fontSize: 150,
    right: 20,
    bottom: -15,
    zIndex: -1,
  },
  iconImage: {
    position: 'absolute',
    height: 200,
    width: 200,
    resizeMode: 'contain',
    right: 20,
    top: -80,
  },
  mapStyle: {
    width: '100%',
    height: '100%',
  },
});
