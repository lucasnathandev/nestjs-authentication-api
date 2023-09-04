import { UserEntity, UserProps } from '../../user.entity'
import { faker } from '@faker-js/faker'

describe('UserEntity unit tests', () => {
  let props: UserProps
  let sut: UserEntity

  beforeEach(() => {
    props = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password({
        length: 12,
        pattern: /[\d\w!\@\#\$\%\¨\&\*\(\)]/,
      }),
    }

    sut = new UserEntity(props)
  })
  it('Constructor method', () => {
    expect(sut.props.name).toBe(props.name)
    expect(sut.props.email).toBe(props.email)
    expect(sut.props.password).toBe(props.password)
    expect(sut.props.createdAt).toBeInstanceOf(Date)
  })
})
