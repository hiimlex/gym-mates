import { AppDispatch, StoreState } from "@store/store";
import { useDispatch, useSelector } from "react-redux";
import { Dialog } from "../../atoms/";
import { DialogActions } from "@store/slices";
import React, { cloneElement } from "react";

const DialogProvider: React.FC = () => {
  const { content, isOpen, data } = useSelector(
    (state: StoreState) => state.dialog
  );

  const dispatch = useDispatch<AppDispatch>();

  if (!isOpen) {
    return null;
  }

  const handleBackPress = () => {
    if (data?.onBackPress) {
      data.onBackPress();

      return;
    }

    dispatch(DialogActions.closeDialog());
  };

  return (
    <Dialog {...data} onBackPress={handleBackPress}>
      {!!content && cloneElement(content as React.ReactElement, {})}
    </Dialog>
  );
};

export default DialogProvider;
