import { _getUsers, _getQuestions } from './_DATA';

export function getInitialDataFromDB(){
    return Promise.all([
        _getUsers(),
        _getQuestions(),
    ]).then (([users, questions]) => ({
        users,
        questions,
    }))
}