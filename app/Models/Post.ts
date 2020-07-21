import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'

export default class Post extends BaseModel {
  public static table = 'posts'

  @column({ isPrimary: true })
  public id: string

  @column({ columnName: 'title' })
  public name: string

  @column({ columnName: 'content' })
  public content: string

  @column({ columnName: 'user_id' })
  public userId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => User)
  public user: HasOne<typeof User>
}
