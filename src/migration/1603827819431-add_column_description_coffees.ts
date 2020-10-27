import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnDescriptionCoffees1603827819431 implements MigrationInterface {
    name = 'addColumnDescriptionCoffees1603827819431'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffees" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "coffees" ALTER COLUMN "title" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffees" ALTER COLUMN "title" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "coffees" DROP COLUMN "description"`);
    }

}
