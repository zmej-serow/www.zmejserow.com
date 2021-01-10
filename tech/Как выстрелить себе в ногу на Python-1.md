---
date: 2019-09-14
pageTitle: Как выстрелить себе в ногу на Python — 1
---

Никогда не пиши код типа такого:

```python
product_code = xml.xpath(
    "/CIP4:JDF/CIP4:GeneralID/@IDValue",
    namespaces=ns
)[0]
```

Сэкономил две строчки, влепил сразу `[0]` после вызова функции, но `xml.path()` может вернуть `None`, и программа упадёт 
с `Index out of range error`.

Антипаттерн, ети его.

Пиши так:

```python
product_codes = xml.xpath(
    "/CIP4:JDF/CIP4:GeneralID/@IDValue",
    namespaces=ns
)
if product_codes:
  product_code = product_codes[0]
```

Мало того, что здесь обходится проблема с `None`, тут ещё и чётко указывается, что именно отдаёт `xml.path()`. Отдаёт 
коды продуктов. Если таковые есть — получаем первый элемент списка. А то, что введена лишняя переменная — да и шут с 
ней, сборщик мусора приберёт. Зато код читается как текст даже спустя продолжительное время.
