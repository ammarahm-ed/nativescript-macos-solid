import "@nativescript/macos-node-api";
import { Application, setCustomDelegate } from '@nativescript/foundation';
import { AppDelegate } from "./main-setup.ts";
import { startApp } from 'app';

setCustomDelegate(AppDelegate);
startApp();
Application.launch();