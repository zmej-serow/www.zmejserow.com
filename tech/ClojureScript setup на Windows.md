---
date: 2020-06-16
pageTitle: ClojureScript setup на Windows
---

Несколько часов убил на то, чтобы разобраться, почему никак не хочет запускаться банальный hello world на ClojureScript. У немейнстримовых языков всегда слабо с тулингом и, следовательно, высокий порог вхождения. Вот на ровном месте спотыкаешься.

Оказалось, под виндой `npx` надо вызывать как `npx.cmd`:

```clojure
:compiler {:main choropleth.core
            :target :bundle
            :asset-path "js/compiled/out"
            :output-to "resources/public/js/compiled/out/index.js"
            :output-dir "resources/public/js/compiled/out"
            :bundle-cmd {:none ["npx.cmd" "webpack" "--mode=development"]
                        :default ["npx.cmd" "webpack"]}
            :source-map-timestamp true
```

Причём нигде на [официальном сайте](https://clojurescript.org) про это не сказано. Сходил в github к автору figwheel-template, создал [issue](https://github.com/bhauman/figwheel-template/issues/46), чувак обрадовался и через пару дней прикрутил к инсталлятору "поддержку винды". Теперь на винде `npx` будет вызываться как надо. Я сделал мир чуточку лучше. Ура! :)

Масла в огонь подлила ещё и Intellij Idea, в которой я пытался этот helloworld запустить. Сообщения об ошибке крайне невразумительные. К счастью, через какое-то время я обратил внимание на ругань Leiningen в консоли, что он, дескать, почему-то не может `npx` этот запустить никак... Если бы не это, я бы ещё долго копал.

Довольно забавен [комментарий](https://clojureverse.org/t/cljs-project-using-figwheel-on-windows/6079/9) к этой проблеме (чуваку с такой же болячкой посоветовали поднять под виндой WSL и разрабатывать, по факту, под линухом): "It’s amazing to me that the solution for developing on Windows becomes “install Linux”. I get why, but it does concern me".

Да уж.
