import {AnyAction} from 'redux';

export interface FailedRequest {
  action: AnyAction;
  error: any;
}

export interface ReDispatchConfig {
  sameAction?: (actionA: AnyAction, actionB: AnyAction) => boolean;
  clearActionFromQueue?: string[] | string;
}
