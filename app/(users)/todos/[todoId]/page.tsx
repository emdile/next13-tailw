import React from "react"
import { Todo } from "../../../../typings"
import { notFound } from 'next/navigation'

export const dynamicParams = true

type TodoPageProps = {
    params: {
        todoId: string
    }
}

const fetchTodo = async (todoId: string) => {

    // server side rendering prev
    // const todo1: Todo = await
    //     fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {cache: 'no-cache'})
    //         .then(res => res.json())

    // static side rendering
    // const todo2: Todo = await
    //     fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, { cache: 'force-cache' })
    //         .then(res => res.json())

    // ISR rendering in sec
    // const todo3: Todo = await
    //     fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, { next: {revalidate: 60} })
    //         .then(res => res.json())


    // server side rendering
    const todo: Todo = await
        fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, { next: { revalidate: 60 } })
            .then(res => res.json())

    return todo
}

const TodoPage = async ({ params: { todoId } }: TodoPageProps) => {
    const todo = await fetchTodo(todoId)

    if (!todo.id) return notFound()

    return (
        <div>Todo page: {todo.id}</div>
    )
}

export default TodoPage

export const generateStaticParams = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos/')
    const todos: Todo[] = await res.json()
    const Todomin = todos.slice(0, 10)

    return Todomin.map(t => ({
        todoId: t.id.toString()
    }))
}
