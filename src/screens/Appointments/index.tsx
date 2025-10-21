import React, { useEffect, useState } from 'react';
import { FlatList, Keyboard, StyleSheet, View } from 'react-native';

import { CompositeScreenProps } from '@react-navigation/native';
import { toast } from 'react-hot-toast/headless';

import { AppointmentCard } from '#components/domain/Appointment/Card';
import { EmptyListWarning } from '#components/infrastructure/EmptyListWarning';
import { PaginatableListFooter } from '#components/infrastructure/PaginatableListFooter';

import { Button, Icon, Loader, TextBase } from '#ui-kit';

import {
  AppointmentsRoutes,
  AppointmentsScreenProps,
} from '#navigation/Main/Tab/Appointments/types';
import { MainRoutes, MainScreenProps } from '#navigation/Main/types';

import {
  useAppointmentsInfiniteQuery,
  useCancelAppointmentMutation,
} from '#api/Appointments';
import { useDoctorCategoriesQuery } from '#api/Doctor';

import { BORDER_RADIUS_ROUNDED } from '#config';

import useBEErrorHandler from '#hooks/useErrorHandler';

import { BEAppointmentResponseDto } from '#generated/__entities';

import {
  AppointmentListFooterComponentConfiguration,
  AppointmentsEmptyListWarningConfiguration,
  RequestPayload,
} from './config';

export const Appointments: React.FC<
  CompositeScreenProps<
    AppointmentsScreenProps<AppointmentsRoutes>,
    MainScreenProps<MainRoutes>
  >
> = props => {
  const appointmentsQuery = useAppointmentsInfiniteQuery({
    params: {
      ...RequestPayload[props.route.name],
    },
  });
  const doctorCategories = useDoctorCategoriesQuery(null);
  const [cancelAppointment, cancelAppointmentMetadata] =
    useCancelAppointmentMutation();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const listData =
    (appointmentsQuery.data?.pages
      .map(el => el.data)
      .flat() as unknown as BEAppointmentResponseDto[]) || [];

  const onCancel = async (item: BEAppointmentResponseDto) => {
    try {
      await cancelAppointment({
        path: {
          id: item.id,
        },
      }).unwrap();
    } catch {}
  };

  const onReschedule = async (item: BEAppointmentResponseDto) => {
    try {
      props.navigation.navigate(MainRoutes.ScheduleAppointment, {
        doctorId: item.doctorId,
        appointmentToResheduleId: item.id,
      });
    } catch {}
  };

  const onNewAppointment = async (item: BEAppointmentResponseDto) => {
    try {
      props.navigation.navigate(MainRoutes.ScheduleAppointment, {
        doctorId: item.doctorId,
      });
    } catch {}
  };

  const onReview = async (item: BEAppointmentResponseDto) => {
    try {
      toast(
        'Кажется, этого экрана не было в дизайне :( вы все еще можете просмотреть оставшуюся часть приложения',
      );
    } catch {}
  };

  useEffect(() => {
    setIsRefreshing(false);
  }, [appointmentsQuery.fulfilledTimeStamp]);

  useBEErrorHandler(cancelAppointmentMetadata);

  return (
    <FlatList
      contentContainerStyle={styles.contentContainer}
      data={listData}
      keyboardShouldPersistTaps="never"
      ListEmptyComponent={
        appointmentsQuery.isLoading ? (
          <Loader size="large" />
        ) : (
          <>
            <EmptyListWarning
              footer={
                props.route.name === AppointmentsRoutes.FutureAppointments && (
                  <Button
                    fullwidth={false}
                    style={styles.actionButton}
                    type="secondary"
                    onPress={() =>
                      props.navigation.navigate(MainRoutes.Search, {
                        availableCategories: doctorCategories.data!,
                      })
                    }
                  >
                    <TextBase>К специалистам</TextBase>
                    <Icon name="arrowRight" />
                  </Button>
                )
              }
              subtitle={
                AppointmentsEmptyListWarningConfiguration[props.route.name]
                  .subtitle
              }
              title={
                AppointmentsEmptyListWarningConfiguration[props.route.name]
                  .title
              }
            />
          </>
        )
      }
      ListFooterComponent={
        <PaginatableListFooter
          enabled={!!listData.length && !isRefreshing}
          message={
            AppointmentListFooterComponentConfiguration[props.route.name]
              .message
          }
          showLoader={appointmentsQuery.isFetching}
          showMessage={!appointmentsQuery.hasNextPage}
        />
      }
      refreshing={isRefreshing}
      renderItem={({ item }) => (
        <View style={styles.cardWrapper}>
          <AppointmentCard
            Footer={
              props.route.name !== AppointmentsRoutes.CanceledAppointments && (
                <View style={styles.cardFooter}>
                  {props.route.name ===
                    AppointmentsRoutes.FutureAppointments && (
                    <>
                      <Button
                        isLoading={
                          cancelAppointmentMetadata.originalArgs?.path.id ===
                            item.id && !cancelAppointmentMetadata.isError
                        }
                        size="small"
                        style={styles.cardFooterButton}
                        type="secondary"
                        onPress={() => onCancel(item)}
                      >
                        Отмена
                      </Button>
                      <Button
                        size="small"
                        style={styles.cardFooterButton}
                        onPress={() => onReschedule(item)}
                      >
                        Перенести
                      </Button>
                    </>
                  )}

                  {props.route.name ===
                    AppointmentsRoutes.CompletedAppointments && (
                    <>
                      <Button
                        isLoading={
                          cancelAppointmentMetadata.originalArgs?.path.id ===
                            item.id && !cancelAppointmentMetadata.isError
                        }
                        size="small"
                        style={styles.cardFooterButton}
                        type="secondary"
                        onPress={() => onNewAppointment(item)}
                      >
                        Повторить
                      </Button>
                      <Button
                        size="small"
                        style={styles.cardFooterButton}
                        onPress={() => onReview(item)}
                      >
                        Оставить отзыв
                      </Button>
                    </>
                  )}
                </View>
              )
            }
            item={item}
          />
        </View>
      )}
      style={styles.container}
      onEndReached={() =>
        !appointmentsQuery.isFetching &&
        appointmentsQuery.hasNextPage &&
        appointmentsQuery.fetchNextPage()
      }
      onRefresh={() => {
        setIsRefreshing(true);
        appointmentsQuery.refetch();
      }}
      onScrollBeginDrag={() => Keyboard.dismiss()}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  actionButton: {
    flexShrink: 1,
    marginTop: 20,
    paddingHorizontal: 40,
  },
  contentContainer: {
    flexGrow: 1,
  },
  cardWrapper: {
    zIndex: 10000,
    paddingTop: 10,
    paddingHorizontal: 24,
  },
  cardFooter: {
    flexDirection: 'row',
    gap: 16,
  },
  cardFooterButton: {
    flex: 1,
    borderRadius: BORDER_RADIUS_ROUNDED,
  },
});
