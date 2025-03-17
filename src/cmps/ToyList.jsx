import { ToyPreview } from "./ToyPreview.jsx"
import { Link } from 'react-router-dom'

export function ToyList({ toys, onRemoveToy, onDisplayToy }) {

    return (
        <ul className="toy-list"  >
            {toys.map(toy =>
                <li key={toy._id} >
                    <ToyPreview toy={toy} onRemoveToy={onRemoveToy} onDisplayToy={onDisplayToy} />

                </li>
            )}
        </ul>
    )
}


