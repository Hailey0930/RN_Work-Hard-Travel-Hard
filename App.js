import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { theme } from "./colors";
import { useState } from "react";

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});

  const travel = () => {
    setWorking(false);
  };

  const work = () => {
    setWorking(true);
  };

  const onChangeText = (event) => {
    setText(event);
  };

  const addToDo = () => {
    if (text === "") {
      return;
    }

    const newToDos = Object.assign({}, toDos, {
      [Date.now()]: { text, work: working },
    });
    setToDos(newToDos);
    setText("");
  };

  // NOTE TouchableOpacity는 터치했을 때의 opacity를 설정할 수 있음
  // NOTE TouchableHighlight는 터치했을 때의 효과를 좀 더 다양하게 (ex. 배경색) 설정할 수 있음
  // NOTE TouchableWithoutFeedback은 터치했을 때 UI 변화 없이 onPress만 설정할 수 있음
  // NOTE Pressable은 TouchableOpacity의 확장 버전
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text
            style={{ ...styles.btnText, color: working ? "white" : theme.gray }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text
            style={{ ...styles.btnText, color: working ? theme.gray : "white" }}
          >
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholder={working ? "Add a To Do" : "Where do you want to go?"}
          onChangeText={onChangeText}
          value={text}
          onSubmitEditing={addToDo}
          returnKeyType="done"
        />
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
  input: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 20,
    fontSize: 18,
  },
});
