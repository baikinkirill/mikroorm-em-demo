import { Injectable } from '@nestjs/common';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { ENTITIES_COUNT } from './app.constants';
import pMap from 'p-map';
import { TestEntity } from './entities/test.entity';
import { TestRepository } from './repositories/test.repository';

@Injectable()
export class AppService {
  readonly #em: EntityManager;
  readonly #testRepository: EntityRepository<TestEntity>;

  constructor(em: EntityManager, testRepository: TestRepository) {
    this.#em = em;
    this.#testRepository = testRepository;
  }

  getHello(): string {
    return 'Hello World!';
  }

  async updateEntities(ids: number[]) {
    await pMap(
      ids,
      async (id: number) => {
        await this.#em.transactional(async (em) => {
          em.clear();

          await this.#updateEntity(id);
        });
      },
      { concurrency: 5 },
    );
  }

  async #updateEntity(id: number) {
    const randomText = Math.random().toString();

    const testEntity = await this.#testRepository.findOne({ id });

    testEntity.text = randomText;

    await this.#em.persistAndFlush(testEntity);
  }

  async upsertEntities() {
    const entities = await this.#testRepository.findAll();

    if (entities.length >= ENTITIES_COUNT) {
      return entities;
    }

    const newEntities = [];
    for (let i = entities.length; i < ENTITIES_COUNT; i++) {
      newEntities.push(this.#testRepository.create({ text: 'test' }));
    }

    await this.#em.persistAndFlush(newEntities);

    return { ...entities, ...newEntities };
  }
}
