import { changeToolbar } from "./state.tsx";

const URLS = [
  "https://docs.solidjs.com",
  "https://github.com/solidjs/solid",
  "https://discord.gg/solidjs",
];

export default function Toolbar() {
  return (
    <toolbar>
      <toolbar-toggle-sidebar />

      <toolbar-sidebar-tracking-separator />

      <toolbar-flexible-space />

      <toolbar-group
        selectionMode="selectOne"
        titles={["Building", "Examples", "Credits"]}
        label="View"
        paletteLabel="View"
        toolTip="Change the selected view"
        selectedIndex={0}
        onSelected={(event) => changeToolbar(event.selectedIndex)}
      />

      <toolbar-item />

      <toolbar-group
        selectionMode="momentary"
        titles={["Docs", "GitHub", "Discord"]}
        label="Learn More"
        paletteLabel="Learn More"
        toolTip="Continue your learning"
        onSelected={(event) =>
          NSWorkspace.sharedWorkspace.openURL(
            NSURL.URLWithString(URLS[event.selectedIndex]),
          )}
      />
    </toolbar>
  );
}
