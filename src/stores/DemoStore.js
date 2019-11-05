import { decorate, observable, action } from "mobx";

class DemoStore {
  constructor() {
    this.count = 1;
    this.date = new Date();
  }

  get getMonths() {
    return new Date(this.date).getMonth();
  }

  get getDate() {
    return this.date.toDateString();
  }

  addCount() {
    this.count = ++this.count;
  }
}

decorate(DemoStore, {
  count: observable,
  date: observable,
  addCount: action
  //getMonths: computed
});

export default DemoStore;
