import { Entity } from '@/shared/domain/entities/entity'
import { InMemorySearchableRepository } from '../../in-memory-searchable.repository'

type StubEntityProps = {
  name: string
  price: number
}

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemorySearchableRepository extends InMemorySearchableRepository<StubEntity> {
  sortableFields: string[] = ['name']

  protected async applyFilter(
    items: StubEntity[],
    filter: string | null,
  ): Promise<StubEntity[]> {
    if (!filter) return items
    return items.filter(item =>
      item.props.name.toLowerCase().includes(filter.toLowerCase()),
    )
  }
}

describe('InMemoryRepository unit tests', () => {
  let sut: StubInMemorySearchableRepository

  beforeEach(() => {
    sut = new StubInMemorySearchableRepository()
  })

  describe('applyFilter method', () => {
    it('should no filter items when filter param is null', async () => {
      const items = [
        new StubEntity({
          name: 'bread',
          price: 10,
        }),
      ]

      const spyFilterMethod = jest.spyOn(items, 'filter')

      const itemsFiltered = await sut['applyFilter'](items, null)

      expect(itemsFiltered).toStrictEqual(items)
      expect(spyFilterMethod).not.toHaveBeenCalled()
    })

    it('should filter using a filter param', async () => {
      const items = [
        new StubEntity({ name: 'bread', price: 10 }),
        new StubEntity({ name: 'Knife', price: 20 }),
        new StubEntity({ name: 'knife', price: 20 }),
        new StubEntity({ name: 'apple', price: 5 }),
      ]

      const spyFilterMethod = jest.spyOn(items, 'filter')

      let itemsFiltered = await sut['applyFilter'](items, 'Knife')

      expect(itemsFiltered).toStrictEqual([items[1], items[2]])
      expect(spyFilterMethod).toHaveBeenCalledTimes(1)

      itemsFiltered = await sut['applyFilter'](items, 'knife')

      expect(itemsFiltered).toStrictEqual([items[1], items[2]])
      expect(spyFilterMethod).toHaveBeenCalledTimes(2)

      itemsFiltered = await sut['applyFilter'](items, 'unexisting filter value')

      expect(itemsFiltered).toHaveLength(0)
      expect(spyFilterMethod).toHaveBeenCalledTimes(3)
    })
  })
  describe('applySort method', () => {})
  describe('applyPaginate method', () => {})

  describe('search method', () => {})
})
