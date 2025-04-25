import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from "typeorm";
import DonationHistory from "../donationHistory/donationHistory.entity";

@Entity()
export default class Donor extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({
    type: "enum",
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  })
  bloodGroup!: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";

  @Column({ nullable: true })
  lastDonation!: Date;

  @Column()
  phone!: string;

  @Column()
  address!: string;

  @Column()
  city!: string;

  @Column()
  isActive!: boolean;

  @Column()
  verified!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany(() => DonationHistory, (history) => history.donor_id)
  donationHistory!: DonationHistory[];
}
