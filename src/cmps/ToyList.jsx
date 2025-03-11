import { ToyPreview } from "./ToyPreview.jsx"
import { Link } from 'react-router-dom'

export function ToyList({ toys, onRemoveToy }) {

    return (
        <ul className="toy-list"  >
            {toys.map(toy =>
                // <li key={toy._id} style= {{backgroundColor: toy.color}}>
                <li key={toy._id} >
                    {/* <li key={toy._id}> */}
                    <ToyPreview toy={toy} onRemoveToy={onRemoveToy}/>

                </li>
            )}
        </ul>
    )
}


