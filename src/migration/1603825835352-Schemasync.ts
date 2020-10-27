import {MigrationInterface, QueryRunner} from "typeorm";

export class Schemasync1603825835352 implements MigrationInterface {
    name = 'Schemasync1603825835352'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "flavor" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_934fe79b3d8131395c29a040ee5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "coffees" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "brand" character varying NOT NULL, "recommendations" integer NOT NULL DEFAULT 0, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2c43a32ab6534261322aa94a76a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "event" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "name" character varying NOT NULL, "payload" json NOT NULL, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b535fbe8ec6d832dde22065ebd" ON "event" ("name") `);
        await queryRunner.query(`CREATE TABLE "coffees_flavors" ("coffeesId" integer NOT NULL, "flavorId" integer NOT NULL, CONSTRAINT "PK_48a55ad52ac3593ba9b51795c3d" PRIMARY KEY ("coffeesId", "flavorId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d1504c7dfa080c6a48febca76a" ON "coffees_flavors" ("coffeesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8a35229ad85c478be719ef2a18" ON "coffees_flavors" ("flavorId") `);
        await queryRunner.query(`ALTER TABLE "coffees_flavors" ADD CONSTRAINT "FK_d1504c7dfa080c6a48febca76af" FOREIGN KEY ("coffeesId") REFERENCES "coffees"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "coffees_flavors" ADD CONSTRAINT "FK_8a35229ad85c478be719ef2a180" FOREIGN KEY ("flavorId") REFERENCES "flavor"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffees_flavors" DROP CONSTRAINT "FK_8a35229ad85c478be719ef2a180"`);
        await queryRunner.query(`ALTER TABLE "coffees_flavors" DROP CONSTRAINT "FK_d1504c7dfa080c6a48febca76af"`);
        await queryRunner.query(`DROP INDEX "IDX_8a35229ad85c478be719ef2a18"`);
        await queryRunner.query(`DROP INDEX "IDX_d1504c7dfa080c6a48febca76a"`);
        await queryRunner.query(`DROP TABLE "coffees_flavors"`);
        await queryRunner.query(`DROP INDEX "IDX_b535fbe8ec6d832dde22065ebd"`);
        await queryRunner.query(`DROP TABLE "event"`);
        await queryRunner.query(`DROP TABLE "coffees"`);
        await queryRunner.query(`DROP TABLE "flavor"`);
    }

}
