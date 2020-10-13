import { InvalidPropertyError, RequiredParameterError } from '../helpers/error.js'
import { makeHttpError } from '../helpers/http-error.js'
import { makeStudentModel } from './student.model.js'
import studentService from './student.service.js'


export async function studentController(httpRequest) {

    switch (httpRequest.method) {
        case 'POST': return addStudent(httpRequest)
        case 'GET': return getStudent(httpRequest)
        case 'PUT': return updateStudent(httpRequest)
        case 'DELETE': return removeStudent(httpRequest)
    }

    async function addStudent(httpRequest) {
        let studentModel = httpRequest.body
        if (!studentModel) {
            return makeHttpError({
                statusCode: 400,
                errorMessage: 'Bad request, no POST body'
            })
        }
        if (typeof studentModel === 'string' || typeof studentModel === 'object') {
            try {
                studentModel = JSON.parse(studentModel)
            } catch {
                return makeHttpError({
                    statusCode: 400,
                    errorMessage: 'Bad request, Invalid JSON format'
                })
            }
        }
        try {
            const student = makeStudentModel(studentModel)
            const result = await studentService.add(student)
            return {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 200,
                data: JSON.stringify(result)
            }
        } catch(e) {
            return makeHttpError({
                statusCode: e instanceof RequiredParameterError ||
                e instanceof InvalidPropertyError ? 400 : 500,
                errorMessage: e.message
            })
        }
    }

    async function getStudent(httpRequest) {
        try {
            const result = await studentService.get(httpRequest.params)
            if (result){
                return {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    statusCode: 200,
                    data: JSON.stringify(result)
                }
            } else {
                return makeHttpError({
                    statusCode: 404,
                    errorMessage: 'Student not found'
                })
            }
        } catch(e) {
            return makeHttpError({
                statusCode: 500,
                errorMessage: e.message
            })
        }
    }

    async function updateStudent(httpRequest) {
        let studentModel = httpRequest.body
        if (!studentModel) {
            return makeHttpError({
                statusCode: 400,
                errorMessage: 'Bad request, no PUT body'
            })
        }
        if (typeof studentModel === 'string' || typeof studentModel === 'object') {
            try {
                studentModel = JSON.parse(studentModel)
            } catch {
                return makeHttpError({
                    statusCode: 400,
                    errorMessage: 'Bad request, Invalid JSON format'
                })
            }
        }
        try {
            const student = makeStudentModel(studentModel)
            const result = await studentService.update(httpRequest.params, student)
            if(result) {
                return {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    statusCode: 200,
                    data: JSON.stringify(result)
                }
            }
            return makeHttpError({
                statusCode: 404,
                errorMessage: 'Student not found'
            }) 
            
        } catch(e) {
            return makeHttpError({
                statusCode: e instanceof RequiredParameterError ||
                e instanceof InvalidPropertyError ? 400 : 500,
                errorMessage: e.message
            })
        }
    }

    async function removeStudent(httpRequest) {
        try {
            const result = await studentService.remove(httpRequest.params)
            if(result) {
                return {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    statusCode: 200,
                    data: JSON.stringify(result)
                }
            }
            return makeHttpError({
                statusCode: 404,
                errorMessage: 'Student not found'
            }) 
            
        } catch(e) {
            return makeHttpError({
                statusCode: 500,
                errorMessage: e.message
            })
        }
    }
}