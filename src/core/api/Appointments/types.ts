export type RequestsAppointment = {
  appointments: PickApiData<'/appointments', 'get'>;
  createAppointment: PickApiData<'/appointments', 'post'>;
  cancelAppointment: PickApiData<'/appointments/{id}/cancel', 'patch'>;
  rescheduleAppointment: PickApiData<'/appointments/{id}/reschedule', 'patch'>;
};

export enum TagsAppointmentAPI {
  Appointment = 'Appointment',
}
