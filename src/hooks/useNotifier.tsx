import { ICreateNotification } from "@models/generic";
import { NotifierActions } from "@store/slices";
import { useDispatch } from "react-redux";

export function useNotifier() {
  const dispatch = useDispatch();

  const notify = (payload: ICreateNotification) => {
    dispatch(NotifierActions.createNotification(payload));
  };

  const removeNotification = (id: string) => {
    dispatch(NotifierActions.removeNotification({ id }));
  };

  return { notify, removeNotification };
}
