---
date: 2021-01-31
pageTitle: Необычное применение генераторов в Python
---
Обычно питоньи генераторы используются, чтобы отдавать значения из контейнеров-итераторов порционно, лениво, по мере 
необходимости. Штука полезная, можно соорудить, например, бесконечные последовательности, как в Haskell:

```python
def odds():
    x = 1
    while True:
        yield x
        x += 2
```

Можно просто экономить память, подтягивая значения из генератора по одному, не выделяя память сразу под все элементы 
списка. Вы и так всё это знаете. А вот знакома ли такая конструкция? Я не сразу понял, как это должно работать и почему:

```python
def check_direction():
    print('where do you want to go today? (c)')
    while True:
        direction = (yield)
        if direction:
            if 'left' in direction:
                yield 'whoa, turning left'
            if 'right' in direction:
                yield 'right turn!'
            if 'up' in direction:
                yield 'higher and higher!'
            if 'down' in direction:
                yield 'do not trip!'
```

Оказывается, в таком виде `yield` работает как выражение, а не как оператор, и протаскивает в отложенный контекст 
значение, которое ему передают через метод `send`, которым `check_direction`, будучи генератором, обзаводится 
автоматически.

```python
>>> check_direction.__dir__()
['throw', '__dir__', '__format__', '__new__', '__sizeof__', '__str__', '__eq__', 'send', '__repr__', '__next__', 
'__init__', 'gi_yieldfrom', '__ge__', '__lt__', '__qualname__', '__iter__', '__delattr__', '__class__', '__reduce_ex__', 
'gi_code', '__subclasshook__', '__setattr__', '__getattribute__', '__name__', 'close', '__hash__', 'gi_frame', '__gt__', 
'__ne__', '__del__', 'gi_running', '__doc__', '__le__', '__reduce__']
```

Звучит слегка запутанно, но вот как это работает:

```python
>>> x = check_direction()
>>> next(x)
where do you want to go today? (c)
>>> x.send('going right')
right turn!
>>> x.send('looking up')
higher and higher!
```

Функция `next` здесь инициализирует генератор, а `send` передаёт в `direction` значение. Отличный способ запутать коллег 
и сделать код совершенно нечитаемым! :)

А чтобы прекратить это безобразие, у генератора есть ещё два метода, `throw` и `close`. Первый принимает исключение и 
заставляет генератор его бросить, а второй просто завершает работу штатным исключением `GeneratorExit`. Забавно, что 
если попробовать отловить исключения в `try / catch` и попытаться в `catch` что-нибудь выдать наружу (`yield`), питон 
рухнет с `RuntimeError`. Логично, генератора-то уже нет.
