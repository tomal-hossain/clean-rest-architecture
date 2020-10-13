import { makeDb } from '../database/database.js'
import { DatabaseConnectionError } from '../helpers/error.js'

const studentService = {

    add: async function (student) {
        const db = await makeDb()
        if (!db) {
            throw new DatabaseConnectionError()
        }
        const { result, ops } = await db.collection('students')
            .insertOne(student)
            .catch(error => {
                throw error
            })
        return {
            success: result.ok === 1,
            student: ops[0]
        }
    },

    get: async function (id = null) {
        const db = await makeDb()
        if (!db) {
            throw new DatabaseConnectionError()
        }
        if (id) {
            return await db.collection('students')
                .findOne({ _id: db.makeId(id)})
        } else {
            return await db.collection('students')
                .find({ })
                .toArray()
        }
    },

    update: async function (id, {firstName, lastName, email, roll, ...otherInfo}) {
        const db = await makeDb()
        if (!db) {
            throw new DatabaseConnectionError()
        }
        var newvalues = {
            $set:
            { firstName, lastName, email, roll, ...otherInfo }
        };
        const { result } = await db.collection("students").updateOne({ _id: db.makeId(id) }, newvalues)
        if(result && result.ok === 1) {
            return {
                _id: id,
                firstName,
                lastName,
                email,
                roll,
                ...otherInfo
            }
        }
        return null;
    },

    remove: async function (id) {
        const db = await makeDb()
        if (!db) {
            throw new DatabaseConnectionError()
        }
        const { result } = await db.collection('students')
            .deleteOne({_id: db.makeId(id)})
        if(result.n == 1 && result.ok === 1) {
            return {
                success: true,
                message: 'Successfully deleted this user'
            }
        }
        return false;
    }
}

export default studentService