import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  async getUsers(): Promise<User[]> {
    return await User.findAll<User>();
  }

  async getUserById(id: string): Promise<User> {
    const user = await User.findByPk<User>(id, { include: { all: true } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return await User.create<User>({
      name: createUserDto.name,
      email: createUserDto.email,
      password: createUserDto.password,
    } as User);
  }

  async deleteUser(id: string): Promise<void> {
    const deleted = await User.destroy<User>({ where: { id } });
    if (!deleted) {
      throw new NotFoundException('User not found');
    }
  }

  async updateUser(id: string, updateUserDto: CreateUserDto): Promise<User> {
    const user = await User.findByPk<User>(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return await user.update({
      name: updateUserDto.name,
      email: updateUserDto.email,
      password: updateUserDto.password,
    });
  }
}
