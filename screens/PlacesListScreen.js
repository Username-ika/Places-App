import React, { useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import PlaceItem from "../components/PlaceItem";
import * as placesActions from "../store/actions/places";

const PlacesListScreen = (props) => {
  const places = useSelector((state) => state.places.places);
  const dispatch = useDispatch();

  useEffect (()=>{
    dispatch(placesActions.loadPlaces())
  },[dispatch])

  return (
    <FlatList
      data={places}
      renderItem={(itemData) => (
        <PlaceItem
          image={itemData.item.imageUri}
          title={itemData.item.title}
          address={itemData.item.address}
          onSelect={() => {
            props.navigation.navigate("PlaceDetail", {
              placeTitle: itemData.item.title,
              placeId: itemData.item.id,
            });
          }}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({});

export default PlacesListScreen;
