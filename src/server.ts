import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import compression from 'compression'
import mongoose from 'mongoose'

import clientsRoutes from './routes/clients'
import mainRoutes from './routes/routes'


class Server {

    public app: express.Application

    constructor() {

        this.app = express()
        this.config()
        this.routes()
        this.conectionMongo()

    }

    conectionMongo() {

        const MONGO_URI = 'mongodb://localhost:27017/YhoakimAgency'

        mongoose.set('useFindAndModify', false)

        mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true
        })
        const db = mongoose.connection;

        db.on("error", console.error.bind(console, "connection error: "));
        db.once("open", function () {
            console.log("MongoDB is connected");
        });

    }

    config() {

        this.app.set('port', process.env.PORT || 9000)
        this.app.use(morgan('dev'))
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }))
        this.app.use(compression())
        this.app.use(cors())
        this.app.use(helmet())

    }

    routes() {

        const prefix: string = "/api"

        this.app.use(mainRoutes)
        this.app.use(`${prefix}/clients`, clientsRoutes)
    }

    start() {

        this.app.listen(this.app.get('port'), () => {
            console.log(`\n\n\t server running on \n 🚀 => http://localhost:${this.app.get('port')}\n\n`)

        })
    }

}
const server = new Server()

server.start()

