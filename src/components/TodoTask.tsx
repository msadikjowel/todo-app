import React from 'react';
import { ITodos } from './Interfaces';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

interface Props {
    task: ITodos;
    handleDelete(taskDelete: string): void

}

const TodoTask = ({ task, handleDelete }: Props) => {
    return (
        <Box className='todoContent'>
            <Box>
                <span className='todo'>{task.taskName}

                    <Button onClick={() => { handleDelete(task.taskName) }} title="Delete Todo">X</Button>
                </span>
            </Box>
        </Box>
    );
}

export default TodoTask;
