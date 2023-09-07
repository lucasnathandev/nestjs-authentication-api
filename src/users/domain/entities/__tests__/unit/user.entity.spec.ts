import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder'
import { UserEntity, UserProps } from '../../user.entity'

describe('UserEntity unit tests', () => {
  let props: UserProps
  let sut: UserEntity

  beforeEach(() => {
    UserEntity.validate = jest.fn()
    props = UserDataBuilder({})

    sut = new UserEntity(props)
  })
  it('should have correct values', () => {
    expect(UserEntity.validate).toHaveBeenCalled()
    expect(sut.props.name).toBe(props.name)
    expect(sut.props.email).toBe(props.email)
    expect(sut.props.password).toBe(props.password)
    expect(sut.props.createdAt).toBeInstanceOf(Date)
  })

  it('should have getters for props ', () => {
    expect(sut.props.name).toBeDefined()
    expect(sut.props.email).toBeDefined()
    expect(sut.props.password).toBeDefined()
    expect(sut.props.createdAt).toBeDefined()
  })

  it('should get correct values ', () => {
    expect(sut.props.name).toEqual(props.name)
    expect(sut.props.email).toEqual(props.email)
    expect(sut.props.password).toEqual(props.password)
    expect(sut.props.createdAt).toBeInstanceOf(Date)
  })

  it('should get correct type values', () => {
    expect(typeof sut.props.name).toBe('string')
    expect(typeof sut.props.email).toBe('string')
    expect(typeof sut.props.password).toBe('string')
  })

  it('should set values to user name and password', () => {
    sut['name'] = 'Other name'
    sut['password'] = 'potatochips'

    expect(sut.name).toEqual('Other name')
    expect(sut.password).toEqual('potatochips')
  })

  it('should update values to name and password using methods', () => {
    sut.updateName('lucas')

    expect(UserEntity.validate).toHaveBeenCalled()
    sut.updatePassword('lucaspass')

    expect(UserEntity.validate).toHaveBeenCalled()
    expect(sut.name).toEqual('lucas')
    expect(sut.password).toEqual('lucaspass')
  })
})
