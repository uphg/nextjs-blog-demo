import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreatePosts1651489566747 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'posts',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          name: 'title',
          type: 'varchar'
        },
        {
          name: 'content',
          type: 'text'
        },
        {
          name: 'author_id',
          type: 'int'
        },
        {
          name: 'author_name',
          type: 'varchar'
        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('posts')
  }

}
