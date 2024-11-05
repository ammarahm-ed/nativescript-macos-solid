import {
  Align,
  Direction,
  Display,
  Edge,
  FlexDirection,
  Gutter,
  Justify,
  loadYoga,
  Node,
  Overflow,
  PositionType,
  Wrap,
} from "npm:yoga-layout/load";
export const Yoga = await loadYoga();

function createYogaNode() {
  return Yoga.Node.create();
}

function computeAndLayout(node: any) {
  if (node?.isLeaf && node?.yogaNode) {
    node.yogaNode.markDirty();
  }

  if (!node?.rootYogaNode) {
    return;
  }

  const rootView: HTMLViewElement = node._rootView || node;

  if (rootView.pauseLayoutUpdates) {
    return;
  }

  node.rootYogaNode?.calculateLayout(
    node.rootYogaNode.getWidth().value,
    node.rootYogaNode.getHeight().value,
    Yoga.DIRECTION_LTR,
  );
  rootView.applyLayout();
}

type FlexAlignType =
  | "flex-start"
  | "flex-end"
  | "center"
  | "stretch"
  | "baseline";

type DimensionValue = number | "auto" | `${number}%` | null;

/**

   * Flex Prop Types

   * @see https://reactnative.dev/docs/flexbox

   * @see https://reactnative.dev/docs/layout-props

   */

