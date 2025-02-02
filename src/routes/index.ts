import { readdirSync } from "fs";
import express, { Router } from "express";
const router: Router = express.Router();

const PATH_ROUTES = __dirname;

function removeExtension(fileName: string): string {
    const cleanFileName = <string>fileName.split('.').shift();
    return cleanFileName;
};

function loadRouter(file: string): void {
    const name = removeExtension(file);
    if (name !== "index") {
        import(`./${file}`).then((routerModule) => {
            console.log(`Cargando ruta: ${name}`);
            router.use(`/${name}`, routerModule.router);
        }).catch((err) => {
            console.error(`Error cargando la ruta ${name}:`, err);
        });
    }
}

console.log("Cargando rutas desde:", PATH_ROUTES);
readdirSync(PATH_ROUTES).filter((file) => loadRouter(file));

export default router;
