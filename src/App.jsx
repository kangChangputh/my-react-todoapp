import React from "react";
import { Route, Routes } from "react-router-dom";
// import Home
import AddTodo from "./components/AddTodo"
import EditTodo from "./components/EditTodo"
//import TaskDetails
import { DataProvider } from "./context/DataContext";

// import PageNotFound

const App = () => {
    return (
        <DataProvider>
            <div>
                <Routes>
                    {/*<Route path="/" element={<Home />} /> */}
                    <Route path="/addTodo" element={<AddTodo />}/>
                    <Route path="/edit" element={<EditTodo />}/>
                </Routes>

            </div>

        </DataProvider>
    )
}

export default App;