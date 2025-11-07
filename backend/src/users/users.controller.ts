import { Controller, Get, Post, Body, Query, Delete, Param, Put } from '@nestjs/common';
import { UsersService } from './users.services';
import { User } from './users.model';
import { CreateUserDto } from "./dto/create-user.dto"



@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    async getUsers(@Query('id') id?: string): Promise<User[] | User> {
        return id
            ? this.usersService.getUserById(id)
            : this.usersService.getUsers();
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.createUser(createUserDto);
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string): Promise<void> {
        return this.usersService.deleteUser(id);
    }

    @Put(':id')
    updateUser(
        @Param('id') id: string,
        @Body() updateUserDto: CreateUserDto,
    ): Promise<User> {
        return this.usersService.updateUser(id, updateUserDto);
    }
}
