import React from "react";
import TodoAdd from "./TodoAdd";
import TodoList from "./TodoList";
import scss from "./Tasks.module.scss";

const Tasks = () => {
    return (
        <div className={scss.Tasks}>
            <TodoAdd />
            <TodoList />
        </div>
    );
};

export default Tasks;
