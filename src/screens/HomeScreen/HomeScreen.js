import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setColor } from "../../../store/colorSlice";
import { fetchData } from "../../../store/fetchApiSice";
import {saveLog} from '../../utils/SaveLog';
// import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Button, Alert
} from "react-native";

const HomeScreen = () => {
  const color = useSelector((state) => state.color.value);
  const dispatch = useDispatch();
  const [fetching, setFetching] = useState(false);
  const { loading, error, data } = useSelector((state) => state.data);

  const handleFetchData = async () => {
    setFetching(true);
    try {
      await dispatch(fetchData('https://thapatechnical.github.io/userapi/users.json'));

    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to fetch data.');
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (!loading && !error && fetching) {
      Alert.alert('Data Fetched', JSON.stringify({ loading, error, data }));
    } else if (error) {
      Alert.alert('Error', error);
    }
  }, [loading, error, data]);

  return (
    <View>
      {/* <StatusBar style="dark" /> */}
      <TouchableOpacity
        onPress={() => dispatch(setColor())}
        style={styles.button}
      >
        <Text style={{ fontSize: 20 }}>Generate Random Color</Text>
      </TouchableOpacity>
      <View
        style={{
          backgroundColor: color,
          height: 100,
          width: 100,
          alignSelf: "center",
          margin: 10,
        }}
      />


      <TouchableOpacity
        onPress={handleFetchData}
        style={styles.button}
        disabled={fetching || loading}
      >
        <Text style={{ fontSize: 20 }}>Fetch Data</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={()=>saveLog("button click")}
        style={styles.button}
      >
        <Text style={{ fontSize: 20 }}>Save Log</Text>
      </TouchableOpacity>


    </View>
  );
};

export default HomeScreen;


const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
  },
});
