import {MigrationInterface, QueryRunner} from "typeorm";

export class syncSchema1603828248979 implements MigrationInterface {
    name = 'syncSchema1603828248979'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffees" RENAME COLUMN "title" TO "name"`);
        await queryRunner.query(`ALTER TABLE "coffees" ALTER COLUMN "name" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffees" ALTER COLUMN "name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "coffees" RENAME COLUMN "name" TO "title"`);
    }

}
