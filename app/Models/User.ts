import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { BaseModel, column, beforeSave, beforeCreate, afterFind, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'
import Post from 'App/Models/Post'

export default class User extends BaseModel {
  public static table = 'users'

  @column({ isPrimary: true })
  public id: string

  @column({ columnName: 'name' })
  public name: string

  @column({ columnName: 'email' })
  public email: string

  @column({ columnName: 'password' })
  public password: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static generateUuid (user: User) {
    user.id = uuidv4()
  }

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.hash(user.password)
    }
  }

  @afterFind()
  public static hidePassword (user: User) {
    delete user.password
  }

  @hasMany(() => Post)
  public posts: HasMany<typeof Post>
}
