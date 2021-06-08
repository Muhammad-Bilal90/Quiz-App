import React, { useState, useEffect } from 'react';
// Types
import { SettingsPropsTypes, SettingsTypes, SettingsErrorTypes, CategoriesTpes, Difficulty } from './../Types/types';
// Service
import { Categories } from './../Services/services';
// mui
import { makeStyles } from '@material-ui/core/styles';
import {
    InputLabel,
    FormControl,
    Select,
    TextField,
    Box,
    Typography,
    NativeSelect,
    Button,
    CircularProgress
} from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
    root: {
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyItems: "center",
        alignItems: "center",
    },
    loader: {
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translte(-50%,-50%)",
    },
    settingHeader: {
        background: theme.palette.primary.main,
        color: "white",
        borderRadius: "0.5rem",
    },
    form: {
        width: "90%",
        boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        margin: "0 auto",
        background: "white",
        borderRadius: "0.5rem",
        [theme.breakpoints.up("sm")]: {
            width: "60%",
        },
        [theme.breakpoints.up("md")]: {
            width: "50%",
        },
        [theme.breakpoints.up("lg")]: {
            width: "30%",
        },
    },
    inputFields: {
        width: "100%",
        marginTop: "20px",
    },
}));

const Settings: React.FC<SettingsPropsTypes> = ({ setSettings, setRequest }) => {

    const classes = useStyle();
 
    // Setting States
    const [categories, setCategories] = useState<CategoriesTpes[]>([]);
    const [error, setError] = useState<SettingsErrorTypes>({
        userName: "",
        questionNumbers: ""
    });
    const [newSettings, setNewSettings] = useState<SettingsTypes>({
        UserName: "",
        numberOfQuestions: 5,
        difficulty: "easy",
        category: 9,
        categoryName: "General Knowledge",
    })

    //useEffect to get data of Categories
    // useEffect(() => {
    //     const fetchCategories = async () => {
    //         const fetchedCategories = await Categories();
    //         setCategories(fetchedCategories);
    //     };
    //     fetchCategories();
    // }, []);

    // useEffect for fetching categories and setting them to categories state
    useEffect(() => {
        const fetchCategories = async () => {
            const fetchedCategories = await Categories();
            setCategories(fetchedCategories);
        }
        fetchCategories();
    }, []);

    // setting Loader if categories not loaded
    if (!categories.length) {
        return (
            <div>
                <CircularProgress color="secondary" className={classes.loader} />
            </div>
        );
    }

    // creating handler for submiting the user information and validation for user form and sending request for the quiz
    const submitHandler = (e: React.FormEvent<EventTarget>) => {
        e.preventDefault();
        setSettings(userInfo);
        
        if (newSettings.UserName === "") {
            setError({
                ...error,
                userName: String("User name is required"),
            });
        } else if (newSettings.numberOfQuestions <= 3 || newSettings.numberOfQuestions >= 50) {
            setError({
                ...error,
                questionNumbers: String("Number of Questions must be between 3 to 50"),
            })
        } else {
            setRequest(true);
        }
        
    }

    // filtering out the specific category
    let userCategory = categories.filter((category) => {
        return category.id === newSettings.category
    });

    // console.log(userCategory[0].name, "5687/987");

    // setting user information state
    const userInfo: SettingsTypes = {
        UserName: newSettings.UserName,
        numberOfQuestions: newSettings.numberOfQuestions,
        difficulty: newSettings.difficulty,
        category: newSettings.category,
        categoryName: userCategory[0].name,
    }

    return (
        <div>
            <div className={classes.root}>
                <form className={classes.form} onSubmit={submitHandler}>
                    <Box py={3} px={4}>
                        <div className={classes.settingHeader}>
                            <Box py={2} px={1}>
                                <Typography variant="h4" align="center">
                                    Settings
                        </Typography>
                            </Box>
                        </div>
                        <TextField
                            error={error.userName === "" ? false : true}
                            helperText={error.userName === "" ? "" : error.userName}
                            id="standard-basic"
                            label="Your Name"
                            type="text"
                            value={
                                newSettings.UserName
                            }
                            onChange={(e) => {
                                setNewSettings({
                                    ...newSettings,
                                    UserName: String(e.target.value),
                                });
                                setError({
                                    ...error,
                                    userName: "",
                                });
                            }}
                            className={classes.inputFields}
                        />
                        <TextField
                            error={error.questionNumbers === "" ? false : true}
                            helperText={error.questionNumbers === "" ? "" : error.questionNumbers}
                            id="standard-basic"
                            label="Select Number of Questions"
                            type="number"
                            value={
                                newSettings.numberOfQuestions === 0 ? "" : newSettings.numberOfQuestions
                            }
                            onChange={(e) => {
                                setNewSettings({
                                    ...newSettings,
                                    numberOfQuestions: Number(e.target.value),
                                });
                                setError({
                                    ...error,
                                    questionNumbers: "",
                                });
                            }}
                            className={classes.inputFields}
                        />
                        <FormControl className={classes.inputFields}>
                            <InputLabel htmlFor="grouped-native-select">
                                Select Difficulty
                            </InputLabel>
                            <Select native id="grouped-native-select" onChange={(e) => {
                                setNewSettings({ ...newSettings, difficulty: String(e.target.value) })
                            }}>
                                <option value={Difficulty.Easy}>Easy</option>
                                <option value={Difficulty.Medium}>Medium</option>
                                <option value={Difficulty.Hard}>Hard</option>
                            </Select>
                        </FormControl>
                        <FormControl className={classes.inputFields}>
                            <InputLabel htmlFor="grouped-native-select">
                                Select Category
                            </InputLabel>
                            <NativeSelect id="grouped-native-select" defaultValue=""
                                onChange={(e) => {
                                    setNewSettings({ ...newSettings, category: Number(e.target.value) })
                                }}>
                                {categories.map((category: CategoriesTpes) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </NativeSelect>
                        </FormControl>
                        <Box pt={4} pb={1}>
                            <Button variant="contained" color="primary" type="submit">
                                Start Quiz
                            </Button>
                        </Box>
                    </Box>
                </form>
            </div>
        </div>
    );
}

export default Settings;
