# Introduction

This repo covers the UI and frontend system for the stock analyzer tool. This allows users to navigate all of exploration, reports, and customizable tool that are available for analyzing the stock market.

Built using react/typescript/vite/echarts/mui

### Explorer

A really simple basic UI for seeing the individual stocks performance over time. Includes tools such as trend detection that will highlight time ranges where upward trends were found.
![Screenshot from 2025-02-17 11-13-31](https://github.com/user-attachments/assets/c68777c1-0e53-47b8-b49b-069caac10013)


Symbols and the tools are selected and choosen here in the explorer
![Screenshot from 2025-02-17 11-15-40](https://github.com/user-attachments/assets/460a26ba-f9d4-40dd-8a55-ddd216f897f1)
![Screenshot from 2025-02-17 11-16-15](https://github.com/user-attachments/assets/b36026fd-888c-47c0-80d4-95d661c10569)

Trends founds
![Screenshot from 2025-02-17 11-19-17](https://github.com/user-attachments/assets/b18ba06f-999a-4e76-9780-c6a0d3d223ed)

![Screenshot from 2025-02-17 11-20-26](https://github.com/user-attachments/assets/a0a88f2e-ec06-43d3-9e6d-c878d2debaad)
When using the reports trend anaylsis with dynamic conditions, the user can understand more about the conditions that occur before and during an upward trend movement.
For example here, the dynamic condition type is candlestick change within day and the config for trend is 0-7-5 (day 0 of trend, 7-day max periods, and minimum of 5% increase). We can see that its split between only two variations, the day was bullish (went up within day) or bearish (went down within day). For those two options, the bearish result occured 78% of the time  


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
