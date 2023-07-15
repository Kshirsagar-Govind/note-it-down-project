
export const getAllPasswordData=async()=> {
        const data = await fetch(`${process.env.REACT_APP_HOST}/get-all-passwords/${localStorage.UserId}`);
        const pass = await data.json()
        return pass;
}