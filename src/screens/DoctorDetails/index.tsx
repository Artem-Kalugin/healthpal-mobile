import React, { useEffect, useState } from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { toast } from 'react-hot-toast/headless';

import { DoctorDetailsCard } from '#components/domain/doctor/DetailsCard';
import { DoctorFavoriteButton } from '#components/domain/doctor/FavoriteButton';
import { ReviewItem } from '#components/domain/review/Item';
import {
  HeaderWithThreeSections,
  ListExtender,
} from '#components/infrastructure';

import {
  Button,
  Loader,
  StatisticsFact,
  Text,
  TextSmall,
  TextXL,
} from '#ui-kit';

import { MainRoutes, MainScreenProps } from '#navigation/Main/types';

import { useGetDoctorQuery, useGetDoctorScheduleQuery } from '#api/Doctor';

import { headerShadow, SAFE_ZONE_BOTTOM, tabbarShadow } from '#config';
import { colors } from '#config/colors';

import { useTranslation } from '#i18n';

import { BEDoctorScheduleResponseDto } from '#generated/__entities';

export const DoctorDetails: React.FC<
  MainScreenProps<MainRoutes.DoctorDetails>
> = props => {
  const { t } = useTranslation();

  const [doctorDetails, setDoctorDetails] = useState(
    props.route.params.defaultItem,
  );
  const [shouldCutDescription, setShouldCutDescription] = useState(true);

  const doctorQuery = useGetDoctorQuery({
    path: {
      id: props.route.params.id,
    },
  });

  const doctorScheduleQuery = useGetDoctorScheduleQuery({
    path: {
      doctorId: props.route.params.id,
    },
  });

  useEffect(() => {
    if (doctorQuery.data) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- TODO: fix
      setDoctorDetails(doctorQuery.data);
    }
  }, [doctorQuery.data]);

  const descriptionCanOverflow =
    doctorDetails?.description && doctorDetails?.description?.length > 130;
  const descriptionOverflows =
    shouldCutDescription && descriptionCanOverflow ? true : false;

  const content = !doctorDetails ? (
    <Loader size="large" />
  ) : (
    <ScrollView
      contentContainerStyle={styles.mainContainer}
      refreshControl={
        <RefreshControl
          refreshing={doctorQuery.isFetching || doctorScheduleQuery.isFetching}
          onRefresh={() => {
            doctorQuery.refetch();
            doctorScheduleQuery.refetch();
          }}
        />
      }
    >
      <DoctorDetailsCard
        item={doctorDetails}
        style={styles.doctorCard}
      />

      {doctorDetails ? (
        <View style={styles.statisicsContainer}>
          <StatisticsFact
            icon="patients"
            label={t('doctorDetails.patients')}
            value={doctorDetails!.patientsCount}
          />
          <StatisticsFact
            icon="medal"
            label={t('doctorDetails.experience')}
            value={new Date().getFullYear() - doctorDetails?.practiceStartYear}
          />
          <StatisticsFact
            icon="star"
            iconProps={{
              size: 24,
            }}
            label={t('doctorDetails.rating')}
            value={+doctorDetails?.rating}
          />
          <StatisticsFact
            icon="comment"
            label={t('doctorDetails.reviews')}
            value={doctorDetails?.reviewsCount}
          />
        </View>
      ) : null}

      <View style={styles.description}>
        <TextXL
          color={colors.grayscale['800']}
          weight="700"
        >
          {t('doctorDetails.about')}
        </TextXL>
        <Text>
          <TextSmall color={colors.grayscale['500']}>
            {shouldCutDescription
              ? doctorDetails?.description.slice(0, 130)
              : doctorDetails?.description}
            {descriptionOverflows ? '... ' : ' '}
            {descriptionCanOverflow ? (
              shouldCutDescription ? (
                <TextSmall
                  key="DESCRIPTION_ACTION_UNCUT_TEXT"
                  color={colors.grayscale['900']}
                  textDecorationLine="underline"
                  onPress={() => setShouldCutDescription(old => !old)}
                >
                  {t('doctorDetails.showMore')}
                </TextSmall>
              ) : (
                <TextSmall
                  key="DESCRIPTION_ACTION_CUT_TEXT"
                  color={colors.grayscale['900']}
                  textDecorationLine="underline"
                  onPress={() => setShouldCutDescription(old => !old)}
                >
                  {t('doctorDetails.hide')}
                </TextSmall>
              )
            ) : null}
          </TextSmall>
        </Text>
      </View>

      {doctorScheduleQuery?.data ? (
        <>
          <View style={styles.scheduleContainer}>
            <TextXL
              color={colors.grayscale['800']}
              weight="700"
            >
              {t('doctorDetails.schedule')}
            </TextXL>
            <View style={styles.scheduleDays}>
              {Object.keys(doctorScheduleQuery.data).map(
                //@ts-expect-error Object.keys returns string[], backend guarantees all keys of DoctorScheduleResponseDto (1-7)
                (dayId: keyof BEDoctorScheduleResponseDto) => (
                  <View
                    key={dayId}
                    style={styles.scheduleDay}
                  >
                    <Text style={styles.scheduleDayTitle}>
                      {t(`weekDay.${dayId}`)}
                    </Text>

                    <View style={styles.scheduleRows}>
                      {doctorScheduleQuery.data![dayId].length ? (
                        doctorScheduleQuery.data![dayId]?.map(el => (
                          <View
                            key={`${el.start}${el.end}`}
                            style={styles.scheduleRow}
                          >
                            <Text style={styles.scheduleCol}>{el.start}</Text>
                            <Text>—</Text>
                            <Text
                              style={styles.scheduleCol}
                              textAlign="right"
                            >
                              {el.end}
                            </Text>
                          </View>
                        ))
                      ) : (
                        <Text>{t('doctorDetails.dayOff')}</Text>
                      )}
                    </View>
                  </View>
                ),
              )}
            </View>
          </View>
          <View style={styles.reviews}>
            <View style={styles.sectionHeader}>
              <TextXL
                color={colors.grayscale['800']}
                weight="700"
              >
                {t('doctorDetails.reviewsTitle')}
              </TextXL>
              <TouchableOpacity
                onPress={() => {
                  toast(t('doctorDetails.allReviewsSoon'));
                }}
              >
                <TextSmall
                  color={colors.grayscale['500']}
                  weight="500"
                >
                  {t('common.all')}
                </TextSmall>
              </TouchableOpacity>
            </View>
            <ReviewItem />
          </View>
        </>
      ) : (
        <Loader size="large" />
      )}

      <ListExtender />
    </ScrollView>
  );
  return (
    <View style={styles.container}>
      <HeaderWithThreeSections
        containerStyle={[styles.headerContainer, headerShadow]}
        rightElement={
          doctorDetails && (
            <DoctorFavoriteButton
              doctorId={doctorDetails?.id}
              isFavoriteOnBackend={doctorDetails?.isFavorite}
            />
          )
        }
        title={t('doctorDetails.title')}
        titleTextAlign="center"
      />
      {content}
      <View style={[styles.footer, tabbarShadow]}>
        <Button
          disabled={!doctorDetails}
          onPress={() =>
            props.navigation.navigate(MainRoutes.ScheduleAppointment, {
              doctorId: props.route.params.id,
            })
          }
        >
          {t('doctorDetails.book')}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayscale['200'],
  },
  mainContainer: {
    paddingTop: 16,
    paddingHorizontal: 24,
    gap: 16,
  },
  doctorCard: {
    marginBottom: 10,
  },
  statisicsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  description: {
    gap: 8,
  },
  scheduleContainer: {
    gap: 12,
  },
  scheduleDays: {
    gap: 8,
  },
  reviews: {
    gap: 16,
  },
  scheduleDay: {
    flex: 1,
    flexDirection: 'row',
  },
  scheduleDayTitle: {
    width: '20%',
  },
  scheduleRows: {
    flexDirection: 'column',
    gap: 0,
  },
  scheduleRow: {
    flexDirection: 'row',
  },
  scheduleCol: {
    width: '30%',
  },
  footer: {
    flexShrink: 0,
    padding: 24,
    paddingBottom: SAFE_ZONE_BOTTOM,
    borderTopWidth: 1,
    borderTopColor: colors.grayscale['200'],
    backgroundColor: colors.main.white,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
