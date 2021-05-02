import * as React from 'react';
import GetClose from './getClose';

export const Close = (isShow: boolean) => (isShow ? <GetClose /> : '');
