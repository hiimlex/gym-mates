import { IRemoteCharPiece } from "@models/generic";
import { StoreState } from "@store/Store";
import React, { useEffect, useState } from "react";
import { SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";
import { replaceSvgColors } from "./CharUi.utils";

const RemoteSkin: React.FC<IRemoteCharPiece> = ({
  width,
  height,
  zIndex = 0,
  piece,
  uri,
}) => {
  const { palette } = useSelector((state: StoreState) => state.charCreation);
  const [svgText, setSvgText] = useState<string | null>(null);

  useEffect(() => {
    fetch(uri)
      .then((res) => res.text())
      .then((data) => {
        const svgWithColors = replaceSvgColors(data, palette);

        setSvgText(svgWithColors);
      });
  }, [uri, palette]);

  if (!svgText) {
    return null;
  }

  return (
    <SvgXml
      xml={svgText}
      width={width}
      height={height}
      style={{
        position: "absolute",
        zIndex,
        margin: "auto",
      }}
    />
  );
};

export default RemoteSkin;
