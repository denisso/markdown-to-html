Создание React комопнента для для блока кода описана в статье [Конвертируем markdown в html и подключаем компоненты React с библиотекой Unified это просто](https://mrdramm.netlify.app/posts/biblioteka-unified-dlya-preobrazovanii-markdown-v-html#header--kompilyaciya-ast-html-v-react-komponenty)

```js
const getLanguage = (node: NodeCustom) => {
    const className = node?.properties?.className || [];
    for (const classListItem of className) {
        if (classListItem.slice(0, 9) === "language-") {
            return classListItem.slice(9).toLowerCase();
        }
    }
    return null;
};
```

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```