import { Like, MoreThan, Repository, In } from 'typeorm';
import { TaskEntity } from '../entities/task.entity';
import { CreateTaskDto, ListTasksDto, UpdateTaskDto } from '../dtos/task.dto';
import { TaskStatus } from '../enums/task-status.enum';

export class TaskService {
    constructor(private taskRepository: Repository<TaskEntity>) {}

    async createTask(dto: CreateTaskDto): Promise<TaskEntity> {
        const task = this.taskRepository.create(dto);
        return this.taskRepository.save(task);
    }

    async listTasks(query: ListTasksDto): Promise<{ tasks: TaskEntity[]; total: number }> {
        const {
            page = 1,
            limit = 10,
            sortBy = 'createdAt',
            sortOrder = 'DESC',
            status,
            title,
            createdAfter,
        } = query;

        const where: any = {};

        if (status) {
            const statuses = status
                .split(',')
                .filter((s) => Object.values(TaskStatus).includes(s as TaskStatus));
            if (statuses.length > 0) {
                where.status = In(statuses);
            }
        }

        if (title) {
            where.title = Like(`%${title}%`);
        }

        if (createdAfter) {
            where.createdAt = MoreThan(new Date(createdAfter));
        }

        const [tasks, total] = await this.taskRepository.findAndCount({
            where,
            order: { [sortBy]: sortOrder },
            skip: (page - 1) * limit,
            take: limit,
        });

        return { tasks, total };
    }

    async getTask(id: number): Promise<TaskEntity | null> {
        return this.taskRepository.findOneBy({ id });
    }

    async updateTask(id: number, dto: UpdateTaskDto): Promise<TaskEntity | null> {
        await this.taskRepository.update(id, dto);
        return this.getTask(id);
    }

    async deleteTask(id: number): Promise<boolean> {
        const result = await this.taskRepository.delete(id);
        return result.affected !== 0;
    }
}
