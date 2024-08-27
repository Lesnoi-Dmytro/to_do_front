interface ITask {
    _id: string;
    title: string;
    description: string;
    isCompleted: boolean;
}

interface ICreateTask {
    title: string;
    description: string;
}

export type {ITask, ICreateTask};