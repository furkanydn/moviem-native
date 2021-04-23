import {Store} from 'redux';
import {RootState, RootAction} from './type';

// storeService, React Component ve Redux Saga dışındaki eylemleri gönderirken döngüsel bağımlılıktan kaçınmak için kullanılır.
let _store: Store<RootState, RootAction>;

const setStoreServiceRef = (storeRef: Store<RootState, RootAction>) => {
  _store = storeRef;
};

const getState = () => _store.getState();

const dispatch = (action: RootAction) => {
  _store.dispatch(action);
};

// Oluşturulan Bileşenlerin Dışarıya Aktarılması
export default {setStoreServiceRef, getState, dispatch};
