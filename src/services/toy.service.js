import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'


const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']
const TOY_KEY = 'toyDB'
_createToys()

export const toyService = {
    query,
    get,
    remove,
    save,
    getEmptyToy,
    getDefaultFilter,
    getFilterFromSearchParams,
    // getPriceStats,
    // getNameStats,
}
// For Debug (easy access from console):
window.toyService = toyService

function query(filterBy = {}) {
    return storageService.query(TOY_KEY)
        .then(toys => {
            if (filterBy.name) {
                const regExp = new RegExp(filterBy.name, 'i')
                toys = toys.filter(toy => regExp.test(toy.name))
            }

            if (filterBy.maxPrice) {
                toys = toys.filter(toy => toy.price <= filterBy.maxPrice)
            }

            return toys
        })
}

function get(toyId) {
    return storageService.get(TOY_KEY, toyId)
        .then(toy => {
            toy = _setNextPrevToyId(toy)
            return toy
        })
}

function remove(toyId) {
    return storageService.remove(TOY_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        return storageService.put(TOY_KEY, toy)
    } else {
        return storageService.post(TOY_KEY, toy)
    }
}

function getEmptyToy(name = '', price = '') {
    return { name, price }
}

function getDefaultFilter() {
    return { name: '', maxPrice: 1000 }
}

function getFilterFromSearchParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    const filterBy = {}
    for (const field in defaultFilter) {
        filterBy[field] = searchParams.get(field) || ''
    }
    return filterBy
}

// function getPriceStats() {
//     return storageService.query(TOY_KEY)
//         .then(toys => {
//             const toyCountByPriceMap = _getToyCountByPriceMap(toys)
//             const data = Object.keys(toyCountByPriceMap).map(priceName => ({ title: priceName, value: toyCountByPriceMap[priceName] }))
//             return data
//         })

// }

// function getNameStats() {
//     return storageService.query(TOY_KEY)
//         .then(toys => {
//             const toyCountByNameMap = _getToyCountByNameMap(toys)
//             const data = Object.keys(toyCountByNameMap)
//                 .map(name =>
//                 ({
//                     title: name,
//                     value: Math.round((toyCountByNameMap[name] / toys.length) * 100)
//                 }))
//             return data
//         })
// }

function _createToys() {
    let toys = utilService.loadFromStorage(TOY_KEY)
    if (!toys || !toys.length) {
        toys = []
        const names = ['Doll', 'Car', 'Magnetic toy', 'Ball']
        for (let i = 0; i < 20; i++) {
            const name = names[utilService.getRandomIntInclusive(0, names.length - 1)]
            toys.push(_createToy(name, utilService.getRandomIntInclusive(10, 200)))
        }
        utilService.saveToStorage(TOY_KEY, toys)
    }
}

function _createToy(name, price = 100) {
    const toy = getEmptyToy(name, price)
    toy._id = utilService.makeId()
    toy.createdAt = Date.now() - utilService.getRandomIntInclusive(0, 1000 * 60 * 60 * 24)
    toy.labels = []
    toy.inStock = true
    toy.imgUrl = 'src/assets/img/DefaultToy.webp'
    return toy
}

function _setNextPrevToyId(toy) {
    return storageService.query(TOY_KEY).then((toys) => {
        const toyIdx = toys.findIndex((currToy) => currToy._id === toy._id)
        const nextToy = toys[toyIdx + 1] ? toys[toyIdx + 1] : toys[0]
        const prevToy = toys[toyIdx - 1] ? toys[toyIdx - 1] : toys[toys.length - 1]
        toy.nextToyId = nextToy._id
        toy.prevToyId = prevToy._id
        return toy
    })
}

// function _getToyCountByPriceMap(toys) {
//     const toyCountByPriceMap = toys.reduce((map, toy) => {
//         if (toy.maxPrice < 120) map.slow++
//         else if (toy.maxPrice < 200) map.normal++
//         else map.fast++
//         return map
//     }, { slow: 0, normal: 0, fast: 0 })
//     return toyCountByPriceMap
// }

// function _getToyCountByNameMap(toys) {
//     const toyCountByNameMap = toys.reduce((map, toy) => {
//         if (!map[toy.name]) map[toy.name] = 0
//         map[toy.name]++
//         return map
//     }, {})
//     return toyCountByNameMap
// }

