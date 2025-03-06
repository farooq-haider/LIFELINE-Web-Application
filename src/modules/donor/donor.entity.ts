import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn,
    UpdateDateColumn, DeleteDateColumn
} from 'typeorm';

@Entity()
export default class Donor extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @Column()
    bloodGroup!: string;

    @Column()
    phone!: string;

    @Column()
    address!: string;

    @Column()
    city!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt?: Date;
}