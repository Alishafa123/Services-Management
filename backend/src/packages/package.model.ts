import { Column, DataType, ForeignKey, BelongsTo, Table, Model } from 'sequelize-typescript';
import { User } from '../users/users.model';

@Table({ tableName: 'packages' })
export class Package extends Model<Package> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column({
    type: DataType.ARRAY(DataType.INTEGER),
    allowNull: false,
  })
  services: number[];

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  price: number;

   @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: number;
}
