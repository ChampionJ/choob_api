
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface IQuery {
    getUser(): User | Promise<User>;
    getDiscordUser(): DiscordUser | Promise<DiscordUser>;
    getTwitchUser(): TwitchUser | Promise<TwitchUser>;
    getTwitchUserById(id: string): TwitchUser | Promise<TwitchUser>;
    getCommands(): TwitchCustomCommand[] | Promise<TwitchCustomCommand[]>;
    getTest(): string | Promise<string>;
}

export interface TwitchCustomCommand {
    _id: string;
    name: string;
    channelId: string;
    channelName: string;
    alias?: string;
    response?: string;
    replyInDM?: boolean;
}

export interface User {
    authType: string;
    identifier: string;
    username: string;
    roles?: string[];
}

export interface TwitchUser {
    authType: string;
    identifier: string;
    username: string;
    roles?: string[];
    displayName?: string;
    editorInChannels?: TCSEditor[];
}

export interface TCSEditor {
    channelId: string;
    userId: string;
    permissionGroup: string;
}

export interface DiscordUser {
    authType: string;
    identifier: string;
    username: string;
    roles?: string[];
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
