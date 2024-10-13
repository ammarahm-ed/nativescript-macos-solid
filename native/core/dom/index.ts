import { Image } from "../views/image/image.ts";
import { Outline } from "../views/outline/outline.ts";
import { Slider } from "../views/slider/slider.ts";
import { ContentList } from "../views/split-view/content-list.ts";
import { ScrollView } from "../views/scroll-view/scroll-view.ts";
import { SideBar } from "../views/split-view/sidebar.ts";
import SplitView from "../views/split-view/split-view.ts";
import { TableCell } from "../views/table/table-cell.ts";
import { Text } from "../views/text/text.ts";
import { View } from "../views/view/view.ts";
import { Window } from "../views/window/window.ts";
import { registerGlobalDocument } from "./environment.ts";
ContentList.register();
Image.register();
Outline.register();
ScrollView.register();
SplitView.register();
SideBar.register();
Slider.register();
TableCell.register();
Text.register();
Window.register();
View.register();
registerGlobalDocument();
