import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import {TestEntity} from "../../entities/test.entity";

export class InitialSeeder extends Seeder {

  async run(em: EntityManager): Promise<void> {
    const entitiesCount = 150;

    const newEntities = Array(entitiesCount).fill(0).map((_elem, id)=>
     em.create(TestEntity, {text: String(id)})
    );

    await em.persistAndFlush(newEntities);
  }
}
