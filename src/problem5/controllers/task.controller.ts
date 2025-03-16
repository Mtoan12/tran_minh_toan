import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { TaskService } from '../services/task.service';
import { CreateTaskDto, ListTasksDto, UpdateTaskDto } from '../dtos/task.dto';
import { AppDataSource } from '../configs/database';

const taskService = new TaskService(AppDataSource.getRepository('TaskEntity'));

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dto = Object.assign(new CreateTaskDto(), req.body);
        const errors = await validate(dto);
        if (errors.length > 0) {
            throw errors;
        }

        const task = await taskService.createTask(dto);
        res.status(201).json(task);
    } catch (err) {
        next(err);
    }
};

export const listTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dto = Object.assign(new ListTasksDto(), req.query);
        dto.page = dto.page ? parseInt(dto.page as any, 10) : 1;
        dto.limit = dto.limit ? parseInt(dto.limit as any, 10) : 10;

        const errors = await validate(dto);
        if (errors.length > 0) {
            throw errors;
        }

        const { tasks, total } = await taskService.listTasks(dto);
        res.json({
            tasks,
            total,
            page: dto.page,
            limit: dto.limit,
            totalPages: Math.ceil(total / dto.limit),
        });
    } catch (err) {
        next(err);
    }
};

export const getTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            throw {
                status: 400,
                message: 'Invalid ID',
            };
        }
        const task = await taskService.getTask(id);
        if (!task) {
            throw {
                status: 404,
                message: 'Task not found',
            };
        }
        res.json(task);
    } catch (err) {
        next(err);
    }
};

export const updateTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            throw {
                status: 400,
                message: 'Invalid ID',
            };
        }
        const dto = Object.assign(new UpdateTaskDto(), req.body);
        const errors = await validate(dto);
        if (errors.length > 0) {
            throw errors;
        }

        const task = await taskService.updateTask(id, dto);
        if (!task) {
            throw {
                status: 404,
                message: 'Task not found',
            };
        }
        res.json(task);
    } catch (err) {
        next(err);
    }
};

export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            throw {
                status: 400,
                message: 'Invalid ID',
            };
        }
        const deleted = await taskService.deleteTask(id);
        if (!deleted) {
            throw {
                status: 404,
                message: 'Task not found',
            };
        }
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};
