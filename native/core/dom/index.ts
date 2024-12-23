import { Button } from "../views/button/button.ts";
import { ContentList } from "../views/split-view/content-list.ts";
import { Image } from "../views/image/image.ts";
import { Outline } from "../views/outline/outline.ts";
import { ScrollView } from "../views/scroll-view/scroll-view.ts";
import { SideBar } from "../views/split-view/sidebar.ts";
import { Slider } from "../views/slider/slider.ts";
import SplitView from "../views/split-view/split-view.ts";
import { TableCell } from "../views/table/table-cell.ts";
import { Text } from "../views/text/text.ts";
import { View } from "../views/view/view.ts";
import { Window } from "../views/window/window.ts";
import { WebView } from "../views/webview/webview.ts";
import { registerGlobalDocument } from "./environment.ts";
import { Checkbox } from "../views/checkbox/checkbox.ts";
import { ComboBox } from "../views/combobox/combobox.ts";
import { Progress } from "../views/progress/progress.ts";
import { Toolbar } from "../views/toolbar/toolbar.ts";
import { ToolbarItem } from "../views/toolbar/toolbar-item.ts";
import { ToolbarToggleSidebar } from "../views/toolbar/toolbar-toggle-sidebar.ts";
import { ToolbarSidebarTrackingSeparator } from "../views/toolbar/toolbar-sidebar-tracking-separator.ts";
import { ToolbarFlexibleSpace } from "../views/toolbar/toolbar-flexible-space.ts";
import { ToolbarGroup } from "../views/toolbar/toolbar-group.ts";
import { RadioButton } from "../views/radiobutton/radiobutton.ts";
import { FileOpenButton } from "../views/fileopenbutton/fileopenbutton.ts";
import { ColorOpenButton } from "../views/coloropenbutton/coloropenbutton.ts";
import { FileSaveButton } from "../views/filesavebutton/filesavebutton.ts";
import { TextField } from "../views/text-field/text-field.ts";
import { TextView } from "../views/text-view/text-view.ts";
import { Menu } from "../views/menu/menu.ts";
import { MenuItem } from "../views/menu/menu-item.ts";
import { MenuSeparator } from "../views/menu/menu-separator.ts";
import { MenuSectionHeader } from "../views/menu/menu-section-header.ts";
import { StatusBar } from "../views/status-bar/status-bar.ts";
import { Popover } from "../views/popover/popover.ts";
import { Switch } from "../views/switch/switch.ts";
import { DatePicker } from "../views/date-picker/date-picker.ts";
Button.register();
Checkbox.register();
ColorOpenButton.register();
ComboBox.register();
ContentList.register();
FileOpenButton.register();
FileSaveButton.register();
Image.register();
Outline.register();
Progress.register();
RadioButton.register();
ScrollView.register();
SplitView.register();
SideBar.register();
Slider.register();
TableCell.register();
Text.register();
Toolbar.register();
ToolbarItem.register();
ToolbarToggleSidebar.register();
ToolbarSidebarTrackingSeparator.register();
ToolbarFlexibleSpace.register();
ToolbarGroup.register();
WebView.register();
Window.register();
View.register();
TextField.register();
TextView.register();
Menu.register();
MenuItem.register();
MenuSeparator.register();
MenuSectionHeader.register();
StatusBar.register();
Popover.register();
Switch.register();
DatePicker.register();
registerGlobalDocument();
