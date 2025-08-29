import {
  Avatar,
  BannerPreview,
  Icons,
  Row,
  Typography,
} from "@components/atoms";
import {
  ItemCategory,
  IUserJourneyEvent,
  JourneyEventAction,
  JourneyEventSchemaType,
} from "@models/collections";
import { Colors } from "@theme";
import React, { useMemo } from "react";
import { DollarSign, Heart, Star } from "react-native-feather";
import S from "./JourneyEvent.styles";
import { useTranslation } from "react-i18next";
import WorkoutInfo from "../WorkoutInfo/WorkoutInfo";
import { View } from "react-native";

interface JourneyEventInfoProps {
  event: IUserJourneyEvent;
}

const JourneyEventInfo: React.FC<JourneyEventInfoProps> = ({ event }) => {
  const { t } = useTranslation();

  const item = useMemo(() => {
    if (event.action === JourneyEventAction.BUY) {
      return event.data.item;
    }
    return null;
  }, [event.data]);

  const addFriendEvent =
    event.action === JourneyEventAction.ADD &&
    event.schema === JourneyEventSchemaType.Friend;

  return (
    <S.Container>
      {event.action === JourneyEventAction.START && (
        <S.EventCard>
          <Star
            width={20}
            height={20}
            stroke={Colors.colors.primary}
            fill={Colors.colors.primary}
            fillOpacity={0.2}
          />

          <Typography.Body _t>{"journey.events.start"}</Typography.Body>
        </S.EventCard>
      )}

      {event.action === JourneyEventAction.PAID && event.data.workout && (
        <WorkoutInfo
          workout={event.data.workout}
          loggedUserWorkout
          showDateTime={false}
        />
      )}

      {event.action === JourneyEventAction.BUY && item && (
        <S.EventRow>
          <S.EventWithBanner>
            <BannerPreview
              preview={
                item?.category === ItemCategory.Figure ? item?.file?.url : ""
              }
              size={48}
              iconSize={20}
            />
            <S.EventInfo>
              <Typography.Body
                textColor="textDark"
                _t
                _params={{
                  itemName: item?.name,
                }}
              >
                {"journey.events.buy"}
              </Typography.Body>

              <Typography.Caption textColor="textLight" _t>
                {"itemCategoryTypes." + item?.category}
              </Typography.Caption>
            </S.EventInfo>
          </S.EventWithBanner>

          <Row gap={6} align="center" width={"auto"}>
            <Typography.Button textColor="danger">
              - {item.price}
            </Typography.Button>
            <S.CoinWrapper>
              <DollarSign
                width={10}
                height={10}
                strokeWidth={2}
                stroke={Colors.colors.secondary}
                fill={Colors.colors.secondary}
                fillOpacity={0.2}
              />
            </S.CoinWrapper>
          </Row>
        </S.EventRow>
      )}

      {event.action === JourneyEventAction.ADD && !addFriendEvent && (
        <S.EventCard>
          <S.EventInfo>
            <S.EventWithBanner>
              {event.schema === JourneyEventSchemaType.Healthy && (
                <Heart
                  width={20}
                  height={20}
                  strokeWidth={1.5}
                  stroke={Colors.colors.primary}
                  fill={Colors.colors.primary}
                  fillOpacity={0.2}
                />
              )}
              <Typography.Body _t>
                {`journey.events.add.${event.schema}`}
              </Typography.Body>
            </S.EventWithBanner>
            {event.schema === JourneyEventSchemaType.Healthy &&
              event.data.healthy_info && (
                <Row gap={12} width={"auto"} align="center">
                  <Typography.Caption textColor="textLight">
                    {`${event.data.healthy_info.weight} Kg`}
                  </Typography.Caption>

                  <Typography.Caption textColor="textLight">
                    {`${event.data.healthy_info.height} cm`}
                  </Typography.Caption>

                  <Typography.Caption
                    textColor="textLight"
                    _t
                    _params={{
                      bf: event.data.healthy_info.body_fat,
                    }}
                  >
                    {`journey.events.bodyFat`}
                  </Typography.Caption>
                </Row>
              )}
          </S.EventInfo>
        </S.EventCard>
      )}

      {event.action === JourneyEventAction.FOLLOW && event.data.user && (
        <S.EventRow>
          <S.EventWithBanner>
            <Avatar
              size={48}
              iconSize={20}
              preview={event.data.user?.avatar?.url}
              disabled
              borderOffset={1}
            />
            <S.EventInfo>
              <Typography.Body
                textColor="textDark"
                _t
                _params={{
                  name: event.data.user?.name,
                }}
              >
                {"journey.events.follow"}
              </Typography.Body>
            </S.EventInfo>
          </S.EventWithBanner>
        </S.EventRow>
      )}

      {event.action === JourneyEventAction.JOIN && event.data.crew && (
        <S.EventRow>
          <S.EventWithBanner>
            <BannerPreview
              size={48}
              preview={event.data.crew?.banner?.url}
            ></BannerPreview>
            <S.EventInfo>
              <Typography.Body
                textColor="textDark"
                _t
                _params={{
                  name: event.data.crew?.name,
                }}
              >
                {"journey.events.join"}
              </Typography.Body>
            </S.EventInfo>
          </S.EventWithBanner>
        </S.EventRow>
      )}

      {event.action === JourneyEventAction.LEAVE && <></>}

      {event.action === JourneyEventAction.LOSE_STREAK && <></>}
    </S.Container>
  );
};

export default JourneyEventInfo;
