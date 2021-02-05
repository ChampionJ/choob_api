import { Types, Document } from 'mongoose';

export enum TwitchChannelSettingId {
  //* Event Messages
  EVENT_GIFT_SUB_OPTIONS = 'tcs_event_gift_sub_options',
  EVENT_GIFT_SUB_LISTENING = 'tcs_event_gift_sub_listening',

  EVENT_COMMUNITY_SUB_LISTENING = 'twitch_channel_setting_EVENT_COMMUNITY_SUB_LISTENING',
  EVENT_COMMUNITY_SUB_OPTIONS = 'twitch_channel_setting_EVENT_COMMUNITY_SUB_OPTIONS',

  EVENT_ANONYMOUS_GIFT_SUB_LISTENING = 'twitch_channel_setting_EVENT_ANONYMOUS_GIFT_SUB_LISTENING',
  EVENT_ANONYMOUS_GIFT_SUB_OPTIONS = 'twitch_channel_setting_EVENT_ANONYMOUS_GIFT_SUB_OPTIONS',

  EVENT_ANONYMOUS_GIFT_SUBS_LISTENING = 'twitch_channel_setting_EVENT_ANONYMOUS_GIFT_SUBS_LISTENING',
  EVENT_ANONYMOUS_GIFT_SUBS_OPTIONS = 'twitch_channel_setting_EVENT_ANONYMOUS_GIFT_SUBS_OPTIONS',

  EVENT_JOIN_LISTENING = 'twitch_channel_setting_EVENT_JOIN_LISTENING',
  EVENT_JOIN_OPTIONS = 'twitch_channel_setting_EVENT_JOIN_OPTIONS',

  EVENT_NEW_FOLLOWER_LISTENING = 'twitch_channel_setting_EVENT_NEW_FOLLOWER_LISTENING',
  EVENT_NEW_FOLLOWER_OPTIONS = 'twitch_channel_setting_EVENT_NEW_FOLLOWER_OPTIONS',

  EVENT_RESUB_LISTENING = 'tcs_event_resub_listening',
  EVENT_RESUB_OPTIONS = 'twitch_channel_setting_EVENT_RESUB_OPTIONS',

  EVENT_COMMUNITY_PAY_FORWARD_LISTENING = 'twitch_channel_setting_EVENT_COMMUNITY_PAY_FORWARD_LISTENING',
  EVENT_COMMUNITY_PAY_FORWARD_OPTIONS = 'twitch_channel_setting_EVENT_COMMUNITY_PAY_FORWARD_OPTIONS',

  EVENT_GIFT_PAID_UPGRADE_LISTENING = 'twitch_channel_setting_EVENT_GIFT_PAID_UPGRADE_LISTENING',
  EVENT_GIFT_PAID_UPGRADE_OPTIONS = 'twitch_channel_setting_EVENT_GIFT_PAID_UPGRADE_OPTIONS',

  EVENT_PRIME_PAID_UPGRADE_LISTENING = 'twitch_channel_setting_EVENT_PRIME_PAID_UPGRADE_LISTENING',
  EVENT_PRIME_PAID_UPGRADE_OPTIONS = 'twitch_channel_setting_EVENT_PRIME_PAID_UPGRADE_OPTIONS',

  EVENT_STANDARD_PAY_FORWARD_LISTENING = 'twitch_channel_setting_EVENT_STANDARD_PAY_FORWARD_LISTENING',
  EVENT_STANDARD_PAY_FORWARD_OPTIONS = 'twitch_channel_setting_EVENT_STANDARD_PAY_FORWARD_OPTIONS',

  EVENT_BITS_LISTENING = 'twitch_channel_setting_EVENT_BITS_LISTENING',
  EVENT_BITS_OPTIONS = 'twitch_channel_setting_EVENT_BITS_OPTIONS',

  EVENT_RAID_LISTENING = 'twitch_channel_setting_EVENT_RAID_LISTENING',
  EVENT_RAID_OPTIONS = 'twitch_channel_setting_EVENT_RAID_OPTIONS',

  EVENT_HOST_LISTENING = 'twitch_channel_setting_EVENT_HOST_LISTENING',
  EVENT_HOST_OPTIONS = 'twitch_channel_setting_EVENT_HOST_OPTIONS',
  //* 


};

export enum TwitchChannelSettingCategory {
  CHANNEL_CONFIG = 'CHANNEL_CONFIG',
  EDITOR_PERMISSION_GROUPS = 'EDITOR_PERMISSION_GROUPS',
  EDITORS = 'EDITORS',
  COMMANDS = 'COMMANDS',
  EVENT_MESSAGES = 'EVENT_MESSAGES',
  MISC = 'MISC'
};

export enum TwitchChannelEditorPermissions {
  //* Channel Config
  TOGGLE_BOT = 'TOGGLE_BOT',
  CHANGE_PREFIX = 'CHANGE_PREFIX',
  COLOR_ALL_RESPONSES = 'COLOR_ALL_RESPONSES',

  //* Editor Permission Groups
  VIEW_EDITOR_PERMISSION_GROUPS = 'VIEW_EDITOR_PERMISSION_GROUPS',
  EDIT_EDITOR_PERMISSION_GROUPS = 'EDIT_EDITOR_PERMISSION_GROUPS',
  ADD_EDITOR_PERMISSION_GROUPS = 'ADD_EDITOR_PERMISSION_GROUPS',
  REMOVE_EDITOR_PERMISSION_GROUPS = 'REMOVE_EDITOR_PERMISSION_GROUPS',

