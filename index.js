import { createServer } from 'http'
import { makeHttpError } from './helpers/http-error.js'

import { processRequest } from './helpers/process-request.js'
import { studentController } from './student/student.controller.js'

import dotenv from 'dotenv'
dotenv.config();


const requestHandler = async(req, res) => {
    const httpRequest = await processRequest(req)
    if (httpRequest.path == '/api/student') {
        const { headers, statusCode, data } = await studentController(httpRequest)
        res.writeHead(statusCode, headers)
        res.end(data)
    } else {
        const { headers, statusCode, data } = makeHttpError({
            statusCode: 404,
            errorMessage: 'Route doesn\'t match'
        })
        res.writeHead(statusCode, headers)
        res.end(data)
    }
}

const server = createServer(requestHandler)

server.listen(process.env.PORT, (err) => {
    if (err) {
        console.log(`Error while server: ${err}`)
    } else {
        console.log('Server is running')
    }
})