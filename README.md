- Primeros pasos:

Para empezar a entender cómo funcionan los websockets y lo mínimo necesario para poder usarlos seguí este tutorial de la página oficial de SocketIO: https://socket.io/get-started/chat/


- Errores encontrados:

1. Al extraer el javascript del HTML y ponerlo en un archivo aparte (chat.js), recibía el error 404 abrir el proyecto en el navegador.

El error se debía a que no había añadido el directorio estático donde Express pudiera buscar todos mis archivos en local. Con esta línea de código se resolvió el problema:

```
app.use(express.static(__dirname + '/public'))
``` 

2. Una vez enviado el input del formulario de login, al tratar de enviar el input de chat, no llega a enviar el mensaje y lo que hace es regresar al formulario de login y hacer desaparecer el chat.

FIXED: el formulario no estaba siendo especificado correctamente dentro de la DOM.

3. Error Uncaught TypeError: t.replace.
Intentaba añadir una div de mensaje para typing con jQuery con append() y luego quitarla con remove(). Sin embargo, el método remove() debe usarse sobre el elemento mismo que queremos quitar en la DOM y no sobre el padre. Además, aparte de setTimeout() probé también a hacerlo con delay(), pero este método sólo sirve si introducimos remove en una queue, lo cual es muy ineficiente. Más información en este post de StackOverflow: https://stackoverflow.com/questions/3655627/jquery-append-object-remove-it-with-delay.