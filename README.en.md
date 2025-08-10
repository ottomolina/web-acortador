# Web Shortener

This project is a web application with which it is possible to shorten web links.

## __Technologies used__
This web application was developed using the next technologies:

- __Angular 20.0.5:__  
A web framework used to build dynamic and scalable user interfaces.

- __Node.js 20.19.0:__  
A JavaScript runtime environment to handle server operations.

- __Firebase:__  
Used as a comprehensive backend solution, including real-time database.


## __Prerequisites__
Before you begin, make sure you have the following components installed:

1. __Node.js:__  
It is recommended to use version 20.19.0 or higher. You can download it by accessing to [Node.js official site](https://nodejs.org/es/download).

2. __Angular CLI:__  
[Angular](https://angular.dev/tools/cli/setup-local) command line interface must be installed globally. If you don't have it, run the following command in a terminal:

```bash
npm install -g @angular/cli@20.0.5
```

If you installed [git](https://git-scm.com/downloads) you can clone the code to your computer.


## __Project Setup__

Follow these steps to configure and run the application in your local environment:

1. __Clone Repository__
Clone the project from your version control system.

```bash
git clone https://github.com/ottomolina/web-acortador.git
cd web-acortador
```

2. __RSA key configuration__
    1. Generate a public/private RSA key pair.

    2. Find your project's environment file `src/environments/environment.ts` or similar and replace the public and private key settings with your own keys.

3. __Firebase Setup__
    1. Create a new project in [Firebase console](https://console.firebase.google.com).

    2. Add a new web app to your Firebase project to get configuration credentials.

    3. Find your project's environment file `src/environments/environment.ts` or similar and replace Firebase configuration with your own credentials.

4. __Install dependencies__  
Install all the necesary dependencies with the following command:
```bash
npm install
```

## __Running Application__
Once you have completed the setup, you can run the application as follows:

1. __Start development server__  
Run the following command to start the [Angular](https://angular.dev) development server:

```bash
ng serve
```

Navigate an internet browser to `http://localhost:4200/`.


## __Useful Commands__
- `ng serve`: build and serve the application, automatically reloading upon detecting code changes.

- `ng build`: build the application to static files in the `/dist/` folder for deployment to production.


## Resources
- [Angular](https://angular.dev)
- [HTML](https://developer.mozilla.org/docs/Web/HTML)
- [CSS](https://developer.mozilla.org/docs/Web/CSS)
- [Typescript](https://www.typescriptlang.org)


## Tools

The following tools were used to work with the code.

- [Git](https://git-scm.com/downloads): This tool helps for managing source code.
- [Visual Studio Code](https://code.visualstudio.com/): This tool allows to edit the source code.

