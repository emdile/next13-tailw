import React from "react"
import TodosList from "./todos-list";

type TodosProps = {
    children?: React.ReactNode;
}

const Todos = ({ children }: TodosProps) => {
    return (
        <h1>This is where the TODOS will be listed...</h1>
    )
}

export default Todos
