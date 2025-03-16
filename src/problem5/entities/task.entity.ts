import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { IsEnum } from 'class-validator';
import { TaskStatus } from '../enums/task-status.enum';

@Entity('tasks')
export class TaskEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 255 })
    title!: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ type: 'varchar', enum: TaskStatus, default: TaskStatus.PENDING })
    @IsEnum(TaskStatus)
    status!: TaskStatus;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
