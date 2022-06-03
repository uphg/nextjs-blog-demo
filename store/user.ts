import { observable, action, makeAutoObservable } from 'mobx';

export class UserStore {
  @observable name = null;
  @observable id = null;

  constructor() {
    makeAutoObservable(this);
  }
  @action
  setName(name) {
    this.name = name
  }
  @action
  setId(id) {
    this.id = id
  }
}


                        