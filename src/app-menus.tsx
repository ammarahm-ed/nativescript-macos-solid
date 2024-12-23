import { getSolidLogo } from "./pages/common.ts";

export default function AppMenus() {
  function openDocs() {
    NSWorkspace.sharedWorkspace.openURL(
      NSURL.URLWithString("https://solidjs.com"),
    );
  }

  function openGithub() {
    NSWorkspace.sharedWorkspace.openURL(
      NSURL.URLWithString("https://github.com/solidjs/solid"),
    );
  }

  function openDiscord() {
    NSWorkspace.sharedWorkspace.openURL(
      NSURL.URLWithString("https://discord.com/invite/solidjs"),
    );
  }

  return (
    <>
      <menu attachToMainMenu>
        <menu-item
          title="About"
          onClick={() => {
            NSApp.orderFrontStandardAboutPanel({
              [NSAboutPanelOptionApplicationName]: "Solid Desktop",
              [NSAboutPanelOptionApplicationVersion]: "1.0.0",
              [NSAboutPanelOptionApplicationIcon]: getSolidLogo(),
            });
          }}
        />
        <menu-item
          title="Quit"
          shortcutKey="q"
          onClick={() => {
            NSApp.terminate(NSApp);
          }}
        />
      </menu>
      <menu title="Help" attachToMainMenu>
        <menu-item title="Open Docs" shortcutKey="i" onClick={openDocs} />
        <menu-item title="Open Github" shortcutKey="g" onClick={openGithub} />
        <menu-item title="Discord" shortcutKey="d" onClick={openDiscord} />
      </menu>

      <status-bar>
        <image
          src={getSolidLogo()}
          style={{
            width: 30,
            height: 21,
          }}
        />

        <popover
          style={{
            width: 200,
            height: 300,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <image
            src={getSolidLogo()}
            style={{
              width: 100,
              height: 100,
            }}
          />

          <text
            style={{
              fontSize: 20,
              textAlign: "center",
            }}
          >
            Hello Solid macOS
          </text>

          <text
            style={{
              fontSize: 12,
            }}
          >
            Let's build something
          </text>
        </popover>
      </status-bar>
    </>
  );
}
