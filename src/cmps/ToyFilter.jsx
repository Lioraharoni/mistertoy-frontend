import { useState, useEffect } from 'react'
import { toyService } from '../services/toy.service.js'

export function ToyFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({...filterBy})
    const allLabels = toyService.getToyLabels()
    const [selectedLabels, setSelectedLabels] = useState(getSelecedLabels())

    useEffect(() => {
        if(selectedLabels && selectedLabels.length){
            setFilterByToEdit(prevFilter => ({...prevFilter, labels: selectedLabels}))
        }
    }, [selectedLabels])

    function getSelecedLabels() {
        return filterBy && filterBy.labels ? [...filterBy.labels] : []
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

            default: break
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    // Optional support for LAZY Filtering with a button
    function onSubmitFilter(ev) {
        ev.preventDefault()        
        onSetFilterBy(filterByToEdit)
    }

    function handleSelectedLabelsChange(ev) {
        // console.log(ev);
        const selectedValues = Array.from(ev.target.selectedOptions, option => option.value)
        const labelsToRemove = selectedValues.filter(selectedValue => selectedLabels.includes(selectedValue))
        const labelsToAdd = selectedValues.filter(selectedValue => !selectedLabels.includes(selectedValue))
        
        setSelectedLabels(prevSelectedLabels => {
            const newSelectedLabels = prevSelectedLabels.filter(label => !labelsToRemove.includes(label))
            return [...newSelectedLabels, ...labelsToAdd]
        })
    }

    return (
        <section className="toy-filter">
            <h2>Filter Toys</h2>
            <form onSubmit={onSubmitFilter}>
                <input value={filterByToEdit.name} onChange={handleChange}
                    type="search" placeholder="By Name" id="name" name="name"
                />
                <label htmlFor="price">Max Price: </label>
                <output id="maxPrice" name="maxPrice" for="price">{filterByToEdit.price}</output>
                <input value={filterByToEdit.price} onChange={handleChange}
                    type="range" max="200" min="0" placeholder="By Price" id="price" name="price"
                />
                <label htmlFor="inStock">In stock: </label>
                <select name="inStock" id="inStock" onChange={handleChange} value={filterByToEdit.inStock}>
                    <option value={"all"}>All</option>
                    <option value={"true"}>In stock</option>
                    <option value={"false"}>Not in stock</option>
                </select>
                <div className='selected-labels'>
                    <strong>Selected Labels:</strong>
                    <ul>
                        {selectedLabels && selectedLabels.map((value, index) => {
                            <li key={index}>{value}</li>
                        })}
                    </ul>
                    <select name="labels" id="labels" multiple
                        value={selectedLabels} onChange={handleSelectedLabelsChange}
                        className='multi-select-labels'>
                        {allLabels && allLabels.map((label, index) =>
                            <option key={index} value={label}>{label}</option>
                        )}
                    </select>
                </div>
                <button>Set Filter</button>
            </form>
        </section>
    )
}
