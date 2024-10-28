import { Match, Switch } from "npm:solid-js";
import { Counter } from "./counter.tsx";
import { TodoMVP } from "./todo.tsx";

export default function Examples(props: { selectedComponent?: string }) {
  return (
    <Switch fallback={<Counter />}>
      <Match when={props.selectedComponent === "Counter"}>
        <Counter />
      </Match>
      <Match when={props.selectedComponent === "Simple Todos"}>
        <TodoMVP />
      </Match>
    </Switch>
  );
}
