export function ToyLabels({ toyLabels, onRemoveLabel }) {

    function onLabelClick(toyLabel, ev) {
        console.log('onLabelClick', toyLabel, ev.target);

        if (onRemoveLabel) {
            onRemoveLabel(toyLabel)
        }
    }

    return (
        <ul className="toy-labels"  >
            {toyLabels && toyLabels.map(toyLabel =>
                <li key={toyLabel} onClick={(ev) => onLabelClick(toyLabel, ev)}>
                    {toyLabel}
                    {/* {onRemoveLabel && <button onClick={() => onRemoveLabel(toyLabel)}>x</button>} */}
                </li>
            )}
        </ul>
    )
}