import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Comment } from "./Comment";
import { User } from "./User";

@Entity()
export class Post {
  @PrimaryGeneratedColumn('increment')
    id: string;
  @Column('varchar')
    title: string;
  @Column('text')
    content: string;
  @CreateDateColumn()
    createAt: Date;
  @UpdateDateColumn()
    updateAt: Date;
  @ManyToOne(() => User, user => user.posts)
    author: User;
  @OneToMany(() => Comment, comment => comment.post)
    comments: Comment[];
}
