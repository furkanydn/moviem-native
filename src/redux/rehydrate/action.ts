import * as rehydConst from './constants';

export const afterRehyd = () => <const>{type: rehydConst.AFTER_REHYDRATE};

export type AfterRehydrate = ReturnType<typeof afterRehyd>;

export type Rehydrates = AfterRehydrate;
