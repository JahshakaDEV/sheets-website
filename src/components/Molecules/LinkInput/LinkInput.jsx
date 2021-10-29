function LinkInput({
                       editMode,
                       className,
                       setValueInput,
                       valueInput,
                       validFunction,
                       validCheckerFunction,
                       invalidFunction,
                       invalidLink,
                       elementID
                   }) {

    return (
        <div className={editMode ? className.toString() : "hide " + className.toString()}>
            <input id={elementID} onChange={event => {
                setValueInput(event.target.value)
            }
            } type={"text"}/>
            <button onClick={event => {
                if (validCheckerFunction(valueInput)) {
                    validFunction();
                    setValueInput("");
                    document.getElementById(elementID).value = "";
                } else {
                    invalidFunction();
                }
            }}>Hinzufügen
            </button>
            <span style={invalidLink ? {} : {display: "none"}}>Invalide URL!</span>
        </div>)
}

export default LinkInput;