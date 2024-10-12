export { createEvent, getAttributeNS, setAttributeNS } from "undom-ng";
export { Event };
import { Event as UndomEvent } from "undom-ng";

const Event = UndomEvent as unknown as typeof globalThis.Event;
