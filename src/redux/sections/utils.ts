import {SectionAction} from './action';

export const isSameSectionRequest = (
  actionA: SectionAction,
  actionB: SectionAction,
) => actionA.type === actionB.type && actionA.sectionKey === actionB.sectionKey;
