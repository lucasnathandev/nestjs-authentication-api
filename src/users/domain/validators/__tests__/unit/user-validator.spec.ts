import { UserRules } from './../../user-validator'
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder'
import { UserValidator, UserValidatorFactory } from '../../user-validator'

let sut: UserValidator
let isValid: boolean

describe('UserValidator unit tests', () => {
  beforeEach(() => {
    sut = UserValidatorFactory.create()
  })
  describe('Name field', () => {
    it('Should validate wrong values with errors', () => {
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

    it('should validate correct values WITHOUT errors', () => {
      const props = UserDataBuilder({})
      isValid = sut.validate(props)

      expect(isValid).toBeTruthy()
      expect(sut.errors).toBeNull()
      expect(sut.validatedData).toStrictEqual(new UserRules(props))
    })
  })
})
