import {ITask} from "../interfaces/tasks.interfaces.ts";
import {SetStateAction, useState} from "react";
import axios from "axios";

interface ITaskProps {
    task: ITask;
    setTasks: (val: SetStateAction<ITask[]>) => void;
}

const Task = ({task, setTasks}: ITaskProps) => {
    const [updating, setUpdating] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const changeCompleted = () => {
        updateTaskRequest({
            ...task,
            isCompleted: !task.isCompleted
        });
    }

    const updateTask = async () => {
        await updateTaskRequest({
            ...task,
            title,
            description
        });
        setUpdating(false);
    }

    const updateTaskRequest = async (task: ITask) => {
        try {
            const newTask = await axios.put<ITask>(`http://localhost:3000/tasks`, task)
                .then(res => res.data);
            setTasks(prev => {
                let index = -1;
                for (let i = 0; i< prev.length; i++) {
                    if (task._id === prev[i]._id) {
                        index = i;
                        break;
                    }
                }
                const newTasks = [...prev];
                newTasks.splice(index, 1, newTask);
                return newTasks;
            });
        } catch (err) {
            console.log(err);
        }
    }

    const deleteTask = () => {
        axios.delete(`http://localhost:3000/tasks/${task._id}`)
            .then(() => setTasks((prev) =>
                prev.filter(t => t._id !== task._id)))
            .catch(err => console.log(err));
    }

    return (
        <div>
            <h4>Title: </h4>
            {updating ?
                <input type='text' id='title' placeholder='Title'
                       value={title} onChange={(e) => setTitle(e.target.value)}/> :
                <p>{task.title}</p>}
            <h4>Description: </h4>
            {updating ?
                <input type='text' id='description' placeholder='Description'
                       value={description} onChange={(e) => setDescription(e.target.value)}/> :
                <p>{task.description}</p>}
            <h4>Completed: </h4>
            <input type='checkbox' checked={task.isCompleted} onChange={changeCompleted}/>
            <button onClick={() => setUpdating(prev => !prev)}>Update</button>
            <button onClick={deleteTask}>Delete</button>
            {updating && <button onClick={updateTask}>Save</button>}
        </div>
    );
}

export default Task;