const ConvertToYogaValue = {
  alignContent: (value: FlexStyle["alignContent"]): Align | undefined => {
    switch (value) {
      case "flex-start":
        return Align.FlexStart;
      case "center":
        return Align.Center;
      case "flex-end":
        return Align.FlexEnd;
      case "stretch":
        return Align.Stretch;
      case "space-between":
        return Align.SpaceBetween;
      case "space-around":
        return Align.SpaceAround;
      default:
        return undefined;
    }
  },

  alignItems: (value: FlexStyle["alignItems"]): Align | undefined => {
    // Assuming FlexAlignType maps to Yoga Align directly
    return ConvertToYogaValue.alignContent(value as any); // Use `alignContent` converter if `alignItems` is similar
  },

  alignSelf: (value: FlexStyle["alignSelf"]): Align | undefined => {
    // Same mapping as alignContent
    return ConvertToYogaValue.alignContent(value as any);
  },

  aspectRatio: (value: FlexStyle["aspectRatio"]): number | undefined => {
    return typeof value === "number" ? value : undefined; // Aspect Ratio remains a number
  },

  borderBottomWidth: (
    value: FlexStyle["borderBottomWidth"],
  ): number | undefined => value,
  borderEndWidth: (value: FlexStyle["borderEndWidth"]): number | undefined =>
    value,
  borderLeftWidth: (value: FlexStyle["borderLeftWidth"]): number | undefined =>
    value,
  borderRightWidth: (
    value: FlexStyle["borderRightWidth"],
  ): number | undefined => value,
  borderStartWidth: (
    value: FlexStyle["borderStartWidth"],
  ): number | undefined => value,
  borderTopWidth: (value: FlexStyle["borderTopWidth"]): number | undefined =>
    value,
  borderWidth: (value: FlexStyle["borderWidth"]): number | undefined => value,

  bottom: (value: FlexStyle["bottom"]): DimensionValue | undefined => value,
  display: (value: FlexStyle["display"]): Display | undefined => {
    switch (value) {
      case "flex":
        return Display.Flex;
      case "none":
        return Display.None;
      default:
        return undefined;
    }
  },

  end: (value: FlexStyle["end"]): DimensionValue | undefined => value,
  flex: (value: FlexStyle["flex"]): number | undefined => value,
  flexBasis: (value: FlexStyle["flexBasis"]): DimensionValue | undefined =>
    value,

  flexDirection: (
    value: FlexStyle["flexDirection"],
  ): FlexDirection | undefined => {
    switch (value) {
      case "row":
        return FlexDirection.Row;
      case "column":
        return FlexDirection.Column;
      case "row-reverse":
        return FlexDirection.RowReverse;
      case "column-reverse":
        return FlexDirection.ColumnReverse;
      default:
        return undefined;
    }
  },

  rowGap: (value: FlexStyle["rowGap"]): number | undefined => value,
  gap: (value: FlexStyle["gap"]): number | undefined => value,
  columnGap: (value: FlexStyle["columnGap"]): number | undefined => value,

  flexGrow: (value: FlexStyle["flexGrow"]): number | undefined => value,
  flexShrink: (value: FlexStyle["flexShrink"]): number | undefined => value,
  flexWrap: (value: FlexStyle["flexWrap"]): Wrap | undefined => {
    switch (value) {
      case "wrap":
        return Wrap.Wrap;
      case "nowrap":
        return Wrap.NoWrap;
      case "wrap-reverse":
        return Wrap.WrapReverse;
      default:
        return undefined;
    }
  },

  height: (value: FlexStyle["height"]): DimensionValue | undefined => value,

  justifyContent: (value: FlexStyle["justifyContent"]): Justify | undefined => {
    switch (value) {
      case "flex-start":
        return Justify.FlexStart;
      case "center":
        return Justify.Center;
      case "flex-end":
        return Justify.FlexEnd;
      case "space-between":
        return Justify.SpaceBetween;
      case "space-around":
        return Justify.SpaceAround;
      case "space-evenly":
        return Justify.SpaceEvenly;
      default:
        return undefined;
    }
  },

  left: (value: FlexStyle["left"]): DimensionValue | undefined => value,
  margin: (value: FlexStyle["margin"]): DimensionValue | undefined => value,
  marginBlock: (value: FlexStyle["marginBlock"]): DimensionValue | undefined =>
    value,
  marginBlockEnd: (
    value: FlexStyle["marginBlockEnd"],
  ): DimensionValue | undefined => value,
  marginBlockStart: (
    value: FlexStyle["marginBlockStart"],
  ): DimensionValue | undefined => value,
  marginBottom: (
    value: FlexStyle["marginBottom"],
  ): DimensionValue | undefined => value,
  marginEnd: (value: FlexStyle["marginEnd"]): DimensionValue | undefined =>
    value,
  marginHorizontal: (
    value: FlexStyle["marginHorizontal"],
  ): DimensionValue | undefined => value,
  marginInline: (
    value: FlexStyle["marginInline"],
  ): DimensionValue | undefined => value,
  marginInlineEnd: (
    value: FlexStyle["marginInlineEnd"],
  ): DimensionValue | undefined => value,
  marginInlineStart: (
    value: FlexStyle["marginInlineStart"],
  ): DimensionValue | undefined => value,
  marginLeft: (value: FlexStyle["marginLeft"]): DimensionValue | undefined =>
    value,
  marginRight: (value: FlexStyle["marginRight"]): DimensionValue | undefined =>
    value,
  marginStart: (value: FlexStyle["marginStart"]): DimensionValue | undefined =>
    value,
  marginTop: (value: FlexStyle["marginTop"]): DimensionValue | undefined =>
    value,
  marginVertical: (
    value: FlexStyle["marginVertical"],
  ): DimensionValue | undefined => value,

  maxHeight: (value: FlexStyle["maxHeight"]): DimensionValue | undefined =>
    value,
  maxWidth: (value: FlexStyle["maxWidth"]): DimensionValue | undefined => value,
  minHeight: (value: FlexStyle["minHeight"]): DimensionValue | undefined =>
    value,
  minWidth: (value: FlexStyle["minWidth"]): DimensionValue | undefined => value,

  overflow: (value: FlexStyle["overflow"]): Overflow | undefined => {
    switch (value) {
      case "visible":
        return Overflow.Visible;
      case "hidden":
        return Overflow.Hidden;
      case "scroll":
        return Overflow.Scroll;
      default:
        return undefined;
    }
  },

  padding: (value: FlexStyle["padding"]): DimensionValue | undefined => value,
  paddingBottom: (
    value: FlexStyle["paddingBottom"],
  ): DimensionValue | undefined => value,
  paddingBlock: (
    value: FlexStyle["paddingBlock"],
  ): DimensionValue | undefined => value,
  paddingBlockEnd: (
    value: FlexStyle["paddingBlockEnd"],
  ): DimensionValue | undefined => value,
  paddingBlockStart: (
    value: FlexStyle["paddingBlockStart"],
  ): DimensionValue | undefined => value,
  paddingEnd: (value: FlexStyle["paddingEnd"]): DimensionValue | undefined =>
    value,
  paddingHorizontal: (
    value: FlexStyle["paddingHorizontal"],
  ): DimensionValue | undefined => value,
  paddingInline: (
    value: FlexStyle["paddingInline"],
  ): DimensionValue | undefined => value,
  paddingInlineEnd: (
    value: FlexStyle["paddingInlineEnd"],
  ): DimensionValue | undefined => value,
  paddingInlineStart: (
    value: FlexStyle["paddingInlineStart"],
  ): DimensionValue | undefined => value,
  paddingLeft: (value: FlexStyle["paddingLeft"]): DimensionValue | undefined =>
    value,
  paddingRight: (
    value: FlexStyle["paddingRight"],
  ): DimensionValue | undefined => value,
  paddingStart: (
    value: FlexStyle["paddingStart"],
  ): DimensionValue | undefined => value,
  paddingTop: (value: FlexStyle["paddingTop"]): DimensionValue | undefined =>
    value,
  paddingVertical: (
    value: FlexStyle["paddingVertical"],
  ): DimensionValue | undefined => value,

  position: (value: FlexStyle["position"]): PositionType | undefined => {
    switch (value) {
      case "absolute":
        return PositionType.Absolute;
      case "static":
        return PositionType.Static;
      default:
        return PositionType.Relative;
    }
  },

  right: (value: FlexStyle["right"]): DimensionValue | undefined => value,
  start: (value: FlexStyle["start"]): DimensionValue | undefined => value,
  top: (value: FlexStyle["top"]): DimensionValue | undefined => value,
  width: (value: FlexStyle["width"]): DimensionValue | undefined => value,

  direction: (value: FlexStyle["direction"]): Direction | undefined => {
    switch (value) {
      case "inherit":
        return Direction.Inherit;
      case "ltr":
        return Direction.LTR;
      case "rtl":
        return Direction.RTL;
      default:
        return undefined;
    }
  },
};

