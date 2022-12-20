## Введение 

В этой статье будут описана библиотека <mark>unified</mark> и экосистема плагинов для работы с <mark>remark(markdown)</mark>  и <mark>rehype(html)</mark> .  Напишем собственный плагин, для демонстрации работы создано демо приложение.

Причины выбора библиотеки <mark>unified</mark>  
Моими критериями выбора были. Интеграция с React плагины для компиляции <mark>HTML/Markdown</mark>  в компоненты React:
  * [rehype-react](https://github.com/rehypejs/rehype-react)  для компиляции <mark>HTML</mark> 
  * [remark-react](https://github.com/remarkjs/remark-react)  для компиляции <mark>Markdown</mark>  

Кроме интеграции мне понравилось наличие большого количества плагинов и библиотеку компонент React [react-markdown](https://github.com/remarkjs/react-markdown ) который я уже использовал, react-markdown под капотом использует библиотеку unified и плагины <mark>rehype-react + remark-react</mark> . 
[Очень простая документация](https://github.com/unifiedjs/unified), которая очень подробно описала как работает библиотека.
