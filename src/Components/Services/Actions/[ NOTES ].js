export function addNote(data) {


    return {
        type: 'ADD_NOTES',
        payload: data,
    }
}

export function getAllNotes(data) {

    return {
        type: 'GET_ALL_NOTES',
        payload: data,
    }
}

export function deleteNote(note_id) {

    return {
        type: 'DELETE_NOTE',
        payload: note_id,
    }
}