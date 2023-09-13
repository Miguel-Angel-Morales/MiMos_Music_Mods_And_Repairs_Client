export const isStaff = () => {
    const auth = localStorage.getItem("musicrepairs")
    const userType = JSON.parse(auth)
    return userType?.staff
}