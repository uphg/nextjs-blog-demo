import { MigrationInterface, QueryRunner } from "typeorm"

export class RenameColumns1651496650496 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('users', 'password_digest', 'passwordDigest')
    await queryRunner.renameColumn('posts', 'author_id', 'authorId')
    await queryRunner.renameColumn('posts', 'author_name', 'authorName')
    await queryRunner.renameColumn('comments', 'user_id', 'userId')
    await queryRunner.renameColumn('comments', 'post_id', 'postId')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('users', 'passwordDigest', 'password_digest')
    await queryRunner.renameColumn('posts', 'authorId', 'author_id')
    await queryRunner.renameColumn('posts', 'authorName', 'author_name')
    await queryRunner.renameColumn('comments', 'userId', 'user_id')
    await queryRunner.renameColumn('comments', 'postId', 'post_id')
  }
}
