## Команды для запуска
- `npm run build` — сборка стабильной версии
- `npm run start` - запуск стабильной версии
- `npm run dev` — dev режим на 3000 порту

## Figma
[тут](https://www.figma.com/file/F8zu3F8rzHXSap5Drg1h7S/Chat_external_link-(Copy)?node-id=0%3A1&t=KPFu2fkG5b6VIWmw-1)

## Netlify
[тут](https://soft-vacherin-cddc0e.netlify.app/)

## Работа с компонентами
Для создания компоненты необходимо:
- extends от ```Block```
- для указания атрибутов обёртки указываем всё необходимое в ```props.attr```
- для обработчиков указываем всё необходимое в ```props.events```

## В проект добавлены Notification
- Для вызова необходимо ```notifications.addNotification(string, 'success' | 'error' | 'warning');```
- Валидация для ```input``` на событии ```blur```