const ConvertFromYogaValue = {
  alignContent: (value: Align): FlexStyle["alignContent"] => {
    switch (value) {
      case Align.FlexStart:
        return "flex-start";
      case Align.Center:
        return "center";
      case Align.FlexEnd:
        return "flex-end";
      case Align.Stretch:
        return "stretch";
      case Align.SpaceBetween:
        return "space-between";
      case Align.SpaceAround:
        return "space-around";
      default:
        return undefined;
    }
  },

  alignItems: (value: Align): FlexStyle["alignItems"] => {
    switch (value) {
      case Align.FlexStart:
        return "flex-start";
      case Align.Center:
        return "center";
      case Align.FlexEnd:
        return "flex-end";
      case Align.Stretch:
        return "stretch";
      default:
        return undefined;
    }
  },

  alignSelf: (value: Align): FlexStyle["alignSelf"] => {
    switch (value) {
      case Align.FlexStart:
        return "flex-start";
      case Align.Center:
        return "center";
      case Align.FlexEnd:
        return "flex-end";
      case Align.Stretch:
        return "stretch";
      default:
        return undefined;
    }
  },

  aspectRatio: (value: number): FlexStyle["aspectRatio"] => value,

  borderBottomWidth: (value: number): FlexStyle["borderBottomWidth"] => value,
  borderEndWidth: (value: number): FlexStyle["borderEndWidth"] => value,
  borderLeftWidth: (value: number): FlexStyle["borderLeftWidth"] => value,
  borderRightWidth: (value: number): FlexStyle["borderRightWidth"] => value,
  borderStartWidth: (value: number): FlexStyle["borderStartWidth"] => value,
  borderTopWidth: (value: number): FlexStyle["borderTopWidth"] => value,
  borderWidth: (value: number): FlexStyle["borderWidth"] => value,

  bottom: (value: DimensionValue): FlexStyle["bottom"] => value,
  display: (value: Display): FlexStyle["display"] => {
    switch (value) {
      case Display.Flex:
        return "flex";
      case Display.None:
        return "none";
      default:
        return undefined;
    }
  },

  end: (value: DimensionValue): FlexStyle["end"] => value,
  flex: (value: number): FlexStyle["flex"] => value,
  flexBasis: (value: DimensionValue): FlexStyle["flexBasis"] => value,

  flexDirection: (value: FlexDirection): FlexStyle["flexDirection"] => {
    switch (value) {
      case FlexDirection.Row:
        return "row";
      case FlexDirection.Column:
        return "column";
      case FlexDirection.RowReverse:
        return "row-reverse";
      case FlexDirection.ColumnReverse:
        return "column-reverse";
      default:
        return undefined;
    }
  },

  rowGap: (value: number): FlexStyle["rowGap"] => value,
  gap: (value: number): FlexStyle["gap"] => value,
  columnGap: (value: number): FlexStyle["columnGap"] => value,

  flexGrow: (value: number): FlexStyle["flexGrow"] => value,
  flexShrink: (value: number): FlexStyle["flexShrink"] => value,
  flexWrap: (value: Wrap): FlexStyle["flexWrap"] => {
    switch (value) {
      case Wrap.Wrap:
        return "wrap";
      case Wrap.NoWrap:
        return "nowrap";
      case Wrap.WrapReverse:
        return "wrap-reverse";
      default:
        return undefined;
    }
  },

  height: (value: DimensionValue): FlexStyle["height"] => value,

  justifyContent: (value: Justify): FlexStyle["justifyContent"] => {
    switch (value) {
      case Justify.FlexStart:
        return "flex-start";
      case Justify.Center:
        return "center";
      case Justify.FlexEnd:
        return "flex-end";
      case Justify.SpaceBetween:
        return "space-between";
      case Justify.SpaceAround:
        return "space-around";
      case Justify.SpaceEvenly:
        return "space-evenly";
      default:
        return undefined;
    }
  },

  left: (value: DimensionValue): FlexStyle["left"] => value,
  margin: (value: DimensionValue): FlexStyle["margin"] => value,
  marginBlock: (value: DimensionValue): FlexStyle["marginBlock"] => value,
  marginBlockEnd: (value: DimensionValue): FlexStyle["marginBlockEnd"] => value,
  marginBlockStart: (value: DimensionValue): FlexStyle["marginBlockStart"] =>
    value,
  marginBottom: (value: DimensionValue): FlexStyle["marginBottom"] => value,
  marginEnd: (value: DimensionValue): FlexStyle["marginEnd"] => value,
  marginHorizontal: (value: DimensionValue): FlexStyle["marginHorizontal"] =>
    value,
  marginInline: (value: DimensionValue): FlexStyle["marginInline"] => value,
  marginInlineEnd: (value: DimensionValue): FlexStyle["marginInlineEnd"] =>
    value,
  marginInlineStart: (value: DimensionValue): FlexStyle["marginInlineStart"] =>
    value,
  marginLeft: (value: DimensionValue): FlexStyle["marginLeft"] => value,
  marginRight: (value: DimensionValue): FlexStyle["marginRight"] => value,
  marginStart: (value: DimensionValue): FlexStyle["marginStart"] => value,
  marginTop: (value: DimensionValue): FlexStyle["marginTop"] => value,
  marginVertical: (value: DimensionValue): FlexStyle["marginVertical"] => value,

  maxHeight: (value: DimensionValue): FlexStyle["maxHeight"] => value,
  maxWidth: (value: DimensionValue): FlexStyle["maxWidth"] => value,
  minHeight: (value: DimensionValue): FlexStyle["minHeight"] => value,
  minWidth: (value: DimensionValue): FlexStyle["minWidth"] => value,

  overflow: (value: Overflow): FlexStyle["overflow"] => {
    switch (value) {
      case Overflow.Visible:
        return "visible";
      case Overflow.Hidden:
        return "hidden";
      case Overflow.Scroll:
        return "scroll";
      default:
        return undefined;
    }
  },

  padding: (value: DimensionValue): FlexStyle["padding"] => value,
  paddingBottom: (value: DimensionValue): FlexStyle["paddingBottom"] => value,
  paddingBlock: (value: DimensionValue): FlexStyle["paddingBlock"] => value,
  paddingBlockEnd: (value: DimensionValue): FlexStyle["paddingBlockEnd"] =>
    value,
  paddingBlockStart: (value: DimensionValue): FlexStyle["paddingBlockStart"] =>
    value,
  paddingEnd: (value: DimensionValue): FlexStyle["paddingEnd"] => value,
  paddingHorizontal: (value: DimensionValue): FlexStyle["paddingHorizontal"] =>
    value,
  paddingInline: (value: DimensionValue): FlexStyle["paddingInline"] => value,
  paddingInlineEnd: (value: DimensionValue): FlexStyle["paddingInlineEnd"] =>
    value,
  paddingInlineStart: (
    value: DimensionValue,
  ): FlexStyle["paddingInlineStart"] => value,
  paddingLeft: (value: DimensionValue): FlexStyle["paddingLeft"] => value,
  paddingRight: (value: DimensionValue): FlexStyle["paddingRight"] => value,
  paddingStart: (value: DimensionValue): FlexStyle["paddingStart"] => value,
  paddingTop: (value: DimensionValue): FlexStyle["paddingTop"] => value,
  paddingVertical: (value: DimensionValue): FlexStyle["paddingVertical"] =>
    value,

  position: (value: PositionType): FlexStyle["position"] => {
    switch (value) {
      case PositionType.Absolute:
        return "absolute";
      case PositionType.Relative:
        return "relative";
      case PositionType.Static:
        return "static";
      default:
        return "relative";
    }
  },

  right: (value: DimensionValue): FlexStyle["right"] => value,
  start: (value: DimensionValue): FlexStyle["start"] => value,
  top: (value: DimensionValue): FlexStyle["top"] => value,
  width: (value: DimensionValue): FlexStyle["width"] => value,

  direction: (value: Direction): FlexStyle["direction"] => {
    switch (value) {
      case Direction.Inherit:
        return "inherit";
      case Direction.LTR:
        return "ltr";
      case Direction.RTL:
        return "rtl";
      default:
        return undefined;
    }
  },
};

