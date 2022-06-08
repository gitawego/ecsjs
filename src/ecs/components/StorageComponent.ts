import { Component } from '../Component';
import { StorageComponentOptions } from '../model';

export class StorageComponent extends Component<StorageComponentOptions> {
  static override readonly componentName = 'storage';

  override init() {
    this.data = this.data || {
      type: 'session',
    };
    this.data.type ??= 'session';
  }
}
