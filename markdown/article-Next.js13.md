[Эта статья на habr](https://habr.com/ru/post/720578/)

Всех приветствую и желаю приятного чтения!

[Next.js](https://nextjs.org/) это fullstack фреймворк разработанный [Vercel](https://vercel.com/) использующий последние разработки React. 

Не так давно [25 октября 2022 года](https://nextjs.org/blog/next-13) вышла версия 13. На данный момент последняя стабильная версия 13.2.3,  и новые возможности все еще находятся в стадии бета теста, и не рекомендуется использовать в продакшен. 

13 поддерживает все возможности версии 12. Для тестирования новых возможностей используется специальная директория app. Такой подход помогает попробовать новые возможности, в проектах, которые работали на версии 12.

В этой статье я пробую использовать только новые возможности версии 13, кому интересно больше узнать о Next.js рекомендую: [Next.js: подробное руководство. Итерация первая](https://habr.com/ru/company/timeweb/blog/588498/).


# Краткое содержание статьи

Описание разделов:

**Серверные и клиентские компоненты**

Серверные компоненты доступны стали доступны для использования. Рассмотрим особенности определения серверного и клиентского кода, задачи и возможности компонентов, использование одном дереве компонентов и серверные функции.

**Выборка данных и кэширование**

Добавлена новая функция выборки fetch c возможностью настройки кэширования, которая может использоваться на клиенте и сервере. Клиентскому маршрутизатору добавлено автоматическое кэширование сегментов при навигации.  Серверный кэш сегментов.

> Сегмент - это часть URL пути разделенная слешами.

**Маршрутизация**

Построена на работе с сегментами и новой файловой структурой. Основные темы:
- Родительский сегмент содержит **компоненты обертки** над дочерними сегментами, они добавляют: обработку ошибок, состояние загрузки, слои, шаблоны и другие обертки, подробнее о которых будет в главе "Файлы сегмента маршрута".
- [Route groups](https://beta.nextjs.org/docs/routing/defining-routes#route-groups)  - для 
организации сегментов, для того чтобы применить к ним одинаковые настройки, организовать сегменты в структуру, не влияя на структуру URL, создания нескольких корневых layout.
- **Динамические сегменты** - для построения маршрутов из динамических данных, основан на  использование квадратных скобок в именах файлов и директорий, не сильно отличается от того что используется в pages. Подробности в главе "Динамические сегменты".
- [Route Handlers](https://beta.nextjs.org/docs/routing/route-handlers) - обработчики маршрута для построения своего API для обработки http запросов, альтернатива pages/api. Подробности в главе  "Обработчики маршрута".

**Потоковой передачи Http и компонент Suspense**

Использование потоковой передачи Http  в сочетании компонентом Suspense возможно для серверных и клиентских компонентов, находящихся в одном дереве компонентов. Подробности в  "HTTP Streaming и Suspense"

**Метаданные и SEO оптимизация**

Новый подход к добавлению метаданных на страницу c помощью объектов js и поддержка [JSON-LD](https://json-ld.org/) - это формат микроразметки описания контента с помощью объектов словаря [связанных данных](https://ru.wikipedia.org/wiki/Linked_data).

**Немного заметок и выводы**

Для каждого раздела есть пример кода…

# Примеры кода

Все примеры хранятся в репозитории [Github next13-app-exp](https://github.com/denisso/next13-app-exp) и развернуты на [Vercel](https://vercel.com/), потому что там можно автоматически развернуть в продакшен каждую ветку.

Список примеров по названию веток:

 - [Code router-dynamic](https://github.com/denisso/next13-app-exp/tree/router-dynamic) / [Online Demo](https://next13-app-exp-templates-git-router-dynamic-denisso.vercel.app/) - пример работы с динамической маршрутизации, и тест параметра сегмента dynamicParams управляющим динамической генерацией страниц после сборки. Пока есть проблема с [подключением своего not-found.js]( https://github.com/vercel/next.js/issues/45939) и в этом [обсуждении есть обходной путь](https://github.com/vercel/next.js/discussions/45927).
 - [Code context](https://github.com/denisso/next13-app-exp/tree/context) / [Online demo](https://next13-app-exp-templates-git-context-denisso.vercel.app/) - пример работы с контекстом в клиентских компонентах используется в главе "Работа с контекстом на стороне клиента".
 - [Code server-fetch-standalone](https://github.com/denisso/next13-app-exp/tree/server-fetch-standalone) / [Online demo](https://next13-app-exp-templates-git-server-fetch-standalone-denisso.vercel.app/)- пример работы серверного и клиентского fetch с опцией revalidate: 60, с кэшем подробнее в главе "Выборка данных и кэширование". Пока опция revalidate: 60 не работает [баг репорт](https://github.com/vercel/next.js/issues/46732)
 - [Code static-dynamic-segments](https://github.com/denisso/next13-app-exp/tree/static-dynamic-segments) / [Online demo](https://next13-app-exp-templates-git-static-dynamic-segments-denisso.vercel.app) - пример использования статических и динамических сегментов в одном URL пути, в зависимости от того какие будут параметры последнего сегмента, так будет генерироваться весь путь.
 - [Code suspense](https://github.com/denisso/next13-app-exp/tree/suspense) /
[Online Demo](https://next13-app-exp-templates-git-suspense-denisso.vercel.app/) - демонстрация потоковой передачи данных. Нескольких серверных компонентов, делают выборку на стороне сервера, и загружаются в одном клиентском компоненте с использованием компонента Suspense не нарушая интерактивность страницы. Подробности в главе "Потоковая передача и компонент Suspense".
- [server-fetch-custom-cache](https://github.com/denisso/next13-app-exp/tree/server-fetch-custom-cache), - делаем свой кэш для демонстрации работы с данными в серверных компонентах. Подробнее будет в главе "Передача данных между серверными компонентами".

Примеры, используемые в главе "Маршрутизация":
 - [Code loading](https://github.com/denisso/next13-app-exp/tree/loading) / 
[Online Demo](https://next13-app-exp-templates-git-loading-denisso.vercel.app/) -  пример работы файла loading.js, который добавляет обертку Suspense к сегменту
 - [Code error-boundaries](https://github.com/denisso/next13-app-exp/tree/error-boundaries) / [Online Demo](https://next13-app-exp-templates-git-error-boundaries-denisso.vercel.app/) -  пример работы файла error.js перехват ошибок клиентских и серверных компонентов.
 - [Code templates](https://github.com/denisso/next13-app-exp/tree/templates) / [Online Demo](https://next13-app-exp-templates-git-templates-denisso.vercel.app/) - пример работы файла template.tsx, форма обратной связи одна для всех сегментов и перезагружается на каждый переход между сегментами, за исключением сегментов, объединенных с помощью [Route Groups](https://beta.nextjs.org/docs/routing/defining-routes#route-groups).
 - [Code multiple-root-layouts](https://github.com/denisso/next13-app-exp/tree/multiple-root-layouts) / [Online Demo](https://next13-app-exp-templates-git-multiple-root-layouts-denisso.vercel.app/) - пример работы [нескольких Root Layout](https://beta.nextjs.org/docs/routing/defining-routes#example-creating-multiple-root-layouts), в этом примере нет корневого файла layout.js, вместо этого созданы две папке в каждой из которых есть layout.js [Root Layout](https://beta.nextjs.org/docs/routing/pages-and-layouts#root-layout-required). Примечание: При переключении между Root Layout происходит полная перезагрузка страницы. В 13.1.6  было немного другое поведение, и я надеялся, что полной перезагрузки не будет. [Обсуждение](https://github.com/orgs/vercel/discussions/1414) так было в [13.1.6](https://multiple-root-layouts-e20pt24sg-denisso.vercel.app/) можно было перейти на другой root layout 3 раза без перезагрузки страницы.

Есть еще большая [демка](https://vercel.com/templates/next.js/app-directory) от Vercel для тестирования новых возможностей.

В github репозитории Next.js 13 в папке examples можно найти несколько примеров адаптированных для app: 
- [app-dir-i18n-routing](https://github.com/vercel/next.js/tree/canary/examples/app-dir-i18n-routing) - многоязычный сайт, сделанный через множественный RootLayout
- [app-dir-mdx](https://github.com/vercel/next.js/tree/canary/examples/app-dir-mdx) - 
- [reproduction-template-app-dir](https://github.com/vercel/next.js/tree/canary/examples/reproduction-template-app-dir)
- [with-grafbase](https://github.com/vercel/next.js/tree/canary/examples/with-grafbase) - работа с graphlq

# Установка и использование новых экспериментальных возможностей

Для установки с использованием новых возможностей  можно использовать create-next-app с опцией experimental-app

```
npx create-next-app@latest --experimental-app
```

Если хотите попробовать самые последние обновления, которые еще не вошли в основную ветку нужно установить версию canary вместо latest. 

Включаем экспериментальное возможности, если установка была без experimental-app

```json
next.config.js
const nextConfig = {
  experimental: {
    appDir: true,
  },
}
```

После установки будет доступна [папка app](https://beta.nextjs.org/docs/app-directory-roadmap) в которой можно тестировать новые возможности, папка pages также доступна в которой все работает также, как и в 12 версии. pages и app работают одновременно, в app также, как и в pages можно настраивать маршрутизацию и нужно следить за тем чтобы маршруты не пересекались. Одновременное использование папок app и pages дает возможность протестировать уже существующие проекты, частично используя нововведения из папки app.

В документации есть [гайд по миграции](https://beta.nextjs.org/docs/upgrade-guide) приложения из папки pages в app.

# Серверные и клиентские компоненты

Серверные компоненты в Next.js 12 [были доступны в стадии (альфа)](https://nextjs.org/blog/next-12#react-server-components), для того чтобы использовать серверные компоненты нужно было добавить слово server перед расширением файла "component.server.js".  В 13 версии, используется другой подход к использованию серверных компонентов.

В  каталоге app все компоненты по умолчанию являются серверными, также если компонент из app импортирует другой компонент вне каталога app он также будет по умолчанию серверным. 

Чтобы обозначить что компонент является клиентским нужно в начале модуля [компонента использовать директиву "use client"](https://beta.nextjs.org/docs/rendering/server-and-client-components#client-components), будет далее в примере показано как это сделать.

Дополнительно для того можно указать что код должен использоваться только на сервере с помощью [server-only](https://www.npmjs.com/package/server-only) или клиенте [client-only](https://www.npmjs.com/package/client-only).

Серверными могут быть только функциональнее компоненты, но без возможности работать с состоянием и хуками, которым нужно состояние.

Если используем классовый компонент на сервере получим ошибку:

```
React Class Components only works in Client Components
```

Серверные и клиентские компоненты могут чередоваться в одном и том же дереве компонентов.

В [случае если клиентский компонент родитель и серверный дочерний](https://beta.nextjs.org/docs/rendering/server-and-client-components#importing-server-components-into-client-components), нужно серверный компонент передавать через props children.

Серверные компоненты могут быть [синхронными и асинхронными](https://beta.nextjs.org/docs/data-fetching/fetching#asyncawait-in-server-components). 

В текущий момент если дочерний асинхронный  серверный компонент  использовать с Typescript это приведет к ошибке

```
'ServerComponent' cannot be used as a JSX component.
  Its return type 'Promise<Element>' is not a valid JSX element.
    Type 'Promise<Element>' is missing the following properties from type 'ReactElement<any, any>': type, props, key
```

рекомендация от разработчиков использовать
 
```
{/* @ts-expect-error Server Component */}
```

в будущем это должно быть исправлено. 

[Полный код примера](https://github.com/denisso/next13-app-exp/tree/loading)

app/page.tsx

```ts
import { ServerComponent } from "@/components/ServerComponent";
import { ClientComponent } from "@/components/ClientComponent";

export default async function Page({ params }: { params: { page: string } }) {
  return (
    <ClientComponent header={params.page}>
      {/* @ts-expect-error Server Component */}
      <ServerComponent page={params.page} />
    </ClientComponent>
  );
}
```

components/ClientComponent.tsx

```ts
'use client';

export default function ClientComponent({children}) {
  return (
    <>
      {children}
    </>
  );
}
```

components/ServerComponent.tsx

```ts
import { fetchData } from "@/lib/fetchData";

export const ServerComponent = async ({ page }: { page: string }) => {
  const {data} = await fetchData(page)
  return <>{data}</>
}
```

[Серверные компоненты рекомендуются использовать](https://beta.nextjs.org/docs/rendering/server-and-client-components#when-to-use-server-vs-client-components) до тех пор, пока не будет необходимости в клиентских компонентах. Предполагаю это поможет уменьшить размер Client Side React кода, потому что render серверных компонентов будет выполнен на сервере, а в клиент будет отправлен готовый HTML CSS и JS для работы с API браузера.

Типичные задачи для серверных компонентов:
- Выборка и кэширование запросов на стороне сервера с помощью новой функции [fetch](https://beta.nextjs.org/docs/api-reference/fetch).
- Хранения приватных данных для доступа к внешнему API.
- Работа с  серверным API Next.js и Node.js.
- Хранение кода тяжелых зависимостей на сервере, чтобы уменьшить размер Client Side React кода.

и для клиентских компонентов:
- Работа с хуками, работающими с состоянием React компонентов.
- Работа с классовыми компонентами React.
- Работа с событиями пользовательского интерфейса.
- Работа с браузерным API.

## Полный список серверных функций

- [cookies](https://beta.nextjs.org/docs/api-reference/cookies) - считывать cookie входящего запроса HTTP.
- [fetch](https://beta.nextjs.org/docs/api-reference/fetch) - делает выборку данных
- [headers](https://beta.nextjs.org/docs/api-reference/headers) - считывает заголовки запроса HTTP.
- [generateStaticParams](https://beta.nextjs.org/docs/api-reference/generate-static-params) - определяет список параметров сегмента маршрута, которые будут статически генерироваться во время сборки.
- [notFound](https://beta.nextjs.org/docs/api-reference/notfound) - принудительно вызывает компонент из файла not-found.js и добавляет мета тэг name="robots" content="noindex"
- [redirect](https://beta.nextjs.org/docs/api-reference/redirect) - перенаправляет клиента на другой URL
- [NextRequest](https://beta.nextjs.org/docs/api-reference/request) и [NextResponse](https://beta.nextjs.org/docs/api-reference/response) - используются в Route handler, подробнее в главе "Обработчики маршрута"

# Выборка данных и кэширование

В app доступно кэширование выборки fetch и сегментов на клиенте и сервере.

## Клиентский и Серверный кэш на уровне выборки данных с помощью функции fetch

[fetch](https://beta.nextjs.org/docs/api-reference/fetch) это одна из новых функций Next.js 13 прототипом который была функция [fetch Web Api](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

Fetch может быть использована на клиенте и браузере.

С помощью второго параметра функции можно управлять кэшированием: 
	
 - {cache: "no-store"} - не кэшировать
 - {cache: "force-cache"} (default) - кэшировать 
 - {next: { revalidate: number } } - хранить кэш определенное время

[online demo](https://next13-app-exp-templates-git-server-fetch-standalone-denisso.vercel.app) - демонстрирует как работает кэширование fetch с опцией хранить кэш 60 секунд:

```js
      const response = await fetch(url, {
        next: { revalidate: 60 },
      });
```

В демо функция fetch запускается из серверного и клиентского компонента. На стартовой странице нужно выбрать id, запроса, кэш которого будем тестировать, далее с помощью радио кнопок выбрать серверный или клиентский fetch:

![fetch demo start](https://res.cloudinary.com/mrdramm/image/upload/v1677932597/site0001/articles/20230203-next13/fetch-standalone-start_zey80f.jpg)

Пока что в браузере (Chrome | Firefox) опция revalidate не работает, на сервере работает отлично.

[Обсуждение почему не работает revalidate в браузере](https://github.com/vercel/next.js/discussions/46729)

Опция cache работает в браузере и на сервере. [Код примера для теста](https://github.com/denisso/next13-app-exp/tree/server-fetch). Код этого примера нужно запускать оффлайн, я не придумал онлайн пример  чтобы было понятно показать, как работает постоянный кэш на сервере. В  демке используется [json-server](https://github.com/typicode/json-server), который очень прост в настройке, смотри readme репозитория.  Json-server запущенный из командной строки отображает каждый запрос, который он обработал. Если в демо запрашивать одни и те же данные с включенным постоянным кэшированием повторных с одинаковыми параметрами запросов к json-server не будет.

Не запрещено пользоваться другими утилитами для выборки данных, в этом случае кэширование будет зависеть от возможностей этих утилит. Например, [axios](https://axios-http.com/docs/intro) или [SWR](https://nextjs.org/docs/basic-features/data-fetching/client-side#client-side-data-fetching-with-swr) хорошо подойдут для кэширования запросов.

На заметку:

Вместо имени хоста "localhost" в запросах серверного fetch, лучше использовать 127.0.0.1 иначе можно получить такую ошибку:

```
{"cause":{"errno":-4078,"code":"ECONNREFUSED","syscall":"connect","address":"::1","port":3000}}
```

которая случается не каждый раз при использовании localhost, т.е. может и не  случиться. Точной причины и периодичности я не выявил, есть подозрения что она появляется только в Node.js 18 при не выявленных условиях.

[У fetch были проблемы с кэшем на стороне сервера до версии 13.2](https://github.com/vercel/next.js/issues/46120).

## Клиентский кэш на уровне сегментов

Новый маршрутизатор имеет кэш на стороне клиента в памяти [in-memory client-side cache](https://beta.nextjs.org/docs/routing/linking-and-navigating#client-side-caching-of-rendered-server-components), в котором сохраняется результат визуализации (render result) серверных компонентов по мере того, как пользователь перемещается по приложению. 

Кэш можно аннулировать с помощью router.refresh().

## Серверный кэш на уровне сегментов

Это SSG и SSR который также был и в pages версии 12. В pages работа была со страницами, в app  с сегментами. Сегмент в отличии от страницы, представляет собой часть URL пути разделенный  "/".

[Документация](https://beta.nextjs.org/docs/data-fetching/caching#segment-level-caching)

В app свое API, но работает очень похоже на pages:
 - сегмент может быть статическим динамическим, сгенерирован по требованию 
 - сегменты можно сгенерировать во время сборки, а для тех, которые не сгенерированы задать поведение как они будут обрабатываться, будет страница 404 или они будут генерироваться и запоминаться на определенное время или навсегда.

Для настройки  кеширования используются параметры,  параметры экспортируются из специально именованных файлов, находящихся в папке сегменте, подробнее о файлах маршрута в следующей главе "Маршрутизация".

```js
export const dynamic = 'auto'
export const dynamicParams = true
export const revalidate = false
```

Дополнительную информацию о опциях можно найти в разделе документации [Route Segment Config](https://beta.nextjs.org/docs/api-reference/segment-config). 

Рассмотрим работу кэширования сегментов на [примере](https://next13-app-exp-templates-git-static-dynamic-segments-denisso.vercel.app/). 

Структура файлов демки:

```
app
│   globals.css
│   layout.module.scss
│   layout.tsx
│   page.tsx
│
└───static
    │   layout.tsx
    │   page.tsx
    │
    └───dynamic
            page.tsx
```

Маршруты строятся с помощью вложенности папок.

В демо используется путь /static/dynamic, состоящий из двух сегментов, идущих друг за другом:

- static - этот сегмент кэшируется как статический, потому что в файле static\layout.tsx опция dynamic=force-static и она будет действовать на маршрут /static. 
- dynamic - этот сегмент динамически и не кэшируется, потому что в файле static\dynamic\page.tsx указана опция dynamic=force-dynamic, и она будет действовать на маршрут /static/dynamic.

Кэш маршрута /static хранится отдельно, т.е. маршрут /static/dynamic не перепишет кэш /static. 

Эта демка демонстрирует одну особенность. Чтобы ее понять, нужно знать, что такое "слои" они подробнее в следующей главе "Маршрутизация". Слой - это компонент который обертывает текущий сегмент и дочерние сегменты, и хранит свое состояние при навигации по дочерним сегментам. В демке слой для static сегмента выводит время своей генерации на сервере. И по идее если сегмент "force-static" он не должен перерисовываться, это так и работает пока мы на сегменте статик. 

Если перейти со static сегмент на dynamic сегмент, то у видим, что компонент layout  сегмента static отобразился с данными из кэша. В документации [Partial Rendering](https://beta.nextjs.org/docs/routing/fundamentals#partial-rendering) написано, что должны перерисовываться только дочерние сегменты, при навигации, т.е. работает все верно, как по документации.

![cache dynamic 1](https://res.cloudinary.com/mrdramm/image/upload/v1677765547/site0001/articles/20230203-next13/cache-001_vwm0bn.jpg)

Что у меня вызвало вопрос это, если на dynamic сегменте нажать кнопку "Refresh current segment", которая запускает [router.refresh()](https://beta.nextjs.org/docs/api-reference/use-router#userouter), для очистки клиентского кэша и запроса новых данных с сервера, layout который пришел из static сегмента получит обновленные данные с сервера, не смотря на то что он force-static:

![cache dynamic 2](https://res.cloudinary.com/mrdramm/image/upload/v1677765547/site0001/articles/20230203-next13/cache-002_vs5b9v.png)

На кэш  сегмента /static это не влияет. Интересно что генерация кода выполняется на сервере, я это узнал просто, добавив в компонент console.log("generation"), собрал и запустил сервер,  и на каждое нажатие кнопки "Refresh current segment" в логе сервера видел это сообщение.

Если перейти на сегмент dynamic нажать "Refresh current segment" перейти на сегмент home и вернуться на dynamic, поведение будет такое же, как и при нажатии кнопки  "Refresh current segment".

Пока не понятно это баг или фича, обсуждаем [тут](https://github.com/vercel/next.js/discussions/46695).

# Маршрутизация

Новая маршрутизация Next.js 13 построена работе с сегментами. Сегмент представляет собой часть URL пути разделенный "/".

![url anatomy](https://res.cloudinary.com/mrdramm/image/upload/v1675923229/site0001/articles/20230203-next13/terminology-url-anatomy_o3ylvv.jpg).

Сегмент представляет собой набор специально именованных файлов js расположенных в одной папке, каждый файл содержит серверные или клиентские компоненты, обработчики состояний загрузки , ошибок (Error boundaries может быть только клиентским), страницы 404. Папки сегментов могут быть вложены.

Вложенность сегментов - это новая возможность, 

![nested layuots](https://res.cloudinary.com/mrdramm/image/upload/v1675451195/site0001/articles/20230203-next13/nested-file-conventions-component-hierarchy_w6bktj.jpg)

создав в родительском сегменте компонент слой (layout.js), этот компонент будет оберткой для все дочерних сегментов, в которых могут быть свои слои. Эта возможность работает и для других компонентов оберток: шаблонов, загрузчиков, обработчиков ошибок. Сравнивая с  [реализацией вложенности слоев в pages](https://nextjs.org/docs/basic-features/layouts), новый подход на основе компонентов оберток app это упрощает и уменьшает написание кода.

## Файлы сегмента маршрута

Документация  содержит хорошее описание компонентов в файлах сегмента на Typescript.

В папке app можно хранить любые файлы, главное, чтобы имена не совпадали со спец. файлами. 

Файлы из pages [_app](https://nextjs.org/docs/advanced-features/custom-app) и [_document](https://nextjs.org/docs/advanced-features/custom-document) в app заменены функционалом файлов layout и page. 

[Специально именованные файлы маршрутизации](https://beta.nextjs.org/docs/routing/fundamentals#file-conventions) в папке app генерируют дерево компонентов со следующей иерархией:

![Component Hierarchy](https://res.cloudinary.com/mrdramm/image/upload/v1675446848/site0001/articles/20230203-next13/file-conventions-component-hierarchy_mh9gw2.jpg)

Краткое описание файлов:
- page.js: создает уникальный UI и делает маршрут доступным 
	- route.js: добавляет [Route Handlers](https://beta.nextjs.org/docs/routing/route-handlers) для обработки запросов HTTP (server-side API endpoints).
- layout.js: Создайте общий пользовательский интерфейс для сегмента и его дочерних элементов. Макет оборачивает страницу или дочерний сегмент.
	- template.js: Похожий на layout.js , за исключением того, что новый экземпляр компонента монтируется и размонтируется при навигации по дочерним сегментам. 
- loading.js: Обертывает страницу или дочерний сегмент в компонент [React Suspense](https://beta.reactjs.org/reference/react/Suspense).
- error.js: Обертывает страницу или дочерний сегмент в компонент [React Error Boundary](https://ru.reactjs.org/docs/error-boundaries.html) 
	- global-error.js: Похожий на error.js, но ловит ошибки только в корневом layout.js.
- not-found.js: rКомпонент в этом файле будет будет использоваться когда будет вызов [notFound](https://beta.nextjs.org/docs/api-reference/notfound) 

Рассмотрим каждый из этих файлов подробнее.

### [page.js](https://beta.nextjs.org/docs/api-reference/file-conventions/page)

Используется для определения уникального пользовательского интерфейса на конце маршрута. 

Примечания:
- Если файл page отсутствует в сегменте будет отображена страница 404 по этому маршруту. 
- Page может использоваться для добавления [метаданных](https://beta.nextjs.org/docs/guides/seo) и статической генерации страниц во время сборки используя generateStaticParams.
- В сегменте может быть либо page либо route.js, но не оба сразу.

[slug]\page.tsx

```ts
export type TProps = {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default function Page(props: TProps) {
  return <PageComponent {...props} />;
}
```

Props: 
 - params - имя сегмента или сегментов если используется динамическая маршрутизация 
 - searchParams - [параметры поиска](https://developer.mozilla.org/en-US/docs/Web/API/URL/searchParams)

### [layout.js](https://beta.nextjs.org/docs/api-reference/file-conventions/layout)

Обязательный файл, используемый для определения пользовательского интерфейса, который является общим для всех дочерних сегментов. 

Примечания:
- Обязательно должен быть хотя бы один [RootLayout](https://beta.nextjs.org/docs/routing/pages-and-layouts#root-layout-required)
- Корневой файл layout.js это лучшее место для использования функций инициализации и подключения глобальных контекстов ( подключение библиотек управления состоянием, контексты графических фреймворков ) на стороне клиента.
- RootLayout может быть не один, смотри пример [Example: Creating multiple root layouts](https://beta.nextjs.org/docs/routing/defining-routes#example-creating-multiple-root-layouts). При переходе между RootLayout происходит полная перезагрузка страницы, что для меня было немного [неожиданно]. [Смотри демку](https://multiple-root-layouts-pv0yi955m-denisso.vercel.app/) и я не понял почему они сделали полную перезагрузку так как в [13.1.6](https://multiple-root-layouts-o7f75stl3-denisso.vercel.app/about) работало почти без перезагрузки, но в [13.1.7] перезагрузка после каждого перехода. Этот вариант хорошо подходит чтобы сделать [много язычный сайт](https://github.com/vercel/next.js/tree/canary/examples/app-dir-i18n-routing). 
- layout используется для добавления [метаданных](https://beta.nextjs.org/docs/guides/seo) и использования тегов script и link, так head.js в 13.2 устаревает.

Интересный факт, не знаю упомянут ли он в доке, если в папке app не будет ни одного файла RootLayout, то

в логе отладочного сервера получим сообщение:

```
Your page app/page.tsx did not have a root layout. We created app\layout.tsx for you.
```

layut.js восстановлен с таким содержимым:

```js
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head />
      <body>{children}</body>
    </html>
  )
}
```

С другими файлами я такого поведения не заметил.

Props: 
- children - компонент page этого или дочернего сегмента со всеми обертками согласно этой [иерархии](https://beta.nextjs.org/docs/routing/fundamentals#component-hierarchy)
- params - имя сегмента или сегментов если используется динамическая маршрутизация 

### [route.js](https://beta.nextjs.org/docs/api-reference/file-conventions/route)

В версии 13.1.7-canary.23 добавлен новый инструмент для создания API, который получил название [Route Handlers](https://beta.nextjs.org/docs/routing/route-handlers), замена [API Routes](https://beta.nextjs.org/docs/data-fetching/api-routes) в папке pages. Сейчас он доступен начиная с 13.2 в основной версии, а не только в canary. Подробнее будет в главе "Обработчики маршрута"

### Экспорт значений из файлов: layout, page, route 

Layout, page, route могут экспортировать настройки на уровне сегмента. Подробнее в [доке](https://beta.nextjs.org/docs/api-reference/segment-config):
 - dynamic - можно принудительно сделать компонент динамическим/ Допустимые значения: 'auto'(default) | 'force-dynamic' | 'error' | 'force-static'. По умолчанию сегмент кэшируется во время сборки и будет статическим, это означает . Смотри приложение static vs dynamic fallback
 - dynamicParams - эта опция заменяет параметр fallback из [getStaticPaths](https://nextjs.org/docs/basic-features/data-fetching/get-static-paths) Next.js 12,
 - revalidate - false или число - эта опция заменяет параметр revalidate из getStaticProps  Next.js 12,
 - fetchCache - указывает как будет работать с кэшем специальная серверная функция [fetch](https://beta.nextjs.org/docs/data-fetching/fundamentals#the-fetch-api),
 - runtime - выбор между [edge и nodejs runtimes](https://beta.nextjs.org/docs/rendering/edge-and-nodejs-runtimes),
 - preferredRegion - в случае использования нескольких серверов можно настроить выборку данных по регионам, что сокращает задержку и повышает производительность. [Setting Serverless Function Regions](https://vercel.com/docs/concepts/functions/serverless-functions/regions) [Подробнее](https://beta.nextjs.org/docs/data-fetching/fundamentals#fetching-data-on-the-server).

Дополнительно layout и page экспортируют метадату. Подробнее в главе "SEO оптимизация и  метаданные"

### [template.js](https://beta.nextjs.org/docs/routing/pages-and-layouts#templates)

Templates похожи на layouts тем, что они обертывают свой и дочерние сегменты, но основная разница в том что при каждой навигации по дочерним сегментам, создается новый экземпляр template, за исключением маршрутов, которые находятся в одной [Route Groups](https://beta.nextjs.org/docs/routing/defining-routes#route-groups).

[online demo](https://next13-app-exp-templates-git-templates-denisso.vercel.app/). 

Файлы примера:

```
app
│   layout.tsx
│   page.tsx
│   template.tsx
│
├───(marketing)
│   ├───about
│   │       page.tsx
│   │
│   └───blog
│           page.tsx
│
└───(shop)
    └───account
            page.tsx
```

Видно, что файл template.tsx есть только в корневой папке, компонент template оборачивает дочерние сегменты, компонент содержит форму обратной связи для демонстрации работы пересоздания компонента при навигации по сегментам. 

Состояние по умолчанию формы "готова к отправке", если нажать "отправить" состояние формы перейдет в состояние "отправлено", и состояние сбросится перейти на другой сегмент, так как создастся новый экземпляр формы с состоянием по умолчанию. 

Сегменты About и Blog, расположены в  [Route Groups](https://beta.nextjs.org/docs/routing/defining-routes#route-groups) это папка marketing с круглыми скобками.

[Route Groups](https://beta.nextjs.org/docs/routing/defining-routes#route-groups) не оказывают влияния на формирование сегментов пути, т.е. не добавляется новый сегмент пути маршрута, например, marketing в путь URL Route Groups и служат для группировки маршрутов. 

При навигации внутри "Route Groups" компонент template не пересоздается. Т.е. если мы перейдем на сегмент About нажмем отправить, а затем перейдем на сегмент Blog не произойдет создания нового экземпляра формы обратной связи.

На всякий случай [опрос баг или фича](https://github.com/vercel/next.js/discussions/45546).

Template может быть использован для:
- Использование stateless компонентов, которые при навигации пересоздаваться запуская css/js анимацию.
- Подключения компонентов, которые требуют инициализации при переходе на каждый сегмент, например форма обратного отзыва на каждую страницу. [как показано в демо](https://next13-app-exp-templates.vercel.app/)
- Обертка Suspense внутри layout будет показывать fallback один раз, внутри template fallback будет показываться каждый раз.

Props:
	• children - компонент page этого или дочернего сегмента со всеми обертками согласно этой [иерархии](https://beta.nextjs.org/docs/routing/fundamentals#component-hierarchy)

### [loading.js](https://beta.nextjs.org/docs/api-reference/file-conventions/loading)

Используется для создания пользовательского интерфейса загрузки для определенной части приложения. Он автоматически помещает страницу или дочерний макет в "одну" обертку [React Suspense](https://beta.reactjs.org/reference/react/Suspense#suspense). По умолчанию все дерево внутри "каждого" Suspense рассматривается как единое целое, все они вместе будут заменены индикатором загрузки, определённым в loading.js. [демо для loading.js](https://next13-app-exp-templates-git-loading-denisso.vercel.app/).

```js
export default function Loading() {
  return <LoadingSkeleton />
}
```

NoProps

[error.js и global-error.js](https://beta.nextjs.org/docs/routing/error-handling)

Используется для выделения ошибок в определенных частях приложения. Он автоматически помещает страницу или дочерний макет в  [React Error Boundary](https://reactjs.org/docs/error-boundaries.html). Компонент обработчик ошибки должен быть клиентским. [online demo](https://next13-app-exp-templates-git-error-boundaries-denisso.vercel.app/) обработки ошибок на стороне сервера и клиента

Props:
	• error - экземпляр объекта Error 
	• reset - функция для сбрасывания Error Boundary. 
	
### [head.js](https://beta.nextjs.org/docs/api-reference/file-conventions/head)

В 13.2 этого файла уже не будет, [метадата будет формироваться в файлах laout и page ](https://beta.nextjs.org/docs/api-reference/metadata)
Используется для наполнения тега <head>. Обычно находится корневой папке app, но в случае с несколькими RootLayout может  находится в каждой папке RootLayout. в head.js можно было использовать теги style и script,  теперь они судя по всему будут подключаться в layout.js. 
Плюсы использования нового формата метаданных в layout и pages:
	• Метадата сможет динамически настраиваться в зависимости от данных полученных в layout и page. 
	• VSCode что-то подсказывает вариант для некоторых параметров метаданных.

Так выглядел head.js:

```ts
export default function Head() {
  return (
    <>
      <title>Create Next App</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </>
  )
}
```

так выглядит  новая metadata в layout.js

```ts
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
  icons: {
    icon: "/favicon.ico",
  },
};
```

### [not-found.js](https://beta.nextjs.org/docs/api-reference/file-conventions/not-found)

Файл используется если будет вызвана функция [notFound](https://beta.nextjs.org/docs/api-reference/notfound), пока not-found.js не вызывается автоматически, если маршрут не найден будет вызвана страница 404 не из файла "not-found.js", а по умолчанию. Надеюсь это поведение поменяется, в [баг репорте](https://github.com/vercel/next.js/issues/45939) мне ответили "We are working on that".

[Online demo](https://next13-app-exp-templates-git-router-dynamic-denisso.vercel.app/)

NoProps

## Динамические сегменты

Динамический сегмент можно создать, заключив имя папки, в квадратные скобки, например: [id] или [slug]. 
	
Динамическое имя сегмента можно получить в page.js,  layout.js, route.js.

Простой пример 

```ts
import { Blog as BlogComponent } from "@/components/blog";

export type TProps = {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};
interface IPage {
  (props: TProps): JSX.Element;
}

export default function Blog(props: Tprops) {
  console.log(props.params);
  return <BlogComponent {...props} />;
}
```

|Route|Example URL|params|
|---|---|---|
|app/blog/[slug]/page.js|/blog/a|{ slug: 'a' }|
|app/blog/[slug]/page.js|/blog/a|{ slug: 'a' }|
|app/blog/[slug]/page.js|/blog/b|{ slug: 'b' }|
|app/blog/[slug]/page.js|/blog/c|{ slug: 'c' }|

С помощью параметра dynamicParams в файлах layout.js / page.js / route.js

```
export const dynamicParams = true | false;
```

можно разрешить или запретить генерировать сегменты, кроме тех что возвращает функция [generateStaticParams](https://beta.nextjs.org/docs/api-reference/segment-config#generatestaticparams). В page.js - эта опция аналог опции fallback из [getStaticPaths](https://nextjs.org/docs/basic-features/data-fetching/get-static-paths), которая используется в pages. [online demo](https://next13-app-exp-templates-git-router-dynamic-denisso.vercel.app/)

Пример использования generateStaticParams в демке 

[slug]\page.tsx

```ts
import { Page as PageComponent} from "@/components/page";

export async function generateStaticParams() {
  return [{slug: "1"}, {slug: "2"}];
}

export type TProps = {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};
interface IPage {
  (props: TProps): JSX.Element;
}

export default function Page(props: Tprops) {
  return <PageComponent {...props} />;
}
export const dynamicParams = false;
```


**catch-all**

Перехват имен всех дочерних сегментов [...slug] возможно добавив многоточие внутри скобок

|Route|Example URL|params|
|---|---|---|
|app/shop/[...slug]/page.js|/shop/a|{ slug: ['a'] }|
|app/shop/[...slug]/page.js|/shop/a/b|{ slug: ['a', 'b'] }|
|app/shop/[...slug]/page.js|/shop/a/b/c|{ slug: ['a', 'b', 'c'] }|

**optional catch-all**

Разница между сегментами catch-all и optional catch-all заключается в том, что при использовании optional также сопоставляется маршрут без параметра (/shop в примере выше).

|Route|Example URL|params|
|---|---|---|
|app/shop/[[...slug]]/page.js|/shop|{}|
|app/shop/[[...slug]]/page.js|/shop/a|{ slug: ['a'] }|
|app/shop/[[...slug]]/page.js|/shop/a/b|{ slug: ['a', 'b'] }|
|app/shop/[[...slug]]/page.js|/shop/a/b/c|{ slug: ['a', 'b', 'c'] }|

Если нужно использовать generateStaticParams для catch-all и optional catch-all нужно возвращать значение slug как массив:

```ts
export async function generateStaticParams() {
  return [{slug: ["1"]}, {slug: ["2"]}];
}
```

##  Обработчики маршрута

В папке app есть свой инструмент для обработки http запросов, который получил название [Route Handlers](https://beta.nextjs.org/docs/routing/route-handlers), пришел на смену [API Routes](https://beta.nextjs.org/docs/data-fetching/api-routes) в папке pages. Обработчики запросов используются в файле [route.js](https://beta.nextjs.org/docs/api-reference/file-conventions/route)

Поддерживаемые методы: GET, POST, PUT, PATCH, DELETE, HEAD, and OPTIONS

Обработчики запросов позволяют создать API для обработки запросов с использованием  [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request)  и [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response), а также обернутые в типы next.js сервера [NextRequest](https://beta.nextjs.org/docs/api-reference/request) и [NextResponse](https://beta.nextjs.org/docs/api-reference/response), которые добавляют работу с cookie и обертку nextUrl для [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL).

```ts
export async function GET(request: Request) {
  const res = await fetch(url);
  const data = await res.json();
  return Response.json({ data })
}
```

Обработчики запросов поддерживают возможности "динамических сегментов" и настройки [Route Segment Config Options](https://beta.nextjs.org/docs/api-reference/segment-config), для этого нужно переименовать папку содержащую маршрут с файлом route.js в соответствии с правилами динамических сегментов, а в компоненте обработчике запросов использовать второй аргумент функции для получения данных:

api\[…slug]\route.js

```js
import { NextResponse, type NextRequest } from "next/server";

export async function generateStaticParams() {
  return [{slug: "1"}, {slug: "2"}];
}

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: [string] } }
) {
  return NextResponse.json({ slug: params }); // slug: "1" or slug: "2"
}

export const dynamicParams = false;
```

в этом случае будут доступны только: /api/1 и /api/2 для остальных маршрутов 404.

В обработчиках запросов могут использоваться серверные функции из Next.js API.

Могут быть статическими и динамическими, для них так же действуют [настройки  Route Segment](https://beta.nextjs.org/docs/api-reference/segment-config).

[online demo](https://next13-app-exp-templates-git-server-fetch-standalone-denisso.vercel.app) - подробнее демо разобрано в главе "Выборка данных и кэширование". В этом демо используется обработчик Get запросов

```ts
import { NextResponse, type NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  let payload = Date.now();
  if (params.id === "gettimezoneoffset")
    payload = new Date().getTimezoneOffset();
  return NextResponse.json({ id: params.id, payload });
}

export const dynamic = "force-dynamic";
```

## Планы на будущее

В [будущем](https://beta.nextjs.org/docs/routing/fundamentals#advanced-routing-patterns), в Next.js Маршрутизатор предоставит набор соглашений, которые помогут вам реализовать более продвинутый шаблон маршрутизации. К ним относятся:
- Параллельные маршруты: позволяют одновременно отображать две или более страниц в одном представлении, по которым можно перемещаться независимо.
- Перехват маршрутов: позволяет перехватывать маршрут и показывать его в контексте другого маршрута. Вы можете использовать их, когда важно сохранить контекст для текущей страницы. Предполагаю, что это отображение двух page.js одновременно, дочернего в контексте родительского. 
- Условные маршруты: позволяют вам условно отображать маршрут на основе условия. Например, показывать страницу только в том случае, если пользователь вошел в систему.

# Потоковая передача и компонент Suspense

При [потоковой передаче](https://www.pubnub.com/learn/glossary/what-is-http-streaming/) HTTP сервер настроен на удержание определенного запроса от клиента и сохранение ответа открытым, чтобы он мог передавать через него данные. Клиент может прослушивать обновления с сервера и получать их мгновенно без каких-либо накладных расходов, связанных с HTTP-заголовками и открытием/закрытием соединений.

В сочетании с [клиентскими компонентами и Suspense](https://beta.nextjs.org/docs/data-fetching/streaming-and-suspense), серверные компоненты React могут передавать контент через потоковую передачу по HTTP.

Потоковая передача хорошо работает с компонентной моделью React, потому что каждый компонент можно рассматривать как фрагмент (chunk). Это позволяет отображать части страницы раньше, не дожидаясь загрузки всех данных, прежде чем можно будет отрисовывать какой-либо пользовательский интерфейс.

В Next.js можете реализовать потоковую передачу используя loading.js, для всего сегмента маршрута,  или с [Suspense](https://beta.reactjs.org/reference/react/Suspense), для более детального контроля.

[Полный код примера](https://github.com/denisso/next13-app-exp/tree/suspense), [demo online](https://next13-app-exp-templates-git-suspense-denisso.vercel.app/)

```ts
import { Suspense } from "react";
import { Spinner } from "@/components/Spinner";
import { ServerComponent } from "@/components/ServerComponent";
import { ClientComponent } from "@/components/ClientComponent";

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <ClientComponent id={params.id}>
      <Suspense fallback={<Spinner />}>
        {/* @ts-expect-error Server Component */}
        <ServerComponent delay={1} />
      </Suspense>
      <Suspense fallback={<Spinner />}>
        {/* @ts-expect-error Server Component */}
        <ServerComponent delay={2} />
      </Suspense>
      <Suspense fallback={<Spinner />}>
        {/* @ts-expect-error Server Component */}
        <ServerComponent delay={3} />
      </Suspense>
    </ClientComponent>
  );
}
export const dynamic = "force-dynamic";
```

В этом примере демонстрируется как с помощью Suspense блоков можно разбить на фрагменты загружаемый контент.

# SEO оптимизация и  метаданные

[Next.js SEO & Metadata](https://beta.nextjs.org/docs/guides/seo) поддерживает описание метаданных с помощью тега meta и [JSON-LD](https://json-ld.org/) это формат микроразметки описания контента с помощью объектов, коллекция взаимосвязанных наборов данных в WEB. Эти данные могут быть экспортированы из layout.js и page.js. Метаданные могут быть размещены только в серверных компонентах.

## Метаданных в тегах meta

До 13.2 метаданные размещались в файле [head.js](https://beta.nextjs.org/docs/api-reference/file-conventions/head) это был типичный html формат.

```ts
export default function Head() {
  return (
    <>
      <title>Create Next App</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </>
  )
}
```

Начиная с 13.2 новый формат это статические экспортируемый объект с именем metadata или динамический созданный с помощью generateMetadata. Формат метаданных описан в [документации](https://beta.nextjs.org/docs/api-reference/metadata)

Пример ([Code repository](https://github.com/denisso/next13-app-exp/tree/metadata-for-each-page) , [sandbox](https://codesandbox.io/p/github/denisso/next13-app-exp/metadata-for-each-page?workspaceId=18dbcb21-f19f-4aca-a6ae-6859de0638c0&selection=%5B%7B%22endColumn%22%3A18%2C%22endLineNumber%22%3A4%2C%22startColumn%22%3A18%2C%22startLineNumber%22%3A4%7D%5D&file=%2FREADME.md), [deploy](https://lk2sob-3000.preview.csb.app/)) добавления метаданных индивидуальный для каждого сегмента:

app\services\page.tsx

```ts
import { metaTags } from "@/data";

export const metadata = {
  title: metaTags.services.title,
  description: metaTags.services.description,
  keywords: metaTags.services.keywords,
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function Page (){
  return <>Service page</>
} 
```

app\solutions\page.tsx

```ts
import { metaTags } from "@/data";

export const metadata = {
  title: metaTags.solutions.title,
  description: metaTags.solutions.description,
  keywords: metaTags.solutions.keywords,
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function Page (){
  return <>Solutions page</>
} 
```

## JSON-LD

[JSON-LD](https://json-ld.org/) — это формат микроразметки описания контента с помощью объектов словаря [связанных данных](https://ru.wikipedia.org/wiki/Linked_data). JSON-LD поддерживается в [Yandex](https://yandex.ru/support/webmaster/json-ld/about.html) и [Google](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)

Пример использования 

```jsx
export default async function Page({ params }) {
    const product = await getProduct(params.id);

    const jsonLd = {
        "@context": "http://schema.org",
        "@type": "FlightReservation",
        reservationId: "RXJ34P",
    };

    return (
        <section>
            {/* Add JSON-LD to your page */}
            <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
            {/* ... */}
        </section>
    );
}
```
В примере показаны три ключа:
- @context (зарезервированный) — указывает на то, что в объекте используется словарь [Schema.org](https://yandex.ru/support/webmaster/schema-org/what-is-schema-org.html).
- @type (зарезервированный) — указывает на [тип FlightReservation](https://schema.org/FlightReservation), в свойствах которого можно указать данные о бронировании билета на авиарейс.
- reservationId — соответствует [свойству reservationId типа FlightReservation](https://schema.org/reservationId) и содержит номер бронирования билета.

# Заметки 

## Вызов функций в JSX клиентских компонентов 

С виду безвредный код 

```
          <div>
            {moment(value).format("MMMM Do YYYY, h:mm:ss a")}
          </div>
```
дает предупреждение 

```
 Text content did not match. Server: "February 27th 2023, 10:44:57 pm" Client: "February 27th 2023, 10:44:59 pm"
```

Решение создать клиентский компонент, похожее решение ]предлагалось для библиотек компонентов, не адоптированных к использованию "use client"](https://beta.nextjs.org/docs/rendering/server-and-client-components#convention)

```ts
"use client"

const ClientMoment = ({ val }: { val?: string }) => {
  const [valDate, setValDate] = React.useState<string>();
  React.useEffect(() => {
    setValDate(moment(val).format("MMMM Do YYYY, h:mm:ss a"));
  }, [val]);
  return <div>{valDate}</div>;
};
```

и вносить изменения именно через useEffect, если написать просто 

```
const [valDate, setValDate] = React.useState(moment(val).format("MMMM Do YYYY, h:mm:ss a"));
```

предупреждение продолжит появляться
 
## Работа с контекстом в клиентских компонентах 

[React Context](https://beta.reactjs.org/reference/react/useContext) - Контекст позволяет передавать данные через дерево компонентов без необходимости передавать пропсы на промежуточных уровнях. [Дока](https://beta.nextjs.org/docs/rendering/server-and-client-components#context)  по использованию контекста в app.

[Демка](https://next13-app-exp-templates-git-context-denisso.vercel.app/) и [код](https://github.com/denisso/next13-app-exp/tree/context)
- подключаем контекст в layout.js и используем в каждом из сегментов about, blog и shop. 


```
│   ClientContext.tsx
│   globals.css
│   layout.module.scss
│   layout.tsx
│   page.tsx
│
├───(marketing)
│   ├───about
│   │       page.tsx
│   │
│   └───blog
│           page.tsx
│
└───(shop)
    └───account
            page.tsx
```

файл app\ClientContext.tsx - создаем контекст и клиентский компонент, который будем подключать в дерево серверных компонентов в файле layout.js.

```ts
"use client";
import React from "react";
interface IContexte {
  id: string;
  setId: (id: string) => void;
}

export const Context = React.createContext<IContexte | null>(null);

export function ClientContext({ children }: { children: React.ReactNode }) {
  const [id, setId] = React.useState("");
  return <Context.Provider value={{ id, setId }}>{children}</Context.Provider>;
}
```

Подключаем контекст в layout.js


```ts
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
…
        <main className={styles.main}>
          <ClientContext>{children}</ClientContext>
        </main>
…
  );
}

```

в page.js добавляем клиентский компонент для использования контекста, далее работаем через useContext как обычно.

app\page.js

```
import { Page } from "@/components/Page";

export default function Home() {
  return <Page headerText="Home"/>;
}
```

components\Page.tsx

```js
"use client";
import styles from "./Page.module.scss";
import React from "react";
import { Context } from "@/app/ClientContext";

export const Page = ({ headerText }: { headerText: string; }) => {
  const context = React.useContext(Context);
  const [input, setInput] = React.useState(context?.id as string);
  const handlerSetId = () => {
    context?.setId(input);
  };
  return (
    <section className={styles.section}>
      <h2 className={styles.header}>{headerText}</h2>
      <div>Current id: {context?.id} </div>
      <div className={styles.inputGroup}>
        <input
          type="text"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          className={styles.input}
        />
        <button onClick={handlerSetId} className={styles.button}>
          setId
        </button>
      </div>
    </section>
  );
};
```

Контекст работает так, как и ожидалось никаких проблем не замечено.


## Передача данных между серверными компонентами 

Серверные компоненты не работают с сосанием и контекстом, для передачи данных между компонентами [рекомендуется](https://beta.nextjs.org/docs/rendering/server-and-client-components#sharing-data-between-server-components) использовать:
- кэш операций функций таких как fetch, т.е. вызывая функцию с одинаковыми параметрами мы должны получать одинаковый результат, или разный в зависимости от того устарел ли кэш. В любом случае этот результат будет релевантным. Тут подойдет пример, который использовался в главе "выборка данных и кэширование" [server-fetch-standalone](https://next13-app-exp-templates-git-server-fetch-standalone-denisso.vercel.app/), если переключатель radiobutton установить на работу с серверной функцией fetch, так как параметр revalidate пока не работает в браузере.
- собственные шаблоны JavaScript, такие как глобальные синглтоны, в пределах области действия модуля, если у вас есть общие данные, к которым необходимо получить доступ нескольким серверным компонентам. Этот пример разработаем в этой главе.

[Пример](https://github.com/denisso/next13-app-exp/tree/server-fetch-custom-cache) передачи данных через модули es6 и собственный кэш. 

Это код использования серверной функции fetch

```ts
import "server-only";

interface IfetchData {
  (id: string): Promise<string>;
}

type TCache = {
  [key: string]: string;
};

const cache: TCache = {};

export const fetchData: IfetchData = (id) =>
  new Promise(async (resolve) => {
    let data = "";
    try {
      if (cache[id]) {
        data = cache[id];
      } else {
        const response = await fetch("http://localhost:3001/users/" + id, {
          cache: "no-store",
        });
        data = JSON.stringify(await response.json());
        cache[id] = data;
      }
    } catch (e) {
      if (typeof e === "string") {
        data = `Error: ${e.toUpperCase()} `;
      } else if (e instanceof Error) {
        data = `Error: ${e.message}`;
      }
    }

    resolve(data);
  });
```
в качестве хранилища кэша используется переменная cache. Функция в серверном компоненте fetch в этом примере вызываете с параметрами не использовать кэш ( cache: "no-store" ).

Для того чтобы протестировать как работает серверная функция fetch я использовал [json-server](https://github.com/typicode/json-server) и [генератор json mockaroo](https://www.mockaroo.com/) 

[db.json](https://github.com/denisso/next13-app-exp/blob/518ea53e5ef65e6e40ee61bb71a51948a3dd2692/db.json) - база данных для json-server

запуск json-server

```
json-server --watch ./db.json -p 3001
```

во время работы сервера ведется лог запросов

```
GET /users/1 200 45.345 ms - 157
GET /users/2 200 27.988 ms - 155
GET /users/3 200 20.497 ms - 155
```

# Выводы

Сейчас все еще ведется активная разработка беты версии добавляются новые возможности. 
Последние из недавно добавленных в версии 13.2 это [Route Handlers](https://beta.nextjs.org/docs/routing/route-handlers), есть Api которое уже [устарело](https://beta.nextjs.org/docs/api-reference/file-conventions/head).

Есть некоторые нерешенные проблемы, которые публиковал я:
- [Свой компонент для страницы 404](https://github.com/vercel/next.js/issues/45939) может быть вызван только с помощью функции [notFound](https://beta.nextjs.org/docs/api-reference/notfound#notfound)
- [Next.js fetch не работает с опцией revalidate](https://github.com/vercel/next.js/issues/46732) - эту проблему можно обойти использовав, свой клиент для выборки с кэшированием

Из приятных новостей:
- Хорошо написанная документация с примерами на typescript.
- Удобное использование клиентских и серверных компонентов в одном дереве компонентов.
- Кэширование сегментов и запросов на клиенте и сервере.
- Маршрутизация с использованием компонентов оберток делает код понятнее и проще.
- Потоковая передача данных по HTTP с использованием React.Suspense.

Нейтральные изменения для меня, нововведений:
- Использование нового формата метаданных и поддержка JSON-LD.

Спасибо Вам что дочитали до конца, надеюсь приятно провели время и получили полезную информацию!
