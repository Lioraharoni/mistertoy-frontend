export function ToyPreview({ toy, onRemoveToy }) {
    return (
        <article className="toy-preview">
            <h2 className={(toy.inStock) ? 'done' : ''} >
                Toy: {toy.name}
            </h2>
            <h4>Toy price: {toy.price}$</h4>
            <img src={toy.imgUrl} alt="" />

            <section>
                <button className="btn" onClick={() => onRemoveToy(toy._id)}>Remove</button>
                {/* <button><Link to={`/toy/${toy._id}`}>Details</Link></button>
                        <button><Link to={`/toy/edit/${toy._id}`}>Edit</Link></button> */}
            </section>
        </article>
    )
}
