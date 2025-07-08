import databaseService from '~/services/database.service'
import { ObjectId } from 'mongodb'
import Poster from '~/models/schemas/Poster.Schema'
import { PosterType } from '~/models/requests/Poster.request'

const posterCollection = databaseService.posters

const posterService = {
  async createPoster(data: PosterType) {
    const poster = new Poster(data)
    await posterCollection.insertOne(poster)
    return poster
  },

  async getPoster() {
    return posterCollection.findOne({}, { sort: { created_at: -1 } })
  },
  async updatePoster(id: string, data: Partial<PosterType>) {
    await posterCollection.updateOne({ _id: new ObjectId(id) }, { $set: { ...data, updated_at: new Date() } })
    return posterCollection.findOne({ _id: new ObjectId(id) })
  },

  async deletePoster(id: string) {
    return posterCollection.deleteOne({ _id: new ObjectId(id) })
  }
}

export default posterService
