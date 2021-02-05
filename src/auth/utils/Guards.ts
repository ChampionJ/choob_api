import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { AuthType } from 'src/structures/interfaces/IUser';

@Injectable()
export class DiscordAuthGuard extends AuthGuard('discord') {
  async canActivate(context: ExecutionContext) {
    const activate = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    await super.logIn(request);
    return activate;
  }
}

@Injectable()
export class TwitchAuthGuard extends AuthGuard('twitch') {
  async canActivate(context: ExecutionContext) {
    const activate = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    await super.logIn(request);
    return activate;
  }
}

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    return req.isAuthenticated();
  }
}

@Injectable()
export class GraphQLAuthGuard implements CanActivate {

  canActivate(context: ExecutionContext) {
    console.log("checkign guard");
    const ctx = GqlExecutionContext.create(context);
    console.log("checkign guard 2");
    return ctx.getContext().req.user;
  }
}

@Injectable()
export class GraphQLTwitchAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    if (ctx.getContext().req.user) {
      if (ctx.getContext().req.user.authType === AuthType.TwitchUser) {
        return ctx.getContext().req.user;
      }
    }
    return false;
  }
}

@Injectable()
export class GraphQLDiscordAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user?.authType === AuthType.DiscordUser ?? false;
  }
}