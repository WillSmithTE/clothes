import { clothes } from "./assets/data/demo"
import { isNotUndefined } from "./predicates"
import { ClothingItem, User } from "./types"
import { stringify } from "./util"

const db: { users: User[], clothes: ClothingItem[] } = {
    users: [
        new User('098098421-ofi123431')
    ],
    clothes,
}

export const api = {
    likeItem,
    getClothesForUser,
    getAllClothes,
    login,
    getLikedClothesForUser,
    addItemToCart,
}

async function likeItem(userId: string, item: ClothingItem): Promise<void> {
    console.debug(`likeItem (userId=${userId}, item=${stringify(item)})`)

    try {
        const user = db.users.find(({ id }) => id === userId)!!
        user.viewedItems.unshift(item)
        const alreadyLikedItem = user.likedItems.find(({id}) => id === item.id)
        if (!alreadyLikedItem) {
            user.likedItems.unshift(item)
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
        if (user === undefined) { throw new Error(`Invalid userId, user not found (userId=${userId})`) }
        const allClothes = await getAllClothes()
        const unseenClothes = allClothes.filter(({ id: clothingId }) => user.viewedItems.find(({id: viewedId}) => viewedId === clothingId) === undefined) 
        return unseenClothes
    } catch (e) {
        return Promise.reject(e)
    }
}

async function getAllClothes(): Promise<ClothingItem[]> {
    console.debug('getAllClothes')
    return db.clothes
}

async function login(data: any): Promise<string> {
    return token
}

async function getLikedClothesForUser(userId: string): Promise<ClothingItem[]> {
    console.debug('getLikedClothesForUser (userId=' + userId)
    try {
        const user = db.users.find(({ id }) => id === userId)
        if (user === undefined) { throw new Error(`Invalid userId, user not found (userId=${userId})`) }
        return user.likedItems
    } catch (e) {
        return Promise.reject(e)
    }
}

async function addItemToCart(userId: string, item: ClothingItem): Promise<void> {
    console.debug(`addItemToCart (userId='${userId}, item='${stringify(item)}'`)
    try {
        const user = db.users.find(({ id }) => id === userId)
        if (user === undefined) { throw new Error(`Invalid userId, user not found (userId=${userId})`) }
        user.cartItems.unshift(item)
        return Promise.resolve()
    } catch (e) {
        return Promise.reject(e)
    }
}

// http://jwtbuilder.jamiekurtz.com/
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJDbG90aGVzU2VydmVyIiwiaWF0IjoxNjM5NzQ3NTA2LCJleHAiOjE2NzEyODM1MDYsImF1ZCI6ImNsb3RoZXMiLCJzdWIiOiIiLCJ1c2VyX2lkIjoiMDk4MDk4NDIxLW9maTEyMzQzMSJ9.Pu1JM2mKMG0N-pi5NBGIVIA7idEAn_MxOwky-2-o_2M'
const signingKey = 'herpderp'