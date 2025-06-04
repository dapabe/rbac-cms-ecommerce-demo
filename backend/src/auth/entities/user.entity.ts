import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '@mono/shared';

@Entity()
export class EntityUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({
    type: 'simple-enum',
    enum: UserRole,
    default: UserRole.GUEST,
  })
  role: UserRole;

  @Column({ default: true })
  isActive: boolean;
}
