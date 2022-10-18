import { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import * as Location from "expo-location";

const Header = ({ data }) => {
  const [currentWeather, setCurrentWeather] = useState(null);

  useEffect(() => {
    setCurrentWeather(data);
    // console.log(data);
  });

  const date = new Date();
  const dayName = day[date.getDay()];
  const monthName = month[date.getMonth()];
  const dayNumber = date.getDate();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const addZero = (n) => {
    return (parseInt(n, 10) < 10 ? "0" : "") + n;
  };

  return (
    <View style={styles.header}>
      <View style={styles.row}>
        <View style={styles.top}>
          <Text style={[styles.text, styles.topText]}>
            {dayName} | {dayNumber} {monthName} {year}
          </Text>
          <Text style={[styles.text, styles.topText]}>
            {addZero(hours)} : {addZero(minutes)}
          </Text>
          <Text style={[styles.text, styles.topText]}>
            {currentWeather?.name} | {currentWeather?.sys?.country}
          </Text>
        </View>
        <View style={styles.mid}>
          <View style={styles.box}>
            <Text style={[styles.text, styles.midText]}>
              {Math.round(currentWeather?.main?.temp)}°C
            </Text>
          </View>
          <View style={styles.box}>
            <Image
              source={{
                uri: `http://openweathermap.org/img/wn/${currentWeather?.weather[0].icon}@4x.png`,
              }}
              style={styles.image}
            />
            <View style={styles.textContainer}>
              <Text style={[styles.text, styles.imageText]}>
                {String(currentWeather?.weather[0].description)}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.bot}>
          <Text style={[styles.text, styles.botText]}>{dayName}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 2,
    width: "100%",
    backgroundColor: "#1b1f2e",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  row: {
    flex: 1,
    width: "100%",
    backgroundColor: "#91a9fa",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 10,
    elevation: 10,
    padding: 10,
  },
  top: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    // backgroundColor: "#888",
  },
  mid: {
    flex: 3,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#777",
    marginVertical: 10,
    flexDirection: "row",
  },
  bot: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#666",
  },
  text: {
    color: "black",
  },
  topText: {
    fontSize: 15,
  },
  midText: {
    fontSize: 50,
    fontWeight: "bold",
  },
  botText: {
    fontSize: 30,
  },
  button: {
    backgroundColor: "#5f86c2",
    padding: 10,
    borderRadius: 10,
    elevation: 10,
  },
  buttonText: {
    color: "#fff",
  },
  box: {
    flex: 1,
    width: "50%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#bbb",
    padding: 10,
  },
  image: {
    flex: 1,
    width: "120%",
    // backgroundColor: "#eee",
    height: "50%",
  },
  imageText: {
    fontSize: 20,
    // backgroundColor: "#fff",
    textAlign: "center",
  },
  textContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -120,
  },
});

const day = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default Header;
