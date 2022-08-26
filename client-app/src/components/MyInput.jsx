export default function MyInput({ type, name, value, handleChange, labelText }) {
    return (
        <div className="form-row">
            <label 
                htmlFor={name} 
                className="form-label"
            >
                {labelText || name}
            </label>
            <input 
                type={type} 
                name={name} 
                value={value} 
                onChange={handleChange} 
                className="form-input" 
            />
        </div>
    )
}