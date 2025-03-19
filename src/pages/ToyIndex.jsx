// import { ToyFilter } from "../cmps/ToyFilter.jsx"
import { ToyList } from "../cmps/ToyList.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { store } from "../store/store.js"
import { loadToys, removeToy, updateToy } from "../store/actions/toy.actions.js"
import { SET_FILTER_BY } from "../store/reducers/toy.reducer.js"

import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { ToyFilter } from "../cmps/ToyFilter.jsx"

export function ToyIndex() {
    // Special hook for accessing search-params:
    const [searchParams, setSearchParams] = useSearchParams()
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const navigate = useNavigate()

    useEffect(() => {
        setSearchParams(filterBy)
        loadToys()
            .catch(showErrorMsg('Cannot load toys'))
    }, [filterBy])

    function onRemoveToy(toyId, ev) {
        ev.stopPropagation()

        var isSure = confirm("Are you sure want to delete?");
        if (isSure) {
            removeToy(toyId)
                .then(() => showSuccessMsg(`Toy removed`))
                .catch(err => showErrorMsg('Cannot remove toy'))
        }
    }

    function onDisplayToy(toyId) {
        navigate(`/toy/${toyId}`)
    }


    function setFilterBy(newFilterBy) {
        store.dispatch({ type: SET_FILTER_BY, filterBy: newFilterBy })
    }

    if (!toys) return <div>Loading...</div>
    return (
        <section className="toy-index">
            <ToyFilter filterBy={filterBy} onSetFilterBy={setFilterBy} />
            <div>
                <Link to="/toy/edit" className="btn" >Add Toy</Link>
            </div>

            <h2>Our Toys</h2>
            <ToyList toys={toys} onRemoveToy={onRemoveToy} onDisplayToy={onDisplayToy} />
            <hr />
        </section>
    )
}