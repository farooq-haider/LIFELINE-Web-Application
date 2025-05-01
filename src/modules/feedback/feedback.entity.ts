import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity()
export default class Feedback extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("float")
  rating!: number;

  @Column({ unique: true })
  content!: string;

  @Column()
  userId!: number;

  @Column()
  userType!: "DONOR" | "RECIPIENT";

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
