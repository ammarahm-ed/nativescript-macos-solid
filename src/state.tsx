import { createSignal } from "npm:solid-js";

export const [selectedView, setSelectedView] = createSignal(0);
export const [selectedContentId, setSelectedContentId] = createSignal<
  string | null
>(null);
const defaultCredit = "https://www.solidjs.com/contributors";
export const [activeCredit, setActiveCredit] = createSignal<string>(
  defaultCredit,
);
export const [selectedComponent, setSelectedComponent] = createSignal<
  string | undefined
>("");
export const [isSnippetActive, setIsSnippetActive] = createSignal<boolean>(
  false,
);
export const [currentSnippet, setCurrentSnippet] = createSignal<JSX.Element>(
  <></>,
);
export const [chosenFiles, setChosenFiles] = createSignal<string | undefined>(
  "",
);
export const [saveFilePath, setSaveFilePath] = createSignal<string | undefined>(
  "",
);
export const [chosenColor, setChosenColor] = createSignal<string | undefined>(
  "#ccc",
);

interface SidebarBaseItem {
  id: string;
  icon?: string;
  title?: string;
  url?: string;
}
interface SidebarItem extends SidebarBaseItem {
  children?: Array<SidebarBaseItem>;
}
export const sidebarItemsData: Array<Array<SidebarItem>> = [
  [
    {
      id: typeof crypto === "object" ? crypto.randomUUID() : NSUUID.UUID().UUIDString,
      icon: "house",
      title: "Getting Started",
      children: [
        {
          id: typeof crypto === "object" ? crypto.randomUUID() : NSUUID.UUID().UUIDString,
          icon: "lightbulb.max",
          title: "Overview",
        },
        {
          id: typeof crypto === "object" ? crypto.randomUUID() : NSUUID.UUID().UUIDString,
          icon: "gear.badge.checkmark",
          title: "Setup",
        },
      ],
    },
    {
      id: typeof crypto === "object" ? crypto.randomUUID() : NSUUID.UUID().UUIDString,
      icon: "list.star",
      title: "Components",
      children: [
        {
          id: typeof crypto === "object" ? crypto.randomUUID() : NSUUID.UUID().UUIDString,
          icon: "button.horizontal.top.press",
          title: "Button",
        },
        {
          id: typeof crypto === "object" ? crypto.randomUUID() : NSUUID.UUID().UUIDString,
          icon: "checkmark.square.fill",
          title: "Checkbox",
        },
        {
          id: typeof crypto === "object" ? crypto.randomUUID() : NSUUID.UUID().UUIDString,
          icon: "filemenu.and.selection",
          title: "ComboBox",
        },
        {
          id: typeof crypto === "object" ? crypto.randomUUID() : NSUUID.UUID().UUIDString,
          icon: "photo",
          title: "Image",
        },
        {
          id: typeof crypto === "object" ? crypto.randomUUID() : NSUUID.UUID().UUIDString,
          icon: "rainbow",
          title: "Open Color Dialog",
        },
        {
          id: typeof crypto === "object" ? crypto.randomUUID() : NSUUID.UUID().UUIDString,
          icon: "filemenu.and.cursorarrow",
          title: "Open File Dialog",
        },
        {
          id: typeof crypto === "object" ? crypto.randomUUID() : NSUUID.UUID().UUIDString,
          icon: "slowmo",
          title: "Progress",
        },
        {
          id: typeof crypto === "object" ? crypto.randomUUID() : NSUUID.UUID().UUIDString,
          icon: "checklist.unchecked",
          title: "RadioButton",
        },
        {
          id: typeof crypto === "object" ? crypto.randomUUID() : NSUUID.UUID().UUIDString,
          icon: "checkmark.circle.fill",
          title: "Save File Dialog",
        },
        {
          id: typeof crypto === "object" ? crypto.randomUUID() : NSUUID.UUID().UUIDString,
          icon: "slider.horizontal.3",
          title: "Slider",
        },
        {
          id: typeof crypto === "object" ? crypto.randomUUID() : NSUUID.UUID().UUIDString,
          icon: "textformat",
          title: "Text",
        },

        {
          id: typeof crypto === "object" ? crypto.randomUUID() : NSUUID.UUID().UUIDString,
          icon: "network",
          title: "WebView",
        },
      ],
    },
  ],
  [
    {
      id: typeof crypto === "object" ? crypto.randomUUID() : NSUUID.UUID().UUIDString,
      icon: "star.circle.fill",
      title: "Examples",
      children: [
        {
          id: typeof crypto === "object" ? crypto.randomUUID() : NSUUID.UUID().UUIDString,
          icon: "numbers.rectangle.fill",
          title: "Counter",
        },
        {
          id: typeof crypto === "object" ? crypto.randomUUID() : NSUUID.UUID().UUIDString,
          icon: "checklist",
          title: "Simple Todos",
        },
      ],
    },
  ],
  [
    {
      id: typeof crypto === "object" ? crypto.randomUUID() : NSUUID.UUID().UUIDString,
      icon: "staroflife.fill",
      title: "Credits",
      children: [
        {
          id: typeof crypto === "object" ? crypto.randomUUID() : NSUUID.UUID().UUIDString,
          icon: "person.crop.circle.fill",
          title: "Ammar Ahmed",
          url: "https://github.com/ammarahm-ed",
        },
        {
          id: typeof crypto === "object" ? crypto.randomUUID() : NSUUID.UUID().UUIDString,
          icon: "person.crop.circle.fill",
          title: "Diljit Singh",
          url: "https://github.com/DjDeveloperr",
        },
        {
          id: typeof crypto === "object" ? crypto.randomUUID() : NSUUID.UUID().UUIDString,
          icon: "person.crop.circle.fill",
          title: "Nathan Walker",
          url: "https://github.com/NathanWalker",
        },
      ],
    },
  ],
];
export const [sidebarItems, setSidebarItems] = createSignal(
  sidebarItemsData[0],
);

export function changeToolbar(index: number) {
  setSelectedView(index);
  setSidebarItems(sidebarItemsData[index]);
}

export function changeContent(index: number) {
  const barItems = getFlattenedSidebarItems();
  const selection = barItems[index];
  if (selectedView() === 0) {
    // anything below 'Components' will be component snippets
    const title = selection.title?.toLowerCase() as string;
    setSelectedComponent(title);
    setIsSnippetActive(
      !["getting started", "overview", "setup", "components"].includes(title),
    );
  }
  if (selection?.id !== selectedContentId()) {
    setSelectedContentId(selection.id);
    setActiveCredit(selection.url || defaultCredit);
  }
}

function getFlattenedSidebarItems() {
  const items = [...sidebarItems()];
  const barItems = [];
  for (const item of items) {
    barItems.push({
      id: item.id,
      icon: item.icon,
      title: item.title,
    });
    if (item.children) {
      for (const child of item.children) {
        barItems.push({
          id: child.id,
          icon: child.icon,
          title: child.title,
          url: child.url,
        });
      }
    }
  }
  return barItems;
}
