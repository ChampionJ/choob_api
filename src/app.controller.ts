// import { Controller, Get, Post, Req, Res } from '@nestjs/common';
// import { Request, Response } from 'express';
// import { AppService } from './app.service';

// @Controller('api')
// export class AppController {
//   constructor(private readonly appService: AppService) { }

//   @Get()
//   getHello(): string {
//     return this.appService.getHello();
//   }

//   @Post('user')
//   createuser(@Req() req: Request, @Res() res: Response) {
//     console.log(req.body);
//     const user = this.appService.createUser();
//     res.send({ user })
//   }
// }
