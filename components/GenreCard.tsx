import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";

const GenreCard = ({ item }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: `/genre/${item.name}`,
          params: {
            name: item.name,
            data: JSON.stringify(item.section),
          },
        })
      }
      style={{
        paddingTop: 10,
        marginVertical: 10,
        paddingBottom: 10,
        paddingRight: 10,
        paddingLeft: 10,
        backgroundColor: "#fff",
        borderRadius: 50,
        shadowOffset: {
          width: 0, // Centered horizontally
          height: 2, // Cast 2 points downward
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        flexDirection: "row",
        alignItems: "center",
        //elevation: 1,
      }}
    >
      <Image
        source={item.icon}
        style={{ width: 25, height: 25, marginRight: 8 }}
      />
      <Text style={{ fontWeight: "600" }}>{item.name}</Text>
    </TouchableOpacity>
  );
};

export default GenreCard;
