# fam_tg_bot

установите все файлы себе на локальный компьютер посредством команды 
```sh
$ git clone https://github.com/loksblnine/fam_tg_bot.git
```
для этого на компе нужен установленный язык контроля версий [git](https://git-scm.com/book/ru/v2/%D0%92%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5-%D0%A3%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%BA%D0%B0-Git) 

откройте проект через IDE, создайте файл с расширением `.env` и повторите все переменные из файла `.env.example`, это ваш файл со всеми переменными окружения, это надо для секьюрности 

создайте своего бота через ботфазер в тг, получите токен, добавьте в `.env`, перейдите в консоль в корень (папка где лежит index.js) репозитория и запустите весь код командой 
```sh
node index.js 
```

для этого нужен будет [NodeJS](https://nodejs.org/uk/download/)

в общем эта вся хуйня выше нужна для того, чтоб поднять основу, там еще должна быть база данных, но я пока ебал это расписывать =)
