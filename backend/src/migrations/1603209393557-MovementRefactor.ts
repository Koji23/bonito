import {MigrationInterface, QueryRunner} from "typeorm";

export class MovementRefactor1603209393557 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "movement" RENAME COLUMN "difficulty" TO "RatePerceivedExertion"`,
      );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "movement" RENAME COLUMN "RatePerceivedExertion" TO "difficulty"`,
    );
  }
}
