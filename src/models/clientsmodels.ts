import { Schema, model } from 'mongoose'
import { IClient } from '../interfaces/interfaces'

const ClientsSchema: Schema<IClient> = new Schema<IClient>(

    {

        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        country: { type: String, required: true },
        country_code: { type: String, required: true },
        city: { type: String, required: true },
        car_brand: { type: String, required: true },
        car_model: { type: String, required: true },
        year: { type: Number, required: true }

    }

)

export default model('clients', ClientsSchema)




