import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { BlurView } from "expo-blur";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { NavigasiRoot } from "../App";

export default function Welcome(){
  const navigation=useNavigation<StackNavigationProp<NavigasiRoot>>();
  const handleStart=()=>{
    navigation.navigate('Home');
  }
  return(
    <View style={styling.canvas}>
      <View style={styling.card}>
        <Text style={styling.cardTitle}>Welcome To TodoApp</Text>
        <View style={styling.section}>
          <BlurView intensity={4} tint="light" style={styling.sectionOne}>
            <FontAwesome name="book" size={94} color="#fffcdc"/>
          </BlurView>
          <TouchableOpacity
            style={styling.button}
            onPress={handleStart}
            activeOpacity={0.8}
          >
            <Text style={styling.buttonText}>Mulai</Text>
            <FontAwesome name="arrow-right" size={18} color="#fff"/>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styling=StyleSheet.create({
  canvas:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#e0e7ff'
  },
  card:{
    height:'auto',
    width:290,
    padding:20,
    margin:8,
    borderRadius:25,
    backgroundColor:'#192f6a',
    elevation:15,
    shadowColor:'#000',
    shadowOffset:{width:0,height:5},
    shadowOpacity:0.3,
    shadowRadius:6,
    marginBottom:10
  },
  cardTitle:{
    color:'#fff',
    textAlign:'center',
    fontWeight:'bold',
    fontSize:26,
    marginTop:10,
    marginBottom:10
  },
  section:{
    marginTop:25,
    justifyContent:'center',
    alignItems:'center',
  },
  subtitle:{
    color:'#fff',
    textAlign:'center',
    fontSize:14,
    marginTop:20,
    marginBottom:20,
    paddingHorizontal:10
  },
  sectionOne:{
    padding:25,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:60,
  },
  button:{
    flexDirection:'row',
    backgroundColor:'#ff7b00',
    paddingVertical:12,
    paddingHorizontal:25,
    borderRadius:30,
    alignItems:'center',
    justifyContent:'center',
    gap:10,
    width:'80%',
    marginTop:'20%',
    marginBottom:15
  },
  buttonText:{
    color:'#fff',
    fontWeight:'bold',
    fontSize:16
  },
});
