import { SearchParams } from '../../searchable-repository-contracts'

describe('SearchableRepository unit tests', () => {
  describe('SearchParams tests', () => {
    it('Constructor method', () => {
      const sut: SearchParams = new SearchParams()

      expect(sut.page).toBe(1)
      expect(sut.perPage).toBe(15)
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

    it('sort prop', () => {
      const sut: SearchParams = new SearchParams()

      expect(sut.sort).toBeNull()

      const params = [
        { sort: null as any, expected: null },
        { sort: '', expected: null },
        { sort: undefined as any, expected: null },
        { sort: 'test', expected: 'test' },
        { sort: 0, expected: '0' },
        { sort: -10, expected: '-10' },
        { sort: 4.5, expected: '4.5' },
        { sort: true, expected: 'true' },
        { sort: false, expected: 'false' },
        { sort: {}, expected: '[object Object]' },
        { sort: 1, expected: '1' },
        { sort: 2, expected: '2' },
        { sort: 25, expected: '25' },
      ]

      params.forEach(item => {
        expect(new SearchParams({ sort: item.sort }).sort).toBe(item.expected)
      })
    })

    it('sortDir prop', () => {
      const sut: SearchParams = new SearchParams()

      expect(sut.sortDir).toBeNull()

      const params = [
        { sortDir: null as any, expected: 'desc' },
        { sortDir: '', expected: 'desc' },
        { sortDir: undefined as any, expected: 'desc' },
        { sortDir: 'test', expected: 'desc' },
        { sortDir: 0, expected: 'desc' },
        { sortDir: -10, expected: 'desc' },
        { sortDir: 4.5, expected: 'desc' },
        { sortDir: true, expected: 'desc' },
        { sortDir: false, expected: 'desc' },
        { sortDir: {}, expected: 'desc' },
        { sortDir: 1, expected: 'desc' },
        { sortDir: 2, expected: 'desc' },
        { sortDir: 25, expected: 'desc' },
        { sortDir: 'asc', expected: 'asc' },
        { sortDir: 'ASC', expected: 'asc' },
        { sortDir: 'DESC', expected: 'desc' },
        { sortDir: 'desc', expected: 'desc' },
      ]

      params.forEach(item => {
        expect(new SearchParams({ sort: 'field', sortDir: item.sortDir }).sortDir).toBe(
          item.expected,
        )
      })
    })

    it('filter prop', () => {
      const sut: SearchParams = new SearchParams()

      expect(sut.filter).toBeNull()

      const params = [
        { filter: null as any, expected: null },
        { filter: '', expected: null },
        { filter: undefined as any, expected: null },
        { filter: 'test', expected: 'test' },
        { filter: 0, expected: '0' },
        { filter: -10, expected: '-10' },
        { filter: 4.5, expected: '4.5' },
        { filter: true, expected: 'true' },
        { filter: false, expected: 'false' },
        { filter: {}, expected: '[object Object]' },
        { filter: 1, expected: '1' },
        { filter: 2, expected: '2' },
        { filter: 25, expected: '25' },
      ]

      params.forEach(item => {
        expect(new SearchParams({ filter: item.filter }).filter).toBe(item.expected)
      })
    })
  })
})
