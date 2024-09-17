import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Drawing { 'imageData' : string }
export type Result = { 'ok' : string } |
  { 'err' : string };
export interface _SERVICE {
  'getDrawings' : ActorMethod<[], Array<Drawing>>,
  'saveDrawing' : ActorMethod<[string], Result>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
