import { createSignal } from "npm:solid-js";

export const [selectedView, setSelectedView] = createSignal(0);
export const [selectedContentId, setSelectedContentId] = createSignal<
  string | null
>(null);
const defaultCredit = "https://www.solidjs.com/contributors";
export const [activeCredit, setActiveCredit] =
  createSignal<string>(defaultCredit);
export const [selectedComponent, setSelectedComponent] = createSignal<
  string | undefined
>("");
export const [isSnippetActive, setIsSnippetActive] =
  createSignal<boolean>(false);
export const [currentSnippet, setCurrentSnippet] = createSignal<JSX.Element>(
  <></>
);
export const [chosenFiles, setChosenFiles] = createSignal<string | undefined>(
  ""
);
export const [saveFilePath, setSaveFilePath] = createSignal<string | undefined>(
  ""
);
export const [chosenColor, setChosenColor] = createSignal<string | undefined>(
  "#ccc"
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
      id: crypto.randomUUID(),
      icon: "house",
      title: "Getting Started",
      children: [
        {
          id: crypto.randomUUID(),
          icon: "lightbulb.max",
          title: "Overview",
        },
        {
          id: crypto.randomUUID(),
          icon: "gear.badge.checkmark",
          title: "Setup",
        },
      ],
    },
    {
      id: crypto.randomUUID(),
      icon: "list.star",
      title: "Components",
      children: [
        {
          id: crypto.randomUUID(),
          icon: "button.horizontal.top.press",
          title: "Button",
        },
        {
          id: crypto.randomUUID(),
          icon: "checkmark.square.fill",
          title: "Checkbox",
        },
        {
          id: crypto.randomUUID(),
          icon: "filemenu.and.selection",
          title: "ComboBox",
        },
        {
          id: crypto.randomUUID(),
          icon: "photo",
          title: "Image",
        },
        {
          id: crypto.randomUUID(),
          icon: "rainbow",
          title: "Open Color Dialog",
        },
        {
          id: crypto.randomUUID(),
          icon: "filemenu.and.cursorarrow",
          title: "Open File Dialog",
        },
        {
          id: crypto.randomUUID(),
          icon: "slowmo",
          title: "Progress",
        },
        {
          id: crypto.randomUUID(),
          icon: "checklist.unchecked",
          title: "RadioButton",
        },
        {
          id: crypto.randomUUID(),
          icon: "checkmark.circle.fill",
          title: "Save File Dialog",
        },
        {
          id: crypto.randomUUID(),
          icon: "slider.horizontal.3",
          title: "Slider",
        },
        {
          id: crypto.randomUUID(),
          icon: "textformat",
          title: "Text",
        },
        {
          id: crypto.randomUUID(),
          icon: "pencil.and.ellipsis.rectangle",
          title: "Text field",
        },
        {
          id: crypto.randomUUID(),
          icon: "macwindow",
          title: "Window",
        },
        {
          id: crypto.randomUUID(),
          icon: "rectangle.fill",
          title: "Modal",
        },
        {
          id: crypto.randomUUID(),
          icon: "square.on.square",
          title: "Popover",
        },
        {
          id: crypto.randomUUID(),
          icon: "network",
          title: "WebView",
        },
      ],
    },
  ],
  [
    {
      id: crypto.randomUUID(),
      icon: "star.circle.fill",
      title: "Examples",
      children: [
        {
          id: crypto.randomUUID(),
          icon: "numbers.rectangle.fill",
          title: "Counter",
        },
        {
          id: crypto.randomUUID(),
          icon: "checklist",
          title: "Simple Todos",
        },
      ],
    },
  ],
  [
    {
      id: crypto.randomUUID(),
      icon: "staroflife.fill",
      title: "Credits",
      children: [
        {
          id: crypto.randomUUID(),
          icon: "person.crop.circle.fill",
          title: "Ammar Ahmed",
          url: "https://github.com/ammarahm-ed",
        },
        {
          id: crypto.randomUUID(),
          icon: "person.crop.circle.fill",
          title: "Diljit Singh",
          url: "https://github.com/DjDeveloperr",
        },
        {
          id: crypto.randomUUID(),
          icon: "person.crop.circle.fill",
          title: "Nathan Walker",
          url: "https://github.com/NathanWalker",
        },
      ],
    },
  ],
];
export const [sidebarItems, setSidebarItems] = createSignal(
  sidebarItemsData[0]
);

export function changeToolbar(index: number) {
  setSelectedView(index);
  setSidebarItems(sidebarItemsData[index]);
  if (selectedView() === 1) {
    changeContent(1);
  }
}

export function changeContent(index: number) {
  const barItems = getFlattenedSidebarItems();
  const selection = barItems[index];
  if (selectedView() === 0) {
    // anything below 'Components' will be component snippets
    const title = selection.title?.toLowerCase() as string;
    setSelectedComponent(title);
    setIsSnippetActive(
      !["getting started", "overview", "setup", "components"].includes(title)
    );
  } else if (selectedView() == 1) {
    setSelectedComponent(selection.title);
  } else if (selectedView() == 2) {
    if (selection?.id !== selectedContentId()) {
      setSelectedContentId(selection.id);
      setActiveCredit(selection.url || defaultCredit);
    }
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
