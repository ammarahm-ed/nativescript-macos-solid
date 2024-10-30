import { For } from "npm:solid-js";
import Button from "./components/button.tsx";
import Checkbox from "./components/checkbox.tsx";
import ColorDialog from "./components/color-picker.tsx";
import ComboBox from "./components/combobox.tsx";
import FileDialog from "./components/file-dialog.tsx";
import Image from "./components/image.tsx";
import Modal from "./components/modal.tsx";
import Popover from "./components/popover.tsx";
import Progress from "./components/progress.tsx";
import RadioButton from "./components/radio-button.tsx";
import SaveFile from "./components/save-file.tsx";
import Slider from "./components/slider.tsx";
import TextField from "./components/text-field.tsx";
import Text from "./components/text.tsx";
import Webview from "./components/webview.tsx";
import Window from "./components/window.tsx";
import { Counter } from "./examples/counter.tsx";
import Examples from "./examples/index.tsx";
import { TodoMVP } from "./examples/todo.tsx";
import Components from "./pages/components.tsx";
import GettingStarted from "./pages/getting-started.tsx";
import Overview from "./pages/overview.tsx";
import Setup from "./pages/setup.tsx";
import WebDisplay from "./webdisplay.tsx";
import Switch from "./components/Switch.tsx";

interface SidebarBaseItem {
  id: string;
  icon?: string;
  title?: string;
  url?: string;
  component(): JSX.Element;
}
export interface SidebarItem extends SidebarBaseItem {
  children?: Array<SidebarBaseItem>;
}
export const sidebarItemsData: Array<Array<SidebarItem>> = [
  [
    {
      id: NSUUID.UUID().UUIDString,
      icon: "house",
      title: "Getting Started",
      component: GettingStarted,
      children: [
        {
          id: NSUUID.UUID().UUIDString,
          icon: "lightbulb.max",
          title: "Overview",
          component: Overview,
        },
        {
          id: NSUUID.UUID().UUIDString,
          icon: "gear.badge.checkmark",
          title: "Setup",
          component: Setup,
        },
      ],
    },
    {
      id: NSUUID.UUID().UUIDString,
      icon: "list.star",
      title: "Components",
      component: Components,
      children: [
        {
          id: NSUUID.UUID().UUIDString,
          icon: "button.horizontal.top.press",
          title: "Button",
          component: Button,
        },
        {
          id: NSUUID.UUID().UUIDString,
          icon: "checkmark.square.fill",
          title: "Checkbox",
          component: Checkbox,
        },
        {
          id: NSUUID.UUID().UUIDString,
          icon: "filemenu.and.selection",
          title: "ComboBox",
          component: ComboBox,
        },
        {
          id: NSUUID.UUID().UUIDString,
          icon: "photo",
          title: "Image",
          component: Image,
        },
        {
          id: NSUUID.UUID().UUIDString,
          icon: "rainbow",
          title: "Color dialog",
          component: ColorDialog,
        },
        {
          id: NSUUID.UUID().UUIDString,
          icon: "filemenu.and.cursorarrow",
          title: "File Dialog",
          component: FileDialog,
        },
        {
          id: NSUUID.UUID().UUIDString,
          icon: "slowmo",
          title: "Progress",
          component: Progress,
        },
        {
          id: NSUUID.UUID().UUIDString,
          icon: "checklist.unchecked",
          title: "RadioButton",
          component: RadioButton,
        },
        {
          id: NSUUID.UUID().UUIDString,
          icon: "checkmark.circle.fill",
          title: "Save File",
          component: SaveFile,
        },
        {
          id: NSUUID.UUID().UUIDString,
          icon: "slider.horizontal.3",
          title: "Slider",
          component: Slider,
        },
        {
          id: NSUUID.UUID().UUIDString,
          icon: "textformat",
          title: "Text",
          component: Text,
        },
        {
          id: NSUUID.UUID().UUIDString,
          icon: "pencil.and.ellipsis.rectangle",
          title: "Text field",
          component: TextField,
        },
        {
          id: NSUUID.UUID().UUIDString,
          title: "Switch",
          component: Switch,
          icon: "switch.2",
        },
        {
          id: NSUUID.UUID().UUIDString,
          icon: "macwindow",
          title: "Window",
          component: Window,
        },
        {
          id: NSUUID.UUID().UUIDString,
          icon: "rectangle.fill",
          title: "Modal",
          component: Modal,
        },
        {
          id: NSUUID.UUID().UUIDString,
          icon: "square.on.square",
          title: "Popover",
          component: Popover,
        },
        {
          id: NSUUID.UUID().UUIDString,
          icon: "network",
          title: "WebView",
          component: Webview,
        },
      ],
    },
  ],
  [
    {
      id: NSUUID.UUID().UUIDString,
      icon: "star.circle.fill",
      title: "Examples",
      component: Examples,
      children: [
        {
          id: NSUUID.UUID().UUIDString,
          icon: "00.circle",
          title: "Counter",
          component: Counter,
        },
        {
          id: NSUUID.UUID().UUIDString,
          icon: "checklist",
          title: "Simple Todos",
          component: TodoMVP,
        },
      ],
    },
  ],
  [
    {
      id: NSUUID.UUID().UUIDString,
      icon: "staroflife.fill",
      title: "Credits",
      component: () => (
        <WebDisplay url="https://www.solidjs.com/contributors" />
      ),
      children: [
        {
          id: NSUUID.UUID().UUIDString,
          icon: "person.crop.circle.fill",
          title: "Ammar Ahmed",
          component: () => <WebDisplay url="https://github.com/ammarahm-ed" />,
        },
        {
          id: NSUUID.UUID().UUIDString,
          icon: "person.crop.circle.fill",
          title: "Diljit Singh",
          component: () => <WebDisplay url="https://github.com/DjDeveloperr" />,
        },
        {
          id: NSUUID.UUID().UUIDString,
          icon: "person.crop.circle.fill",
          title: "Nathan Walker",
          component: () => <WebDisplay url="https://github.com/NathanWalker" />,
        },
      ],
    },
  ],
];

