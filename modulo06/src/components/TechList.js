import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";

// import { Container } from './styles';

export default function TechList() {
  const [techs, setTechs] = useState("");
  const [tech, setTech] = useState("");

  function add() {
    setTechs([...techs, tech]);
    setTech("");
  }

  return (
    <View>
      <TextInput testID="tech-input" />
      <TouchableOpacity onPress={add}>
        <Text>Adicionar</Text>
      </TouchableOpacity>
      <FlatList
        data={techs}
        keyExtractor={(tech) => tech}
        renderItem={({ item }) => <Text>{item}</Text>}
      />
    </View>
  );
}
