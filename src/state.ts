import { createSignal } from "npm:solid-js";

export const [selectedView, setSelectedView] = createSignal(0);

export const sidebarItemsData = [
  [
    {
      icon: "house",
      title: "Getting Started",
      children: [
        {
          icon: "lightbulb.max",
          title: "Overview",
        },
        {
          icon: "gear.badge.checkmark",
          title: "Setup",
        },
      ],
    },
    {
      icon: "list.star",
      title: "Components",
      children: [
        {
          icon: "photo",
          title: "Image",
        },
        {
          icon: "slider.horizontal.3",
          title: "Slider",
        },
        {
          icon: "textformat",
          title: "Text",
        },
      ],
    },
  ],
  [
    {
      icon: "star.circle.fill",
      title: "Examples",
      children: [
        {
          icon: "numbers.rectangle.fill",
          title: "Counter",
        },
        {
          icon: "checklist",
          title: "Simple Todos",
        },
      ],
    },
  ],
  [
    {
      icon: "staroflife.fill",
      title: "Credits",
      children: [
        {
          icon: "person.crop.circle.fill",
          title: "Ammar Ahmed",
        },
        {
          icon: "person.crop.circle.fill",
          title: "Diljit Singh",
        },
        {
          icon: "person.crop.circle.fill",
          title: "Nathan Walker",
        },
      ],
    },
  ],
];
export const [sidebarItems, setSidebarItems] = createSignal(
  sidebarItemsData[0]
);
