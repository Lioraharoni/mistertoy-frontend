

import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import defaultToyImg from '../assets/img/DefaultToy.webp'
import { saveToy } from '../store/actions/toy.actions.js'
import { ToyLabels } from '../cmps/ToyLabels.jsx'

export function ToyEdit() {
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (params.toyId) loadToy()
    }, [])

    function loadToy() {
        toyService.get(params.toyId)
            .then(data => {
                setToyToEdit(data)
                console.log("loadToy prevIsDone=", data.isDone);
            })
            .catch(err => console.log('err:', err))
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default:
                break
        }

        // console.log(field, value);
        setToyToEdit(prevToyToEdit => ({ ...prevToyToEdit, [field]: value }))
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        saveToy(toyToEdit)
            .then(savedToy => {
                navigate('/toy')
                showSuccessMsg(`Toy Saved (id: ${savedToy._id})`)
            })
            .catch(err => {
                showErrorMsg('Cannot save toy')
                console.log('err:', err)
            })
    }

    function onRemoveLabel(label) {
        const newToyLabels = toyToEdit.labels.filter(toyLabel => toyLabel !== label)
        console.log('onRemoveLabel ', label, { ...toyToEdit, labels: newToyLabels });

        setToyToEdit(prevToyToEdit => ({ ...prevToyToEdit, labels: newToyLabels }))
    }

    return (
        <section className="toy-edit">
            <form onSubmit={onSaveToy} >
                <label htmlFor="name">Toy:</label>
                <input onChange={handleChange} value={toyToEdit.name} type="text" name="name" id="name" />

                <img src={defaultToyImg} alt={defaultToyImg} />

                <label htmlFor="price">Price:</label>
                <input onChange={handleChange} value={toyToEdit.price} type="number" name="price" id="price" />

                <label htmlFor="inStock">In stock</label>
                <input onChange={handleChange} checked={toyToEdit.inStock} type="checkbox" name="inStock" id="inStock" />

                <ToyLabels toyLabels={toyToEdit.labels} onRemoveLabel={onRemoveLabel} />

                <button>Save</button>
            </form>
        </section>
    )
}