import { HttpModule, Module } from '@nestjs/common';
import { TwitchService } from './twitch.service';

@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: 'TWITCH_SERVICE',
      useClass: TwitchService,
    },
  ],
  exports: [
    {
      provide: 'TWITCH_SERVICE',
      useClass: TwitchService,
    },
  ],
})
export class TwitchModule { }