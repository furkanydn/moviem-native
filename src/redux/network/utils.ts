import {AnyAction} from 'redux';

export const isSameActionByType = (
  actionOne: AnyAction,
  actionTwo: AnyAction,
) => actionOne.type === actionTwo.type;
