# express-postgressdb
## Лабораторная работа №3 "Разработка клиентского приложения"
## Введение
Одним из популярным подходом к разработке клиентского приложения к серверной части информационной 
системы является интернет-приложение. Основное приемущество использования интернет-приложений - 
это централизованное управление приложением (одна точка доступа всем клиентам, установка, 
обновление, и т.п.), пользователю достаточно использовать только браузер для решения всех задач,
и т.д. Однако, есть и некоторые проблемы, например, необходимо решать задачу разграничения прав 
доступа пользователей и другие задачами защиты информации.
## Cписок использованных технологий:
* Node.js
* Express
* PostgresSQL  
>Node.js - это среда выполнения JavaScript, которая позволяет 
разработчикам писать бэкэнд (серверные) программы на JavaScript. 
Node.js поставляется с несколькими встроенными модулями - небольшими
независимыми программами, которые помогают облегчить написание серверных
приложений. Список четырех основных модулей Node:
HTTP: модуль, который действует как сервер
>* File System: модуль, который читает и изменяет файлы
>* Path: модуль для работы с каталогами и путями к файлам
>* Assertion Testing: модуль, который проверяет код на соответствие предписанным ограничениям
  
>Express является еще одним модулем, 
> который часто используется с Node, но не входит в него. 
> Express - это фреймворк web-приложений для Node. Express выполняется между созданным 
> Node сервером и фронтендом веб-приложения. Express также обрабатывает маршрутизацию 
> приложения. Маршрутизация направляет пользователей на нужную страницу в зависимости от 
> их взаимодействия с приложением. Хотя существуют альтернативы использованию Express, его 
> простота позволяет легко изучить взаимодействия между бэкэндом, работающим на Node и фронтендом.

## Первоначальные этапы развертывания Express-приложения
Следующие этапы необходимо выполнить перед тем, как переходить к работе с БД:
1. Установка Node.js
2. Cоздать приложение(сервер Express)
3. Подключение БД по локальному хосту с указанным портом


Для дальнейших действий у вас уже должен быть установлен Node.js.
В терминале создайте каталог myapp и сделайте его рабочим.  
```
md myapp
cd myapp 
```
С помощью команды `npm install` установите все зависимости приложения из файла `package.json`
## Работа с БД
В файле `db.js` установите значения для полей: 
* user
* password
* host
* port
* dbName

## Отображения URL на представления (view)
```js
#file routes/cli.routes.js

const Router = require('express');
const router = new Router();
const cliController = require('../controller/cli.controller');
const countryController = require('../controller/countryDist.controller');
const linkController = require("../controller/linkCli.controller");

//CLIENTS ROUTE
router.post('/client', cliController.createClient);
router.get('/clients', cliController.getClients);
router.get('/client/:id', cliController.getOneClient);
router.put('/client', cliController.updateClient);
router.delete('/client/:id', cliController.deleteClient);


//COUNTRY DIST ROUTE
router.post('/country', countryController.createCountryDist);
router.get('/countries', countryController.getCountryDist);
router.get('/country/:id', countryController.getOneCountryDist);
router.put('/country', countryController.updateCountryDist);
router.delete('/country/:id', countryController.deleteCountryDist);


//LINK CONTROLLER ROUTE
router.post('/link', linkController.createLink);
router.get('/links/allTravels', linkController.getUserByLink)
router.get('/links', linkController.getAllLinks);
router.get('/link/:id', linkController.getOneLink);
router.put('/link', linkController.updateLink);
router.delete('/link/:id', linkController.deleteLink);


module.exports = router;
```
Задача данного файла оотбражать URL на процедуру обработки запроса
(с вохможными дополнительными параметрами) - представление (View). 
Как правило представления создаются для страниц - интерфейсов пользователя 
и процедур манипуляции данными.

Далее в файле app.js подлючим данные маршрутизации в путь /api:
```js
const express = require('express');
const cliRouter = require("./routes/cli.routes")

app = express();
app.use(express.json());

app.use('/api', cliRouter);
```

