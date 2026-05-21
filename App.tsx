import Welcome from './src/Welcome';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/Home';
import TambahTugas from './src/TambahTugas';
import EditTugas from './src/EditTugas';

export type NavigasiRoot={
  Welcome:undefined;
  Home:undefined;
  TambahTugas:undefined;
  EditTugas:undefined;
}

const Stack=createStackNavigator<NavigasiRoot>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
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
          <Stack.Screen name='Welcome' component={Welcome} options={{headerShown:false}}/>
          <Stack.Screen name='Home' component={Home} options={{headerShown:false}}/>
          <Stack.Screen name='TambahTugas' component={TambahTugas} options={{headerShown:false}}/>
          <Stack.Screen name='EditTugas' component={EditTugas} options={{headerShown:false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

