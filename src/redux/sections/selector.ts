import {createSelector} from 'reselect';
import {RootState} from '../type';
import {SectionKeys} from './type';

export const sectionStateSelect = (state: RootState) => state.sections;
export const getSectionSelectByKey = (sectionKey: SectionKeys) =>
  createSelector(sectionStateSelect, sections => sections[sectionKey]);
