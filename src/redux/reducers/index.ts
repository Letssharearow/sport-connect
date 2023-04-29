export function reducer(state: any, {type, payload}: { type: string, payload: any }) {
    switch (type) {
        case 'SET_USER_STATE': {
            return {
                ...state,
                userData: payload,
            }
        }
    }
}