import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { category } from "../constants/Data";
import CategoryBtn from "./CategoryBtn";
import { IoIosCloseCircle } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { max } from "date-fns/fp";

const FormInputs = ({
    data,
    setData,
    setAddNotification,
    setAddNotificatoonTitle
}) => {

    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");

    const [emptyInputError, setEmptyInputError] = useState(false);
   
    const [nameCountError, setNameCountError] = useState("");
    const [descriptionCountError, setDescriptionCountError] = useState("");

    const [categoryOpen, setCategoryOpen] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState([]);

    const [maxSelectedError, setMaxSelectedError] =useState(false);

    const navigate = useNavigate();

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
        }
    };
    const handleName = (e) => {
        let title = e.tartget.value;
        setTaskName(e.target.value)

        if (title.length > 30) {
            setNameCountError("Name should be less than or equal to 30 characters");
        } else {
            setNameCountError("")
        }
    };
    const handleDescription = (e) => {
        let description = e.target.value;
        setTaskDescription(e.target.value);

        if (description.length > 250) {
            setDescriptionCountError("Description should be less than or equal to 250 characters");
        } else {
            setDescriptionCountError("");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create a new Date Object
        const now = new Date();

        const date = now.getDate();

        const month = now.getMonth();

        const year = now.getFullYear();

        //Get the hours (in 24-hour format)
        let hours = now.getHours();

        //Determine whether it's AM or PM
        const amOrPm = hours >= 12 ? "PM" : "AM";

        //Convert hours to 12-hour format
        hours = (hours % 12 || 12).toString().padStart(2, "0");

        //Get the minutes
        const minutes = now.getMinutes().toString().padStart(2, "0");

        const id = uuidv4();
        const title = taskName;
        const description = taskDescription;
        const currentTime = `${date}/${month}/${year}, ${hours}:${minutes} ${amOrPm}`;
        const check = false;

        if (taskName === "") {
            setEmptyInputError(true);

            setTimeout(() => {
                setEmptyInputError(false)
                
            }, 4000);
        } else {
            const newTask = {
                id: id,
                title: title,
                description: description,
                currentTime: currentTime,
                check: check,
                category: selectedCategory
            };

            localStorage.setItem("todoItems", JASON.stringify([...data, newTask]));
            setData([...data, newTask]);
            setTaskName("");
            setTaskDescription("");
            setEmptyInputError(false);
            navigate("/");

            setAddNotificatoonTitle(taskName);
            setAddNotification(true);
            setTimeout(() => {
                setAddNotification(false);
                setAddNotificatoonTitle("")
            }, 4000)
        } 
    };

    const handleSelected = (categoryObj) => {
        setSelectedCategory([...selectedCategory, categoryObj]);

        const isCategorySelected = selectedCategory.filter((val) => val.id !== categoryObj.id);

        if (isCategorySelected.length) {
            const updatedCategories = selectedCategory.filter((val) => val.id !== categoryObj.id);
            setSelectedCategory(updatedCategories);
        } else {
            if (selectedCategory.length < 3) {
                setMaxSelectedError(false);
                setSelectedCategory([...selectedCategory, categoryObj])
            } else {
                setMaxSelectedError(true);
                setTimeout(() => {
                    setMaxSelectedError(false);
                }, 4000);
            }
        }
    };

    const categoryRef = useRef();

    useEffect(() => {
        let handleCategoryTouch = (e) => {
            if (!categoryRef.current.contains(e.target)) {
                setCategoryOpen(false);
            }
        };

        document.addEventListener("mousedown", handleCategoryTouch);

        return () => document.removeEventListener("mousedown", handleCategoryTouch);
    });

    return (
        <div className="py-10">
            <form onSubmit={handleSubmit} className="max-w-[600px] m-auto">
                <div>
                    <label
                    className={`text-sm max-sm:text-xs ${nameCountError ? "text-red-500" : "text-purple-200"} text-purple-200`}
                    htmlFor="taskName"
                    >
                        Task Name
                    </label>
                    <input 
                    type="text"
                    id="taskName"
                    placeholder="Enter task name"
                    value={taskName}
                    onChange={handleName}
                    onKeyDown={handleKeyDown}
                    className={`w-full h-14 max-sm:h-12 ${nameCountError ? "border-red-500 border-2" : "border-none"} 
                    rounded-xl p-4 text-base max-sm:placeholder:text-sm mt-1 outline-none`}
                    />
                    <p className="text-red-500 text-base max-sm:text-xs mt-1">
                        {nameCountError}
                    </p>
                </div>

                <div className="mt-7 max-sm:mt-4">
                    <label
                    className={`text-sm max-sm:text-xs ${descriptionCountError ? "text-red-500" : "text-purple-200"} text-purple-200`}
                    htmlFor="taskDescription"
                    >
                        Task Description
                    </label>
                    <textarea
                    id="taskDescription"
                    placeholder="Enter task description"
                    value={taskDescription}
                    onChange={handleDescription}
                    className={`resize-none ${descriptionCountError ? "border-red-500 border-2" : "border-none"} 
                    w-full rounded-xl p-4 max-sm:p-3 mt-1 text-base max-sm:placeholder:text-sm h-48 max-sm:h-36 outline-none`}
                    >
                    </textarea>
                    <p className="text-red-500 text-base max-sm:text-xs">
                        {descriptionCountError}
                    </p>
                </div>

                <div ref={categoryRef} className="mt-7 ma-sm:mt-4">
                    <label className="text-sm max-sm:text-xs text-purple-200">Category</label>

                    <div
                    onClick={() => setCategoryOpen(!categoryOpen)}
                    className="bg-white flec gap-7 cursor-pointer justify-between min-h-14 max-sm:minph-12 px-3 py-3 max-sm:px-2 max-sm:py-2 item-center max-sm:text-xs rounded-xl w-full mt-1"
                    >
                        <div className="flex gap-2 flex-wrap items-center">
                            {selectedCategory.map((val, index) => (
                                <div
                                key={index}
                                className="bg-purple-500 text-white text-sm max-sm:text-xs flex items-center gap-1 px-3 py-2 max-sm:py-2 font-medium rounded-lg"
                                >
                                    <span className="text-xl max-sm:text-sm">{val.emoji}</span>{" "}
                                    {val.category}
                                </div>
                            ))}
                        </div>

                        <div className="ms-auto">
                            {categoryOpen ? (
                                <IoIosArrowUp className="text-2xl max-sm:text-xl" />
                            ) : (
                                <IoIosArrowDown className="text-2xl max-sm:text-xl" />
                            )}
                        </div>
                    </div>
                    {categoryOpen ? (
                        <div className="mt-3">
                            <ul className="p-2 bg-purple-400 flex flex-co; gap-2 max-sm:gap-1 rounded-xl">
                                <li className="my-2 px-3 text-white max-sm:text-sm">Select max (3 categories)</li>
                                {category.map((val, index) => (
                                    <CategoryBtn 
                                    key={index}
                                    val={val}
                                    selectedCategory={selectedCategory}
                                    handleSelected={handleSelected}
                                    />
                                ))}
                            </ul>
                        </div>
                    ) : null }
                </div>

                <div className="text-center mt-4">
                    <button
                    disabled={nameCountError || descriptionCountError ? true : false}
                    type="submit"
                    className={`${nameCountError || descriptionCountError
                        ? "bg-purple-700 cursor-not-allowed text-purple-400"
                        : "hover:bg-purple-800 text-white"
                    } transition text-xl font-bold bg-purple-400 p-4 max-sm:p-3 max-sm:text-lg rounded-xl w-full`}
                    >
                        Create Task
                    </button>
                </div>
            </form>

            {emptyInputError && (
                <div className="max-sm:w-[230px] px-3 py-2 rounded-md bg-white border-l-[5px] flex items-center gap-2 border-red-600 fixed bottom-8 left-[50%] -translate-x-[50%]">
                    <IoIosCloseCircle className="text-2xl max-sm:text-xl text-red-500" />{" "}
                    <h2 className="max-md:text-xs text-sm text-slate-600 font-semibold">
                        Please enter a task name
                    </h2>
                </div>
            )}

            {maxSelectedError && (
                <div className="max-sm:w-[320px] px-3 pay-2 max-sm:px-2 max-sm:py-1 rounded-md bg-white border-l-[5px] flex items-center gap-2 border-red-600 fixed bottom-8 left-[50%] -translate-x-[50%]">
                    <IoIosCloseCircle className="text-3xl max-sm:text-2xl text-red-500" />{" "}
                    <h2 className="max-md:text-xs text-sm text-slate-600 font-semibold">
                        You cannot add more than 3 categories
                    </h2>
                </div>
            )}
        </div>
    );
};
export default FormInputs;