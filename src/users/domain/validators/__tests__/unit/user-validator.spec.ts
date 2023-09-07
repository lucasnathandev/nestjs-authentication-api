import { UserRules } from './../../user-validator'
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder'
import { UserValidator, UserValidatorFactory } from '../../user-validator'

let sut: UserValidator
let isValid: boolean

describe('UserValidator unit tests', () => {
  beforeEach(() => {
    sut = UserValidatorFactory.create()
  })

  it('should validate user correct values WITHOUT errors', () => {
    const props = UserDataBuilder({})
    isValid = sut.validate(props)

    expect(isValid).toBeTruthy()
    expect(sut.errors).toBeNull()
    expect(sut.validatedData).toStrictEqual(new UserRules(props))
  })
  describe('Name field', () => {
    it('Should validate wrong name data format with errors', () => {
      isValid = sut.validate(null as any)
      expect(isValid).toBeFalsy()
      expect(sut.errors['name']).toStrictEqual([
        'name should not be empty',
        'name must be a string',
        'name must be shorter than or equal to 255 characters',
      ])

      isValid = sut.validate({ ...UserDataBuilder({}), name: '' as any })

      expect(isValid).toBeFalsy()
      expect(sut.errors['name']).toStrictEqual(['name should not be empty'])

      isValid = sut.validate({ ...UserDataBuilder({}), name: 1 as any })

      expect(isValid).toBeFalsy()
      expect(sut.errors['name']).toStrictEqual([
        'name must be a string',
        'name must be shorter than or equal to 255 characters',
      ])

      isValid = sut.validate({
        ...UserDataBuilder({}),
        name: 'a'.repeat(256),
      })

      expect(isValid).toBeFalsy()
      expect(sut.errors['name']).toStrictEqual([
        'name must be shorter than or equal to 255 characters',
      ])
    })
  })

  describe('Email field', () => {
    it('Should validate wrong email data format with errors', () => {
      isValid = sut.validate(null as any)
      expect(isValid).toBeFalsy()
      expect(sut.errors['email']).toStrictEqual([
        'email should not be empty',
        'email must be a string',
        'email must be an email',
        'email must be shorter than or equal to 255 characters',
      ])

      isValid = sut.validate({ ...UserDataBuilder({}), email: '' as any })

      expect(isValid).toBeFalsy()
      expect(sut.errors['email']).toStrictEqual([
        'email should not be empty',
        'email must be an email',
      ])

      isValid = sut.validate({ ...UserDataBuilder({}), email: 1 as any })

      expect(isValid).toBeFalsy()
      expect(sut.errors['email']).toStrictEqual([
        'email must be a string',
        'email must be an email',
        'email must be shorter than or equal to 255 characters',
      ])

      isValid = sut.validate({
        ...UserDataBuilder({}),
        email: 'a'.repeat(256),
      })

      expect(isValid).toBeFalsy()
      expect(sut.errors['email']).toStrictEqual([
        'email must be an email',
        'email must be shorter than or equal to 255 characters',
      ])
    })
  })

  describe('Password field', () => {
    it('Should validate wrong password data format with errors', () => {
      isValid = sut.validate(null as any)
      expect(isValid).toBeFalsy()
      expect(sut.errors['password']).toStrictEqual([
        'password should not be empty',
        'password must be a string',
        'password must be shorter than or equal to 100 characters',
      ])

      isValid = sut.validate({ ...UserDataBuilder({}), password: '' as any })

      expect(isValid).toBeFalsy()
      expect(sut.errors['password']).toStrictEqual(['password should not be empty'])

      isValid = sut.validate({ ...UserDataBuilder({}), password: 1 as any })

      expect(isValid).toBeFalsy()
      expect(sut.errors['password']).toStrictEqual([
        'password must be a string',
        'password must be shorter than or equal to 100 characters',
      ])

      isValid = sut.validate({
        ...UserDataBuilder({}),
        password: 'a'.repeat(101),
      })

      expect(isValid).toBeFalsy()
      expect(sut.errors['password']).toStrictEqual([
        'password must be shorter than or equal to 100 characters',
      ])
    })
  })

  describe('createdAt field', () => {
    it('should validate wrong createdAt data format with errors ', () => {
      isValid = sut.validate({ ...UserDataBuilder({}), createdAt: 10 as any })

      expect(isValid).toBeFalsy()
      expect(sut.errors['createdAt']).toStrictEqual(['createdAt must be a Date instance'])

      isValid = sut.validate({ ...UserDataBuilder({}), createdAt: 'wednesday' as any })

      expect(isValid).toBeFalsy()
      expect(sut.errors['createdAt']).toStrictEqual(['createdAt must be a Date instance'])
    })
  })
})
