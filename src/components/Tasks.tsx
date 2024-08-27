import {ITask} from "../interfaces/tasks.interfaces.ts";
import Task from "./Task.tsx";
import {FormEvent, SetStateAction, useState} from "react";
import axios from "axios";

interface TasksProps {
    tasks: ITask[];
    setTasks: (val: SetStateAction<ITask[]>) => void;
}

const Tasks = ({tasks, setTasks}: TasksProps) => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const addNewTask = async (e: FormEvent) => {
        e.preventDefault();

        const newTask = await axios.post<ITask>('http://localhost:3000/tasks', {
            title,
            description,
        })
            .then(res => res.data);

        setTasks(prev => [...prev, newTask]);
    }

    return (
        <>
            <h1>Tasks</h1>
            {tasks.map((task) =>
                <Task task={task} setTasks={setTasks} key={task._id}/>)}
            <form onSubmit={addNewTask}>
                <h1>Create new</h1>
                <label htmlFor='title'>Title</label>
                <input type='text' id='title' placeholder='Title'
                       value={title} onChange={(e) => setTitle(e.target.value)}/>
                <br/>
                <label htmlFor='description'>Description</label>
                <input type='text' id='description' placeholder='Description'
                       value={description} onChange={(e) => setDescription(e.target.value)}/>
                <br/>
                <button type='submit'>Add</button>
            </form>
        </>
    )
}

export default Tasks;