import {User} from "../data/models";

export const setUserState = (payload: User) => {
    return {type: 'SET_USER_STATE', payload}
}

export const setLastPage = (payload: string) => {
    return {type: 'SET_LAST_PAGE', payload}
}