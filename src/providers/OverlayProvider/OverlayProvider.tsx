import { ItemPreview, Missions, UserSelectTitle, WorkoutImageViewer } from "@components/dialogs";
import { OverlayType } from "@models/generic";
import { StoreState } from "@store/Store";
import { ReactElement } from "react";
import { useSelector } from "react-redux";

const OverlayProvider = () => {
  const { showing } = useSelector((state: StoreState) => state.overlay);

  const componentMap: Record<OverlayType, ReactElement> = {
    UserSelectTitle: <UserSelectTitle />,
    WorkoutImageViewer: <WorkoutImageViewer />,
    ItemPreview: <ItemPreview />,
    Missions: <Missions />,
  };

  return <>{showing && componentMap[showing]}</>;
};

export default OverlayProvider;