Командой `app.listen(PORT, () => console.log('server started on port ${PORT}'));`
мы запустим сервер на на порту *PORT* который вы указали в локальном *.env* файле.

## Файл обработчиков запросов `tableName.controller.js`
Как пример, обработчик запросов для таблицы `clients`. Создаем класс 
`ClientController`, в котором опишем асинхронные методы различных запросов.
Запросы для *PostgresSql* запишем прямо в функцию `query`
```javascript
const db = require("../db");
class ClientController {
    async createClient(req, res) {
        const {first_name, last_name} = req.body;
        console.log(first_name, last_name);
        res.json('ok');
    }

    async getClients(req, res) {
        const clients = await db.query(`SELECT * FROM cli`);
        res.json(clients.rows);
    }

    async getOneClient(req, res) {
        const id = req.params.id;
        const client = await db.query(`SELECT * FROM cli WHERE id = $1`, [id]);
        res.json(client.rows[0]);
    }

    async updateClient(req, res) {

    }

    async deleteClient(req, res) {
        const id = req.params.id;
        const clients = await db.query(`DELETE FROM cli WHERE id = $1`, [id]);
        res.json(clients.rows[0]);
    }
}

module.exports = new ClientController();
```
В конце файла экспортируем экземляр созданного класса.

## Тестирование
Проверить работу сервера и запросов можно на запущенном сервере по адресу `localhost:PORT`.

В методе `app.use` мы указали путь для запросов через `/api`. А в файле `routes/cli.routes.js`
маршрутизацию запросов для определенных представлений.

Следовательно если мы перейдем по пути `http://localhost:PORT/api/clients`, то вызовем 
**GET** запрос, который вызывает запрос к представлению БД. А именно `SELECT * FROM cli`
 и вернет нам ответ ввиде JSON строки, которую мы можем распарсить и отобразить на HTML странице.

Также и со всеми остальными **GET, POST, DELETE, PUT** запросами.
>Примечание: Методы **POST, DELETE, PUT** требуют на вход JSON объект с передаваемыми аргументами.

В итоге мы можем отобразить приходящий JSON ответ на html странице.
В файле `public/js/index.html`
```js
fetch("http://localhost:9000/api/clients")
.then(res => res.json())
.then(data =>{
    for (let obj in data){
        document.getElementById('root').innerHTML += `
        <div class="list">
            <p>NAME: ${JSON.stringify(data[obj].first_name)}</p>
            <p>SURNAME: ${JSON.stringify(data[obj].last_name)}</p>
            <p>ADDRESS: ${JSON.stringify(data[obj].address)}</p>
            <p>EMAIL: ${JSON.stringify(data[obj].email)}</p>
            <p>COUNTRY: ${JSON.stringify(data[obj].coutry)}</p>
        </div>
        `
    }
}).catch(e => {
    console.log(e)
    })
```

В конечном итоге получим отображение таблицы базы данных на HTML странице:
![localhost:port](img/screenshot.png)

# Заключение
В результате выполнения ряда лабораторных работ по курсу "Базы данных" решены следующие задачи
1. Изучена предметная область реляционных баз данных;
2. Представлена в виде информационной модели задача лабораторной 
работы (вариант 23). Для этого:
* * осуществлен анализ вербального (словесного) представления задачи,
* * разработана ER-диаграмма представления данных для реляционной БД,
* *  преобразование ER-диаграммы в физическую модель БД,
* * представлены варианты начального заполнения таблиц БД данными;
3. Разработана (сгенерирована и доработана) структура БД (набор запросов DDL);
4. Осуществлен ввод первоначальных данных;
5. Разработаны и протестированы представления, встроенные процедуры и функции на сервере (серверная част гипотетической инфорационной системы);
Разработаны и протестированы представления, встроенные процедуры и функции на сервере (серверная част гипотетической инфорационной системы);
6. Создана клиентская подсистема на основе Express, позволяющая получать входные данные от пользователя и производить внесение изменений в
