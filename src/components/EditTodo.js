import React, { useContext, useEffect, useState, useRef} from "react";
import { useNavigate } from "react-router-dom";
import { IoIosAddCircle } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import TopNav from "../Utils/TopNav";
import DataContext from "../context/DataContext";
import EditCategoryBtn from "../Utils/EditCategoryBtn";
import { category } from "../constants/Data";

const EditTodo = () => {
    const {
        data,
        setData,
        edit,
        setEdit,
        setEditNotificationTitle,
        setEditNotification,
        index
    } = useContext(DataContext)

    const [emptyInputError, setEmptyInputError] = useState(false);

    const [nameCountError, setNameCountError] = useState("");
    const [descriptionCountError, setDescriptionCountError] = useState("");
    const [categoryOpen, setCategoryOpen] = useState(false);

    const navigate = useNavigate("");

    const handleKeyDown = (e) => {
        if (e.key === "Enter" ) {
            e.preventDefault();
        }
    };

    const handleEditTitle = (e) => {
        let title = e.target.value;
        setEdit({
            id: edit.id,
            title: title,
            description: edit.description,
            check: edit.check,
            currentTime: edit.currentTime,
            category: edit.category
        });

        if (title.length > 30) {
            setNameCountError("Name should be less than or equal to 30 characters");
        } else {
            setNameCountError("");
        }
    };

    const handleEditDescription = (e) => {
        let description = e.target.value;
        setEdit({
            id: edit.id,
            title: title,
            description: edit.description,
            check: edit.check,
            currentTime: edit.currentTime,
            category: edit.category
        });

        if (description.length > 250) {
            setDescriptionCountError("Description should be less than or eqaul to 250 characters");
        } else {
            setDescriptionCountError("")
        }
    };

    const handleSubmit = (e, index) => {
        e.preventDefault();

        if (edit.title === "") {
            setEmptyInputError(true);

            setTimeout(() => {
                setEmptyInputError(false);
            }, 4000)
        } else {
            const editIndex = [...data];
            editIndex[index] = edit;

            setData(editIndex);
            localStorage.setItem("todoItems", JSON.stringify(editIndex));
            setEdit("");
            navigate("/");

            setEditNotification(edit.title);
            setEditNotification(true);
            setTimeout(() => {
                setEditNotification(false);
                setEditNotificationTitle("")
            }, 4000);
        }
    };

    const handleCancel = () => {
        setEdit("");
        navigate("/")
    };

    const categoryRef = useRef();

    

} 