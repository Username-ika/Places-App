import React from "react";
import { Text, TouchableOpacity, StyleSheet, Platform } from "react-native";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";

import Colors from "../constants/Colors";

import PlacesListScreen from "../screens/PlacesListScreen";
import PlaceDetailScreen from "../screens/PlaceDetailScreen";
import NewPlaceScreen from "../screens/NewPlaceScreen";
import MapScreen from "../screens/MapScreen";

const PlacesNavigator = createStackNavigator(
  {
    Places: {
      screen: PlacesListScreen,
      navigationOptions: (navData) => {
        return {
          headerTitle: "All Places",
          headerTitleAlign: "center",

          headerRight: () => {
            return (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  title="Add Place"
                  iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
                  onPress={() => {
                    navData.navigation.navigate("NewPlace");
                  }}
                />
              </HeaderButtons>
            );
          },
        };
      },
    },
    PlaceDetail: {
      screen: PlaceDetailScreen,
      navigationOptions: (navData) => {
        return {
          headerTitle: navData.navigation.getParam("placeTitle"),
          headerTitleAlign: "center",
        };
      },
    },
    NewPlace: {
      screen: NewPlaceScreen,
      navigationOptions: (navData) => {
        return {
          headerTitle: "Add Place",
          headerTitleAlign: "center",
        };
      },
    },
    Map: {
      screen: MapScreen,
      navigationOptions: (navData) => {
        const saveFn = navData.navigation.getParam("saveLocation");
        const readonly=navData.navigation.getParam("readonly");
        if (readonly){
          return {};
        }
        return {
          headerRight: () => (
            <TouchableOpacity style={styles.headerButton} onPress={saveFn}>
              <Text style={styles.headerButtonText}>Save</Text>
            </TouchableOpacity>
          ),
        };
      },
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primary : "",
      },
      headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
    },
  }
);

const styles = StyleSheet.create({
  headerButton: {
    marginHorizontal: 20,
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === "android" ? "white" : Colors.primary,
  },
});

export default createAppContainer(PlacesNavigator);
