import "@nativescript/macos-node-api";
import { Event } from "../../dom/dom-utils.ts";
import type { YogaNodeLayout } from "../../layout/index.ts";
import { NativeTarget } from "../common/native-target.ts";
import { native } from "../decorators/native.ts";
import { view } from "../decorators/view.ts";
import { View } from "../view/view.ts";

export class DatePickerChangeEvent extends Event {
  declare date?: Date;
  declare interval?: number;
  constructor(date: Date, interval: number, eventDict?: EventInit) {
    super("dateChange", eventDict);
    this.date = date;
    this.interval = interval;
  }
}

@view({
  name: "HTMLDatePickerElement",
  tagName: "date-picker",
})
export class DatePicker extends View {
  override get isLeaf(): boolean {
    return true;
  }

  override nativeView?: NSDatePicker = undefined;
  public override initNativeView(): NSDatePicker | undefined {
    this.nativeView = NSDatePicker.alloc().init();
    this.nativeView.dateValue = NSDate.dateWithTimeIntervalSince1970(
      Date.now() / 1000
    );
    const target = NativeTarget.initWithAction(() => {
      if (this.nativeView) {
        this.dispatchEvent(
          new DatePickerChangeEvent(
            new Date(this.nativeView.dateValue.timeIntervalSince1970 * 1000),
            this.nativeView.timeInterval * 1000
          )
        );
      }
    });
    this.nativeView.action = target.selector;
    this.nativeView.target = target;
    return this.nativeView;
  }

  @native({
    setNative(view: DatePicker, _key, value) {
      if (view.nativeView) {
        view.nativeView.dateValue = NSDate.dateWithTimeIntervalSince1970(
          value.getTime() / 1000
        );
      }
    },
  })
  declare date: Date;

  @native({
    setNative(view: DatePicker, _key, value) {
      if (view.nativeView) {
        view.nativeView.minDate = NSDate.dateWithTimeIntervalSince1970(
          value.getTime() / 1000
        );
      }
    },
  })
  declare minDate: Date;

  @native({
    setNative(view: DatePicker, _key, value) {
      if (view.nativeView) {
        view.nativeView.maxDate = NSDate.dateWithTimeIntervalSince1970(
          value.getTime() / 1000
        );
      }
    },
  })
  declare maxDate: Date;

  @native({
    setNative(view: DatePicker, _key, value) {
      if (view.nativeView) {
        view.nativeView.datePickerStyle =
          value === "clockAndCalendar"
            ? NSDatePickerStyle.ClockAndCalendar
            : value === "textField"
            ? NSDatePickerStyle.TextField
            : NSDatePickerStyle.TextFieldAndStepper;
      }
    },
  })
  declare datePickerStyle:
    | "textFieldAndStepper"
    | "clockAndCalendar"
    | "textField";

  @native({
    setNative(view: DatePicker, _key, value) {
      if (view.nativeView) {
        view.nativeView.datePickerElements = value;
      }
    },
  })
  declare datePickerElements: number;

  @native({
    setNative(view: DatePicker, _key, value) {
      if (view.nativeView) {
        view.nativeView.presentsCalendarOverlay = value;
      }
    },
  })
  declare presentsCalendarOverlay: boolean;

  @native({
    setNative(view: DatePicker, _key, value) {
      if (view.nativeView) {
        view.nativeView.datePickerMode = value;
      }
    },
  })
  declare datePickerMode: "single" | "range";

  applyLayout(parentLayout?: YogaNodeLayout): void {
    super.applyLayout(parentLayout);
    if (this.nativeView) {
      this.nativeView.translatesAutoresizingMaskIntoConstraints = true;
    }
  }
}
