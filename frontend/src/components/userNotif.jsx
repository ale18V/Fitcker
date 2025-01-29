import React, {useState} from 'react';
import { Text, View, Switch } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function UserNotif() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    
    <View className="flex-1 mx-10 justify-center items-center">
      <View className="w-full">
        <LinearGradient
          colors={["rgba(56, 163, 165, 0.5)", "rgba(128, 237, 153, 0.3)"]}
          className="flex-row items-center p-2 rounded-xl justify-between mb-4"
          >
          <View className="flex-row items-center">
            <Text className="font-bold ml-2">Allow Notifications</Text>
          </View>
          <Switch
            testID="notification-switch"
            trackColor={{false: '#767577', true: '#38A3A5'}}
            thumbColor={isEnabled ? '#ffffff' : '#f4f3f4'}
            ios_backgroundColor="#a3a3a3"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </LinearGradient>
      </View>
        

        
      
      
    </View>
  );
}
