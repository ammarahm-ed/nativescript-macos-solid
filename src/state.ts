import { createSignal } from "npm:solid-js";

export const [selectedView, setSelectedView] = createSignal(0);
export const [selectedContentId, setSelectedContentId] = createSignal(null);

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
          icon: "photo",
          title: "Image",
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
          url: 'https://github.com/ammarahm-ed'
        },
        {
          id: crypto.randomUUID(),
          icon: "person.crop.circle.fill",
          title: "Diljit Singh",
          url: 'https://github.com/DjDeveloperr'
        },
        {
          id: crypto.randomUUID(),
          icon: "person.crop.circle.fill",
          title: "Nathan Walker",
          url: 'https://github.com/NathanWalker'
        },
      ],
    },
  ],
];
export const [sidebarItems, setSidebarItems] = createSignal(
  sidebarItemsData[0]
);

export function changeContent(index: number) {
  const items = [...sidebarItems()];
  const barItems = [];
  for (const item of items) {
    barItems.push(item);
    barItems.push(item.children);
  }
  const selection = barItems[index];
  console.log('selection:', selection)
}