  //* Editors
  VIEW_EDITORS = 'VIEW_EDITORS',
  SET_PERMISSION_GROUP_FOR_ANY_EDITOR = 'SET_PERMISSION_GROUP_FOR_ANY_EDITOR',
  ADD_EDITORS = 'ADD_EDITORS',
  REMOVE_EDITORS = 'REMOVE_EDITORS',
  SET_PERMISSION_GROUP_OF_LOWER_RANKED_EDITORS = 'SET_PERMISSION_GROUP_OF_LOWER_RANKED_EDITORS',

  //* Commands
  VIEW_COMMANDS = 'VIEW_COMMANDS',
  EDIT_EXISTING_COMMANDS = 'EDIT_EXISTING_COMMANDS',
  ADD_COMMANDS = 'ADD_COMMANDS',
  REMOVE_COMMANDS = 'REMOVE_COMMANDS',

  //! Probably not needed, since we treat aliases as full commands
  VIEW_ALIASES = 'VIEW_ALIASES',
  EDIT_EXISTING_ALIASES = 'EDIT_EXISTING_ALIASES',
  ADD_ALIASES = 'ADD_ALIASES',
  REMOVE_ALIASES = 'REMOVE_ALIASES',

  //* Event Messages
  TOGGLE_EVENT_MESSAGES = 'TOGGLE_EVENT_MESSAGES',
};

/**
 * This is the data that relates to each setting
 * There should only be one of these in the database per-setting
 * Only ADMINS should be able to modify this data
 * 
 * Likely un-used in bot applications
 * 
 * @export
 * @interface TwitchChannelSettingData
 */
export interface TwitchChannelSettingBaseData {
  //* Unique + Required Properties
  settingPropertyId: TwitchChannelSettingId; //this is the collection/schema

  //* Required Properties
  settingCategory: TwitchChannelSettingCategory;
  name: string;
  description: string;
}

export interface TwitchChannelSettingBase {
  //* Unique + Required Properties
  _id: Types.ObjectId;
  channelId: string;

  //! Use channelId instead, this is for ease of debugging. Will be removed
  channelName?: string;
}


export interface EVENT_GIFT_SUB_OPTIONS extends TwitchChannelSettingBase {
  //* Required Properties
  minimumNumOfSubs: number;
}
export interface EVENT_GIFT_SUB_LISTENING extends TwitchChannelSettingBase {
  //* Required Properties
  isListening: boolean;
}
export interface EVENT_RESUB_LISTENING extends TwitchChannelSettingBase {
  //* Required Properties
  isListening: boolean;
}

export interface CHANNEL_PERMISSION_GROUPS extends TwitchChannelSettingBase {
  //* Required Properties
  groups: TwitchChannelPermissionGroup[]; //Handling this as an array since we care about the order
}
export interface TwitchChannelPermissionGroup {
  //* Required and Unique Properties
  _id: Types.ObjectId;

  //* Required Properties
  name: string;
  permissions: TwitchChannelEditorPermissions[]
}

export interface TwitchChannelEditors extends TwitchChannelSettingBase {
  //* Required Properties
  userId: string;
  permissionGroup: Types.ObjectId;
}



//* These are all un-used
export interface EVENT_COMMUNITY_SUB_LISTENING extends TwitchChannelSettingBase { }
export interface EVENT_COMMUNITY_SUB_OPTIONS extends TwitchChannelSettingBase { }
export interface EVENT_ANONYMOUS_GIFT_SUB_LISTENING extends TwitchChannelSettingBase { }
export interface EVENT_ANONYMOUS_GIFT_SUB_OPTIONS extends TwitchChannelSettingBase { }
export interface EVENT_ANONYMOUS_GIFT_SUBS_LISTENING extends TwitchChannelSettingBase { }
export interface EVENT_ANONYMOUS_GIFT_SUBS_OPTIONS extends TwitchChannelSettingBase { }
export interface EVENT_JOIN_LISTENING extends TwitchChannelSettingBase { }
export interface EVENT_JOIN_OPTIONS extends TwitchChannelSettingBase { }
export interface EVENT_NEW_FOLLOWER_LISTENING extends TwitchChannelSettingBase { }
export interface EVENT_NEW_FOLLOWER_OPTIONS extends TwitchChannelSettingBase { }
export interface EVENT_RESUB_OPTIONS extends TwitchChannelSettingBase { }
export interface EVENT_COMMUNITY_PAY_FORWARD_LISTENING extends TwitchChannelSettingBase { }
export interface EVENT_COMMUNITY_PAY_FORWARD_OPTIONS extends TwitchChannelSettingBase { }
export interface EVENT_GIFT_PAID_UPGRADE_LISTENING extends TwitchChannelSettingBase { }
export interface EVENT_GIFT_PAID_UPGRADE_OPTIONS extends TwitchChannelSettingBase { }
export interface EVENT_PRIME_PAID_UPGRADE_LISTENING extends TwitchChannelSettingBase { }
export interface EVENT_PRIME_PAID_UPGRADE_OPTIONS extends TwitchChannelSettingBase { }
export interface EVENT_STANDARD_PAY_FORWARD_LISTENING extends TwitchChannelSettingBase { }
export interface EVENT_STANDARD_PAY_FORWARD_OPTIONS extends TwitchChannelSettingBase { }
export interface EVENT_BITS_LISTENING extends TwitchChannelSettingBase { }
export interface EVENT_BITS_OPTIONS extends TwitchChannelSettingBase { }
export interface EVENT_RAID_LISTENING extends TwitchChannelSettingBase { }
export interface EVENT_RAID_OPTIONS extends TwitchChannelSettingBase { }
export interface EVENT_HOST_LISTENING extends TwitchChannelSettingBase { }
export interface EVENT_HOST_OPTIONS extends TwitchChannelSettingBase { }
