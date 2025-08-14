import "@emotion/react";
import { TColorsType } from "./colors/colors";

declare module "@emotion/react" {
  export interface Theme {
    colors: TColorsType;
  }
}