export interface FlexStyle {
  alignContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "stretch"
    | "space-between"
    | "space-around"
    | undefined;

  alignItems?: FlexAlignType | undefined;

  alignSelf?: "auto" | FlexAlignType | undefined;

  aspectRatio?: number | string | undefined;

  borderBottomWidth?: number | undefined;

  borderEndWidth?: number | undefined;

  borderLeftWidth?: number | undefined;

  borderRightWidth?: number | undefined;

  borderStartWidth?: number | undefined;

  borderTopWidth?: number | undefined;

  borderWidth?: number | undefined;

  bottom?: DimensionValue | undefined;

  display?: "none" | "flex" | undefined;

  end?: DimensionValue | undefined;

  flex?: number | undefined;

  flexBasis?: DimensionValue | undefined;

  flexDirection?:
    | "row"
    | "column"
    | "row-reverse"
    | "column-reverse"
    | undefined;

  rowGap?: number | undefined;

  gap?: number | undefined;

  columnGap?: number | undefined;

  flexGrow?: number | undefined;

  flexShrink?: number | undefined;

  flexWrap?: "wrap" | "nowrap" | "wrap-reverse" | undefined;

  height?: DimensionValue | undefined;

  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | undefined;

  left?: DimensionValue | undefined;

  margin?: DimensionValue | undefined;

