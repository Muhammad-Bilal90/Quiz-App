import React, { useEffect, useState } from 'react';
// css
import './App.css';
// Services
import { QuizData } from './Services/services';
// Types
import { QuizTypes, SettingsTypes } from './Types/types';
// Components
import QuestionCard from './Components/QuestionCard';
import Settings from './Components/Settings';
import Result from './Components/Result';

function App() {

  // setting states
  const [quiz, setQuiz] = useState<QuizTypes[]>([]);
  let [questionCount, setQuestionCount] = useState<number>(0);
  const [result, setResult] = useState<boolean>(false);
  const [totalScore, setTotalScore] = useState<number>(0);
  const [request, setRequest] = useState<boolean>(false);
  const [settings, setSettings] = useState<SettingsTypes>({
    UserName: "",
    numberOfQuestions: 5,
    difficulty: "easy",
    category: 9,
    categoryName: "General Knowledge",
  });

  // creating handler for starting New Quiz
  const handleSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    setResult(true);
  }
  const NewQuiz = () => {
    // clearing following states
    setQuiz([]);

    // setting score to 0
    setTotalScore(0);

    //to make question count to 0 so questions will start from Q1
    setQuestionCount(0);

    //to close result card
    setResult(false);

    //to stop sending initial request to api waiting for settings
    setRequest(false);
  };

  // fetching quiz content for the quiz dependent on settings provided by the user and request by the user
  useEffect(() => {
    const fetchData = async () => {
      if (request) {
        const questions = await QuizData(
          settings.numberOfQuestions,
          settings.difficulty,
          settings.category
        );
        // console.log(questions, '23456');
        setQuiz(questions);
      }
    }
    fetchData();
  }, [settings, request]);

  // to get total questions requested (.length = total length of the array)
  let fetchedQuestions = quiz.length - 1;

  return (
    <>
      {quiz.length ? (
        !result ? (
          <QuestionCard
            question={quiz[questionCount].question}
            options={quiz[questionCount].options}
            answer={quiz[questionCount].answer}
            username={settings.UserName}
            fetchNumberOfQuestiuons={fetchedQuestions}
            TotalScore={setTotalScore}
            score={totalScore}
            QuestionsCountProps={{ questionCount, setQuestionCount }}
            callback={handleSubmit}
          />
        ) : (
          <Result
            username={settings.UserName}
            totalScore={totalScore}
            numberOfQuestions={settings.numberOfQuestions}
            category={settings.categoryName}
            difficulty={settings.difficulty}
            callback={NewQuiz}
          />
        )
      ) : (
        <Settings
          setSettings={setSettings}
          setRequest={setRequest}
        />
      )}
    </>
  );
}

export default App;
