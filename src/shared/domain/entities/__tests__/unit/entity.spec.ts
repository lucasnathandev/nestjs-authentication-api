import { validate } from 'uuid'
import { Entity } from '../../entity'

type StubProps = {
  prop1: string
  prop2: number
}

class StubEntity extends Entity<StubProps> {}

describe('Entity unit tests', () => {
  it('should set props and id', () => {
    const props = {
      prop1: 'value1',
      prop2: 15,
    }

    const id = '5635ba06-6ea3-40d1-b776-356f1a620d11'

    const entity: StubEntity = new StubEntity(props, id)

    expect(validate(entity.id)).toBeTruthy()
    expect(entity.id).toBe(id)
  })

  it('should convert an entity to a Javascript Object', () => {
    const props = {
      prop1: 'value1',
      prop2: 15,
    }

    const id = '5635ba06-6ea3-40d1-b776-356f1a620d11'

    const entity: StubEntity = new StubEntity(props, id)

    expect(entity.toJSON()).toStrictEqual({ id, ...props })
  })
})
