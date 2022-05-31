import { observable, action, makeAutoObservable } from 'mobx';

export class UserStore {
  @observable name = '';

  constructor() {
    makeAutoObservable(this);
  }
  @action
  setName(name) {
    this.name = name
  }
}


                        