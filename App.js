import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { theme } from "./colors";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";

const STORAGE_KEY = "@toDos";
const CATEGORY_KEY = "@category";

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});

  useEffect(() => {
    loadToDos();
    loadCategory();
  }, []);

  // NOTE Working, Travel 카테고리 관리
  const saveCategory = async (isWork) => {
    try {
      const stringValue = JSON.stringify(isWork);
      await AsyncStorage.setItem(CATEGORY_KEY, stringValue);
    } catch (e) {
      console.log(e);
    }
  };

  const travel = () => {
    setWorking(false);
    saveCategory(false);
  };

  const work = () => {
    setWorking(true);
    saveCategory(true);
  };

  const loadCategory = async () => {
    const category = await AsyncStorage.getItem(CATEGORY_KEY);
    category !== null ? setWorking(JSON.parse(category)) : null;
  };

  // NOTE input 관리
  const onChangeText = (event) => {
    setText(event);
  };

  const saveToDos = async (toSave) => {
    try {
      const stringSave = JSON.stringify(toSave);
      await AsyncStorage.setItem(STORAGE_KEY, stringSave);
    } catch (e) {
      console.log(e);
    }
  };

  const loadToDos = async () => {
    const stringToDo = await AsyncStorage.getItem(STORAGE_KEY);
    stringToDo !== null ? setToDos(JSON.parse(stringToDo)) : null;
  };

  const addToDo = async () => {
    if (text === "") {
      return;
    }

    // const newToDos = Object.assign({}, toDos, {
    //   [Date.now()]: { text, work: working },
    // });
    const newToDos = { ...toDos, [Date.now()]: { text, working } };
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText("");
  };

  const deleteToDo = (id) => {
    Alert.alert("Delete To Do", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "I'm Sure",
        style: "destructive",
        onPress: () => {
          const newToDos = { ...toDos };
          delete newToDos[id];
          setToDos(newToDos);
          saveToDos(newToDos);
        },
      },
    ]);
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
      <TextInput
        style={styles.input}
        placeholder={working ? "Add a To Do" : "Where do you want to go?"}
        onChangeText={onChangeText}
        value={text}
        onSubmitEditing={addToDo}
        returnKeyType="done"
      />
      <ScrollView>
        {Object.keys(toDos).map((key) =>
          toDos[key].working === working ? (
            <View key={key} style={styles.toDo}>
              <Text style={styles.toDoText}>{toDos[key].text}</Text>
              <TouchableOpacity onPress={() => deleteToDo(key)}>
                <FontAwesome name="trash-o" size={20} color="#bdbdbd" />
              </TouchableOpacity>
            </View>
          ) : null
        )}
      </ScrollView>
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
    marginVertical: 20,
    fontSize: 18,
  },
  toDo: {
    backgroundColor: theme.gray,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toDoText: {
    color: "white",
    fontSize: 20,
    fontWeight: "500",
  },
});
