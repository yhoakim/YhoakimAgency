import { Request, Response, Router } from 'express'
import Clients from '../models/clientsmodels'
import { IClient } from '../interfaces/interfaces'

class ClientsRoutes {

    router: Router

    constructor() {
        this.router = Router()
        this.routes()
    }

    async getClients(req: Request, res: Response): Promise<void> {
        const clientes = await Clients.find()
        res.json(clientes)
    }

    async getClient(req: Request, res: Response): Promise<void> {
        const cliente = await Clients.find({ _id: req.params.id })
        res.json(cliente)
    }

    async createClients(req: Request, res: Response): Promise<void> {

        const cliente: IClient = req.body
        console.log(cliente)
        const newClient = new Clients(cliente)
        await newClient.save();
        res.json({ data: newClient })

    }

    async updateClients(req: Request, res: Response): Promise<void> {
        const id = req.params.id
        const updateCliente = await Clients.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.json(updateCliente)

    }

    async deleteClients(req: Request, res: Response): Promise<void> {
        const id = req.params.id
        await Clients.findOneAndDelete({ _id: id })
        res.send(`${id} was deleted`)
    }

    routes() {
        this.router.get('/', this.getClients)
        this.router.get('/:id', this.getClient)
        this.router.put('/:id', this.updateClients)
        this.router.delete('/:id', this.deleteClients)
    }
    
}

const clientsRoutes: ClientsRoutes = new ClientsRoutes()

clientsRoutes.routes()

export default clientsRoutes.router;
