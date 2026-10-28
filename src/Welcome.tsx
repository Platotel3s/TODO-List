import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { BlurView } from "expo-blur";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { NavigasiRoot } from "../App";
import { useTheme } from "./themes/ThemeProvider";

export default function Welcome(){
  const navigation=useNavigation<StackNavigationProp<NavigasiRoot>>();
  const handleStart=()=>{
    navigation.navigate('Home');
  }
  const {colors}=useTheme();
  return(
    <View style={[styling.canvas,{backgroundColor:colors.background}]}>
      <View style={[styling.card,{backgroundColor:colors.background}]}>
        <Text style={[styling.cardTitle,{color:colors.text}]}>Welcome To TodoApp</Text>
        <View style={styling.section}>
          <BlurView intensity={4} tint="light" style={styling.sectionOne}>
            <FontAwesome name="book" size={94} color={colors.text}/>
          </BlurView>
          <TouchableOpacity
            style={[styling.button,{backgroundColor:colors.background}]}
            onPress={handleStart}
            activeOpacity={0.8}
          >
            <Text style={[styling.buttonText,{color:colors.text}]}>Mulai</Text>
            <FontAwesome name="arrow-right" size={18} color={colors.text}/>
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
  },
  card:{
    height:'auto',
    width:290,
    padding:20,
    margin:8,
    borderRadius:25,
    elevation:15,
    shadowColor:'#000',
    shadowOffset:{width:0,height:5},
    shadowOpacity:0.3,
    shadowRadius:6,
    marginBottom:10
  },
  cardTitle:{
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
    fontWeight:'bold',
    fontSize:16
  },
});
