import React from "react";
import S from "./LeaveCrew.styles";
import { useMutation } from "@tanstack/react-query";
import { CrewsService } from "@api/services";
import { client } from "@api/apollo";
import { useDispatch, useSelector } from "react-redux";
import { DialogActions, NotifierActions } from "@store/slices";
import { AppRoutes } from "@navigation/appRoutes";
import { useAppNavigation } from "@hooks/useAppNavigation/useAppNavigation";
import { getMessageFromError } from "@utils/handleAxiosError";
import { Button, Row, Typography } from "@components/atoms";
import { StoreState } from "@store/Store";

interface LeaveCrewProps {
  crewCode: string;
}

const LeaveCrew: React.FC<LeaveCrewProps> = ({ crewCode }) => {
  const dispatch = useDispatch();
  const { navigate } = useAppNavigation();
  const { crewView: crew } = useSelector((state: StoreState) => state.crews);

  const { mutate: leaveCrew, isPending } = useMutation({
    mutationFn: () => CrewsService.leave(crewCode),
    onSuccess: async () => {
      await client.refetchQueries({
        include: ["CrewsByMember"],
      });
      dispatch(DialogActions.closeDialog());
      navigate(AppRoutes.Home);
    },
    onError: (error) => {
      const message = getMessageFromError(error);

      if (message) {
        dispatch(
          NotifierActions.createNotification({
            id: "leave-crew-error",
            type: "error",
            message,
          })
        );
      }
    },
  });

  return (
    <S.Container>
      <Typography.Body _t>{"leaveCrew.body"}</Typography.Body>
      <Row align="center" gap={24}>
        <Button
          title="leaveCrew.buttons.no"
          colorScheme="primary"
          variant="outlined"
          styles={{ flex: 1 }}
          onPress={() => dispatch(DialogActions.moveToPreviousDialog())}
        />
        <Button
          title="leaveCrew.buttons.yes"
          colorScheme="danger"
          onPress={() => leaveCrew()}
          styles={{ flex: 1 }}
          loading={isPending}
        />
      </Row>
    </S.Container>
  );
};

export default LeaveCrew;
