import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Comment } from "./Comment";
import { User } from "./User";

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('increment')
    id: string;
  @Column('varchar')
    title: string;
  @Column('text')
    content: string;
  @CreateDateColumn()
    createdAt: Date;
  @UpdateDateColumn()
    updatedAt: Date;
  @Column('int')
    authorId: string;
  @ManyToOne('User', 'posts')
    author: User;
  @OneToMany('Comment', 'post')
    comments: Comment[];
}
