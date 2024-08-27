import {ITask} from "../interfaces/tasks.interfaces.ts";
import {SetStateAction, useState} from "react";
import axios from "axios";

interface ITaskProps {
    task: ITask;
    setTasks: (val: SetStateAction<ITask[]>) => void;
}

const Task = ({task, setTasks}: ITaskProps) => {
    const [updating, setUpdating] = useState<boolean>(false);

    const changeCompleted = () => {
        updateTaskRequest({
            ...task,
            isCompleted: !task.isCompleted
        });
    }

    const updateTaskRequest = async (task: ITask) => {
        try {
            const newTask = await axios.put<ITask>(`http://localhost:3000/tasks`, task)
                .then(res => res.data);
            setTasks(prev => {
                const index = prev.indexOf(task);
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
            <p>{task.title}</p>
            <h4>Description: </h4>
            <p>{task.description}</p>
            <h4>Completed: </h4>
            <input type='checkbox' checked={task.isCompleted} onChange={changeCompleted}/>
            <button onClick={() => setUpdating(prev => !prev)}>Update</button>
            <button onClick={deleteTask}>Delete</button>
            {updating && <button >Save</button>}
        </div>
    );
}

export default Task;