import { LocalStorage } from './LocalStorage';

export class SessionStorage extends LocalStorage {
  override storage = sessionStorage;
}
