import { UsersService } from "@api/services";
import { Badge, Loader, Row, Typography } from "@components/atoms";
import { JourneyEventInfo, ScreenWrapper } from "@components/molecules";
import { IGetJourneyFilters, JourneyEventAction } from "@models/collections";
import { AppRoutes, ScreenProps, TRootStackParamList } from "@navigation/appRoutes";
import { useHeaderHeight } from "@react-navigation/elements";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StoreState } from "@store/Store";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import S from "./UserJourney.styles";
import { QueryKeys } from "@models/generic";

const UserJourney: React.FC<
  ScreenProps<AppRoutes.UserJourney>
> = () => {
  const headerHeight = useHeaderHeight();
  const { user } = useSelector((state: StoreState) => state.user);
  const [filters, setFilters] = useState<IGetJourneyFilters>({
    sort: "recent",
  });

  const { data, isLoading } = useQuery({
    queryFn: () => {
      return UsersService.getJourney(filters);
    },
    queryKey: [QueryKeys.User.Journey, filters.sort, filters.action],
  });

  const setRecentFilter = () => {
    const newValue = filters.sort === "recent" ? undefined : "recent";
    setFilters((prev) => ({
      ...prev,
      sort: newValue,
    }));
  };

  const setActionFilter = (action?: JourneyEventAction) => {
    if (action === filters.action) {
      action = undefined;
    }

    setFilters((prev) => ({
      ...prev,
      action,
    }));
  };

  return (
    <ScreenWrapper>
      <S.Container style={{ paddingTop: headerHeight + 24 }}>
        <S.Header>
          <Typography.Heading _t>{"journey.title"}</Typography.Heading>

          <Row gap={12} align="center" width={"auto"}>
            <Badge
              label={"journey.filters.recent"}
              _t
              touchable
              active={filters.sort === "recent"}
              onPress={setRecentFilter}
            />

            <Badge
              label={"journey.events.paid"}
              _t
              touchable
              active={filters.action === JourneyEventAction.PAID}
              onPress={() => setActionFilter(JourneyEventAction.PAID)}
            />
          </Row>
        </S.Header>
        <S.ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            gap: 0,
            flexGrow: 1,
          }}
        >
          {isLoading && (
            <S.LoaderWrapper>
              <Loader color="primary" />
            </S.LoaderWrapper>
          )}

          {!isLoading &&
            data?.data &&
            data.data.events.map((event) => (
              <S.JourneyEventWrapper key={event.created_at}>
                <S.Timeline>
                  <S.HistoryLine></S.HistoryLine>
                  <S.EventDot />
                </S.Timeline>
                <S.JourneyEvent>
                  <Typography.Caption textColor="textLight">
                    {format(new Date(event.created_at), "dd/MM/yy HH:mm")}
                  </Typography.Caption>

                  <JourneyEventInfo event={event} />
                </S.JourneyEvent>
              </S.JourneyEventWrapper>
            ))}
        </S.ScrollView>
      </S.Container>
    </ScreenWrapper>
  );
};

export default UserJourney;
