import { AppDispatch, StoreState } from "@store/Store";
import { useDispatch, useSelector } from "react-redux";
import { Dialog } from "../../atoms/";
import { DialogActions } from "@store/slices";
import React, { cloneElement } from "react";

const DialogProvider: React.FC = () => {
  const { content, isOpen, data, canGoBack } = useSelector(
    (state: StoreState) => state.dialog
  );
  const {isAuthenticated} = useSelector((state: StoreState) => state.user);

  const dispatch = useDispatch<AppDispatch>();

  if (!isOpen) {
    return null;
  }

  const handleBackPress = () => {
    if (canGoBack) {
      dispatch(DialogActions.moveToPreviousDialog());
      return;
    }

    if (!!data?.onBackPress) {
      data.onBackPress();

      return;
    }

    dispatch(DialogActions.closeDialog());
  };

  if(!isAuthenticated) {
    return null;
  }

  return (
    <Dialog {...data} onBackPress={handleBackPress}>
      {!!content && cloneElement(content as React.ReactElement, {})}
    </Dialog>
  );
};

export default DialogProvider;
