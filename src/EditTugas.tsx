import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Body from "./components/Body";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";

interface Tugas{
  id: string;
  title: string;
  desc: string;
  tanggal: string; 
  status: "TODO"|"DONE";
}

export default function EditTugas(){
  const route=useRoute();
  const navigation=useNavigation();
  const {itemId}=route.params as {itemId:string};
  const [title,setTitle]=useState('');
  const [desc,setDesc]=useState('');
  const [tanggal,setTanggal]=useState('');
  const STORAGE_KEY="@task_list";
  useEffect(()=>{
    const fetchTugas=async()=>{
      const tugasDipilih=await AsyncStorage.getItem(STORAGE_KEY);
      if (tugasDipilih) {
        const list=JSON.parse(tugasDipilih) as Tugas[];
        const tugases=list.find((item)=>item.id===itemId);
        if (tugases) {
          setTitle(tugases.title);
          setDesc(tugases.desc);
          setTanggal(tugases.tanggal);
        }
      }
    };
    fetchTugas();
  },[itemId]);

  const update=async()=>{
    if (!title.trim()) {
      Alert.alert('Error','Judul Aktivitas ga boleh kosong!');
      return;
    }
    try {
      const simpanJadwal=await AsyncStorage.getItem(STORAGE_KEY);
      if (simpanJadwal) {
        const listed=JSON.parse(simpanJadwal) as Tugas[];
        const update=listed.map((item)=>item.id===itemId?{...item,title,desc,tanggal}:item);
        await AsyncStorage.setItem(STORAGE_KEY,JSON.stringify(update));
        Alert.alert('Sukses','Berhasil update',[
          {text:'ok',onPress:()=>navigation.goBack()}
        ]);
      }
    } catch (error) {
      console.error("Gagal update karena : ",error);
      Alert.alert('Error','Gagal update');
    };
  }
  return(
    <Body>
      <View>
        <Text style={styling.judulHalaman}>
          <FontAwesome name="edit" size={24}/> Edit Jadwal
        </Text>
        <View style={styling.card}>
          <Text style={styling.cardTitle}>Edit Aktivitas {title||"..."}</Text>
          <Text style={styling.label}>Judul aktivitas</Text>
          <TextInput value={title} onChangeText={setTitle} placeholder="Judul aktivitas ..." style={styling.input}/>
          <Text style={styling.label}>Deskripsi</Text>
          <TextInput value={desc} onChangeText={setDesc} placeholder="Deskripsi aktivitas ..." style={styling.input}/>
          <Text style={styling.label}>Tanggal</Text>
          <TextInput value={tanggal} onChangeText={setTanggal} placeholder="Tanggal beraktivitas ..." style={styling.input}/>
          <View style={styling.buttonGroup}>
            <TouchableOpacity style={styling.btnSimpan} onPress={update}>
              <FontAwesome name="check" size={16} color="white"/>
              <Text style={styling.btnText}>Perbarui</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Body>
  );
}

const styling=StyleSheet.create({
  judulHalaman:{
    fontSize:24,
    fontWeight:'bold',
    textAlign:'center',
    marginBottom:20,
    color:'#1e293b'
  },
  card:{
    backgroundColor:'#fff',
    borderRadius:16,
    padding:20,
    elevation:4,
    shadowColor:'#000',
    shadowOffset:{width:0,height:2},
    shadowOpacity:0.2,
    shadowRadius:4,
    borderWidth:1,
    borderColor:'#e2e8f0'
  },
  cardTitle:{
    fontSize:16,
    fontWeight:'600',
    color:'#475569',
    marginBottom:10,
    fontStyle:'italic',
    borderBottomWidth:1,
    borderBottomColor:'#f1f5f9',
    paddingBottom:8
  },
  label:{
    fontWeight:'bold',
    fontSize:14,
    color:'#331155',
    marginTop:12,
    marginBottom:6 
  },
  input: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#F8FAFC",
    color: "#334155",
    fontSize: 15,
  },
  inputMultiline: {
    height: 80,
  },
  buttonGroup:{
    flexDirection:'row-reverse',
    justifyContent:'space-between',
    marginTop:25,
    alignItems:'center'
  },
  btnSimpan: {
    backgroundColor: "#1591DC",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
    marginLeft: 10,
  },
  btnKembali: {
    backgroundColor: "#E2E8F0",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 6,
  },
});
