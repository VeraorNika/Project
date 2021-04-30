# Project
В общем и целом проект завершен. Могу добавить какие-нибудь детали.
<br>Сделано:
<br>1. Проверка на единственность логина при регистрации (2 студента или 2 учителя не могут иметь один логин)
<br> (Дальнейшие пункты лучше сначала проверять на 439 группе,  а потом на других, ибо  почти все ДЗ на  нее записаны. Есть 1 ДЗ для 438 группы)
<br>2.Теперь данные пользователя хранятся в localStorage. 
<br>3. При регистрации нового студента в его массив ДЗ записываются локальные копии всех ДЗ, созданных для его группы. Они хранятся в homeworksofStudents
<br>4. На главной странице студента отображаются все ДЗ, принадлежащие его группе (точнее, их локальные копии для каждого студента). В конструкторе текущая дата сравнивается с deadlineDate и усатнавливается статус "Просрочено", если текущая дата больше.  При этом новый статус записывается в БД.   Есть возможность изменить статус задания, если дата дедлайна не превышает текущую. При изменении статуса ДЗ Сделано-Задано и наоборот обновленный статус заносится в БД (это можно увидеть, если найти в БД папку homeworksOfStudents. При обновлении статуса один из объектов подсветится желтым). Если в это же время с аккаунта учителя добавить новое ДЗ на его группу/изменить старое, эти изменения сразу отразятся в таблице студента (без обновления страницы). При нажатии на имя ДЗ строчка "раскрывается" и показывает подробности задания
<br>5. При нажатии на имя преподавателя появляется страница с информацией о нем (точнее, общий текст). Есть страница с таблицей о всех преподавателей. Оттуда тоже можно выйти на страницу преподавателя. При добавлении нового преподавателя данные сразу отображаются в таблице.
<br>Можно сидеть на разных вкладках со страниц учителя и студента, но с 2 учителями/студентами, скорее всего, будут какие-нибудь сбои. Возможно, localStorage распространяется на все вкладки. Я не знаю, честно говоря.
<br>6. На странице преподавателя (лучше  сначала зайти с логином Parhach и паролем Radiotehnika1, у него больше всего заданных домашек) отображаются все студенты с ДЗ текущего преподавателя. К сожалению, мне было сложно понять, как тут сделать обновления в реальном времени, поэтому если студент изменил статус, то это отразится только при обновлении. Возможно, я выбрала не самую удачную форму хранения, но осознала это, когда было почти все готово, кроме этого компонента. 
<br>7. На странице преподавателя можно добавить новое ДЗ, изменить детали старого или удалить, при этом у каждого студента этой группы создастся/изменится/удалится его локальная копия (это видно, если сидеть с 2 аккаунтов: студента и преподавателя). Изменения отобразятся на странице  преподавателя/студента без обновления. Также, кликнув по группе, можно отправить это же ДЗ другой группе, изменив только группу и дату окончания (там нет валидации на дату, только на группу). Новое ДЗ тут же появится в таблице, а его локальные копии - у учеников. (так я поняла усложнение "Реиспользование созданных дз")
<br>8. Guard на выход у авторизации убран. Вместо него при клике на "Выход из системы" и подтверждения пользователя просот переход на авторизацию и стирание из localstorage данных о пользователе. Была сделана попытка сделать guard на вход аккаунтов. Полуспешно: с одной стороны, если попробовать руками вбить адрес какой-либо страницы из личного аккаунта, находясь при этом на авторизации, то эта страница не загрузится (логично, вход туда запрещен до авторизации). С другой, форма авторизации тоже пропадает, и приходится обновлять страницу, чтобы увидеть ее снова. 

<br>Вопросы:
<br>1. Вообще все основано на подписках subscribe. Я прочитала, что если от них не отписываться, то теряется производительность. Я вроде бы отписываюсь при уничтожении компонента, но не уверена. Пожалуйста, загляните в файл student_main_page.component.ts. Там есть два комментария о подписке и ее отмене: в конструкторе и перед ngOndestroy.  Это гарантирует отписку? Аналогично сделано в других компонентах. И еще: есть ли какой-то способ отписаться практически сразу же после подписки? Иногда subscribe мне нужен только для того, чтобы вытащить данные из observable в качестве простого массива (например, я добавляю ДЗ и мне вовсе не надо знать, что там потом в будущем изменится, мне нужен массив на 1 раз). Пыталась сдедать так: subsribe(......).unsubscribe(), но  в итоге внутренний код переставал работать 
<br>2. В файле teacher_newhomework.component.ts я использую homeworkService, не добавляя его в провайдер компонента (когда-то забыла добавить). Но он все равно работает. Это потому, что мы не уходим со страницы предыдущего компонента, где он в providers записан?
<br>3. Хотелось бы уточнить идею guarda на вход. Его смысл в том, чтобы пользователь не смог попасть на страницу, введя вручную маршрут в адресной строке? Я завела  в localStorage переменные isStudentLogged и isTeacherLogged. При авторизации в них устанавливаются строки  "true", при выходе из системы -"false". В примерах из инета видела, что такие переменные заносятся в сервисы, но у меня уже был неудачный опыт с сервисами после обновления страницы, поэтому решила в localStorage.


