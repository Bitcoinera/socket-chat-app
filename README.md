- Primeros pasos:

Para empezar a entender cómo funcionan los websockets y lo mínimo necesario para poder usarlos seguí este tutorial de la página oficial de SocketIO: https://socket.io/get-started/chat/


- Errores encontrados:

Al extraer el javascript del HTML y ponerlo en un archivo aparte (chat.js), recibía el error 404 abrir el proyecto en el navegador.

El error se debía a que no había añadido el directorio estático donde Express pudiera buscar todos mis archivos en local. Con esta línea de código se resolvió el problema:

```
app.use(express.static(__dirname + '/public'))
``` 