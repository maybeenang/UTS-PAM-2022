import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  ToastAndroid,
  Button,
  TouchableOpacity,
} from "react-native";
import React from "react";

const { width } = Dimensions.get("window");

const Main = ({ data }) => {
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    setForecast(data);
    console.log(forecast);
  });

  if (!forecast) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

  const dumb = [1, 2, 3, 4, 5, 6, 7];

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.textTitle}>Max Temp</Text>
        <Text style={styles.textValue}>{forecast?.main?.temp_max}°C</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.textTitle}>Feels like</Text>
        <Text style={styles.textValue}>{forecast?.main?.feels_like}°C</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.textTitle}>Min Temp</Text>
        <Text style={styles.textValue}>{forecast?.main?.temp_min}°C</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1b1f2e",
    flex: 1,
    width: width,
    paddingHorizontal: "2%",
    justifyContent: "center",
    flexDirection: "row",
  },
  item: {
    flex: 1,
    width: width * 0.25,
    // height: 100,
    backgroundColor: "#91a9fa",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    marginBottom: 20,
    borderRadius: 10,
    elevation: 10,
    paddingHorizontal: 15,
  },
  textTitle: {
    fontSize: 15,
    // fontWeight: "bold",
    color: "black",
  },
  textValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
});

export default Main;
