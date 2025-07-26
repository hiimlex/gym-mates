import "@emotion/react";
import { TColors } from "./colors";

declare module "@emotion/react" {
  export interface Theme {
    colors: TColors;
  }
}
