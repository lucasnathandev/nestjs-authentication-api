import { Entity } from '@/shared/domain/entities/entity'
import { InMemoryRepository } from '../../in-memory.repository'
import { NotFoundError } from '@/shared/domain/errors/notfound-error'

type StubEntityProps = {
  name: string
  price: number
}

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe('InMemoryRepository unit tests', () => {
  let sut: StubInMemoryRepository

  beforeEach(() => {
    sut = new StubInMemoryRepository()
  })

  it('should insert a new entity to repository', async () => {
    const entity = new StubEntity({
      name: 'test',
      price: 40,
    })
    await sut.insert(entity)

    expect(entity.toJSON()).toStrictEqual(sut.items[0].toJSON())
  })

  it('should throw error when entity not found', async () => {
    await expect(sut.findById('fakeid')).rejects.toThrow(
      new NotFoundError('Entity not found'),
    )
  })

  it('should find a new entity in repository', async () => {
    const entity = new StubEntity({
      name: 'test',
      price: 40,
    })
    await sut.insert(entity)
    const result = await sut.findById(entity.id)
    expect(entity.toJSON()).toStrictEqual(result.toJSON())
  })
})
