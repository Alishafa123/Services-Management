import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Service } from "../services/service.model"

@Table
export class User extends Model<User> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,

    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,

    })
    password: string;

    @HasMany(() => Service)
    services: Service[];

}
