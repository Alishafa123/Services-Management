import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from '../users/users.model';

@Table({
  tableName: 'profiles',
  timestamps: true,
})
export class Profile extends Model<Profile> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  dob: Date;

  @BelongsTo(() => User)
  user: User;
}
