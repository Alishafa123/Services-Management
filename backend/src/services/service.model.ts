import { Column, DataType, ForeignKey, BelongsTo, Model, Table } from 'sequelize-typescript';
import { User } from '../users/users.model';  // adjust path if different

export enum ServiceType {
  ONSITE = 'onsite',
  OFFSITE = 'offsite',
}

@Table
export class Service extends Model<Service> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.ENUM(...Object.values(ServiceType)),
    allowNull: false,
  })
  type: ServiceType;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  price: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
