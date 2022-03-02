import randomstring from 'randomstring';
export const GetUserId = () => {

    const user_id = randomstring.generate({
        length: 10,
        charset: "alphanumeric",
    });
    return user_id;

}

export const GetNoteId = () => {

    const user_id = randomstring.generate({
        length: 10,
        charset: "hex",
    });
    return user_id;
}


