import React from "react";
import S from "./CreateCrew.styles";
import { useSelector } from "react-redux";
import { StoreState } from "@store/Store";
import { CreateCrewSteps } from "@models/collections";
import CreateCrewInfoStep from "./steps/CreateCrewInfoStep";
import CreateCrewSettingsStep from "./steps/CreateCrewSettingsStep";

interface CreateCrewProps {}

const CreateCrew: React.FC<CreateCrewProps> = () => {
  const { step } = useSelector((state: StoreState) => state.createCrew);

  return (
    <S.Container>
      {step === CreateCrewSteps.Info && <CreateCrewInfoStep />}
      {step === CreateCrewSteps.Settings && <CreateCrewSettingsStep />}
    </S.Container>
  );
};

export default CreateCrew;
