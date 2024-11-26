import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';
import { Post } from './post.entity';

@Entity()
export class Comment {
  @ApiProperty()
  @PrimaryKey()
  id!: number;

  @ApiProperty()
  @Property()
  content!: string;

  @ManyToOne(() => User)
  author!: User;

  @ManyToOne(() => Post)
  post!: Post;

  @ApiProperty()
  @Property({ type: 'datetime' })
  createdAt: Date = new Date();
}