  marginBlock?: DimensionValue | undefined;

  marginBlockEnd?: DimensionValue | undefined;

  marginBlockStart?: DimensionValue | undefined;

  marginBottom?: DimensionValue | undefined;

  marginEnd?: DimensionValue | undefined;

  marginHorizontal?: DimensionValue | undefined;

  marginInline?: DimensionValue | undefined;

  marginInlineEnd?: DimensionValue | undefined;

  marginInlineStart?: DimensionValue | undefined;

  marginLeft?: DimensionValue | undefined;

  marginRight?: DimensionValue | undefined;

  marginStart?: DimensionValue | undefined;

  marginTop?: DimensionValue | undefined;

  marginVertical?: DimensionValue | undefined;

  maxHeight?: DimensionValue | undefined;

  maxWidth?: DimensionValue | undefined;

  minHeight?: DimensionValue | undefined;

  minWidth?: DimensionValue | undefined;

  overflow?: "visible" | "hidden" | "scroll" | undefined;

  padding?: DimensionValue | undefined;

  paddingBottom?: DimensionValue | undefined;

  paddingBlock?: DimensionValue | undefined;

  paddingBlockEnd?: DimensionValue | undefined;

  paddingBlockStart?: DimensionValue | undefined;

  paddingEnd?: DimensionValue | undefined;

