import Welcome from './src/Welcome';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/Home';
import TambahTugas from './src/TambahTugas';
import EditTugas from './src/EditTugas';
import { ThemeProvider, useTheme } from './src/themes/ThemeProvider';
import { useEffect } from 'react';
import SystemNavigationBar from "react-native-system-navigation-bar";
import { StatusBar } from 'react-native';

export type NavigasiRoot={
  Welcome:undefined;
  Home:undefined;
  TambahTugas:undefined;
  EditTugas:undefined;
}

const Stack=createStackNavigator<NavigasiRoot>();

function AppNavigator(){
  const {colors,isDark}=useTheme();
  const navTheme={
    ...(isDark?DarkTheme:DefaultTheme),
    colors:{
      ...(isDark?DarkTheme:DefaultTheme).colors,
      background:colors.background,
      card:colors.card,
      text:colors.text
    },
  };
  return(
    <NavigationContainer theme={navTheme}>
    <StatusBar barStyle={isDark?'light-content':'dark-content'}/>
      <Stack.Navigator 
        initialRouteName='Welcome'
        screenOptions={{
          headerStyle:{
            backgroundColor:'#192f6a'
          },
          headerTintColor:'#fff',
          headerTitleStyle:{
            fontWeight:'bold',
          },
          cardStyle:{backgroundColor:'#e0e7ff'},
          headerShown:false
        }}
      >
        <Stack.Screen 
          name='Welcome' 
          component={Welcome} 
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen 
          name='Home' 
          component={Home} 
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen 
          name='TambahTugas' 
          component={TambahTugas} 
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen 
          name='EditTugas' 
          component={EditTugas} 
          options={{headerShown:false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
useEffect(()=>{
  SystemNavigationBar.stickyImmersive();
},[]);
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

