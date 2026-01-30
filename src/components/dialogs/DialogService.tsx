import { AddWorkoutActions, CameraActions, DialogActions } from "@store/slices";
import { store } from "@store/Store";
import AddWorkout from "./AddWorkout/AddWorkout";
import CoinSystemInfo from "./CoinSystemInfo/CoinSystemInfo";
import CreateCrew from "./CreateCrew/CreateCrew";
import CrewRulesInfo from "./CrewRulesInfo/CrewRulesInfo";
import CrewSettings from "./CrewSettings/CrewSettings";
import EditCrewSettings from "./EditCrewSettings/EditCrewSettings";
import JoinCrew from "./JoinCrew/JoinCrew";
import ShareWorkout from "./ShareWorkout/ShareWorkout";

const openAddWorkout = () => {
  store.dispatch(
    DialogActions.openDialog({
      content: <AddWorkout />,
      data: {
        title: "links.addWorkout",
        _t: true,
        onBackPress: () => {
          store.dispatch(AddWorkoutActions.reset());
          store.dispatch(CameraActions.clear());
          store.dispatch(DialogActions.closeDialog());
        },
      },
    }),
  );
};

const openShareToCrews = () => {
  store.dispatch(
    DialogActions.openDialog({
      content: <ShareWorkout />,
      data: {
        title: "links.shareInCrew",
        _t: true,
      },
    }),
  );
};

const openJoinCrew = () => {
  store.dispatch(
    DialogActions.openDialog({
      content: <JoinCrew />,
      data: {
        title: "links.joinCrew",
        _t: true,
      },
    }),
  );
};

const openCreateCrew = () => {
  store.dispatch(
    DialogActions.openDialog({
      content: <CreateCrew />,
      data: {
        title: "links.createCrew",
        _t: true,
      },
    }),
  );
};

const openCrewSettings = () => {
  store.dispatch(
    DialogActions.openDialog({
      content: <CrewSettings />,
      data: {
        title: "links.crewSettings",
        _t: true,
      },
    }),
  );
};

const openEditCrewSettings = () => {
  store.dispatch(
    DialogActions.openDialog({
      content: <EditCrewSettings />,
      data: {
        title: "crewSettings.editCrew.title",
        _t: true,
        onBackPress: openCrewSettings,
      },
    }),
  );
};

const openCoinSystemInfo = () => {
  store.dispatch(
    DialogActions.openDialog({
      content: <CoinSystemInfo />,
      data: {
        title: "coinSystem.title",
        _t: true,
      },
    }),
  );
};

const openStreakSystemInfo = () => {
  store.dispatch(
    DialogActions.openDialog({
      content: <></>,
      data: {
        title: "streakSystem.title",
        _t: true,
      },
    }),
  );
};

const openCrewRulesInfo = () => {
  store.dispatch(
    DialogActions.openDialog({
      content: <CrewRulesInfo />,
      data: {
        title: "crewRules.title",
        _t: true,
      },
    }),
  );
};

export const Dialogs = {
  openAddWorkout,
  openJoinCrew,
  openCrewSettings,
  openCreateCrew,
  openEditCrewSettings,
  openShareToCrews,
  openCoinSystemInfo,
  openStreakSystemInfo,
  openCrewRulesInfo,
};
