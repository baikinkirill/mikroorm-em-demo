import { EntityRepository } from '@mikro-orm/postgresql';
import { TestEntity } from '../entities/test.entity';

export class TestRepository extends EntityRepository<TestEntity> {}
