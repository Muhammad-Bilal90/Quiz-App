import React from "react";

export type QuizContentTypes = {
    category: string,
    correct_answer: string,
    difficulty: string,
    incorrect_answers: string[],
    question: string,
    type: string,
}

export type QuizTypes = {
    question: string,
    answer: string,
    options: string[],
}

export type QuestionPropsTypes = {
    question: string,
    options: string[],
    answer: string,
    username: string;
    fetchNumberOfQuestiuons: number,
    TotalScore: React.Dispatch<React.SetStateAction<number>>;
    score: number;
    QuestionsCountProps: {
        questionCount: number;
        setQuestionCount: React.Dispatch<React.SetStateAction<number>>;
    };
    callback: (e: React.FormEvent<EventTarget>) => void,
}

export type SettingsTypes = {
    UserName: string,
    numberOfQuestions: number,
    difficulty: string,
    category: number,
    categoryName: string,
}

export type SettingsPropsTypes = {
    setSettings: React.Dispatch<React.SetStateAction<SettingsTypes>>,
    setRequest: React.Dispatch<React.SetStateAction<boolean>>,
}

export type SettingsErrorTypes = {
    userName: string,
    questionNumbers: string;
}

export type CategoriesTpes = {
    id:number;
    name: string,
}

export enum Difficulty {
    Easy = "easy",
    Medium = "medium",
    Hard = "hard",
}

//components/resultProps
export type ResultPropsTypes = {
    username: string;
    totalScore: number;
    numberOfQuestions: number;
    category: string;
    difficulty: string;
    callback: () => void;
};
  
//components/result State
export type ResultStateTypes = [
    { name: string; value: string },
    { name: string; value: number },
    { name: string; value: string },
    { name: string; value: string },
    { name: string; value: number }
];
