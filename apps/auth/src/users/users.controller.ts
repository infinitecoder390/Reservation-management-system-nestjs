import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UsersService } from './users.service';
import { CurrentUser } from '@app/common';
import { UsersDocument } from './models/users.schema';
import { JWTAuthGuard } from '../guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    console.log("createUserDto",createUserDto)
    return this.usersService.create(createUserDto);
  }
  @Get()
  @UseGuards(JWTAuthGuard)
  async getUser(@CurrentUser() user: UsersDocument) {
    return user;
  }
}
