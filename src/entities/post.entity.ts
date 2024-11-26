import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  OneToMany,
  Collection,
  Cascade,
} from '@mikro-orm/core';
import { User } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Comment } from './comment.entity';

@Entity()
export class Post {
  @ApiProperty()
  @PrimaryKey()
  id!: number;

  @ApiProperty()
  @Property()
  title!: string;

  @ApiProperty()
  @Property()
  content!: string;

  @ApiProperty()
  @Property({ type: 'datetime' })
  createdAt: Date = new Date();

  @ManyToOne(() => User)
  author!: User;

  @OneToMany(() => Comment, (comment) => comment.post, { cascade: [Cascade.ALL] })
  comments = new Collection<Comment>(this);
}
