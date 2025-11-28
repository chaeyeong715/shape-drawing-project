import { Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>안녕, 채영! 🚀</Text>
      <Text>이제 앱이 실행되고 있어!</Text>
    </View>
  );
}
