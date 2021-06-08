import React, { useState, useEffect } from "react";
// Types
import { QuestionPropsTypes } from "./../Types/types";
// mui
import { makeStyles } from "@material-ui/core/styles";
import { Button, Box, Radio, RadioGroup, FormControlLabel, FormControl, Typography, Divider, } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
    QuizStart: {
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyItems: "center",
        alignItems: "center",
    },
    quesCard: {
        width: "90%",
        boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        margin: "0 auto",
        background: "white",
        borderRadius: "0.5rem",
        [theme.breakpoints.up("md")]: {
            width: "70%",
        },
    },
    primaryColor: {
        color: theme.palette.primary.main,
    },
    quesParent: {
        background: theme.palette.primary.main,
        color: "#f3f3f3",
        borderRadius: "0.5rem",
    },
    loader: {
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translte(-50%,-50%)",
    },
}));

const QuestionCard: React.FC<QuestionPropsTypes> = ({ options, question, answer, username, fetchNumberOfQuestiuons, TotalScore, score, QuestionsCountProps, callback }) => {

    // declaring states
    const [userAnswer, setUserAnswer] = useState<string>("");
    const [buttonToggle, setButtonToggle] = useState<boolean>(false);

    // destructuring data
    const { questionCount, setQuestionCount } = QuestionsCountProps;

    // mui class
    const classes = useStyle();

    // creating handler for switching to next question and add score if correct answer
    const nextHandler = () => {
        if (answer === userAnswer) {
            TotalScore(score + 1);
            setUserAnswer("");
        }
        if (fetchNumberOfQuestiuons !== questionCount) {
            setQuestionCount(questionCount + 1);
        }
    }

    // for showing submit at last dependent on questionCount, score and fetchNumberOfQuestions
    useEffect(() => {
        if (fetchNumberOfQuestiuons === questionCount) {
            setButtonToggle(true);
        } else {
            setButtonToggle(false);
        }
    }, [questionCount, score, fetchNumberOfQuestiuons]);

    return (

        <div className={classes.QuizStart}>
            <div className={classes.quesCard}>
                <Box py={3} px={4}>
                    <Box px={1}>
                        <Typography variant="h6" style={{ textTransform: "capitalize" }}>
                            <b> Student Name : {username} </b>
                        </Typography>
                        <Box py={2} px={1}>
                            <Divider className={classes.primaryColor} />
                        </Box>
                        <Typography variant="h5" color="primary">
                            <b>
                                {/* + 1 for getting question number and fetched questions starting from 1 as array starts from 0 index */}
                                Question {questionCount + 1} of {fetchNumberOfQuestiuons + 1}
                            </b>
                        </Typography>
                    </Box>
                    <Box py={2} px={1}>
                        <Divider className={classes.primaryColor} />
                    </Box>
                    <Box py={3} px={2} className={classes.quesParent}>
                        <Typography variant="h5">
                            {question}
                        </Typography>
                    </Box>
                    <form name="settingForm" onSubmit={callback}>
                        <Box px={1} pt={3}>
                            <FormControl component="fieldset">
                                <RadioGroup aria-label="gender" name="gender1" value={userAnswer}
                                    onChange={(e) => setUserAnswer(e.target.value)}>
                                    {options.map((options: string, ind: number) => (
                                        <FormControlLabel key={ind}
                                            value={options}
                                            control={<Radio color="primary" />}
                                            label={options}
                                            color="primary" />
                                    ))}
                                </RadioGroup>
                                <Box py={2}>
                                    {buttonToggle ? (
                                        <Button variant="contained"
                                            color="primary"
                                            onClick={nextHandler}
                                            type="submit">
                                            Submit
                                        </Button>
                                    ) : (
                                        <Button variant="contained"
                                            color="primary"
                                            onClick={nextHandler}
                                            disabled={userAnswer === "" ? true : false}
                                        >
                                            Next
                                        </Button>
                                    )}
                                </Box>
                            </FormControl>
                        </Box>
                    </form>
                </Box>
            </div>
        </div>
    );
};

export default QuestionCard;
