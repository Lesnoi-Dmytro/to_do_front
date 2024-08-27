import './App.css'
import {useEffect, useState} from "react";
import Tasks from "./components/Tasks.tsx";

function App() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const loadData = async () => {

        }
    }, []);

    return (
        <>
            <Tasks></Tasks>
        </>
    )
}

export default App
