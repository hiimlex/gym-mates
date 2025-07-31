import { Badge, Card, Row, Typography } from "@components/atoms";
import { ScreenWrapper } from "@components/molecules";
import { AppRoutes, TRootStackParamList } from "@navigation/appRoutes";
import { useHeaderHeight } from "@react-navigation/elements";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StoreState } from "@store/store";
import { Colors } from "@theme";
import React, { useState } from "react";
import { View } from "react-native";
import { ArrowDown, ArrowRight, Code, User } from "react-native-feather";
import { useSelector } from "react-redux";
import S from "./styles";
import { ICrew, ICrewsFilters } from "@models/collections";
import BannerPreview from "@components/atoms/BannerPreview/BannerPreview";

const Crews: React.FC<
  NativeStackScreenProps<TRootStackParamList, AppRoutes.Crews>
> = ({ navigation: { navigate } }) => {
  const { crews } = useSelector((state: StoreState) => state.crews);
  const { user } = useSelector((state: StoreState) => state.user);
  const headerHeight = useHeaderHeight();

  const [myCrews, setMyCrews] = useState(crews);
  const [filters, setFilters] = useState<ICrewsFilters>();

  const navigateToCrew = (crew: ICrew) => {
    navigate(AppRoutes.CrewView, { crew });
  };

  return (
    <ScreenWrapper>
      <S.Container
        style={{ padding: 24, paddingTop: headerHeight + 24, gap: 24 }}
      >
        <View style={{ gap: 12 }}>
          <Typography.Heading fontWeight="medium" _t>
            {"crews.title"}
          </Typography.Heading>

          <Row gap={12} align="center">
            <Badge label="crews.filters.joined" _t />
            <Badge label="crews.filters.favorites" _t />
            {/* <S.FilterItem activeOpacity={0.6}>
              <Typography.Button textColor="textLight" _t>
                {"crews.filters.joined"}
              </Typography.Button>

              <ArrowDown
                width={16}
                height={16}
                strokeWidth={2}
                stroke={Colors.colors.textLight}
              />
            </S.FilterItem>

            <S.FilterItem activeOpacity={0.6}>
              <Typography.Button textColor="textLight" _t>
                {"crews.filters.favorites"}
              </Typography.Button>

              <ArrowDown
                width={16}
                height={16}
                strokeWidth={2}
                stroke={Colors.colors.textLight}
              />
            </S.FilterItem> */}
          </Row>
        </View>

        <S.ScrollList>
          {crews.map((crew, index) => (
            <S.CrewCard key={index} touchable onPress={() => navigateToCrew(crew)}>
              <Row justify="space-between" align="center">
                <Row gap={12} align="center" style={{ flex: 1 }} width={"auto"}>
                  {crew.banner && (
                    <BannerPreview preview={crew.banner.url} size={48} />
                  )}

                  <View style={{ gap: 6 }}>
                    <Typography.Body textColor="primary" _t>
                      {crew.name}
                    </Typography.Body>

                    <Row gap={12}>
                      <Row gap={3} align="center" width={"auto"}>
                        <Code
                          width={16}
                          height={16}
                          stroke={Colors.colors.text}
                        />
                        <Typography.Caption textColor="text">
                          {crew.code}
                        </Typography.Caption>
                      </Row>
                      <Row gap={3} align="center" width={"auto"}>
                        <User
                          width={16}
                          height={16}
                          stroke={Colors.colors.text}
                          fill={Colors.colors.text}
                          fillOpacity={0.2}
                        />
                        <Typography.Caption textColor="text">
                          {crew.members_w_user.length}
                        </Typography.Caption>
                      </Row>
                    </Row>
                  </View>
                </Row>
                <ArrowRight
                  width={24}
                  height={24}
                  stroke={Colors.colors.primary}
                />
              </Row>
            </S.CrewCard>
          ))}
        </S.ScrollList>
      </S.Container>
    </ScreenWrapper>
  );
};

export default Crews;
