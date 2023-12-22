import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { theme } from "./colors";

export default function App() {
  // NOTE TouchableOpacity는 터치했을 때의 opacity를 설정할 수 있음
  // NOTE TouchableHighlight는 터치했을 때의 효과를 좀 더 다양하게 (ex. 배경색) 설정할 수 있음
  // NOTE TouchableWithoutFeedback은 터치했을 때 UI 변화 없이 onPress만 설정할 수 있음
  // NOTE Pressable은 TouchableOpacity의 확장 버전
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.btnText}>Work</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("pressed")}>
          <Text style={styles.btnText}>Travel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    // NOTE 컨테이너 가로 방향으로 padding
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 100,
  },
  btnText: {
    color: theme.grey,
    fontSize: 44,
    fontWeight: "600",
  },
});
