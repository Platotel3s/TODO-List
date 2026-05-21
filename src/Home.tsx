import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";
import Body from "./components/Body";
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

interface Todo {
  id: string;
  title: string;
  desc: string;
  tanggal: string; 
  status: "TODO"|"DONE";
}

type RootEdit={
  EditTugas:{itemId:string};
  Home:undefined;
}
type Preps={
  navigation:NativeStackNavigationProp<RootEdit>;
}

export default function Home({navigation}:Preps) {
  const isFocused = useIsFocused();
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const STORAGE_KEY = "@task_list";

  const loadData=async()=>{
    try{
      const savedData=await AsyncStorage.getItem(STORAGE_KEY);
      if (savedData) {
        setTodoList(JSON.parse(savedData));
      }
    } catch (error) {
      console.error("Gagal memuat data tugas:", error);
    }
  };
  useEffect(()=>{
    if (isFocused) loadData();
  }, [isFocused]);
  const toggleStatus = async (id: string) => {
    const updated: Todo[] = todoList.map((item) => {
      if(item.id === id){
        return { ...item, status: item.status === "TODO"?"DONE":"TODO" };
      }
      return item;
    });

    setTodoList(updated);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error("Gagal memperbarui status tugas:", error);
    }
  };
  const deleteItem = (id: string) => {
    Alert.alert("Hapus", "Yakin tugas ini sudah selesai dihapus?", [
      { text: "Batal" },
      {
        text: "Ya, Hapus",
        onPress: async () => {
          const filtered = todoList.filter((item) => item.id !== id);
          setTodoList(filtered);
          try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
          } catch (error) {
            console.error("Gagal menghapus tugas:", error);
          }
        },
      },
    ]);
  };

  return (
    <Body>
      <Text style={styles.judulUtama}>Daftar Tugas Saya</Text> 
      <FlatList
        data={todoList}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Belum ada tugas. Klik tombol menu di pojok untuk menambah.
          </Text>
        }
        renderItem={({item})=>(
          <View style={[styles.card,item.status==="DONE"&&styles.cardDone]}>
            <TouchableOpacity 
              style={styles.left} 
              onPress={() => toggleStatus(item.id)}
            >
              <FontAwesome 
                name={item.status === "DONE"?"check-circle":"circle-o"} 
                size={24} 
                color={item.status==="DONE"?"#10B981":"#666"} 
              />
              <View style={{ marginLeft:15 }}>
                <Text style={[styles.taskTitle, item.status === "DONE"&&styles.textStrike]}>
                  {item.title}
                </Text>
                <Text style={styles.taskDate}>{item.tanggal}</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.symbol}>
              <TouchableOpacity style={styles.right}>
                <TouchableOpacity onPress={() => deleteItem(item.id)}>
                  <FontAwesome name="trash" size={22} color="#EF4444" />
                </TouchableOpacity>
              </TouchableOpacity>
              <TouchableOpacity style={styles.right}>
                <TouchableOpacity onPress={()=>navigation.navigate('EditTugas',{itemId:item.id})}>
                  <FontAwesome name="edit" size={22} color="#F59E0B" />
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </Body>
  );
}

const styles = StyleSheet.create({
  judulUtama: { 
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 20, 
    color: "#1E293B" 
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  cardDone: { 
    backgroundColor: "#F0FDF4", 
    opacity: 0.8 
  },
  left: { 
    flexDirection: "row", 
    alignItems: "center", 
    flex: 1 
  },
  taskTitle: { 
    fontSize: 16, 
    fontWeight: "600", 
    color: "#334155" 
  },
  textStrike: { 
    textDecorationLine: "line-through", 
    color: "#94A3B8" 
  },
  taskDate: { 
    fontSize: 12, 
    color: "#64748B", 
    marginTop: 2 
  },
  right: { 
    paddingLeft: 10 
  },
  emptyText: { 
    textAlign: "center", 
    marginTop: 50, 
    color: "#94A3B8", 
    paddingHorizontal: 20 
  },
  symbol:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    gap:'1%',
    alignItems:'center'
  }
});
