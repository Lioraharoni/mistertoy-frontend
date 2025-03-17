import { useNavigate } from "react-router-dom";

export function ToyPreview({ toy, onRemoveToy, onDisplayToy }) {

    const navigate = useNavigate()

    function onEditToy(toyId, ev) {
        ev.stopPropagation()

        navigate(`edit/${toyId}`)
    }

    return (
        <article className="toy-preview" onClick={() => onDisplayToy(toy._id)}>
            <h2 className={(toy.inStock) ? 'done' : ''} >
                Toy: {toy.name}
            </h2>
            <h4>Toy price: {toy.price}$</h4>
            <img src={toy.imgUrl} alt="" />

            <section>
                <button className="btn" onClick={(ev) => onRemoveToy(toy._id, ev)}>Remove</button>
                <button className="btn" onClick={ev => onEditToy(toy._id, ev)}>Edit</button>
            </section>
        </article>
    )
}
