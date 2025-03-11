import { toyService } from "../../services/toy.service.js";
import { ADD_TOY, REMOVE_TOY, SET_IS_LOADING, SET_TOYS, UPDATE_TOY } from "../reducers/toy.reducer.js";
import { store } from "../store.js";


export function loadToys() {
    const filterBy = store.getState().toyModule.filterBy
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    return toyService.query(filterBy)
        .then(toys => store.dispatch({ type: SET_TOYS, toys }))
        .catch(err => {
            console.error('toy action -> Cannot load toys', err)
            throw err
        })
        .finally(store.dispatch({ type: SET_IS_LOADING, isLoading: false }))
}


export function removeToy(toyId) {
    // const toyToRemove = store.getState().toyModule.toys.find(toy => toy._id === toyId)
    return toyService.remove(toyId)
        .then(() => {
            store.dispatch({ type: REMOVE_TOY, toyId })
            console.log('toy action -> toy removed')
        })
        .catch(err => {
            console.error('toy action -> Cannot remove toy:', err)
            throw err
        })
}

export function updateToy(toyToUpdate) {
    return toyService.save(toyToUpdate)
        .then((savedToy) => {
            store.dispatch({ type: UPDATE_TOY, toy: savedToy })
            console.log('toy action -> toy updated')
            return savedToy
        })
        .catch(err => {
            console.error('toy action -> Cannot update toy:', err)
            throw err
        })
}

export function addToy(toy) {
    return toyService.save(toy)
        .then((savedToy) => {
            store.dispatch({ type: ADD_TOY, toy: savedToy })
            console.log('toy action -> toy added')
            return savedToy
        })
        .catch(err => {
            console.error('toy action -> Cannot update toy:', err)
            throw err
        })
}

export function saveToy(toy) {
    if (toy._id) {
        return updateToy(toy)
    }
    else {
        return addToy(toy)
    }
}