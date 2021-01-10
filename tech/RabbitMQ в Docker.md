---
layout: post.liquid
date: 2020-09-05
pageTitle: RabbitMQ в Docker
---

Заметил (к счастью, до релиза в продакшн), что из очереди RabbitMQ пропадают сообщения, начисто, если убить контейнер и создать его снова. Почему -- непонятно: очередь durable, сообщения persistent. В конфиге docker-compose всё прописано как надо, очередь живёт на внешнем томе:

```yaml
volumes:
  - queues:/var/lib/rabbitmq/mnesia
```

Загадка...

[Оказалось](https://github.com/dockerfile/rabbitmq/issues/22), что имя базы mnesia зависит от имени хоста, на котором крутится RabbitMQ. Как только я пересоздаю контейнер, имя хоста меняется, Rabbit ищет базу, не находит, создаёт новую. Вот так всё просто... Одно из решений -- задать RabbitMQ перманентное имя хоста, например, через переменную окружения в том же docker-compose.yaml (`rabbit` -- это название контейнера):

```yaml
environment:
  - RABBITMQ_NODENAME=project_queue@rabbit
```
