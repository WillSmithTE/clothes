import { clothes } from "./assets/data/demo"
import { ClothingItem, User } from "./types"

const db: { users: User[] } = {
    users: [
        new User('098098421-ofi123431')
    ],
}

export const api = {
    likeItem,
    getClothesForUser,
    getAllClothes,
    login,
}

async function likeItem(userId: string, itemId: string): Promise<void> {
    console.debug(`likeItem (userId=${userId}, itemId=${itemId})`)

    try {
        const user = db.users.find(({ id }) => id === userId)!!
        if (!user.likedItemIds.includes(itemId)) {
            user.likedItemIds.unshift(itemId)
        }
        return Promise.resolve()
    } catch (e) {
        return Promise.reject(e)
    }
}

async function getClothesForUser(userId: string): Promise<ClothingItem[]> {
    console.debug('getClothesForUser (userId=' + userId)
    try {
        const user = db.users.find(({ id }) => id === userId)
        if (user === undefined) { throw new Error(`Invalid userId, user not found (userId=${userId})`)}
        const allClothes = await getAllClothes()
        const unseenClothes = allClothes.filter(({ id }) => !user.historyItemIds.includes(id))
        return unseenClothes
    } catch (e) {
        return Promise.reject(e)
    }
}

async function getAllClothes(): Promise<ClothingItem[]> {
    console.debug('getAllClothes')
    return clothes
}

async function login(data: any): Promise<string> {
    return token
}

// http://jwtbuilder.jamiekurtz.com/
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJDbG90aGVzU2VydmVyIiwiaWF0IjoxNjM5NzQ3NTA2LCJleHAiOjE2NzEyODM1MDYsImF1ZCI6ImNsb3RoZXMiLCJzdWIiOiIiLCJ1c2VyX2lkIjoiMDk4MDk4NDIxLW9maTEyMzQzMSJ9.Pu1JM2mKMG0N-pi5NBGIVIA7idEAn_MxOwky-2-o_2M'
const signingKey = 'herpderp'