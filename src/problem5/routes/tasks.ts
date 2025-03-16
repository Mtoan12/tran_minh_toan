import { Router } from 'express';
import {
    createTask,
    deleteTask,
    getTask,
    listTasks,
    updateTask,
} from '../controllers/task.controller';

const router = Router();

router.post('/', createTask);
router.get('/', listTasks);
router.get('/:id', getTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
