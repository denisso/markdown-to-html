[Библиотека unified для преобразований markdowwn в html и подключение компонентов React](https://mrdramm.netlify.app/posts/biblioteka-unified-dlya-preobrazovanii-markdown-v-html)

[Online demo](https://markdown-to-html-denisso.vercel.app/)

## Начало работы

Установка и настройка 

```bash
npm install
npm run dev
```

Открываем в браузере [http://localhost:3000](http://localhost:3000)


## Поддержка формата таблиц
используется плагин [remark-gfm](https://github.com/remarkjs/remark-gfm)

```
|Route|Example URL|params|
|---|---|---|
|app/blog/[slug]/page.js|/blog/a|{ slug: 'a' }|
|app/blog/[slug]/page.js|/blog/a|{ slug: 'a' }|
|app/blog/[slug]/page.js|/blog/b|{ slug: 'b' }|
|app/blog/[slug]/page.js|/blog/c|{ slug: 'c' }|
```

## Блоки с кодом
Описание стандартное
\```js
const getLanguage = (node: NodeCustom) => {
    const className = node?.properties?.className || [];
    for (const classListItem of className) {
        if (classListItem.slice(0, 9) === "language-") {
            return classListItem.slice(9).toLowerCase();
        }
    }
    return null;
};
\```



