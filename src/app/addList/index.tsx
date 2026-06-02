import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { SymbolView } from "expo-symbols";
import React, { useContext, useLayoutEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  TextInput,
  useColorScheme,
  View,
} from "react-native";
import { BookContext } from "../../../context/BookContext";
import { createList } from "../../../services/apiAPI";

const AddList = () => {
  const router = useRouter();
  const { listsBooks, setListsBooks } = useContext(BookContext);

  const { type, method, value, id } = useLocalSearchParams();

  //console.log(type, method, value, id);

  const [name, setName] = useState(value);
  const [prevName, setPrevName] = useState(value);

  const navigation = useNavigation();

  const [loadingProcess, setLoadingProcess] = useState(false);

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const processForm = async () => {
    setLoadingProcess(true);
    const result = await createList(name, method, id);

    if (result.success) {
      //console.log(result.data);

      if (method === "POST") {
        setListsBooks((prevItems) => [...prevItems, result.data]);
      } else {
        let prevItems = [...listsBooks];

        prevItems.map((item) => {
          if (Number(item.listid) === Number(id)) item.name_list = name;
        });

        //console.log(prevItems);

        setListsBooks(prevItems);
      }
      //console.log("added");

      setLoadingProcess(false);

      router.back();
    } else {
      setLoadingProcess(false);
      Alert.alert("Error", result.error);
    }
  };

  useLayoutEffect(() => {
    let cond = false;
    if (name.trim() === "" || name === value) {
      cond = true;
    }
    navigation.setOptions({
      unstable_headerRightItems: () => [
        loadingProcess
          ? {
              type: "custom",
              variant: "done",
              disabled: true,
              element: <ActivityIndicator size="small" />,
            }
          : {
              type: "button",
              label: "Add",
              variant: "done",
              disabled: cond,
              icon: {
                type: "sfSymbol",
                name: "checkmark",
              },
              onPress: () => {
                // Do something
                //navigation.goBack();

                processForm();
              },
            },
      ],
    });
  }, [name, loadingProcess]);

  return (
    <ScrollView style={isDarkMode ? styles.darkBg : styles.lightBg}>
      <View style={{ height: 100 }} />
      <View
        style={{
          padding: 10,
          backgroundColor: "gray",
          borderRadius: 10,
          alignItems: "center",
          alignSelf: "center",
          marginBottom: 35,
          marginTop: 50,
        }}
      >
        <SymbolView name={"apple.books.pages"} size={45} tintColor={"white"} />
      </View>
      <TextInput
        style={[
          styles.input,
          isDarkMode ? styles.buttonDark : styles.buttonLight,
          isDarkMode ? styles.lightText : styles.darkText,
        ]}
        value={name}
        onChangeText={setName}
        keyboardType="default"
        placeholder="List Name"
        placeholderTextColor="gray"
      />
    </ScrollView>
  );
};

export default AddList;

const styles = StyleSheet.create({
  darkBg: { backgroundColor: "#1c1c1c" },
  lightBg: { backgroundColor: "#f2f2f2" },
  buttonDark: { backgroundColor: "#2f2f2f" },
  buttonLight: { backgroundColor: "#fff" },
  lightText: { color: "white" },
  darkText: { color: "black" },

  input: {
    backgroundColor: "#fff",

    width: "70%",
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 30,
  },
});
