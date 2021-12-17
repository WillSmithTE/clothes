import { clearItem, getStoredItemAsync, saveItem } from "../storage"

const TOKEN_KEY = 'userToken'

export async function getToken() {
    const token = await getStoredItemAsync(TOKEN_KEY)
    if (token === 'null') {
        return Promise.resolve(null)
    } else {
        return token
    }
}

export function saveToken(newToken: string | null) {
    return saveItem(TOKEN_KEY, newToken)
}

export function clearToken() {
    return clearItem(TOKEN_KEY)
}
