import { InvalidPropertyError } from '../helpers/error.js'
import { isValidEmail } from '../helpers/is-valid-email.js'
import { requiredParam } from '../helpers/required-param.js'
import { upperFirstLetter } from '../helpers/upper-first.js'

export function makeStudentModel (studentModel = {}) {

    const validStudent = validate(studentModel)
    return normalize(validStudent)

    function validate({
        firstName = requiredParam('firstName'),
        lastName = requiredParam('lastName'),
        email = requiredParam('email'),
        roll = requiredParam('roll'),
        ...otherInfo
    } = {}) {
        validateName('first name', firstName)
        validateName('last name', lastName)
        validateEmail(email)
        validateRoll(roll)
        return {
            firstName,
            lastName,
            email,
            roll,
            ...otherInfo
        }
    }

    function validateName(label, value) {
        if(value.length < 3) {
            throw new InvalidPropertyError(
                `A student's ${label} must contain at least 3 characters`
            )
        }
    }

    function validateEmail(email) {
        if(!isValidEmail(email)) {
            throw new InvalidPropertyError(
                'Invalid email address'
            )
        }
    }

    function validateRoll(roll) {
        if(isNaN(roll) || roll.length < 2) {
            throw new InvalidPropertyError(
                'Invalid roll format'
            )
        }
    }

    function normalize({firstName, lastName, email, ... otherInfo}) {
        return {
            firstName: upperFirstLetter(firstName),
            lastName: upperFirstLetter(lastName),
            email: email.toLowerCase(),
            ...otherInfo
        }
    }
}