import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreatePost1651393775049 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        return await queryRunner.createTable(
            new Table({
                name: "posts",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true, // 主键
                        isGenerated: true, // 自动创建
                        generationStrategy: 'increment' // 创建策略：自增长
                    },
                    {
                        name: "title",
                        type: "varchar",
                    },
                    {
                        name: 'content',
                        type: 'text'
                    }
                ],
            }),
            true,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return await queryRunner.dropTable('posts')
    }

}
