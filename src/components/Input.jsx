import { useEffect, useState } from "react"

const Input = ({ iconName, type, placeholder, value="", minValue, maxValue, fname, readOnly = false, required = false, disabled = false, children, classname = "", inputClassname = "" }) => {
    const [val, setValue] = useState(value)
    //change handeler
    const onChangeHandeler = (value) => {
  
        setValue(value);
    }

    //using for sending data to parent when changehandeler encountered
    useEffect(() => {
        fname(val)
    }, [onChangeHandeler])


    return (
        <section className={`flex ${classname}`}>
            <div className={`flex border-2 rounded-md  align-middle box-border mb-3 w-full focus-within:border-green-700 transition-all `}>
                <label className=" border-r-2 flex justify-center rounded-l-md w-12 font-seri bg-gray-100 text-justify"> <i className={` text-green-700 p-2 text-lg ${iconName}`} /> </label>
                <input className={` ${inputClassname}resize-x  pl-2 w-full  outline-none font-mono text-lg rounded-r-md  focus-within:border-b-blue-700 transition-all`} type={type} value={val} placeholder={placeholder} min={minValue} max={maxValue} onChange={(e) => onChangeHandeler(e.target.value)} readOnly={readOnly} required={required} disabled={disabled}>
                    {children}
                </input>
            </div >
            {(required) ? <span className="text-red-500 text-2xl font-medium">*</span> : null}</section>
    )
}

export default Input