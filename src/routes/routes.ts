import { Request, Response, Router } from 'express'




class MainRoutes {

    router: Router

    constructor() {
        this.router = Router()
        this.routes()
    }

    routes() {
        interface IInfoServer {
            name_Api: string
            version: string
            clients: string

        }

        const infoServer: IInfoServer = {
            name_Api: "YhoakimAgency",
            version: "0.01 Dev",
            clients: "/api/clients"
        }

        this.router.get('/', (req, res) => res.send(infoServer))
    }
}




const mainRoutes: MainRoutes = new MainRoutes()

mainRoutes.routes()

export default mainRoutes.router;