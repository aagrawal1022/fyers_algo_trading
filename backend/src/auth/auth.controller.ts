import { Body, Controller, Get, Post } from '@nestjs/common';
import { Credentials } from 'src/dto/credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async generateUrl(@Body('appId') appId: string ){
    return await this.authService.generateUrl(appId);
  }

  @Post('/token')
  async generateToken(@Body() credentials:Credentials){
    return await this.authService.generateToken(credentials);
  }
  @Post('/profile')
  async getProfile(@Body() credentials:Credentials){
    return await this.authService.getProfile(credentials);
  }
  @Post('/funds')
  async getFunds(@Body() credentials:Credentials){
    return await this.authService.getFunds(credentials);
  }
  @Post('/holdings')
  async getHoldings(@Body() credentials:Credentials){
    return await this.authService.getHoldings(credentials);
  }
}
