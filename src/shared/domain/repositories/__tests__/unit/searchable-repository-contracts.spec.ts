import { SearchParams } from '../../searchable-repository-contracts'

describe('SearchableRepository unit tests', () => {
  describe('SearchParams tests', () => {
    it('Constructor method', () => {
      const sut: SearchParams = new SearchParams()

      expect(sut.page).toBe(1)
      expect(sut.perPage).toBe(1)
      expect(sut.sort).toBeNull()
      expect(sut.sortDir).toBeNull()
      expect(sut.filter).toBeNull()
    })

    it('page prop', () => {
      const params = [
        { page: null as any, expected: 1 },
        { page: '' as any, expected: 1 },
        { page: undefined as any, expected: 1 },
        { page: 'test' as any, expected: 1 },
        { page: 0, expected: 1 },
        { page: -10, expected: 1 },
        { page: 4.5, expected: 1 },
        { page: true, expected: 1 },
        { page: false, expected: 1 },
        { page: {}, expected: 1 },
        { page: 1, expected: 1 },
        { page: 2, expected: 2 },
      ]

      params.forEach(item => {
        expect(new SearchParams({ page: item.page }).page).toBe(item.expected)
      })
    })

    it('perPage prop', () => {
      const params = [
        { perPage: null as any, expected: 15 },
        { perPage: '' as any, expected: 15 },
        { perPage: undefined as any, expected: 15 },
        { perPage: 'test' as any, expected: 15 },
        { perPage: 0, expected: 15 },
        { perPage: -10, expected: 15 },
        { perPage: 4.5, expected: 15 },
        { perPage: true, expected: 15 },
        { perPage: false, expected: 15 },
        { perPage: {}, expected: 15 },
        { perPage: 1, expected: 1 },
        { perPage: 2, expected: 2 },
        { perPage: 25, expected: 25 },
      ]

      params.forEach(item => {
        expect(new SearchParams({ perPage: item.perPage }).perPage).toBe(item.expected)
      })
    })
  })
})
