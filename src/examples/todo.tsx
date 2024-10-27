import { createSignal } from "npm:solid-js";
import { For } from "solid-native-renderer";
import { useColorScheme } from "../hooks/use-color-scheme.ts";

const storageApi = {
  set(key: string, value: string) {
    NSUserDefaults.standardUserDefaults.setObjectForKey(value, key);
  },
  get(key: string) {
    return NSUserDefaults.standardUserDefaults.objectForKey(key);
  },
  remove(key: string) {
    NSUserDefaults.standardUserDefaults.removeObjectForKey(key);
  },
};

type TodoItem = {
  id: number;
  title: string;
  completed: boolean;
};

export function TodoMVP() {
  // Get system color scheme mode
  const colorScheme = useColorScheme();
  const [todos, setTodos] = createSignal<TodoItem[]>(
    JSON.parse(storageApi.get("todos") || "[]")
  );
  const [newTodo, setNewTodo] = createSignal("");
  let textField: HTMLTextFieldElement | null = null;

  function addTodo() {
    setTodos((prev) => {
      const next = [...prev];
      next.push({
        id: next.length + 1,
        title: newTodo(),
        completed: false,
      });
      storageApi.set("todos", JSON.stringify(next));
      setNewTodo("");
      textField?.clear();
      return next;
    });
  }

  return (
    <scroll-view
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <view
        style={{
          width: "100%",
          height: "100%",
          padding: 20,
          alignItems: "center",
          gap: 10,
        }}
      >
        <view
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
            borderWidth: 1,
            borderRadius: 5,
            borderColor:
              colorScheme === "dark" ? "rgb(68, 68, 68)" : "rgb(200, 200, 200)",
            paddingHorizontal: 10,
          }}
        >
          <text-field
            ref={(el: HTMLTextFieldElement) => (textField = el)}
            onTextChange={(event) => setNewTodo(event.value)}
            onSubmit={() => addTodo()}
            placeholder="Create a new todo item"
            style={{
              fontSize: 14,
            }}
          />

          <button
            title="Add"
            onClick={() => addTodo()}
            style={{
              backgroundColor: "#446b9e",
            }}
          />
        </view>


        <view style={{
          width:'100%'
        }}>
          <For
            each={todos()}
            fallback={
              <text
                style={{
                  color: "gray",
                }}
              >
                No todos found
              </text>
            }
          >
            {(item, index) => (
              <view
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor:
                    index() % 2 === 0
                      ? colorScheme === "dark"
                        ? "rgba(0,0,0,0.1)"
                        : "#f7f7f7"
                      : undefined,
                  paddingHorizontal: 10,
                  width: "100%",
                }}
              >
                <view
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <checkbox
                    checked={item.completed}
                    onClick={(event) => {
                      const checkbox = event.target as HTMLCheckboxElement;
                      setTodos((prev) => {
                        const next = [...prev];
                        next[index()] = {
                          ...next[index()],
                          completed: !checkbox.checked,
                        };
                        return next;
                      });
                    }}
                    style={{
                      width: 15,
                      height: 15,
                    }}
                  />
                  <text
                    style={{
                      color: item.completed ? "gray" : undefined,
                      fontSize: 14,
                    }}
                  >
                    {item.title}
                  </text>
                </view>

                <button
                  title="Remove"
                  onClick={() => {
                    setTodos((prev) => {
                      const next = [...prev];
                      next.splice(index(), 1);
                      storageApi.set("todos", JSON.stringify(next));
                      return next;
                    });
                  }}
                />
              </view>
            )}
          </For>
        </view>
      </view>
    </scroll-view>
  );
}
