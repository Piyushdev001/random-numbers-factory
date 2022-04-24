import axios from 'axios'
import { Factory } from './models/factory-model'

class FactoryService {

    url = 'api/factories'
    config: any = {
        headers: {
            Accept: 'application/json',
        }
    }

    async getFactories() {
        try {
            const { data } = await axios.get(this.url, this.config)
            return data
        } catch(err) {
            console.log(err);
        }
    }

    async getFactory(id: string) {
        try {
            const { data } = await axios.get(`${this.url}/${id}`,this.config)
            return data
        } catch(err) {
            console.log(err);
        }
    }

    async addFactory(factory: Factory) {
        try {
            const { data } = await axios.post(this.url, factory, this.config)
            return data
        } catch(err) {
            console.log(err);
        }
    }

    async editFactory(id: string, factory: Factory) {
        try {
            const { data } = await axios.patch(`${this.url}/${id}`, factory, this.config)
            return data
        } catch(err) {
            console.log(err);
        }
    }

    async deleteFactory(id: string) {
        try {
            const { data } = await axios.delete(`${this.url}/${id}`, this.config)
            return data
        } catch(err) {
            console.log(err);
        }
    }

}

export default new FactoryService()