  paddingHorizontal?: DimensionValue | undefined;

  paddingInline?: DimensionValue | undefined;

  paddingInlineEnd?: DimensionValue | undefined;

  paddingInlineStart?: DimensionValue | undefined;

  paddingLeft?: DimensionValue | undefined;

  paddingRight?: DimensionValue | undefined;

  paddingStart?: DimensionValue | undefined;

  paddingTop?: DimensionValue | undefined;

  paddingVertical?: DimensionValue | undefined;

  position?: "absolute" | "relative" | "static" | undefined;

  right?: DimensionValue | undefined;

  start?: DimensionValue | undefined;

  top?: DimensionValue | undefined;

  width?: DimensionValue | undefined;

  zIndex?: number | undefined;

  /**

       * @platform ios

       */

  direction?: "inherit" | "ltr" | "rtl" | undefined;
}

export type YogaNode = Node;

const flexStyleKeys: (keyof FlexStyle)[] = [
  "alignContent",
  "alignItems",
  "alignSelf",
  "aspectRatio",
  "borderBottomWidth",
  "borderEndWidth",
  "borderLeftWidth",
  "borderRightWidth",
  "borderStartWidth",
  "borderTopWidth",
  "borderWidth",
  "bottom",
  "display",
  "end",
  "flex",
  "flexBasis",
  "flexDirection",
  "rowGap",
  "gap",
  "columnGap",
  "flexGrow",
  "flexShrink",
  "flexWrap",
  "height",
  "justifyContent",
  "left",
  "margin",
  "marginBlock",
  "marginBlockEnd",
  "marginBlockStart",
  "marginBottom",
  "marginEnd",
  "marginHorizontal",
  "marginInline",
  "marginInlineEnd",
  "marginInlineStart",
  "marginLeft",
  "marginRight",
  "marginStart",
  "marginTop",
  "marginVertical",
  "maxHeight",
  "maxWidth",
  "minHeight",
  "minWidth",
  "overflow",
  "padding",
  "paddingBottom",
  "paddingBlock",
  "paddingBlockEnd",
  "paddingBlockStart",
  "paddingEnd",
  "paddingHorizontal",
  "paddingInline",
  "paddingInlineEnd",
  "paddingInlineStart",
  "paddingLeft",
  "paddingRight",
  "paddingStart",
  "paddingTop",
  "paddingVertical",
  "position",
  "right",
  "start",
  "top",
  "width",
  "direction",
];

export type YogaNodeLayout = {
  left: number;
  right: number;
  top: number;
  bottom: number;
  width: number;
  height: number;
};

