import './App.css'
import {useEffect, useState} from "react";
import Tasks from "./components/Tasks.tsx";
import axios from "axios";
import {ITask} from "./interfaces/tasks.interfaces.ts";

function App() {
    const [tasks, setTasks] = useState<ITask[]>([]);

    useEffect(() => {
        const abort = new AbortController();

        const loadData = async () => {
            try {
                const data = await axios.get("http://localhost:3000/tasks", {signal: abort.signal})
                    .then(res => res.data);
                setTasks(data);
            } catch (err) {
                console.log(err);
            }
        }

        loadData();

        // return () => { abort.abort(); };
    }, []);

    return (
        <>
            <Tasks tasks={tasks} setTasks={setTasks}></Tasks>
        </>
    )
}

export default App
