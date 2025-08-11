# Web Acortador

Este proyecto es una aplicación web con la cual es posible acortar enlaces web.

## __Tecnologías utilizadas__

Se desarrolló esta aplicación web utilizando las siguientes tecnologías:
- __Angular 20.0.5:__  
Un framework web utilizado para construir interfaces de usuario dinámicas y escalables.

- __Node.js 20.19.0:__  
Un entorno de ejecución de JavaScript para manejar las operaciones del servidor.

- __Firebase:__  
Utilizado como una solución de backend integral, incluyendo la base de datos en tiempo real.

- __Cifrado RSA:__  
Implementado para asegurar el almacenamiento de datos sensibles en localStorage.

__Criptografía RSA__  
Esta aplicación utiliza el algoritmo de encriptación RSA para garantizar la seguridad de la información. La encriptación asimétrica RSA se emplea para proteger datos críticos, como credenciales de usuario o información sensible, almacenándolos de manera segura en el localStorage del navegador.


## __Requisitos previos__
Antes de comenzar, aségurate de tener instalados los siguientes componentes:

1. __Node.js:__  
Se recomienda utilizar la versión 20.19.0 o superior. Puede descargarlo accediendo al [sitio oficial de Node.js](https://nodejs.org/es/download).

2. __Angular CLI:__  
La interfaz de línea de comandos de [Angular](https://angular.dev/tools/cli/setup-local) debe estar instalada globalmente. Si no la tienes, ejecuta el siguiente comando en una terminal:

```bash
npm install -g @angular/cli@20.0.5
```

Si instaló [git](https://git-scm.com/downloads) puede clonar el código a su equipo.


## __Configuración del Proyecto__

Sigue estos pasos para configurar y ejecutar la aplicación en tu entorno local:

1. __Clonar el Repositorio__
Clona el proyecto desde tu sistema de control de versiones.

```bash
git clone https://github.com/ottomolina/web-acortador.git
cd web-acortador
```

2. __Configuración claves RSA__
    1. Genere un par de claves RSA público/privada.

    2. Busca el archivo de entorno de tu proyecto `src/environments/environment.ts` o similar y reemplaza la configuración de claves pública y privada con tus propias claves.

3. __Configurar Firebase__
    1. Crea un nuevo proyecto en la [consola de Firebase](https://console.firebase.google.com).

    2. Agrega una nueva aplicación web a tu proyecto de Firebase para obtener las credenciales de configuración.

    3. Busca el archivo de entorno de tu proyecto `src/environments/environment.ts` o similar y reemplaza la configuración de Firebase con tus propias credenciales.

4. __Instalar dependencias__  
Instala todas las dependencias necesarias con el siguiente comando:
```bash
npm install
```


## __Ejecución de la Aplicación__
Una vez que hayas completado la configuración, puedes ejecutar la aplicación de la siguiente forma:

1. __Iniciar servidor de desarrollo__  
Ejecuta el siguiente comando para iniciar el servidor de desarrollo de [Angular](https://angular.dev):

```bash
ng serve
```

Navega en un explorador de internet hacia `http://localhost:4200/`.


## __Comandos Útiles__
- `ng serve`: compila y sirve la aplicación, recargando automáticamente al detectar cambios en el código.

- `ng build`: compila la aplicación en archivos estáticos en la carpeta `/dist/` para su despliegue en producción.


## Recursos
- [Angular](https://angular.dev)
- [HTML](https://developer.mozilla.org/docs/Web/HTML)
- [CSS](https://developer.mozilla.org/docs/Web/CSS)
- [Typescript](https://www.typescriptlang.org)


## Herramientas

Se utilizaron las siguientes herramientas para trabajar con el código.

- [Git](https://git-scm.com/downloads): Esta herramienta ayuda con el control del código fuente.
- [Visual Studio Code](https://code.visualstudio.com/): Una herramienta que permite la edición del código fuente.

