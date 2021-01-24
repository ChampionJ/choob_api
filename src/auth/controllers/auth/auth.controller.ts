import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthenticatedGuard, DiscordAuthGuard, TwitchAuthGuard } from 'src/auth/utils/Guards';

@Controller('auth')
export class AuthController {
  /**
   * GET /api/auth/login
   * This is the route the user will visit to authenticate
   */
  @Get('login/discord')
  @UseGuards(DiscordAuthGuard)
  loginDiscord() {
    return;
  }

  /**
   * GET /api/auth/redirect
   * This is the redirect URL the OAuth2 Provider will call.
   */
  @Get('redirect/discord')
  @UseGuards(DiscordAuthGuard)
  redirectDiscord(@Res() res: Response) {
    res.redirect('http://localhost:3000/dashboard');
  }

  /**
   * GET /api/auth/login
   * This is the route the user will visit to authenticate
   */
  @Get('login/twitch')
  @UseGuards(TwitchAuthGuard)
  loginTwitch() {
    return;
  }

  /**
   * GET /api/auth/redirect
   * This is the redirect URL the OAuth2 Provider will call.
   */
  @Get('redirect/twitch')
  @UseGuards(TwitchAuthGuard)
  redirectTwitch(@Res() res: Response) {
    res.redirect('http://localhost:3000/dashboard');
  }

  /**
   * GET /api/auth/status
   * Retrieve the auth status
   */
  @Get('status')
  @UseGuards(AuthenticatedGuard)
  status(@Req() req: Request) {
    return req.user;
  }

  /**
   * GET /api/auth/logout
   * Logging the user out
   */
  @Get('logout')
  @UseGuards(AuthenticatedGuard)
  logout(@Req() req: Request) {
    req.logOut();
  }
}