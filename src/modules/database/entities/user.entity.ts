import {
  Table,
  Column,
  Model,
  PrimaryKey,
  Default,
  DataType,
} from 'sequelize-typescript';

@Table
export class User extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column
  id: string;

  @Column
  username: string;

  @Column
  password: string;

  @Column
  role: string;
}
 