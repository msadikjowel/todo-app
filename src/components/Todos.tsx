import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { ITodos } from './Interfaces'
import TodoTask from './TodoTask';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const getLocalItems = () => {
    let list = localStorage.getItem('Todos');
    console.log(list)
    if (list) {
        return JSON.parse(localStorage.getItem('Todos') || '')
    }
    else {
        return [];
    }
}

const Todos: FC = () => {

    const [task, setTask] = useState<string>('');
    const [todo, setTodo] = useState<ITodos[]>(getLocalItems());

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setTask(event.target.value);
    }

    const addTodo = (): void => {
        const newTask = { taskName: task }
        setTodo([...todo, newTask]);
        setTask('')
    }

    const handleDelete = (taskDelete: string): void => {
        setTodo(todo.filter((task) => {
            return task.taskName != taskDelete;
        }))
    }

    useEffect(() => {
        localStorage.setItem('Todos', JSON.stringify(todo));
    }, [todo])

    return (
        <>
            <Box className='header'>
                <Box>
                    <h2>Todo App</h2>
                </Box>

                <TextField
                    id="standard-basic"
                    label="Write Todo"
                    variant="standard"
                    type="text"
                    value={task}
                    onChange={handleChange} /> <br />
                <Button
                    onClick={addTodo}
                >Add Todo</Button>
            </Box>

            <Box>
                {
                    todo.map((task: ITodos, index) => {
                        return <TodoTask key={index} task={task} handleDelete={handleDelete} />
                    })
                }
            </Box>

        </>
    );
}

export default Todos;












// import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react';


// interface ITodos {
//     id: number;
//     text: string;
// }

// const getLocalItems = () => {
//     let list = localStorage.getItem('Todos');
//     console.log(list)
//     if (list) {
//         return JSON.parse(localStorage.getItem('Todos') || '')
//     }
// }

// const Todos = () => {

//     type ActionType =
//         | { type: "ADD"; text: string }
//         | { type: "REMOVE"; id: number };


//     const [todos, dispatch] = useReducer((state: ITodos[], action: ActionType) => {

//         switch (action.type) {
//             case "ADD":
//                 return [
//                     ...state,
//                     {
//                         id: state.length,
//                         text: action.text,
//                     },
//                     getLocalItems()
//                 ];
//             case "REMOVE":
//                 return state.filter(({ id }) => id !== action.id);
//         }
//     }, []);

//     useEffect(() => {
//         localStorage.setItem('Todos', JSON.stringify(todos));
//     }, [todos])

//     const newTodoRef = useRef<HTMLInputElement>(null);

//     const onAddTodo = useCallback(() => {
//         if (newTodoRef.current) {
//             dispatch({
//                 type: "ADD",
//                 text: newTodoRef.current.value,
//             });
//             newTodoRef.current.value = "";
//         }
//     }, []);

//     return (
//         <div>

//             <h1>Todo App</h1>

//             <input type="text" placeholder='Write todo ....' ref={newTodoRef} />
//             <button onClick={onAddTodo}>Add</button>
//             {todos.map((todo) => (
//                 <div key={todo.id}>
//                     {todo.text}
//                     <button onClick={() => dispatch({ type: "REMOVE", id: todo.id })}>
//                         X
//                     </button>
//                 </div>
//             ))}



//         </div>
//     );
// };

// export default Todos;