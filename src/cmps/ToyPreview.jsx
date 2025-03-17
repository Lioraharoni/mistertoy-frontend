export function ToyPreview({ toy, onRemoveToy, onDisplayToy }) {
    return (
        <article className="toy-preview" onClick={() => onDisplayToy(toy._id)}>
            <h2 className={(toy.inStock) ? 'done' : ''} >
                Toy: {toy.name}
            </h2>
            <h4>Toy price: {toy.price}$</h4>
            <img src={toy.imgUrl} alt="" />

            <section>
                <button className="btn" onClick={(ev) => onRemoveToy(toy._id, ev)}>Remove</button>
                {/* <button><Link to={`/toy/${toy._id}`}>Details</Link></button>
                        <button><Link to={`/toy/edit/${toy._id}`}>Edit</Link></button> */}
            </section>
        </article>
    )
}
