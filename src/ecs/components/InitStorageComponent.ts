import { Component } from '../Component';
import { StorageComponentOptions } from '../model';

export class InitStorageComponent extends Component<StorageComponentOptions> {
  static override readonly componentName = 'initStorage';

  override init() {
    this.data = this.data || {
      type: 'session',
    };
    this.data.type ??= 'session';
  }
}
