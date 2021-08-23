export const updateSum = (foods) => {
    return {
        type: 'SUM_CHANGE',
        payload: { 
            "foods": foods.x, 
            "sum": foods.y 
        }
    }
}

export const takeNotes = (notes) => {
    return {
        type: 'NOTES',
        payload: {
            'notes': notes.x
        }
    }
}

export const takeName = (name) => {
    return {
        type: 'NAME',
        payload: {
            'name': name.x
        }
    }
}

export const saveNumber = (number) => {
    return {
        type: 'NUMBER',
        payload: {
            'number': number.x
        }
    }
}