export function ToyLabels({ toy, onRemoveLabel }) {

    function onLabelClick(toyLabel, ev) {
        console.log('onLabelClick', toyLabel, ev.target);

        if (onRemoveLabel) {
            onRemoveLabel(toyLabel)
        }
    }

    return (
        <ul className="toy-labels"  >
            {toy.labels && toy.labels.map(toyLabel =>
                <li key={toyLabel} onClick={(ev) => onLabelClick(toyLabel, ev)}>
                    {toyLabel}
                </li>
            )}
        </ul>
    )
}