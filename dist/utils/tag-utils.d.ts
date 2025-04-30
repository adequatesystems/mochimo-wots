import { ByteArray } from '../types';
export declare function addrTagToBase58(addrTag: ByteArray): string | null;
export declare function validateBase58Tag(tag: string): boolean;
export declare function base58ToAddrTag(tag: string): ByteArray | null;
