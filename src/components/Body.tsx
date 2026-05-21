import React, { ReactNode, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { NavigasiRoot } from "../../App";
import { useNavigation } from "@react-navigation/native";

interface Template {
  children: ReactNode;
}

export default function Body({ children }: Template) {
  const [show,setShow]=useState(false);
  const move = useNavigation<StackNavigationProp<NavigasiRoot>>();

  const navigateTo=(screen:keyof NavigasiRoot)=>{
    setShow(false);
    move.navigate(screen);
  };

  return (
    <View style={styling.container}>
      <View style={styling.contentArea}>
        {children}
      </View>
      <TouchableOpacity 
        activeOpacity={0.8} 
        onPress={()=>setShow(true)} 
        style={styling.fab}
      >
        <FontAwesome name="bars" size={24} color="white" />
      </TouchableOpacity>
      <Modal 
        visible={show} 
        transparent={true} 
        animationType="fade" 
        onRequestClose={()=>setShow(false)}
      >
        <TouchableOpacity 
          style={styling.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setShow(false)}
        >
          <TouchableWithoutFeedback>
            <View style={styling.menuCard}>
              <TouchableOpacity 
                onPress={()=>setShow(false)} 
                style={styling.closeIcon}
              >
                <FontAwesome name="times-circle" size={24} color="#ff4444" />
              </TouchableOpacity>
              <Text style={styling.menuTitle}>Menu Navigasi</Text>
              <TouchableOpacity onPress={()=>navigateTo('Home')} style={styling.menuItem}>
                <FontAwesome name="home" size={20} color="#333" />
                <Text style={styling.menuText}>Halaman Utama</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>navigateTo('TambahTugas')} style={styling.menuItem}>
                <FontAwesome name="plus-circle" size={20} color="#333" />
                <Text style={styling.menuText}>Tambah Tugas</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styling = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  contentArea: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#1591DC',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 999,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuCard: {
    backgroundColor: 'white',
    width: '75%',
    borderRadius: 15,
    padding: 20,
    elevation: 10,
  },
  closeIcon: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#EEE',
    gap: 15,
  },
  menuText: {
    fontSize: 16,
    color: '#444',
  },
});

