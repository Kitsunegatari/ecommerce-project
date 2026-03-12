npm init -y
npm install typescript tsx -D
npm install @types/node -D
npm install express
npm install @types/express -D

tsc --init

mkdir src
mkdir env
mkdir public

mkdir src/cart
mkdir src/server

mkdir src/cart/controllers
mkdir src/cart/models
mkdir src/cart/views
mkdir src/cart/interfaces

touch src/cart/controllers/cartController.ts
touch src/cart/models/cartModel.ts
touch src/cart/views/cartView.ts

touch src/server/server.ts

touch env/.env

touch src/index.ts

echo "
PORT=1808
HOST=localhost
" > env/.env

echo '{
  "name": "11712-14",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "rm -rf build && tsc",
    "start": "node --env-file=./env/.env ./build/index.js",
    "dev": "tsx --watch --env-file=./env/.env ./src/index.ts"
  },
  "keywords": [],
  "author": "Your Name",
  "license": "ISC",
  "devDependencies": {
    "@types/express": "^5.0.6",
    "@types/node": "^25.2.0",
    "tsx": "^4.21.0",
    "typescript": "^5.9.3"
  },
  "dependencies": {
    "express": "^5.2.1"
  }
}' > package.json

echo '{
  // Visit https://aka.ms/tsconfig to read more about this file
  "compilerOptions": {
    // File Layout
    "rootDir": "./src",
    "outDir": "./build",

    // Environment Settings
    // See also https://aka.ms/tsconfig/module
    "module": "NodeNext",
    "target": "es2024",
    "types": ["node"],
    "moduleResolution": "NodeNext",
    // For nodejs:
    // "lib": ["esnext"],
    // "types": ["node"],
    // and npm install -D @types/node

    // Other Outputs
    "sourceMap": true,
    "declaration": true,
    "declarationMap": true,

    // Stricter Typechecking Options
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "resolveJsonModule": true,

    // Style Options
    "noImplicitReturns": true,
    "noImplicitOverride": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noPropertyAccessFromIndexSignature": true,

    // Recommended Options
    "strict": true,
    "isolatedModules": true,
    "noUncheckedSideEffectImports": true,
    "moduleDetection": "force",
    "skipLibCheck": true
  },
  "include": ["./src/**/*.ts"],
  "exclude": ["./node_modules", "./build"]
}' > tsconfig.json


Archivos clave:

"Servidor: server.ts — endpoint /api/search, lógica de búsqueda y sampleData (base de datos en memoria / cartas de superhéroes).
Interfaz HTML: index.html — barra de búsqueda visible y contenedor de resultados.
Lógica cliente: app.js — llamadas a /api/search, búsqueda en tiempo real (debounce) y renderizado / mensaje cuando no hay resultados.
Scripts y dependencias: package.json — comandos dev/start y dependencias necesarias.
Variables de entorno: .env — configuración opcional (puerto, credenciales).
Configuración TypeScript: tsconfig.json — ajustes de compilación (si compilas a JS)."