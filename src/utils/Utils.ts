import jwtDecode from "jwt-decode";

export const computeAge = (bornDate) => {
    const today = new Date();
    const birthDate = new Date(bornDate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

export const validateToken = (token: string) => {
    const data = jwtDecode(token) as any
    const expiryTime = new Date(data.exp * 1000).getTime()
    const currentTime = new Date().getTime()

    return expiryTime >= currentTime + 3000
}