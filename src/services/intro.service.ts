import databaseService from '~/services/database.service'
import { ObjectId } from 'mongodb'
import { IntroType } from '~/models/requests/Intro.request'
import Intro from '~/models/schemas/Intro.Schema'
const introCollection = databaseService.intro
class IntroService {
  async createIntro(data: IntroType) {
    const intro = new Intro(data)
    await introCollection.insertOne(intro)
    return intro
  }

  async getAllIntros() {
    return introCollection.find().sort({ created_at: -1 }).toArray()
  }

  async getIntroById(id: string) {
    return introCollection.findOne({ _id: new ObjectId(id) })
  }

  async updateIntro(id: string, data: IntroType) {
    await introCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...data,
          updated_at: new Date()
        }
      }
    )
    return introCollection.findOne({ _id: new ObjectId(id) })
  }

  async deleteIntro(id: string) {
    return introCollection.deleteOne({ _id: new ObjectId(id) })
  }
}
const introService = new IntroService()
export default introService
