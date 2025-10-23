
## Сборка проекта

### Предварительные требования

> ⚠ Сборка билда под iOS доступна только при наличии устройства под управлением macOS.

Перед началом работы убедитесь, что на вашей машине установлено следующее ПО:

#### 1. Node.js и Yarn

- **Node.js** — [инструкция по установке](https://nodejs.org/en/download)
- **Yarn Classic** — после установки Node.js выполните:
```bash
  npm install -g yarn
```

#### 2. Настройка окружения для React Native

Следуйте официальной инструкции для настройки среды разработки:

- [React Native Environment Setup (v0.81)](https://reactnative.dev/docs/0.81/set-up-your-environment)

Необходимо настроить:
- **Android Studio** и Android SDK (для Android)
- **Xcode** и CocoaPods (для iOS, только на macOS)

---

### Установка зависимостей

1. **Клонируйте репозиторий:**
```bash
   git clone https://github.com/Artem-Kalugin/healthpal-mobile
   cd healthpal-mobile
```

2. **Установите зависимости:**
```bash
   yarn install
```

3. **Сгенерируйте типы из API:**
```bash
   yarn script:fetch-types
```

---

### Конфигурация окружения

#### Выбор среды разработки

Выполните команду для инициализации staging-окружения:
```bash
yarn init:staging
```

#### Настройка Yandex MapKit

1. Получите API-ключ Yandex MapKit: [Yandex Developer Console](https://developer.tech.yandex.ru/services)
2. Добавьте ключ в файл `.env`:
```env
   EXPO_PUBLIC_YANDEX_MAPKIT_KEY=your_api_key_here
```

---

### Запуск приложения

#### iOS (только macOS)
```bash
yarn ios:new
```

#### Android
```bash
yarn android:new
```

---

### Сборка production билда 

#### Android Release Build (.apk)
```bash
yarn android:new --variant=Release
```

## Еще

<ul>
<li><a href="./architecture.md">Архитектура</a></li>
<li><a href="./why-no-cd.md">Почему нет CD</a></li>
<li><a href="./why-no-push.md">Почему нет пушей</a></li>
<li><a href="./why-no-tests.md">Почему нет тестов</a></li>
<li><a href="./why-not-bare.md">Почему Expo, а не Bare React Native</a></li>
</ul>