import { Migration } from '@mikro-orm/migrations';

export class Migration20240305191317 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "test_entity" ("id" serial primary key, "text" varchar(255) not null);');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "test_entity" cascade;');
  }

}
