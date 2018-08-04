# project-phase-fe

Front end to our final northcoders project _e-missions_

## About

e-missions is a mobile app written in react native for android devices. The app allows users to track their jouneys and calculate their CO2 emissions depending on different modes of transport the user can choose from. In order to create a wide appeal, we have implemented a certain amount of gamification. Each mission untertaken gives the user points based on how enviromentally friendly their method of transport was. Points are calculated by comparing their CO2 actually produced with the CO2 that would have been produced by a petrol car travelling the same journey.

<img src="https://imgur.com/hpSYNVX.png" alt="screenshot" width="200px"/>
<img src="https://imgur.com/IJZm7Ba.png" alt="screenshot" width="200px"/>
<img src="https://imgur.com/ggXCnur.png" alt="screenshot" width="200px"/>


## Functionality:

Users can log in or create an account, which is securely authenticated; they are then taken to homescreen which shows name, avatar, stats and modes of transport which can be clicked to start a journey. When a journey is recorded the user can see their journey displayed on a nap and stats, such as duration and CO2 saved. The user is then given points based on how much carbon they have saved on their journey compared to if they did the same trip in a car, which in a city would be the most carbon-intesive commute. 

## Requirements:

```
Dependencies:
    "@mapbox/react-native-mapbox-gl": "^6.1.2-beta2",
    "axios": "^0.18.0",
    "react": "16.4.1",
    "react-devtools": "^3.2.3",
    "react-native": "0.56.0", 
    "react-native-animated-bar": "^0.2.0", 
    "react-native-firebase": "^4.3.8",
    "react-native-permissions": "^1.1.1", 
    "react-native-stopwatch-timer": "0.0.20", 
    "react-native-swiper-flatlist": "^1.0.7"
    
  Dev Dependencies:
    "babel-jest": "23.4.0", 
    "babel-preset-react-native": "5.0.2", 
    "eslint": "^5.2.0", 
    "eslint-config-airbnb-base": "^13.0.0",
    "eslint-plugin-import": "^2.13.0", 
    "jest": "23.4.1", 
    "metro": "^0.42.2",
    "metro-core": "^0.42.2", 
    "react-test-renderer": "16.4.1" 
 ```
    
    
    
## Installing and deploying
1. `react-native init` to set up config
2. fork this repo
3. `git remote set-url <YOUR FORKED REPO URL HERE>`
4. `git pull origin master` to merge 
5. `npm i`
6. ensure you have an android (v5+) device running (an emulator or a [physical device connected via USB](https://facebook.github.io/react-native/docs/running-on-device)).
7. `react-native run-android`

## Built using
React Native with Android Studio, MapboxGL for map visualisation, Firebase Authentication for handling user log in and sign up functionality, Permissions package to ask access for geolocation, and StopWatch package to the timer functionality.

Authors
* [Howard](https://github.com/HAshton92) 
* [Vel](https://github.com/antariess) 
* [Jamie](https://github.com/jamiemetca) 
* [Tom](https://github.com/tomosim)
