import { CreateCrewSteps } from "@models/collections";
import { CreateCrewActions } from "@store/slices";
import { StoreState } from "@store/Store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import S from "./CreateCrew.styles";
import CreateCrewInfoStep from "./steps/CreateCrewInfoStep";
import CreateCrewSettingsStep from "./steps/CreateCrewSettingsStep";

interface CreateCrewProps {}

const CreateCrew: React.FC<CreateCrewProps> = () => {
  const dispatch = useDispatch();
  const { step } = useSelector((state: StoreState) => state.createCrew);

  useEffect(() => {
    return () => {
      dispatch(CreateCrewActions.clear());
    };
  }, []);

  return (
    <S.Container>
      {step === CreateCrewSteps.Info && <CreateCrewInfoStep />}
      {step === CreateCrewSteps.Settings && <CreateCrewSettingsStep />}
    </S.Container>
  );
};

export default CreateCrew;
