import { Chat } from "../cmps/Chat.jsx"
import { NicePopup } from "../cmps/NicePopup.jsx"
import { showErrorMsg } from "../services/event-bus.service.js"
import { toyService } from "../services/toy.service.js"
import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import defaultToyImg from '../assets/img/DefaultToy.webp'
export function ToyDetails() {


    const [toy, setToy] = useState(null)
    const [isChatAlive, setIsChatAlive] = useState(false)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadToy()
    }, [params.toyId])


    function loadToy() {
        toyService.get(params.toyId)
            .then(setToy)
            .catch(err => {
                console.error('err:', err)
                showErrorMsg('Cannot load toy')
                navigate('/toy')
            })
    }

    function onBack() {
        // If nothing to do here, better use a Link
        navigate('/toy')
        // navigate(-1)
    }


    function onToggleChat() {
        setIsChatAlive(!isChatAlive)
    }

    function onCloseChat() {

        setIsChatAlive(false)
    }

    if (!toy) return <div>Loading...</div>
    console.log(toy.imgUrl);
    console.log('toy:', toy);

    const inStockClass = toy.inStock ? 'inStock' : 'notInStock'
    return (
        <section className="toy-details">
            {/* <img onError={(event) => console.log(event)
            } src={getImgUrl(toy.imgUrl)} alt="toy img" /> */}
            <img src={defaultToyImg} alt={defaultToyImg} />

            <div>
                <h1>{toy.name}</h1>
                <h2>Price: {toy.price}</h2>
                {/* <div>
                    <Link to={`/toy/${toy.nextToyId}`}>Next Toy</Link> |
                    <Link to={`/toy/${toy.prevToyId}`}>Previous Toy</Link>
                </div> */}
                <ul className="toy-labels"  >
                    {toy.labels && toy.labels.map(toyLabel =>
                        <li>
                            {toyLabel}

                        </li>
                    )}
                </ul>
                <h2 className={inStockClass}>{toy.inStock ? 'In Stock!' : 'Oops currently is missing'}</h2>
            </div>

            <button onClick={onToggleChat}>{isChatAlive ? 'Close' : 'Start'} chat</button>
            {isChatAlive && <NicePopup onClosePopup={onCloseChat}>
                <Chat />
            </NicePopup>}
        </section>
    )
}