export const toCamelCase = (input) =>
    input.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) =>
        index === 0 ? letter.toLowerCase() : letter.toUpperCase()
    ).replace(/\s+/g, '');

export const getRefreshTokenRequest = () => {
    
}
export const getRememberMeStatus = () => {

}
export const getTokenFromStore = () => {

}
export const getUserDataFromStore = () => {

}

export const dropDownValidation = (fieldName) => {
    return {
        required: `${fieldName} is required`,
    }
}