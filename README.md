# Project
Сделано: <br>
Улучшен внешний вид
<br>Таблицы с возможностью сортировки. При клике на имя задания появится pop up  с деталями (пока пустой)
<br>Mattooltip на поля ввода 
<br>Стили и шаблоны перенесены в html и css
<br>Сервисы подключаются к БД и берут список студентов (на странице преподавателя) и список преподавателей (на странице  студента). Но при загрузке виден только заголовок таблицы. При клике на него появляется остальная часть (этот самый список). Честно говоря, такое поведение для меня неочевидно. Не понимаю, почему так происходит
<br>На странице преподавателя из БД в таблицу  загружаются домашние работы (пока что вообще все, без выбора по имени преподавателя). Та же особенность, что и в пункте выше, хотя метод другой. Возможно, роль играет SortedHomeworks = new MatTableDataSource(this.homeworks); (который используется в сортирующей таблице), но я не поняла пока что, как он действует
<br> При отправке формы  "добавить новое задание" на странице преподавателя домашнее задание загружается в базу данных. Вам нужны мои логин и пароль в firebase для проверки этого?Режим БД тестовый, свойства чтения и записи -true

<br>Вопросы:
<br>1.Что делать с датой в firebase? Насколько я поняла, там нет этого формата в чистом виде
<br>2. Что делать с детальной информацией о преподавателе, если при регистрации он указывает только имя и дату рожедния?
<br>3. Вскоре мне понадобится загружать не все домашки, а только те, которые были заданы одним преподавателем. Можно ли сделать так: сначала получить весь массив домашек, а потом удалить из массива те, свойство teacher которых не совпадает с именем текущего преподавателя? Или плохая идея?
<br>4. Уже есть простейшая регистрация (пока не выложена) и в связи с этим вопрос: мне нужно, чтобы при регистрации/авторизации пользователь переходил на свою страничку, где он получал бы информацию по СВОИМ данным. Думаю, это можно сделать, передав ключ его объекта, чтобы потом искать по этому ключу данные из БД. Намекните,  пожалуйста, как это можно осуществить. Это связано с параметрами строки запроса в routerLink?

