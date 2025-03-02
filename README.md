# Конфигурация сборки проекта от Эльбрус Буткемп

## Как использовать

Используй команду

```bash
npm init @elbrus/config@latest
```

Также можно и через `npx`

```bash
npx @elbrus/create-config@latest
```

## Что содержит

Данный сборщик предоставляет:

- package.json
- сочетание правил:
  - airbnb
  - кастомные правила Эльбруса ([ссылка на ESLint plugin](https://github.com/Elbrus-Bootcamp/eslint-plugin))
  - собственный конфиг Эльбруса ([ссылка на ESLint config](https://github.com/Elbrus-Bootcamp/eslint-config))
- интеграцию форматтера Prettier
- gitignore

## Как включить форматирование и линтинг по сохранению

1. Скачайте последнюю версию расширения ESLint для VSCode. Убедитесь, что версия вашего
   расширения не ниже 3.0.7. Если версия 2.x.x, то перейдите на Pre-release версию.
2. Скачайте последнюю версию расширения Prettier для VSCode.
3. Перейдите пользовательские настройки в VSCode:
   1. нажмите `Ctrl+Shift+P` или `Cmd+Shift+P`
   2. Введите в окно `user settings.json` и выберите _User settings.json_
4. Включите следующие настройки:

```jsonc
{
  // вставьте там, где все ваши настройки
  "files.autoSave": "afterDelay",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "always"
  },
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "eslint.workingDirectories": [
    { "directory": "./client", "changeProcessCWD": true },
    { "directory": "./server", "changeProcessCWD": true }
  ]
}
```

## Как отключать правила

В файле `eslint.config.mjs` в конец экспортируемого массива нужно добавить объект со
свойством `rules`:

```js
export default [
  // прочие настройки
  ...elbrusConfig,
  {
    rules: {
      'no-console': 'off',
      'no-unused-variables': 'warn',
    },
  },
];
```
