Перед тем как использовать нужно отключить блокировщик реклам (addBlock) из за того что API который я использую он общедоступный это может привести к блокировке, если он вызывается в основном потоке исполнения программы. 

getGeoLocationWithIp - находить IP юзера, передаем его на api - ipinfo.io для того чтобы найти страну устройство. По найденному коду страны по его значению ищем его нашем json-ке 



```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
