export const en = {
  common: {
    formHasErrors: 'Some fields contain errors',
    smsDemo: '{{code}} - demo code, as the SMS provider integration is paid',
    all: 'All',
  },
  select: {
    defaultTitle: 'Select a time',
    save: 'Save',
  },
  dateTimePicker: {
    defaultTitle: 'Select a time',
    confirm: 'Select',
  },
  imagePicker: {
    title: 'Select an image',
    gallery: 'Choose from gallery',
    camera: 'Take a photo',
  },
  onboarding: {
    next: 'Next',
    continue: 'Continue',
  },
  signIn: {
    title: 'Hi, great to see you again!',
    subtitle: 'We hope you are doing well.',
    phone: {
      label: 'Phone number',
      placeholder: 'Any number, no SMS in the demo',
    },
    password: {
      label: 'Password',
    },
    submit: 'Sign in',
    forgotPassword: 'Forgot your password?',
    signUpPrompt: {
      question: 'Do not have an account yet?',
      action: 'Sign up',
    },
    validation: {
      phone: {
        required: 'Please enter your phone number',
        format: 'The phone number must start with + and contain 7 to 15 digits',
      },
      password: {
        required: 'Please enter your password',
        minLength: 'The password must contain at least 8 characters',
        maxLength: 'The password must not exceed 50 characters',
        charset:
          'The password must contain at least two types of characters: lowercase, uppercase or digits',
      },
    },
  },
  signUp: {
    title: 'Create an account',
    subtitle: 'We are here to help you!',
    name: {
      label: 'First name',
    },
    surname: {
      label: 'Last name',
    },
    phone: {
      label: 'Phone number',
      placeholder: 'Any number, no SMS in the demo',
    },
    password: {
      label: 'Password',
    },
    submit: 'Create account',
    hasAccount: 'Already have an account?',
    signIn: 'Sign in',
    validation: {
      phone: {
        required: 'Please enter your phone number',
        format: 'The phone number must start with + and contain 7 to 15 digits',
      },
      password: {
        required: 'Please enter your password',
        minLength: 'The password must contain at least 8 characters',
        maxLength: 'The password must not exceed 50 characters',
        charset:
          'The password must contain at least two types of characters: lowercase, uppercase or digits',
      },
      name: {
        required: 'Please enter your first name',
        minLength: 'The first name must be at least 2 characters long',
        maxLength: 'The first name must not exceed 16 characters',
        format:
          'The first name may only contain letters, hyphens, apostrophes and spaces between parts',
      },
      surname: {
        required: 'Please enter your last name',
        minLength: 'The last name must be at least 2 characters long',
        maxLength: 'The last name must not exceed 16 characters',
        format:
          'The last name may only contain letters, hyphens, apostrophes and spaces between parts',
      },
    },
  },
  passwordRecoveryPhoneInput: {
    title: 'Forgot your password?',
    subtitle: 'Enter your phone number and we will send a confirmation code.',
    phone: {
      label: 'Phone number',
      placeholder: 'Any number, no SMS in the demo',
    },
    submit: 'Confirm',
    availableIn: 'Available in {{value}}',
    validation: {
      phone: {
        format: 'The phone number must start with + and contain 7 to 15 digits',
      },
    },
  },
  passwordRecoveryCodeInput: {
    title: 'Code confirmation',
    subtitle: 'Enter the code we sent to your phone number.',
    codeSent: 'The code was sent to {{phone}}',
    resendIn: 'You can resend the code in {{value}}',
    noCode: "Didn't receive the code?",
    resend: 'Resend',
  },
  passwordRecoverySetPassword: {
    title: 'Create a new password',
    subtitle: 'Your new password must differ from the ones you used before.',
    password: {
      label: 'Password',
    },
    confirmPassword: {
      label: 'Confirm password',
    },
    submit: 'Change password',
    success: 'Password changed successfully',
    validation: {
      password: {
        required: 'Please enter your password',
        minLength: 'The password must contain at least 8 characters',
        maxLength: 'The password must not exceed 50 characters',
        charset:
          'The password must contain at least two types of characters: lowercase, uppercase or digits',
      },
      confirmPassword: {
        mismatch: 'Passwords do not match',
      },
    },
  },
  profile: {
    title: 'Your profile',
    menu: {
      editProfile: 'Edit profile',
      favorites: 'Favorites',
      notifications: 'Notifications',
      settings: 'Settings',
      support: 'Help and support',
      terms: 'Terms of use',
      logOut: 'Log out',
    },
    stubs: {
      support:
        "Oops, this screen was not in the design, but let's pretend I opened a support chat or an FAQ",
      terms:
        "Oops, this screen was not in the design, but let's pretend I opened a WebView with a privacy link or rendered HTML content with react-native-html-renderer",
    },
    logOutDialog: {
      title: 'Log out',
      text: 'Are you sure you want to log out?',
      confirm: 'Yes, log out',
      decline: 'No',
    },
  },
  // the showcase app labels the backend region by its main city
  region: {
    auto: 'Auto',
    RU: 'Moscow',
    EU: 'Berlin',
  },
  language: {
    auto: 'System language',
    en: 'English',
    ru: 'Русский',
  },
  settings: {
    title: 'Settings',
    region: 'Region',
    language: 'Language',
    general: 'General',
    permissions: 'Permissions',
    version: 'Version',
    location: {
      label: 'Location',
      granted: 'Allowed',
      denied: 'Not allowed',
      blocked: 'Blocked',
      unavailable: 'Unavailable',
    },
    confirm: 'Confirm',
  },
  home: {
    city: {
      label: 'City',
      select: 'Select a city',
    },
    searchPlaceholder: 'Search for a doctor…',
    specializations: 'Specializations',
    nearbyCenters: 'Nearby medical centers',
    centers: 'Medical centers',
    allCentersSoon: '“All medical centers” will appear in the next update :)',
  },
  search: {
    title: 'All specialists',
    placeholder: 'Search for a doctor…',
    found_one: '{{count}} found',
    found_other: '{{count}} found',
    sort: {
      title: 'Select the sort order',
      rating: 'Highest rating',
      practiceStartYear: 'Most experience',
      reviewsCount: 'Most reviews',
    },
    empty: {
      title: 'Nothing found',
      subtitle: 'Try changing the search parameters',
    },
    endOfList: 'Looks like we have shown all the doctors',
  },
  map: {
    searchPlaceholder: 'Search',
    mapLanguageNotice: 'Map language will update after you restart the app',
  },
  doctorDetails: {
    title: 'Doctor information',
    patients: 'Patients',
    experience: 'Years of experience',
    rating: 'Rating',
    reviews: 'Reviews',
    reviewsTitle: 'Reviews',
    about: 'About the doctor',
    showMore: 'show more',
    hide: 'hide',
    schedule: 'Schedule',
    dayOff: 'Day off',
    allReviewsSoon:
      'This screen was not in the design :( but you can explore the rest of the app :)',
    book: 'Book an appointment',
  },
  notifications: {
    title: 'Notifications',
    mockHint: 'Test notifications are shown here',
    today: 'today',
    yesterday: 'yesterday',
    // the notifications below are mocks, see `screens/Notifications/config.ts`
    mock: {
      title: {
        bookingAccepted: 'Appointment confirmed',
        bookingCanceled: 'Appointment canceled',
        bookingRescheduled: 'Appointment rescheduled',
        passwordChanged: 'Password changed',
        newLogIn: 'New sign-in',
      },
      text: {
        acceptedElena:
          'You have successfully booked an appointment with Dr. Elena Ivanova.',
        acceptedDmitry:
          'You have successfully booked an appointment with Dr. Dmitry Petrov.',
        canceledDmitry:
          'You have successfully canceled your appointment with Dr. Dmitry Petrov.',
        canceledSvetlana:
          'You canceled your appointment with Dr. Svetlana Lebedeva.',
        rescheduledAnna:
          'You rescheduled your appointment with Dr. Anna Sokolova.',
        rescheduledMaxim:
          'Your appointment with Dr. Maxim Smirnov has been rescheduled.',
        loginChrome: 'A new sign-in was detected from Chrome on macOS.',
        loginSafari: 'A new sign-in was detected from Safari on iPhone.',
        passwordChanged: 'Your account password was successfully updated.',
      },
    },
  },
  // keyed by `AppointmentsRoutes`
  appointments: {
    title: 'My appointments',
    FutureAppointments: {
      tab: 'Upcoming',
      empty: {
        title: 'No upcoming appointments yet',
        subtitle:
          'Book a doctor in advance so you do not miss a convenient time',
      },
      endOfList: 'You have viewed all upcoming appointments.',
    },
    CompletedAppointments: {
      tab: 'Completed',
      empty: {
        title: 'You have not visited a doctor yet',
        subtitle:
          'After your first visit, all completed appointments will appear here',
      },
      endOfList: 'All completed appointments are loaded.',
    },
    CanceledAppointments: {
      tab: 'Canceled',
      empty: {
        title: 'No canceled appointments',
        subtitle:
          'If you have to cancel a visit, the information will appear here',
      },
      endOfList: 'The list of canceled appointments is fully displayed.',
    },
    toSpecialists: 'To specialists',
    cancel: 'Cancel',
    reschedule: 'Reschedule',
    repeat: 'Book again',
    leaveReview: 'Leave a review',
    canceledToast:
      'You have successfully canceled the appointment on {{date}}, {{time}}',
    reviewSoon:
      'It seems this screen was not in the design :( you can still explore the rest of the app',
  },
  // keyed by `FavoritesRoutes`
  favorites: {
    title: 'Favorites',
    FavoriteDoctors: {
      tab: 'Doctors',
      empty: {
        title: 'You have no favorite doctors yet 💙',
        subtitle: 'Add the ones you trust to always keep them at hand.',
      },
      endOfList: 'Looks like we have shown all the doctors',
    },
    FavoriteMedicalCenters: {
      tab: 'Medical centers',
      empty: {
        title: 'You have not added any medical centers yet 💙',
        subtitle: 'Add the ones you like to find them quickly later.',
      },
      endOfList: 'Looks like we have shown all the medical centers',
    },
  },
  // the review is a mock until the reviews feature exists
  review: {
    mockAuthor: 'Ivanych',
    mockText:
      'I am the only user of this app, so I will now post this under every doctor.',
  },
  scheduleAppointment: {
    bookTitle: 'Schedule an appointment',
    rescheduleTitle: 'Reschedule appointment',
    selectDate: 'Select a date',
    selectTime: 'Select a time',
    book: 'Book an appointment',
    reschedule: 'Reschedule',
    bookedToast:
      'You have successfully booked an appointment on {{date}} at {{time}}',
    rescheduledToast:
      'You have rescheduled your appointment to {{date}}, {{time}}',
  },
  profileEditing: {
    editTitle: 'Edit profile',
    completeTitle: 'Complete your profile',
    name: 'First name',
    surname: 'Last name',
    nickname: 'Username',
    birthday: 'Date of birth',
    gender: 'Gender',
    selectGender: 'Select your gender',
    update: 'Update',
    complete: 'Continue',
    updated: 'Your data has been updated',
    validation: {
      name: {
        required: 'Please enter your first name',
        minLength: 'The first name must be at least 2 characters long',
        maxLength: 'The first name must not exceed 16 characters',
        format:
          'The first name may only contain letters, hyphens, apostrophes and spaces between parts',
      },
      surname: {
        required: 'Please enter your last name',
        minLength: 'The last name must be at least 2 characters long',
        maxLength: 'The last name must not exceed 16 characters',
        format:
          'The last name may only contain letters, hyphens, apostrophes and spaces between parts',
      },
      birthday: {
        required: 'Please select your date of birth',
      },
      gender: {
        required: 'Please select your gender',
      },
      nickname: {
        noSpaces: 'The username must not contain spaces',
      },
    },
  },
  // the groups below are keyed by the backend enum values, exhaustiveness is checked in `types`
  gender: {
    MALE: 'Male',
    FEMALE: 'Female',
  },
  // plural form: a list of doctors of the category
  doctorCategories: {
    dentistry: 'Dentists',
    cardiology: 'Cardiologists',
    pulmonology: 'Pulmonologists',
    general: 'General practitioners',
    neurology: 'Neurologists',
    gastroenterology: 'Gastroenterologists',
    laboratory: 'Laboratory',
    vaccination: 'Infectious disease specialists',
  },
  // singular form: a single doctor
  doctorCategory: {
    dentistry: 'Dentist',
    cardiology: 'Cardiologist',
    pulmonology: 'Pulmonologist',
    general: 'General practitioner',
    neurology: 'Neurologist',
    gastroenterology: 'Gastroenterologist',
    laboratory: 'Laboratory doctor',
    vaccination: 'Infectious disease specialist',
  },
  medicalCenterType: {
    hospital: 'Hospital',
    clinic: 'Clinic',
    cabinet: 'Practice',
  },
  // keyed by the day ids of the schedule response
  weekDay: {
    '1': 'Mon',
    '2': 'Tue',
    '3': 'Wed',
    '4': 'Thu',
    '5': 'Fri',
    '6': 'Sat',
    '7': 'Sun',
  },
  permissions: {
    alertTitle: 'Permission',
    blockedTitle: 'Permission is blocked',
    blockedMessage: 'To grant the permission, open the settings',
    cancel: 'Cancel',
    openSettings: 'Open settings',
    unavailable: 'This feature is not available on your device',
    camera: {
      denied: 'Camera access is required to change your profile photo',
    },
    gallery: {
      denied: 'Gallery access is required to change your profile photo',
    },
    location: {
      unavailable:
        'Tracking nearby medical centers and your location is unavailable',
      denied:
        'Permission is required to access nearby medical centers and your location',
    },
  },
  // week starts on Monday, matching `firstDay={1}` of the ui-kit Calendar
  calendar: {
    weekDays: {
      '1': 'Mon',
      '2': 'Tue',
      '3': 'Wed',
      '4': 'Thu',
      '5': 'Fri',
      '6': 'Sat',
      '7': 'Sun',
    },
  },
  // keyed by the backend `ErrorCode`, exhaustiveness is checked in `types`
  serverErrors: {
    UNKNOWN: 'Something went wrong. Please try again',
    INTERNAL_ERROR: 'Something went wrong on our side. Please try again later',
    VALIDATION_FAILED: 'Some of the entered data is invalid',
    USER_PHONE_TAKEN: 'This phone number is already registered',
    USER_PHONE_INVALID: 'The phone number is invalid',
    USER_NICKNAME_TAKEN: 'This username is already taken',
    USER_BIRTHDAY_INVALID: 'The date of birth cannot be in the future',
    APPOINTMENT_SLOT_TAKEN:
      'This time slot has just been taken. Please choose another one',
    FAVORITE_ALREADY_EXISTS: 'Already in your favorites',
    SCHEDULE_WEEKDAY_INVALID: 'The day of the week is invalid',
    USER_NOT_FOUND: 'User not found',
    DOCTOR_NOT_FOUND: 'Doctor not found',
    MEDICAL_CENTER_NOT_FOUND: 'Medical center not found',
    APPOINTMENT_NOT_FOUND: 'Appointment not found',
    APPOINTMENT_ALREADY_CANCELLED:
      'This appointment has already been cancelled',
    APPOINTMENT_PAST_CANNOT_CANCEL: 'A past appointment cannot be cancelled',
    APPOINTMENT_CANCELLED_CANNOT_RESCHEDULE:
      'A cancelled appointment cannot be rescheduled',
    APPOINTMENT_SAME_SLOT: 'Please choose a different time to reschedule',
    APPOINTMENT_TOO_SOON:
      'There is too little time left before the appointment',
    TIME_SLOT_NOT_FOUND: 'This time slot is no longer available',
    TIME_SLOT_DOCTOR_MISMATCH: 'This time slot belongs to another doctor',
    NO_AVAILABLE_SLOTS: 'The doctor has no available time',
    INVALID_DATE_RANGE: 'The start date must not be later than the end date',
    // an app bug, only logged (never shown); the key exists for exhaustiveness
    INVALID_REQUEST_CONTEXT: 'Something went wrong. Please try again',
    IMAGE_INVALID: 'The uploaded file is not a valid image',
    REGISTRATION_INCOMPLETE: 'Please finish your registration first',
    REGISTRATION_ALREADY_COMPLETE: 'Registration is already complete',
    INVALID_CREDENTIALS: 'Wrong phone number or password',
    REFRESH_TOKEN_INVALID: 'Your session has expired. Please sign in again',
    TEMP_PASSWORD_EXPIRED: 'The code is wrong or has expired',
    OTP_RATE_LIMITED: 'Too many code requests. Please try again later',
    BAD_REQUEST: 'Invalid request',
    UNAUTHORIZED: 'Please sign in again',
    FORBIDDEN: 'You do not have access to this',
    NOT_FOUND: 'Not found',
    METHOD_NOT_ALLOWED: 'This action is not allowed',
    CONFLICT:
      'The action conflicts with the current state. Please refresh and try again',
    PAYLOAD_TOO_LARGE: 'The file or request is too large',
    UNSUPPORTED_MEDIA_TYPE: 'This file type is not supported',
    TOO_MANY_REQUESTS: 'Too many requests. Please try again later',
    SERVICE_UNAVAILABLE:
      'The service is temporarily unavailable. Please try again later',
  },
  // keyed by the backend `ValidationCode`; `{{limit}}` / `{{length}}` come from the issue `params`
  serverValidation: {
    UNKNOWN: 'The value is invalid',
    NOT_STRING: 'The value must be text',
    INVALID_UUID: 'The identifier is invalid',
    INVALID_INTEGER: 'The value must be a whole number',
    INVALID_BOOLEAN: 'The value must be yes or no',
    INVALID_ENUM: 'The value is not one of the allowed options',
    INVALID_DATE: 'The date is invalid',
    INVALID_VALUE: 'The value is invalid',
    UNKNOWN_FIELD: 'This field is not allowed',
    TEXT_TOO_SHORT_one: 'Must be at least {{limit}} character',
    TEXT_TOO_SHORT_other: 'Must be at least {{limit}} characters',
    TEXT_TOO_LONG_one: 'Must not exceed {{limit}} character',
    TEXT_TOO_LONG_other: 'Must not exceed {{limit}} characters',
    VALUE_TOO_SMALL: 'The value must be at least {{limit}}',
    VALUE_TOO_BIG: 'The value must not exceed {{limit}}',
    PHONE_FORMAT:
      'The phone number must start with + and contain 7 to 15 digits',
    OTP_FORMAT_one: 'The code must consist of {{length}} digit',
    OTP_FORMAT_other: 'The code must consist of {{length}} digits',
    PASSWORD_TOO_SHORT_one: 'The password must be at least {{limit}} character',
    PASSWORD_TOO_SHORT_other:
      'The password must be at least {{limit}} characters',
    PASSWORD_TOO_LONG_one: 'The password must not exceed {{limit}} character',
    PASSWORD_TOO_LONG_other:
      'The password must not exceed {{limit}} characters',
    PASSWORD_WEAK:
      'The password must contain at least two types of characters: lowercase, uppercase or digits',
    NUMBER_FORMAT: 'The value must be a number',
    DATE_FORMAT:
      'The date must be in the format YYYY-MM-DD and exist in the calendar',
    DATE_IN_FUTURE: 'The date cannot be in the future',
    NAME_FORMAT:
      'The name may only contain letters, a hyphen, an apostrophe and single spaces between parts',
    NICKNAME_HAS_SPACES: 'The username must not contain spaces',
    VALUES_MISMATCH: 'The values do not match',
  },
} as const;
