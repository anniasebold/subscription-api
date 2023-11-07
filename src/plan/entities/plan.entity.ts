import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'plans' })
export class PlanEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  constructor(plan?: Partial<PlanEntity>) {
    this.id = plan?.id;
    this.name = plan?.name;
    this.description = plan?.description;
    this.price = plan?.price;
    this.createdAt = plan?.createdAt;
    this.updatedAt = plan?.updatedAt;
    this.deletedAt = plan?.deletedAt;
  }
}