const Setters = {
  alignContent(yogaNode: YogaNode, alignContent: Align) {
    yogaNode.setAlignContent(alignContent);
  },
  alignItems(yogaNode: YogaNode, alignItems: Align) {
    yogaNode.setAlignItems(alignItems);
  },
  alignSelf(yogaNode: YogaNode, alignSelf: Align) {
    yogaNode.setAlignSelf(alignSelf);
  },
  aspectRatio(yogaNode: YogaNode, aspectRatio: number | undefined) {
    yogaNode.setAspectRatio(aspectRatio);
  },
  borderLeftWidth(yogaNode: YogaNode, borderWidth: number | undefined) {
    yogaNode.setBorder(Edge.Left, borderWidth);
  },
  borderRightWidth(yogaNode: YogaNode, borderWidth: number | undefined) {
    yogaNode.setBorder(Edge.Right, borderWidth);
  },
  borderTopWidth(yogaNode: YogaNode, borderWidth: number | undefined) {
    yogaNode.setBorder(Edge.Top, borderWidth);
  },
  borderBottomWidth(yogaNode: YogaNode, borderWidth: number | undefined) {
    yogaNode.setBorder(Edge.Bottom, borderWidth);
  },
  borderWidth(yogaNode: YogaNode, borderWidth: number | undefined) {
    yogaNode.setBorder(Edge.All, borderWidth);
  },
  direction(yogaNode: YogaNode, direction: Direction) {
    yogaNode.setDirection(direction);
  },
  display(yogaNode: YogaNode, display: Display) {
    yogaNode.setDisplay(display);
  },
  flex(yogaNode: YogaNode, flex: number | undefined) {
    yogaNode.setFlex(flex);
  },
  flexBasis(
    yogaNode: YogaNode,
    flexBasis: number | "auto" | `${number}%` | undefined,
  ) {
    yogaNode.setFlexBasis(flexBasis);
  },
  flexBasisAuto(yogaNode: YogaNode) {
    yogaNode.setFlexBasisAuto();
  },
  flexDirection(yogaNode: YogaNode, flexDirection: FlexDirection) {
    yogaNode.setFlexDirection(flexDirection);
  },
  flexGrow(yogaNode: YogaNode, flexGrow: number | undefined) {
    yogaNode.setFlexGrow(flexGrow);
  },
  flexShrink(yogaNode: YogaNode, flexShrink: number | undefined) {
    yogaNode.setFlexShrink(flexShrink);
  },
  flexWrap(yogaNode: YogaNode, flexWrap: Wrap) {
    yogaNode.setFlexWrap(flexWrap);
  },
  width(
    yogaNode: YogaNode,
    height: number | "auto" | `${number}%` | undefined,
  ) {
    yogaNode.setWidth(height);
  },
  height(
    yogaNode: YogaNode,
    height: number | "auto" | `${number}%` | undefined,
  ) {
    yogaNode.setHeight(height);
  },
  justifyContent(yogaNode: YogaNode, justifyContent: Justify) {
    yogaNode.setJustifyContent(justifyContent);
  },
  gap(yogaNode: YogaNode, gapLength: number | `${number}%` | undefined) {
    yogaNode.setGap(Gutter.All, gapLength);
  },
  rowGap(yogaNode: YogaNode, gapLength: number | `${number}%` | undefined) {
    yogaNode.setGap(Gutter.Row, gapLength);
  },
  columnGap(yogaNode: YogaNode, gapLength: number | `${number}%` | undefined) {
    yogaNode.setGap(Gutter.Column, gapLength);
  },
  marginLeft(
    yogaNode: YogaNode,
    margin: number | "auto" | `${number}%` | undefined,
  ) {
    yogaNode.setMargin(Edge.Left, margin);
  },
  marginRight(
    yogaNode: YogaNode,
    margin: number | "auto" | `${number}%` | undefined,
  ) {
    yogaNode.setMargin(Edge.Right, margin);
  },
  marginTop(
    yogaNode: YogaNode,
    margin: number | "auto" | `${number}%` | undefined,
  ) {
    yogaNode.setMargin(Edge.Top, margin);
  },
  marginBottom(
    yogaNode: YogaNode,
    margin: number | "auto" | `${number}%` | undefined,
  ) {
    yogaNode.setMargin(Edge.Bottom, margin);
  },

  maxHeight(yogaNode: YogaNode, maxHeight: number | `${number}%` | undefined) {
    yogaNode.setMaxHeight(maxHeight);
  },
  maxWidth(yogaNode: YogaNode, maxWidth: number | `${number}%` | undefined) {
    yogaNode.setMaxWidth(maxWidth);
  },
  minHeight(yogaNode: YogaNode, minHeight: number | `${number}%` | undefined) {
    yogaNode.setMinHeight(minHeight);
  },
  minWidth(yogaNode: YogaNode, minWidth: number | `${number}%` | undefined) {
    yogaNode.setMinWidth(minWidth);
  },
  overflow(yogaNode: YogaNode, overflow: Overflow) {
    yogaNode.setOverflow(overflow);
  },
  paddingLeft(yogaNode: YogaNode, padding: number | `${number}%` | undefined) {
    yogaNode.setPadding(Edge.Left, padding);
  },
  paddingRight(yogaNode: YogaNode, padding: number | `${number}%` | undefined) {
    yogaNode.setPadding(Edge.Right, padding);
  },
  paddingTop(yogaNode: YogaNode, padding: number | `${number}%` | undefined) {
    yogaNode.setPadding(Edge.Top, padding);
  },
  paddingBottom(
    yogaNode: YogaNode,
    padding: number | `${number}%` | undefined,
  ) {
    yogaNode.setPadding(Edge.Bottom, padding);
  },
  padding(yogaNode: YogaNode, padding: number | `${number}%` | undefined) {
    yogaNode.setPadding(Edge.All, padding);
  },
  top(yogaNode: YogaNode, top: number | `${number}%` | undefined) {
    yogaNode.setPosition(Edge.Top, top);
  },
  left(yogaNode: YogaNode, left: number | `${number}%` | undefined) {
    yogaNode.setPosition(Edge.Left, left);
  },
  right(yogaNode: YogaNode, right: number | `${number}%` | undefined) {
    yogaNode.setPosition(Edge.Right, right);
  },
  bottom(yogaNode: YogaNode, bottom: number | `${number}%` | undefined) {
    yogaNode.setPosition(Edge.Bottom, bottom);
  },
  end(yogaNode: YogaNode, end: number | `${number}%` | undefined) {
    yogaNode.setPosition(Edge.End, end);
  },
  start(yogaNode: YogaNode, start: number | `${number}%` | undefined) {
    yogaNode.setPosition(Edge.Start, start);
  },
  marginBlock(yogaNode: YogaNode, margin: number | `${number}%` | undefined) {
    yogaNode.setMargin(Edge.Vertical, margin);
  },
  marginBlockEnd(
    yogaNode: YogaNode,
    margin: number | `${number}%` | undefined,
  ) {
    yogaNode.setMargin(Edge.Bottom, margin);
  },
  marginBlockStart(
    yogaNode: YogaNode,
    margin: number | `${number}%` | undefined,
  ) {
    yogaNode.setMargin(Edge.Top, margin);
  },
  paddingBlock(yogaNode: YogaNode, padding: number | `${number}%` | undefined) {
    yogaNode.setPadding(Edge.Vertical, padding);
  },
  paddingBlockEnd(
    yogaNode: YogaNode,
    padding: number | `${number}%` | undefined,
  ) {
    yogaNode.setPadding(Edge.Bottom, padding);
  },
  paddingBlockStart(
    yogaNode: YogaNode,
    padding: number | `${number}%` | undefined,
  ) {
    yogaNode.setPadding(Edge.Top, padding);
  },
  paddingHorizontal(
    yogaNode: YogaNode,
    padding: number | `${number}%` | undefined,
  ) {
    yogaNode.setPadding(Edge.Horizontal, padding);
  },
  paddingVertical(
    yogaNode: YogaNode,
    padding: number | `${number}%` | undefined,
  ) {
    yogaNode.setPadding(Edge.Vertical, padding);
  },
  marginVertical(
    yogaNode: YogaNode,
    margin: number | `${number}%` | undefined,
  ) {
    yogaNode.setMargin(Edge.Vertical, margin);
  },
  marginHorizontal(
    yogaNode: YogaNode,
    margin: number | `${number}%` | undefined,
  ) {
    yogaNode.setMargin(Edge.Horizontal, margin);
  },
  marginStart(yogaNode: YogaNode, margin: number | `${number}%` | undefined) {
    yogaNode.setMargin(Edge.Start, margin);
  },
  marginEnd(yogaNode: YogaNode, margin: number | `${number}%` | undefined) {
    yogaNode.setMargin(Edge.End, margin);
  },
  paddingStart(yogaNode: YogaNode, padding: number | `${number}%` | undefined) {
    yogaNode.setPadding(Edge.Start, padding);
  },
};

export const Layout = {
  createYogaNode,
  ConvertToYogaValue,
  ConvertFromYogaValue,
  propertiesList: flexStyleKeys,
  computeAndLayout,
  Setters,
};
