import { Component ,mount} from "./base";

interface CounterProps {
  initial: number;
}
interface CounterState {
  count: number;
}

class Counter extends Component<CounterProps, CounterState> {
  getInitialState(props: CounterProps): CounterState {
    return { count: props.initial };
  }
  render(): HTMLElement {
    const btn = document.createElement("button");
    btn.textContent = `Count: ${this.state.count}`;
    btn.onclick = () => this.set_state({ count: this.state.count + 1 });
    return btn;
  }

  on_mount(): void {
    console.log("init "+this.state.count);
  }

  on_update(prev: CounterState) {
    console.log("Updated from", prev.count, "to", this.state.count);
  }
}



const app = document.getElementById("app")!;
const counter = new Counter({ initial: 0 });
const unmount = mount(counter, app);
