export default function MySelect({ name, value, handleChange, list, labelText }) {
    return (
        <div className="form-row">
            <label htmlFor={name} className="form-label">
                {labelText || name}
            </label>
            <select 
                name={name}
                id={name}
                value={value}
                onChange={handleChange}
                className="form-select"
            >
                {list.map((option, i) => {
                    return (
                        <option
                            key={i}
                            value={option}
                        >
                            {option}
                        </option>
                    )
                })}
            </select>
        </div>
    )
}