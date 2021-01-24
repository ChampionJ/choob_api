
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface IQuery {
    getDiscordUser(): DiscordUser | Promise<DiscordUser>;
    getTwitchUser(): TwitchUser | Promise<TwitchUser>;
    getCommands(): TwitchCustomCommand[] | Promise<TwitchCustomCommand[]>;
}

export interface TwitchCustomCommandInfo {
    _id: string;
    name: string;
    channel: string;
}

export interface TwitchCustomCommand {
    _id: string;
    info: TwitchCustomCommandInfo;
    alias?: string;
    response?: string;
    replyInDM?: boolean;
}

export interface TwitchUser {
    twitchId: string;
    username: string;
    displayName?: string;
}

export interface DiscordUser {
    discordId: string;
    username: string;
    avatar?: string;
    discriminator: string;
    guilds?: Guild[];
}

export interface Guild {
    id: string;
    name: string;
    icon?: string;
    description?: string;
    banner?: string;
    owner_id?: string;
    roles?: Role[];
}

export interface Role {
    id: string;
    name: string;
    permissions: string;
    position: number;
    color: number;
}
