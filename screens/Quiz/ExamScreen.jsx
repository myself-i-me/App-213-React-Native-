import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Alert,
  Text,
  Dimensions,
  TouchableOpacity,
  BackHandler,
  ScrollView,
} from "react-native";
import QuestionScreen from "../../components/Quiz/Question";
import Options from "../../components/Quiz/Options";
import { useState, useEffect, useContext, useRef } from "react";
import Button from "../../components/ui/Button";
import {
  StackActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import CountDown from "react-native-countdown-accurate";
import { AuthContext } from "../../store/auth-context";

const { width, height } = Dimensions.get("window");
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { DocContext } from "../../store/doc-context";
import { generateQuiz } from "../../util/quizApis";
import LoadingOverlay from "../../components/ui/LoadingOverlay";

let customFonts = {
  Fraunces: require("../../assets/fonts/Fraunces.ttf"),
  Poppins: require("../../assets/fonts/Poppins.ttf"),
  Fraunces700: require("../../assets/fonts/Fraunces_9pt_Soft-Bold.ttf"),
};

const ExamScreen = () => {
  const docctx = useContext(DocContext);

  const authctx = useContext(AuthContext);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);

  const [isFontsLoaded, setIsFontsLoaded] = useState(false);

  const [isExamLoading, setIsExamLoading] = useState(false);
  const [quizTitle, setQuizTitle] = useState("");
  const [examTime, setExamTime] = useState(null);
  const [noOfQuestions, setNoOfQuestions] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const quizIdRef = useRef("");
  const quizQuestionsRef = useRef([]);
  const navigation = useNavigation();
  const route = useRoute();
  const examItem = route.params.item;
  const documentTitle = route.params.documentTitle;
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    docctx.setHeaderShowns(false);
    let quizQuestions = [];

    const handleBackPress = () => {
      console.log("quiz questions are", quizQuestions.length);
      Alert.alert(
        "Confirmation",
        "Are you sure you want to exit?",
        [
          { text: "Cancel", onPress: () => {}, style: "cancel" },
          {
            text: "OK",
            onPress: () => {
              console.log("quiz questions are", quizQuestions.length);
              navigation.dispatch(
                StackActions.replace("Result", {
                  questions: quizQuestions,
                  quizId: quizIdRef.current,
                  documentTitle: documentTitle,
                })
              );
            },
          },
        ],
        { cancelable: false }
      );
      return true; // Return true to prevent default back button action
    };

    async function fetchExam() {
      try {
        await Font.loadAsync(customFonts);
        setIsFontsLoaded(true);
        setIsExamLoading(true);
        let examData = await generateQuiz(
          examItem.id,
          authctx.userId,
          authctx.token
        );
        setQuizTitle(examData?.quizname);
        setNoOfQuestions(examData.noofquestions);
        setExamTime(examData.timeinmins);
        quizIdRef.current = examData.quizid;
        setIsExamLoading(false);
        quizQuestions = examData.questions;
        quizQuestionsRef.current = quizQuestions;
        setQuizQuestions(quizQuestions);
      } catch (error) {
        console.log("error is", error);
        setIsExamLoading(false);
      }
    }
    fetchExam();
    BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, []);

  if (!isFontsLoaded) {
    SplashScreen.preventAutoHideAsync();
    return null;
  }
  let selectedOption = "";

  function NextButton() {
    return (
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "white",
          position: "absolute",
          bottom: 0,
          alignSelf: "center",
          width: "100%",
          justifyContent: "center",
          paddingVertical: 10,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#B7B4B1FC",
            paddingHorizontal: width * 0.13,
            paddingVertical: height * 0.015,
            borderRadius: 8,
            marginRight: width * 0.15,
          }}
          onPress={incrementQuestion}
        >
          <Text style={{ fontWeight: "bold" }}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#207398",
            paddingHorizontal: width * 0.13,
            paddingVertical: height * 0.015,
            borderRadius: 8,
          }}
          onPress={incrementQuestion}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function SubmitButton() {
    return (
      <View
        style={{
          width: "100%",
          borderTopColor: "#145C7BBA",
          borderTopWidth: 1.5,
          paddingVertical: 10,
          position: "absolute",
          bottom: 0,
          alignSelf: "center",
          backgroundColor: "white",
        }}
      >
        <TouchableOpacity
          onPress={submitAnswers}
          style={{
            backgroundColor: "#207398",
            paddingHorizontal: width * 0.13,
            paddingVertical: height * 0.015,
            borderRadius: 8,
            width: width * 0.5,
            alignSelf: "center",
          }}
        >
          <Text
            style={{ color: "white", fontWeight: "bold", alignSelf: "center" }}
          >
            Final Submit
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function submitAnswers() {
    const currentQuestionData = quizQuestionsRef.current[currentQuestion];
    let updatedQuestionData = quizQuestionsRef.current.map((i) => {
      if (i.id == currentQuestionData.id) {
        i.useranswer = selectedOption;
        return i;
      } else {
        return i;
      }
    });
    setQuizQuestions(updatedQuestionData);
    navigation.dispatch(
      StackActions.replace("Result", {
        questions: quizQuestions,
        quizId: quizIdRef.current,
        documentTitle: documentTitle,
      })
    );
  }

  function incrementQuestion() {
    if (currentQuestion + 1 < noOfQuestions) {
      const currentQuestionData = quizQuestionsRef.current[currentQuestion];
      let updatedQuestionData = quizQuestionsRef.current.map((i) => {
        if (i.id == currentQuestionData.id) {
          i.useranswer = selectedOption;
          return i;
        } else {
          return i;
        }
      });
      setQuizQuestions(updatedQuestionData);
      setCurrentQuestion(currentQuestion + 1);
      selectedOption = "";
    } else {
      console.log("::::::::::::::::::::::::");
    }
  }

  function selected(value) {
    selectedOption = value;
  }

  if (isExamLoading) {
    return <LoadingOverlay />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Text
        style={{
          backgroundColor: "#145c7b0d",
          fontFamily: "Fraunces700",
          fontSize: 18,
          textAlign: "center",
          height: 51,
          borderTopWidth: 0.5,
          borderBottomWidth: 0.5,
          borderTopColor: "#145C7B",
          borderBottomColor: "#145C7B",
          textAlignVertical: "center",
        }}
      >
        {documentTitle}
      </Text>
      <ScrollView>
        <View style={styles.container}>
          <Text
            style={{
              fontFamily: "Fraunces-semibold",
              fontSize: 24,
              marginBottom: height * 0.01,
            }}
          >
            {quizTitle}
          </Text>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "white",
              borderColor: "red",
              borderWidth: 0,
            }}
          >
            <Text
              style={{
                backgroundColor: "white",
                textAlignVertical: "center",
                color: "#AA2222",
                paddingBottom: height * 0.024,
                fontSize: 18,
              }}
            >
              Time remaining is
            </Text>
            <CountDown
              size={18}
              style={styles.timer}
              digitTxtStyle={{ color: "#AA2222", margin: 0 }}
              timeLabelStyle={{ color: "transparent" }}
              until={examItem*60}
              running = {!finished}
              digitStyle={{ backgroundColor: "white" }}
              timeToShow={["M"]}
            />
            <Text
              style={{
                backgroundColor: "white",
                textAlignVertical: "center",
                color: "#AA2222",
                paddingBottom: height * 0.024,
                fontSize: 18,
              }}
            >
              Min
            </Text>
            <CountDown
              size={18}
              style={styles.timer}
              digitTxtStyle={{ color: "#AA2222" }}
              timeLabelStyle={{ color: "transparent" }}
              until={examItem*60}
              running = {!finished}
              onFinish={() => {
                if(!finished){
                  setFinished(true);
                  console.log('not finished')
                  submitAnswers();
                }
              }}
              digitStyle={{ backgroundColor: "white" }}
              timeToShow={["S"]}
            />
            <Text
              style={{
                backgroundColor: "white",
                textAlignVertical: "center",
                color: "#AA2222",
                paddingBottom: height * 0.024,
                fontSize: 18,
              }}
            >
              Sec
            </Text>
          </View>
          <Text
            style={{
              fontSize: 20,
              marginBottom: height * 0.02,
              borderBottomColor: "#145C7BBA",
              borderBottomWidth: 1.8,
              paddingBottom: height * 0.02,
              fontWeight: "600",
              width: "100%",
              textAlign: "center",
              color: "#156308",
            }}
          >
            Question {currentQuestion + 1} of {noOfQuestions}
          </Text>

          <View style={{ borderWidth: 0, borderColor: "red" }}>
            {quizQuestions[currentQuestion] && (
              <QuestionScreen
                question={quizQuestions[currentQuestion].questionname}
              />
            )}
            {quizQuestions[currentQuestion] && (
              <Options
                ops={[
                  quizQuestions[currentQuestion].option1,
                  quizQuestions[currentQuestion].option2,
                  quizQuestions[currentQuestion].option3,
                  quizQuestions[currentQuestion].option4,
                ]}
                choosen={selected}
              />
            )}
          </View>
        </View>
      </ScrollView>
      {currentQuestion + 1 < noOfQuestions ? <NextButton /> : <SubmitButton />}
    </SafeAreaView>
  );
};

export default ExamScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: width * 0.1,
    backgroundColor: "white",
    paddingTop: 15,
    paddingBottom: 100,
  },
  timer: {
    fontSize: 19,
    marginBottom: height * 0,
    padding: 0,
  },
});
