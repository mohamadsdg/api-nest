import { MigrationInterface, QueryRunner } from 'typeorm';

export class coffeeRefactore1603826709931 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "coffees" RENAME COLUMN "title" TO "name" ',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "coffees" RENAME COLUMN "name" TO "title" ',
    );
  }
}
