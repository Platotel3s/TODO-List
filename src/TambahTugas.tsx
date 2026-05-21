import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Body from "./components/Body";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { NavigasiRoot } from "../App";
import AsyncStorage from "@react-native-async-storage/async-storage";
const STORAGE_KEY = "@task_list";

export default function TambahTugas() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [kapan, setKapan] = useState("");
  const move = useNavigation<StackNavigationProp<NavigasiRoot>>();

  const simpan=async()=>{
    if (!title.trim()) {
      Alert.alert("Error","Masukkan judul tugas terlebih dahulu");
      return;
    }
    const newTask = {
      id: Date.now().toString(),
      title: title,
      desc: desc,
      tanggal: kapan || new Date().toLocaleDateString("id-ID"),
      status: "TODO",
    };

    try {
      const existedData = await AsyncStorage.getItem(STORAGE_KEY);
      const tasks = existedData ? JSON.parse(existedData) : [];
      tasks.push(newTask);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      
      Alert.alert("Sukses", "Tugas berhasil ditambahkan!", [
        { text: "OK", onPress: () => move.goBack() }
      ]);
    } catch (e) {
      console.log("Gagal menyimpan tugas:", e);
    }
  };

  return (
    <Body>
      <Text style={styles.judul}>
        <FontAwesome name="book" size={24} /> Tambah Tugas
      </Text>
      <Text style={styles.label}>Judul Tugas</Text>
      <TextInput 
        style={styles.input} 
        value={title} 
        onChangeText={setTitle} 
        placeholder="Contoh: Sholat Shubuh" 
      />
      <Text style={styles.label}>Keterangan</Text>
      <TextInput 
        style={[styles.input, { height: 100, textAlignVertical: "top" }]} 
        value={desc} 
        onChangeText={setDesc} 
        placeholder="Detail tugas..." 
        multiline 
      />
      <Text style={styles.label}>Tanggal Aktivitas</Text>
      <TextInput
        style={styles.input}
        value={kapan}
        onChangeText={setKapan}
        placeholder="Contoh: 21 Mei 2026"
      />
      <TouchableOpacity style={styles.simpan} onPress={simpan}>
        <View style={styles.buttonContainer}>
          <FontAwesome name="check-circle" size={20} color="white" />
          <Text style={styles.teksSimpan}>Simpan</Text>
        </View>
      </TouchableOpacity>
    </Body>
  );
}

const styles = StyleSheet.create({
  label: { 
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 15,
    color: "#334155"
  },
  input: { 
    borderWidth: 1, 
    borderColor: "#ccc", 
    padding: 10, 
    borderRadius: 5, 
    backgroundColor: "#fff" 
  },
  judul: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1E293B"
  },
  simpan: {
    marginTop: 20,
    borderRadius: 10,
    width: "100%",
    backgroundColor: "#1591DC",
    padding: 12
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  teksSimpan: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    marginLeft: 8
  }
});
