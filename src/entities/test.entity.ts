import {
  Entity,
  EntityRepositoryType,
  PrimaryKey,
  Property,
} from '@mikro-orm/postgresql';
import { TestRepository } from '../repositories/test.repository';

@Entity({
  repository: () => TestRepository,
})
export class TestEntity {
  [EntityRepositoryType]?: TestRepository;

  @PrimaryKey()
  id: number;

  @Property()
  text: string;
}
