import { createContext, useEffect, useState } from "react";

export const DataContext = createContext();

const DataProvider = ({ children }) => {
    const [edit, setEdit] = useState({});
    const [addNotificationTitle, setAddNotificationTitle] = useState("");
    const [editNotificationTitle, setEditNotificationTitle] = useState("");
    const [deleteNotificationTitle, setDeleteNotificationTitle] = useState("");

    const [addNotification, setAddNotification] = useState(false);
    const [editNotification, setEditNotification] = useState(false);
    const [deleteNotification, setDeleteNotification] = useState(false);

    const [data, setData] = useState([]);

    const [index, setIndex] = useState(null);

    useEffect(() => {
        const items =JSON.parse(localStorage.getItem("todoItems"))
        setData(items || [])
    }, []);

    return (
        <DataContext.Provider value={{
            data,
            setData,
            edit,
            setEdit,
            addNotificationTitle,
            editNotificationTitle,
            deleteNotificationTitle,
            addNotification,
            editNotification,
            deleteNotification,
            setAddNotification,
            setEditNotificationTitle,
            setDeleteNotificationTitle,
            setEditNotification,
            setDeleteNotification,
            index,
            setIndex
        }}
        >
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;
