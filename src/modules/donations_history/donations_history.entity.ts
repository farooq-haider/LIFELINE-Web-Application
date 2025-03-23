import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  DeleteDateColumn,
  JoinColumn,
} from "typeorm";
import Donor from "../donor/donor.entity";

@Entity()
export default class DonationHistory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Donor)
  @JoinColumn({ name: "donor_id" })
  donor!: Donor;

  @Column()
  description!: string;
}
