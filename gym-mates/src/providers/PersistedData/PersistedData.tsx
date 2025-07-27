import { UserActions } from "@store/slices";
import { AppDispatch } from "@store/store";
import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

const PersistedData: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handlePersistedUser = useCallback(async () => {
    await dispatch(UserActions.fetchCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    handlePersistedUser();
  }, [handlePersistedUser]);

  return <></>;
};

export default PersistedData;
