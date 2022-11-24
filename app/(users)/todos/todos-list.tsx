import Link from "next/link";
import React from "react"
import { Todo } from "../../../typings";

type TodosListProps = {
    children?: React.ReactNode;
}

const fetchTodos = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos/')
    const todos: Todo[] = await res.json()

    return todos
}

const TodosList = async () => {

    const todos = await fetchTodos()

    return (
        <>
            {todos.map(t => (
                <p key={t.id}><Link href={`/todos/${t.id}`}>Todo: {t.id}</Link></p>
            ))}
        </>
    )
}

export default TodosList
