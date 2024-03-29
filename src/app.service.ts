import { Injectable } from '@nestjs/common';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
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
      { concurrency: 3 },
    );
  }

  async #updateEntity(id: number) {
    const randomText = Math.random().toString();

    const testEntity = await this.#testRepository.findOne({ id });

    testEntity.text = randomText;

    await this.#em.persistAndFlush(testEntity);
  }
}
