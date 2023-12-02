import { Injectable, NotFoundException, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcryptjs'
import { GetUserDto } from './dto/get-User.dto';
@Injectable()
export class UsersService {
    constructor(private readonly usersRepository:UsersRepository) {
    }
    async create(createUserDto:CreateUserDto){
        await this.validateCreateUserDto(createUserDto)
        return this.usersRepository.create({...createUserDto,password:await bcrypt.hash(createUserDto.password,10)})
    }
    private async validateCreateUserDto(createUserDto: CreateUserDto) {
        try {
            await this.usersRepository.findOne({email:createUserDto.email})
        } catch (error) {
            console.log(error)
            return;
        }
        throw new UnprocessableEntityException('Email already exists')
    }
    async verifyUser(email:string,password:string){
        const user = await this.usersRepository.findOne({email})
        if (user) {
            const passwordIsValid = await bcrypt.compare(password,user.password)
            if (!passwordIsValid) {
                throw new UnauthorizedException('Credential are not valid.')
            }
            return user;
        }else{
            throw new NotFoundException('User Not Found.')
        }
    }
    async getUser(getUserDto:GetUserDto){
        return await this.usersRepository.findOne(getUserDto)
    }
}
