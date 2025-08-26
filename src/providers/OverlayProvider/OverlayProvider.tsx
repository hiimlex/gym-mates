import { ItemPreview, UserSelectTitle, WorkoutImageViewer } from "@components/molecules";
import { OverlayType } from "@models/generic";
import { StoreState } from "@store/Store";
import { ReactElement } from "react";
import { useSelector } from "react-redux";

const OverlayProvider = () => {
  const { showing, data } = useSelector((state: StoreState) => state.overlay);

  const componentMap: Record<OverlayType, ReactElement> = {
    UserSelectTitle: <UserSelectTitle />,
    WorkoutImageViewer: <WorkoutImageViewer />,
    ItemPreview: <ItemPreview />,
  };

  return <>{showing && componentMap[showing]}</>;
};

export default OverlayProvider;
