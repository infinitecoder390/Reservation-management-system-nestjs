import { Injectable } from '@nestjs/common';
import { UsersDocument } from './users/models/users.schema';
import {Response} from 'express'
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './interfaces/token-payload.interface';
@Injectable()
export class AuthService {
  constructor(private readonly configService:ConfigService,private readonly jwtService:JwtService){}
  async login(user:UsersDocument,response:Response){
    const tokenPayload :TokenPayload= {
      userId:user._id.toHexString()
    }
    const expries = new Date()
    expries.setSeconds(
      expries.getSeconds() + this.configService.get('JWT_EXPIRATION')
    ) 
    const token = this.jwtService.sign(tokenPayload)
    response.cookie('Authentication',token,
      {
        httpOnly:true,
        expires:expries
      }
    )
  }

  getHello(): string {
    return 'Hello World!';
  }
}
