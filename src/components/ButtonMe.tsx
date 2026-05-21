import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ComponentProps } from "react";

interface Propes{
  label:string;
  iconName:ComponentProps<typeof FontAwesome>['name'];
  onPressDetail:()=>void;
}

export default function ButtonMe({label,iconName,onPressDetail}:Propes){
  return(
    <TouchableOpacity style={styling.tombol} onPress={onPressDetail}>
       <FontAwesome name={iconName} size={15}/><Text style={styling.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styling=StyleSheet.create({
  label:{
    fontSize:12,
    fontWeight:'bold'
  },
  tombol:{
    marginTop:10,
    backgroundColor:'#007aff',
    padding:10,
    borderRadius:5,
    flexDirection:'row',
    justifyContent:'flex-start',
    gap:'5%',
    alignItems:'center',
    alignSelf:'flex-start'
  },
  teksTombol:{
    color:'white',
    textAlign:'center'
  }
});
