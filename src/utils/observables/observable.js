class Observable {
  constructor() {
    this.observers = [];
  }

  subscribe(fn) {
    this.observers.push(fn);
  }

  unsubscibe(fn) {
    this.observers = this.observers.filter((item) => item !== fn);
  }

  broadcast(data) {
    this.observers.forEach((observer) => observer(data));
  }
}
export default Observable;
