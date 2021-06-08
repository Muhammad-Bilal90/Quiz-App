// Types
import { QuizTypes, QuizContentTypes, CategoriesTpes } from './../Types/types';

// shuffling the array

const shuffleArray = (array: any[]) => [...array].sort(() => Math.random() - 0.5);

export const QuizData = async (
    numberOfQuestions: number,
    difficulty: string,
    category: number
    ): Promise<QuizTypes[]> => {
    const res = await fetch(`https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}`);
    const { results } = await res.json();
    const quiz: QuizTypes[] = results.map((questionsObj: QuizContentTypes) => {
        return {
            question: questionsObj.question,
            answer: questionsObj.correct_answer,
            options: shuffleArray(questionsObj.incorrect_answers.concat(questionsObj.correct_answer)),
        };
    });
    return quiz;
    // console.log(results);
}

export const Categories = async () => {
    const res = await fetch("https://opentdb.com/api_category.php");
    const { trivia_categories } = await res.json();
    // console.log(trivia_categories);

    const categories: CategoriesTpes[] = trivia_categories;
    return categories;
}