type SidebarProps = {
  selectedView: number;
  onSelectedItemChange: (item: SidebarItem) => void;
  selectedItem?: SidebarItem;
};

function findItem(item: SidebarItem, title: string): SidebarItem | undefined {
  console.log(item.title, title);
  return item.title === title
    ? item
    : item.children?.find(
        (child) => findItem(child, title)
      );
}

export default function Sidebar(props: SidebarProps) {

  // ENABLE WHEN TESTING ONLY
  setTimeout(() => {
    const title = "Switch";
    // Find an item recursively in the sidebarItemsData
    let item;
    for (const items of sidebarItemsData) {
      for (const i of items) {
        item = findItem(i, title);
        if (item) break;
      }
      if (item) break;
    }
    if (item) {
      props.onSelectedItemChange(item);
    }
  }, 150);


  return (
    <side-bar
      style={{
        maxWidth: 250,
        minWidth: 200,
      }}
    >
      <scroll-view
        disableDefaultDocumentView
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <outline
          onItemSelected={(event) => {
            props.onSelectedItemChange(
              event.item.getAttribute("data-item") as unknown as SidebarItem
            );
          }}
        >
          <For each={sidebarItemsData[props.selectedView]}>
            {(item, _index) => (
              <table-cell
                selected={props.selectedItem?.id === item.id}
                data-item={item}
                identifier={item.id}
              >
                <image symbol={item.icon} />
                <text>{item.title}</text>
                <For each={item.children}>
                  {(child, _index) => (
                    <table-cell
                      selected={props.selectedItem?.id === child.id}
                      identifier={item.id}
                      data-item={child}
                    >
                      <image symbol={child.icon} />
                      <text>{child.title}</text>
                    </table-cell>
                  )}
                </For>
              </table-cell>
            )}
          </For>
        </outline>
      </scroll-view>
    </side-bar>
  );
}
