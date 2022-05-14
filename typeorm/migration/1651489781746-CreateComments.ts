import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateComments1651489781746 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'comments',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          name: 'user_id',
          type: 'varchar'
        },
        {
          name: 'post_id',
          type: 'varchar'
        },
        {
          name: 'content',
          type: 'text'
        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('comments')
  }

}
