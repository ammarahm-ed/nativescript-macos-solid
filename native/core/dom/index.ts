import { Slider } from "../views/slider/slider.ts";
import { ContentList } from "../views/split-view/content-list.ts";
import { SideBar } from "../views/split-view/sidebar.ts";
import SplitView from "../views/split-view/split-view.ts";
import { View } from "../views/view/view.ts";
import { Window } from "../views/window/window.ts";
import { registerGlobalDocument } from "./environment.ts";
SplitView.register();
SideBar.register();
ContentList.register();
Slider.register();
Window.register();
View.register();
registerGlobalDocument();
