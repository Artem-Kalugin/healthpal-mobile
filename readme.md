
# HealthPal
HealthPal — это демонстрационное мобильное приложение для записи к врачам, просмотра медицинских центров и управления профилем.  
Проект создан, чтобы продемонстрировать мои навыки в React Native, включая современный технологический стек, чистый код и продуманный UX.
## ⚙ Установка

#### Android
1. Скачать `.apk` файл [здесь](ссылка на релиз)
2. Установить приложение на устройстве, следуя стандартным инструкциям Android.
> ⚠ Для установки APK из сторонних источников требуется включить соответствующую опцию на устройстве. Убедитесь, что она активирована, иначе установка будет заблокирована.

> ⚠ Размер APK больше, чем у релизной версии в Play Store, так как содержит исходники для всех Android-архитектур. В реальном релизе размер будет в 4 и более раз меньше.


#### iOS
> ⚠ Установка готового билда под iOS недоступна, так как сборка возможна только с платным Apple Developer Account. Разработчики могут собрать приложение самостоятельно по [инструкции](ссылка).
## ⚡ Технологический стек

- **React Native 0.81** — кроссплатформенный фреймворк для iOS и Android.  
- **Expo 54** — обертка над React Native для ускорения разработки + надежные модули для тех или иных задач.  
- **TypeScript** — строгая типизация для надежного кода.  
- **React Navigation** — управление навигацией и роутингом
- **Redux Toolkit + RTK Query** — управление состоянием и работа с API, кэширование ответов сервера.  
- **React Hook Form + class-validator + class-transformer** — валидация форм и DTO.  
- **React Native Reanimated + Gesture Handler** — плавные анимации и жесты.  
- **Expo Location / react-native-yamap** — геолокация и карты (Яндекс Карты).  
- **React Native MMKV + Keychain** — безопасное и быстрое хранение данных и токенов.  


<div align="center">
    <img src="./docs/charts/architecture.svg" alt="Architecture diagram" height="500px">
</div>
<div align="center">
    <img src="./docs/charts/navigation.svg" alt="Navigation diagram" height="300px">
</div>


## Еще

<ul>
<li><a href="./docs/architecture.md">Архитектура</a></li>
<li><a href="./docs/why-no-cd.md">Почему нет CD</a></li>
<li><a href="./docs/why-no-push.md">Почему нет пушей</a></li>
<li><a href="./docs/why-no-tests.md">Почему нет тестов</a></li>
<li><a href="./docs/why-not-bare.md">Почему Expo, а не Bare React Native</a></li>
</ul>
