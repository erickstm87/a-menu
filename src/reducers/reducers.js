let defaultState = {
    notes: '',
    foodOrders: '',
    sum: 0,
    name: '',
    number: ''
}

const reducers = (state = defaultState, action) => {
    switch(action.type) {
        case 'NOTES':
            return {
                ...state,
                notes: action.payload['notes']
            }
        case 'SUM_CHANGE':
            return {
                ...state,
                foodOrders: action.payload['foods'],
                sum: action.payload['sum']
            }
        case 'NAME':
            return {
                ...state,
                name: action.payload['name']
            }
        case 'NUMBER':
            return {
                ...state,
                number: action.payload['number']
            }
        default: 
            return state;
    }
}

export default reducers;