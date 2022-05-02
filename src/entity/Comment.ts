import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Post } from "./Post";
import { User } from "./User";

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('increment')
    id: number;
  @Column('text')
    content: string;
  @CreateDateColumn()
    createAt: Date;
  @UpdateDateColumn()
    updateAt: Date;
  @ManyToOne(() => User, user => user.comments)
    user: User;
  @ManyToOne(() => Post, post => post.comments)
    post: Post;
}
