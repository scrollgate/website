import { HeaderMenuItem } from '@root/interfaces';
import { getDeployPath } from '@root/utils';

import { ChainId } from './chains';

export const WEBSITE_NAME = 'ScrollGate';

export const DEFAULT_STALE_TIME = 5 * 60 * 1000;
export const DEFAULT_CACHE_TIME = 10 * 60 * 1000;
export const DEBOUNCE_TIME = 700;

export const SCROLL_SCAN = 'https://scrollscan.com';
export const SCROLL_ELIGIBILITY = 'https://scroll.io/developer-nft/check-eligibility';
export const TWITTER = 'https://twitter.com/ScrollGate';
export const GITHUB = 'https://github.com/scrollgate';
export const DISCORD = 'https://discord.com/invite/Zx88aEkP';

export enum Language {
  EN = 'en', // English
  VI = 'vi', // Vietnamese
}

export enum CookieKey {
  LANGUAGE = 'language',
}

export enum LocalStorageKey {
  Theme = 'theme',
}

export const PAGE_404_PATH = '/404';

export enum TimeZone {
  VIET_NAM = 7,
  UTC = 0,
}

export enum Message {
  LOGIN_AGAIN = 'message.loginAgain',
  PROCESSING_ERROR = 'message.processingError',
}

export enum DayjsUnit {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  HOURS = 'hours',
  MINUTE = 'minute',
  SECOND = 'second',
}

export enum DateTimeFormat {
  DATE_MONTH = 'MM/DD',
  SLASH_DATE = 'YYYY/MM/DD',
  CROSS_DATE = 'YYYY-MM-DD',
  DATE_TIME = 'MMMM D, YYYY',
  DATE_TIME_NAME = 'MMMM DD, YYYY',
  DATE_TIME_SLASH = 'YYYY/MM/DD HH:mm:ss',
  DATE_HOUR_MINUTE = 'YYYY/MM/DD HH:mm',
  HUMAN_DATE_TIME = 'MMMM D, YYYY h:mm:ss A',
  SLASH_DAY = 'DD/MM/YYYY',
  TIME = 'HH:mm:ss',
  TIME_ZONE = 'ddd, DD MMM YYYY HH:mm:ss [GMT] Z',
}

export enum ColumnType {
  STT = 'stt',
  DATE_TIME = 'dateTime',
  NUMBER = 'number',
  LINK = 'link',
  TAG = 'tag',
  CUSTOMIZE = 'customize',
  AUDIO = 'audio',
  ARRAY_VERTICAL = 'arrayVertical',
  STATUS = 'status',
  ACTION = 'action',
  ROUTER_LINK = 'routerLink',
}

export enum RouteKeys {
  DEPLOY = 'deploy',
  Mint = 'mint',
}

export enum QueryKeys {
  CONTRACT_LIST = 'contractList',
}

export const HEADER_MENU: HeaderMenuItem[] = [
  {
    label: 'Deploy Smart Contract',
    href: getDeployPath(),
    key: RouteKeys.DEPLOY,
  },
  {
    label: 'Interact (Coming soon)',
    href: '',
    key: RouteKeys.Mint,
    disabled: true,
  },
];

export enum SupportChainId {
  Scroll = ChainId.Scroll,
}

export enum TypeContract {
  NFT = 'nft',
  TOKEN = 'token',
  HELLO_SCROLL = 'helloScroll',
}
