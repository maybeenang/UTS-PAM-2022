import { useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ToastAndroid,
  RefreshControl,
  ScrollView,
  Text,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import * as Location from "expo-location";
import Header from "./components/Header";
import Main from "./components/Main";

const APIkey = "225188621fccb20e986fd8acad8a11bd";

const App = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [location, setLocation] = useState(null);

  const getWeather = async () => {
    setRefreshing(true);
    ToastAndroid.show("Syncronize...", ToastAndroid.SHORT);

    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      ToastAndroid.show(
        "Permission to access location was denied",
        ToastAndroid.SHORT
      );
      return;
    }

    const location = await Location.getCurrentPositionAsync();
    const { latitude, longitude } = location.coords;

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${APIkey}`
    );
    const data = await response.json();

    if (!response.ok) {
      ToastAndroid.show(data.message, ToastAndroid.SHORT);
      return;
    }
    setCurrentWeather(data);
    ToastAndroid.show("Syncronize successfully", ToastAndroid.SHORT);
    setRefreshing(false);
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              getWeather();
            }}
          />
        }
      >
        <StatusBar style="auto" />

        {currentWeather ? (
          <>
            <Header data={currentWeather} />
            <Main data={currentWeather} />
          </>
        ) : (
          <Text>Loading...</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: "10%",
    width: "100%",
  },
  scrollView: {
    height: "100%",
    width: "100%",
  },
  text: {
    fontSize: 20,
    color: "black",
  },
});

export default App;
