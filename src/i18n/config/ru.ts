import type { CatalogShape } from '../types';

export const ru: CatalogShape<'one' | 'few' | 'many' | 'other'> = {
  common: {
    formHasErrors: 'Некоторые поля содержат ошибки',
    smsDemo: '{{code}} - код в демо, т.к. интеграция смс-провайдера платная',
    all: 'Все',
  },
  select: {
    defaultTitle: 'Выберите время',
    save: 'Сохранить',
  },
  dateTimePicker: {
    defaultTitle: 'Выберите время',
    confirm: 'Выбрать',
  },
  imagePicker: {
    title: 'Выберите изображение',
    gallery: 'Выбрать из галереи',
    camera: 'Сделать фотографию',
  },
  onboarding: {
    next: 'Далее',
    continue: 'Продолжить',
  },
  signIn: {
    title: 'Привет, рады снова видеть!',
    subtitle: 'Надеемся, у вас всё хорошо.',
    phone: {
      label: 'Номер телефона',
      placeholder: 'Любой, смс в демо не придет',
    },
    password: {
      label: 'Пароль',
    },
    submit: 'Войти',
    forgotPassword: 'Забыли пароль?',
    signUpPrompt: {
      question: 'Ещё нет аккаунта?',
      action: 'Зарегистрироваться',
    },
    validation: {
      phone: {
        required: 'Пожалуйста, введите номер телефона',
        format:
          'Телефон должен быть в формате +7 (XXX) XXX-XX-XX (11 цифр после плюса)',
      },
      password: {
        required: 'Пожалуйста, введите пароль',
        minLength: 'Пароль должен содержать минимум 8 символов',
        maxLength: 'Пароль не должен превышать 50 символов',
        charset:
          'Пароль должен содержать как минимум два типа символов: строчные, прописные или цифры',
      },
    },
  },
  signUp: {
    title: 'Создать аккаунт',
    subtitle: 'Мы здесь, чтобы помочь вам!',
    name: {
      label: 'Имя',
    },
    surname: {
      label: 'Фамилия',
    },
    phone: {
      label: 'Номер телефона',
      placeholder: 'Любой, смс в демо не придет',
    },
    password: {
      label: 'Пароль',
    },
    submit: 'Создать аккаунт',
    hasAccount: 'Уже есть аккаунт?',
    signIn: 'Войти',
    validation: {
      phone: {
        required: 'Пожалуйста, введите номер телефона',
        format:
          'Телефон должен быть в формате +7 (XXX) XXX-XX-XX (11 цифр после плюса)',
      },
      password: {
        required: 'Пожалуйста, введите пароль',
        minLength: 'Пароль должен содержать минимум 8 символов',
        maxLength: 'Пароль не должен превышать 50 символов',
        charset:
          'Пароль должен содержать как минимум два типа символов: строчные, прописные или цифры',
      },
      name: {
        required: 'Пожалуйста, введите имя',
        minLength: 'Имя не может быть короче 2 символов',
        maxLength: 'Имя не может быть длинее 16 символов',
        format:
          'Имя может содержать только буквы, дефисы, апострофы и пробелы между частями',
      },
      surname: {
        required: 'Пожалуйста, введите фамилию',
        minLength: 'Фамилия не может быть короче 2 символов',
        maxLength: 'Фамилия не может быть длинее 16 символов',
        format:
          'Фамилия может содержать только буквы, дефисы, апострофы и пробелы между частями',
      },
    },
  },
  passwordRecoveryPhoneInput: {
    title: 'Забыли пароль?',
    subtitle: 'Введите ваш номер телефона — мы отправим код подтверждения.',
    phone: {
      label: 'Номер телефона',
      placeholder: 'Любой, смс в демо не придет',
    },
    submit: 'Подтвердить',
    availableIn: 'Доступно через {{value}}',
    validation: {
      phone: {
        format:
          'Телефон должен быть в формате +7 (XXX) XXX-XX-XX (11 цифр после плюса)',
      },
    },
  },
  passwordRecoveryCodeInput: {
    title: 'Подтверждение кода',
    subtitle: 'Введите код, который мы отправили на ваш номер телефона.',
    codeSent: 'Код был отправлен на телефон {{phone}}',
    resendIn: 'Отправить снова можно будет через {{value}}',
    noCode: 'Не получили код?',
    resend: 'Отправить снова',
  },
  passwordRecoverySetPassword: {
    title: 'Создайте новый пароль',
    subtitle: 'Ваш новый пароль должен отличаться от ранее использованных.',
    password: {
      label: 'Пароль',
    },
    confirmPassword: {
      label: 'Подтвердите пароль',
    },
    submit: 'Сменить пароль',
    success: 'Пароль был успешно изменен',
    validation: {
      password: {
        required: 'Пожалуйста, введите пароль',
        minLength: 'Пароль должен содержать минимум 8 символов',
        maxLength: 'Пароль не должен превышать 50 символов',
        charset:
          'Пароль должен содержать как минимум два типа символов: строчные, прописные или цифры',
      },
      confirmPassword: {
        mismatch: 'Пароли не совпадают',
      },
    },
  },
  profile: {
    title: 'Ваш профиль',
    menu: {
      editProfile: 'Редактировать профиль',
      favorites: 'Избранное',
      notifications: 'Уведомления',
      settings: 'Настройки',
      support: 'Помощь и поддержка',
      terms: 'Условия использования',
      logOut: 'Выйти',
    },
    stubs: {
      support:
        'Упс, кажется этого экрана не было в дизайне, но давайте сделаем вид что я открыл чат поддержки или ЧаВо',
      terms:
        'Упс, кажется этого экрана не было в дизайне, но давайте сделаем вид что я открыл WebView с ссылкой на privacy или отобразил HTML content с помощью react-native-html-renderer',
    },
    logOutDialog: {
      title: 'Выйти из аккаунта',
      text: 'Вы действительно хотите выйти из аккаунта?',
      confirm: 'Да, выйти',
      decline: 'Нет',
    },
  },
  region: {
    auto: 'Авто',
    RU: 'Москва',
    EU: 'Берлин',
  },
  language: {
    auto: 'Системный язык',
    en: 'English',
    ru: 'Русский',
  },
  settings: {
    title: 'Настройки',
    region: 'Регион',
    language: 'Язык',
    confirm: 'Подтвердить',
  },
  home: {
    city: {
      label: 'Город',
      select: 'Выберите город',
    },
    searchPlaceholder: 'Поиск врача…',
    specializations: 'Специализации',
    nearbyCenters: 'Ближайшие медицинские центры',
    centers: 'Медицинские центры',
    allCentersSoon:
      'Раздел “Все медицинские центры” появится в следующем обновлении :)',
  },
  search: {
    title: 'Все специалисты',
    placeholder: 'Поиск врача…',
    found_one: '{{count}} найден',
    found_few: '{{count}} найдено',
    found_many: '{{count}} найдено',
    found_other: '{{count}} найдено',
    sort: {
      title: 'Выберите порядок сортировки',
      rating: 'Наивысший рейтинг',
      practiceStartYear: 'Наибольший стаж',
      reviewsCount: 'Больше всего отзывов',
    },
    empty: {
      title: 'Ничего не нашли',
      subtitle: 'Попробуйте изменить параметры поиска',
    },
    endOfList: 'Кажется, мы отобразили всех врачей',
  },
  doctorDetails: {
    title: 'Информация о враче',
    patients: 'Пациентов',
    experience: 'Лет опыта',
    rating: 'Оценка',
    reviews: 'Отзывов',
    reviewsTitle: 'Отзывы',
    about: 'О враче',
    showMore: 'показать еще',
    hide: 'скрыть',
    schedule: 'Расписание',
    dayOff: 'Выходной',
    allReviewsSoon:
      'Этого экрана не было в дизайне :( но вы можете посмотреть остальную часть приложения :)',
    book: 'Записаться на приём',
  },
  notifications: {
    title: 'Уведомления',
    mockHint: 'Здесь отображаются тестовые нотификации',
    today: 'сегодня',
    yesterday: 'вчера',
    mock: {
      title: {
        bookingAccepted: 'Запись подтверждена',
        bookingCanceled: 'Запись отменена',
        bookingRescheduled: 'Запись перенесена',
        passwordChanged: 'Пароль изменён',
        newLogIn: 'Новый вход',
      },
      text: {
        acceptedElena: 'Вы успешно записались на приём к врачу Елене Ивановой.',
        acceptedDmitry:
          'Вы успешно записались на приём к врачу Дмитрию Петрову.',
        canceledDmitry: 'Вы успешно отменили запись к врачу Дмитрию Петрову.',
        canceledSvetlana: 'Вы отменили запись к врачу Светлане Лебедевой.',
        rescheduledAnna: 'Вы перенесли запись к врачу Анне Соколовой.',
        rescheduledMaxim:
          'Ваша запись к врачу Максиму Смирнову была перенесена.',
        loginChrome: 'Обнаружен новый вход с браузера Chrome на macOS.',
        loginSafari: 'Обнаружен новый вход с Safari на iPhone.',
        passwordChanged: 'Пароль вашего аккаунта успешно обновлён.',
      },
    },
  },
  appointments: {
    title: 'Мои записи',
    FutureAppointments: {
      tab: 'Будут',
      empty: {
        title: 'Пока нет предстоящих приёмов',
        subtitle:
          'Запишитесь к врачу заранее, чтобы не пропустить удобное время',
      },
      endOfList: 'Вы просмотрели все предстоящие приёмы.',
    },
    CompletedAppointments: {
      tab: 'Прошли',
      empty: {
        title: 'Вы ещё не посещали врача',
        subtitle: 'После первого визита сюда попадут все завершённые приёмы',
      },
      endOfList: 'Все завершённые приёмы загружены.',
    },
    CanceledAppointments: {
      tab: 'Отменены',
      empty: {
        title: 'Нет отменённых приёмов',
        subtitle: 'Если придётся отменить визит, информация появится здесь',
      },
      endOfList: 'Список отменённых приёмов полностью отображён.',
    },
    toSpecialists: 'К специалистам',
    cancel: 'Отмена',
    reschedule: 'Перенести',
    repeat: 'Повторить',
    leaveReview: 'Оставить отзыв',
    canceledToast: 'Вы успешно отменили прием {{date}}, {{time}}',
    reviewSoon:
      'Кажется, этого экрана не было в дизайне :( вы все еще можете просмотреть оставшуюся часть приложения',
  },
  favorites: {
    title: 'Избранное',
    FavoriteDoctors: {
      tab: 'Врачи',
      empty: {
        title: 'У вас пока нет избранных врачей 💙',
        subtitle:
          'Добавьте тех, кому доверяете, чтобы всегда иметь их под рукой.',
      },
      endOfList: 'Кажется, мы отобразили всех врачей',
    },
    FavoriteMedicalCenters: {
      tab: 'Мед. центры',
      empty: {
        title: 'Вы ещё не добавили медцентры 💙',
        subtitle: 'Добавьте понравившиеся, чтобы быстро находить их позже.',
      },
      endOfList: 'Кажется, мы отобразили все мед. центры',
    },
  },
  review: {
    mockAuthor: 'Иваныч',
    mockText:
      'Я единственный пользователь этого приложения, сейчас напишу это под всеми врачами.',
  },
  map: {
    searchPlaceholder: 'Поиск',
  },
  scheduleAppointment: {
    bookTitle: 'Запланировать прием',
    rescheduleTitle: 'Перенести запись',
    selectDate: 'Выберите дату',
    selectTime: 'Выберите время',
    book: 'Записаться на приём',
    reschedule: 'Перенести',
    bookedToast: 'Вы успешно записались на прием {{date}} в {{time}}',
    rescheduledToast: 'Вы перенесли запись на {{date}}, {{time}}',
  },
  profileEditing: {
    editTitle: 'Изменение профиля',
    completeTitle: 'Заполните ваш профиль',
    name: 'Имя',
    surname: 'Фамилия',
    nickname: 'Имя пользователя',
    birthday: 'День рождения',
    gender: 'Пол',
    selectGender: 'Выберите пол',
    update: 'Обновить',
    complete: 'Войти',
    updated: 'Данные успешно обновлены',
    validation: {
      name: {
        required: 'Пожалуйста, введите имя',
        minLength: 'Имя не может быть короче 2 символов',
        maxLength: 'Имя не может быть длинее 16 символов',
        format:
          'Имя может содержать только буквы, дефисы, апострофы и пробелы между частями',
      },
      surname: {
        required: 'Пожалуйста, введите фамилию',
        minLength: 'Фамилия не может быть короче 2 символов',
        maxLength: 'Фамилия не может быть длинее 16 символов',
        format:
          'Фамилия может содержать только буквы, дефисы, апострофы и пробелы между частями',
      },
      birthday: {
        required: 'Пожалуйста, выберите день рождения',
      },
      gender: {
        required: 'Пожалуйста, выберите пол',
      },
      nickname: {
        noSpaces: 'Имя пользователя не может содержать пробелов',
      },
    },
  },
  gender: {
    MALE: 'Мужской',
    FEMALE: 'Женский',
  },
  doctorCategories: {
    dentistry: 'Стоматологи',
    cardiology: 'Кардиологи',
    pulmonology: 'Пульмонологи',
    general: 'Терапевты',
    neurology: 'Неврологи',
    gastroenterology: 'Гастроэнтерологи',
    laboratory: 'Лаборатория',
    vaccination: 'Инфекционисты',
  },
  doctorCategory: {
    dentistry: 'Стоматолог',
    cardiology: 'Кардиолог',
    pulmonology: 'Пульмонолог',
    general: 'Терапевт',
    neurology: 'Невролог',
    gastroenterology: 'Гастроэнтеролог',
    laboratory: 'Врач-лаборант',
    vaccination: 'Инфекционист',
  },
  medicalCenterType: {
    hospital: 'Больница',
    clinic: 'Клиника',
    cabinet: 'Кабинет',
  },
  weekDay: {
    '1': 'Пн',
    '2': 'Вт',
    '3': 'Ср',
    '4': 'Чт',
    '5': 'Пт',
    '6': 'Сб',
    '7': 'Вс',
  },
  permissions: {
    alertTitle: 'Разрешение',
    blockedTitle: 'Выдача разрешения заблокирована',
    blockedMessage: 'Для выдачи разрешения необходимо перейти в настройки',
    cancel: 'Отмена',
    openSettings: 'Открыть настройки',
    unavailable: 'Данная возможность недоступна на вашем устройстве',
    camera: {
      denied: 'Для изменения фотографии профиля необходим доступ к камере',
    },
    gallery: {
      denied: 'Для изменения фотографии профиля необходим доступ к галерее',
    },
    location: {
      unavailable:
        'Отслеживание ближайших медцентров и расположения пользователя недоступно',
      denied:
        'Для доступа к ближайшим медцентрам и расположению пользователя необходимо разрешение',
    },
  },
  // week starts on Monday, matching `firstDay={1}` of the ui-kit Calendar
  calendar: {
    weekDays: {
      '1': 'Пн',
      '2': 'Вт',
      '3': 'Ср',
      '4': 'Чт',
      '5': 'Пт',
      '6': 'Сб',
      '7': 'Вс',
    },
  },
  serverErrors: {
    UNKNOWN: 'Что-то пошло не так. Попробуйте ещё раз',
    INTERNAL_ERROR: 'Что-то пошло не так на нашей стороне. Попробуйте позже',
    VALIDATION_FAILED: 'Некоторые данные заполнены неверно',
    USER_PHONE_TAKEN: 'Этот номер телефона уже зарегистрирован',
    USER_PHONE_INVALID: 'Некорректный номер телефона',
    USER_NICKNAME_TAKEN: 'Это имя пользователя уже занято',
    USER_BIRTHDAY_INVALID: 'Дата рождения не может быть в будущем',
    APPOINTMENT_SLOT_TAKEN: 'Это время только что заняли. Выберите другое',
    FAVORITE_ALREADY_EXISTS: 'Уже в избранном',
    SCHEDULE_WEEKDAY_INVALID: 'Некорректный день недели',
    USER_NOT_FOUND: 'Пользователь не найден',
    DOCTOR_NOT_FOUND: 'Врач не найден',
    MEDICAL_CENTER_NOT_FOUND: 'Медицинский центр не найден',
    APPOINTMENT_NOT_FOUND: 'Запись не найдена',
    APPOINTMENT_ALREADY_CANCELLED: 'Запись уже отменена',
    APPOINTMENT_PAST_CANNOT_CANCEL: 'Прошедшую запись нельзя отменить',
    APPOINTMENT_CANCELLED_CANNOT_RESCHEDULE:
      'Отменённую запись нельзя перенести',
    APPOINTMENT_SAME_SLOT: 'Выберите другое время для переноса',
    APPOINTMENT_TOO_SOON: 'До начала приёма осталось слишком мало времени',
    TIME_SLOT_NOT_FOUND: 'Это время больше недоступно',
    TIME_SLOT_DOCTOR_MISMATCH: 'Это время относится к другому врачу',
    NO_AVAILABLE_SLOTS: 'У врача нет свободного времени',
    INVALID_DATE_RANGE: 'Начальная дата не может быть позже конечной',
    INVALID_REQUEST_CONTEXT: 'Что-то пошло не так. Попробуйте ещё раз',
    IMAGE_INVALID: 'Загруженный файл не является изображением',
    REGISTRATION_INCOMPLETE: 'Сначала завершите регистрацию',
    REGISTRATION_ALREADY_COMPLETE: 'Регистрация уже завершена',
    INVALID_CREDENTIALS: 'Неверный номер телефона или пароль',
    REFRESH_TOKEN_INVALID: 'Сессия истекла. Войдите заново',
    TEMP_PASSWORD_EXPIRED: 'Код неверный или срок его действия истёк',
    OTP_RATE_LIMITED: 'Слишком частые запросы кода. Попробуйте позже',
    BAD_REQUEST: 'Некорректный запрос',
    UNAUTHORIZED: 'Войдите заново',
    FORBIDDEN: 'Нет доступа',
    NOT_FOUND: 'Не найдено',
    METHOD_NOT_ALLOWED: 'Действие недоступно',
    CONFLICT:
      'Действие конфликтует с текущим состоянием. Обновите данные и повторите',
    PAYLOAD_TOO_LARGE: 'Файл или запрос слишком большой',
    UNSUPPORTED_MEDIA_TYPE: 'Этот тип файла не поддерживается',
    TOO_MANY_REQUESTS: 'Слишком много запросов. Попробуйте позже',
    SERVICE_UNAVAILABLE: 'Сервис временно недоступен. Попробуйте позже',
  },
  serverValidation: {
    UNKNOWN: 'Некорректное значение',
    NOT_STRING: 'Значение должно быть текстом',
    INVALID_UUID: 'Некорректный идентификатор',
    INVALID_INTEGER: 'Значение должно быть целым числом',
    INVALID_BOOLEAN: 'Значение должно быть «да» или «нет»',
    INVALID_ENUM: 'Недопустимое значение',
    INVALID_DATE: 'Некорректная дата',
    INVALID_VALUE: 'Некорректное значение',
    UNKNOWN_FIELD: 'Это поле недопустимо',
    TEXT_TOO_SHORT_one: 'Не менее {{limit}} символа',
    TEXT_TOO_SHORT_few: 'Не менее {{limit}} символов',
    TEXT_TOO_SHORT_many: 'Не менее {{limit}} символов',
    TEXT_TOO_SHORT_other: 'Не менее {{limit}} символов',
    TEXT_TOO_LONG_one: 'Не более {{limit}} символа',
    TEXT_TOO_LONG_few: 'Не более {{limit}} символов',
    TEXT_TOO_LONG_many: 'Не более {{limit}} символов',
    TEXT_TOO_LONG_other: 'Не более {{limit}} символов',
    VALUE_TOO_SMALL: 'Значение должно быть не меньше {{limit}}',
    VALUE_TOO_BIG: 'Значение должно быть не больше {{limit}}',
    PHONE_FORMAT:
      'Номер телефона должен начинаться с + и содержать от 7 до 15 цифр',
    OTP_FORMAT_one: 'Код должен состоять из {{length}} цифры',
    OTP_FORMAT_few: 'Код должен состоять из {{length}} цифр',
    OTP_FORMAT_many: 'Код должен состоять из {{length}} цифр',
    OTP_FORMAT_other: 'Код должен состоять из {{length}} цифр',
    PASSWORD_TOO_SHORT_one:
      'Пароль должен содержать не менее {{limit}} символа',
    PASSWORD_TOO_SHORT_few:
      'Пароль должен содержать не менее {{limit}} символов',
    PASSWORD_TOO_SHORT_many:
      'Пароль должен содержать не менее {{limit}} символов',
    PASSWORD_TOO_SHORT_other:
      'Пароль должен содержать не менее {{limit}} символов',
    PASSWORD_TOO_LONG_one: 'Пароль должен содержать не более {{limit}} символа',
    PASSWORD_TOO_LONG_few:
      'Пароль должен содержать не более {{limit}} символов',
    PASSWORD_TOO_LONG_many:
      'Пароль должен содержать не более {{limit}} символов',
    PASSWORD_TOO_LONG_other:
      'Пароль должен содержать не более {{limit}} символов',
    PASSWORD_WEAK:
      'Пароль должен содержать символы минимум двух типов: строчные, прописные или цифры',
    NUMBER_FORMAT: 'Значение должно быть числом',
    DATE_FORMAT:
      'Дата должна быть в формате ГГГГ-ММ-ДД и существовать в календаре',
    DATE_IN_FUTURE: 'Дата не может быть в будущем',
    NAME_FORMAT:
      'Имя может содержать буквы, дефис, апостроф и одиночные пробелы между частями',
    NICKNAME_HAS_SPACES: 'Имя пользователя не может содержать пробелов',
    VALUES_MISMATCH: 'Значения не совпадают',
  },
};
