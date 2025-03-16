import { IsString, IsOptional, IsEnum, Length, IsDateString, IsInt, Min } from 'class-validator';
import { TaskStatus } from '../enums/task-status.enum';
import { TaskEntity } from '../entities/task.entity';

export class CreateTaskDto {
    @IsString()
    @Length(1, 255)
    title!: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsEnum(TaskStatus)
    @IsOptional()
    status?: TaskStatus;
}

export class UpdateTaskDto {
    @IsString()
    @Length(1, 255)
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsEnum(TaskStatus)
    @IsOptional()
    status?: TaskStatus;
}

export class ListTasksDto {
    @IsInt()
    @Min(1)
    @IsOptional()
    page?: number = 1;

    @IsInt()
    @Min(1)
    @IsOptional()
    limit?: number = 10;

    @IsString()
    @IsOptional()
    sortBy?: string = 'createdAt';

    @IsString()
    @IsOptional()
    sortOrder?: 'ASC' | 'DESC' = 'DESC';

    @IsString()
    @IsOptional()
    status?: string;

    @IsString()
    @IsOptional()
    title?: string;

    @IsDateString()
    @IsOptional()
    createdAfter?: string;
}

export type ListTasksResponseDto = {
    tasks: TaskEntity[];
    total: number;
};
