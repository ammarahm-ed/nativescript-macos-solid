import { View } from "../views/view/view.ts";
import { Window } from "../views/window/window.ts";
import { registerGlobalDocument } from "./environment.ts";
Window.register();
View.register();
registerGlobalDocument();
