import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Result from 'App/Models/Result'
import Link from 'App/Models/Link'

export default class User extends BaseModel {


  public static table = 'users'

  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  @column()
  public kode: string

  @column()
  public nama: string

  @column()
  public expired: string

  @column()
  public is_admin: boolean

  @column()
  public is_vip: boolean

  @hasMany(() => Result)
  public results: HasMany<typeof Result>

  @hasMany(() => Link, {
    foreignKey: 'user_id',
  })
  public links: HasMany<typeof Link>
  
}
