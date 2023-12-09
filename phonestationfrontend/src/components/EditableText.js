import React, {useState} from "react";
import './EditableText.css';

const EditableText = ({onChange, initText, fieldName})=>{
    let [isEditing, setIsEditing] = useState(false);
    let [buttonText, setButtonText] = useState("Edit");
    let [newText, setNewText] = useState(initText)
    let [text, setText] = useState(initText);

    let editText = "Edit";
    let saveText = "Save";

    let onTextChangeCallback = (event) =>{
        setNewText(event.target.value.toString());
    }

    let onClickCallback = () =>{
        if(isEditing)
        {
            let res = onChange(newText);
            if(res)
                setText(newText);

            setIsEditing(false);
            setButtonText(editText)
            return;
        }

        setIsEditing(true);
        setButtonText(saveText)
    }

    return (
        <div className={"input-group mb-3 justify-content-center"}>
            <span className={"input-group-text shadow-sm"}>{fieldName}</span>
            {
                isEditing? (
                    <input
                        className={"form-control editableText shadow-sm"}
                        type="text"
                        placeholder={text}
                        onChange={onTextChangeCallback}
                        disabled={!isEditing}/>
                ) : (
                    <span className={"input-group-text shadow-sm"}>{text}</span>
                )
            }

            <button type="button"
                    className="btn btn-primary shadow-sm"
                    onClick={onClickCallback}>
                {buttonText}
            </button>

        </div>
    )
}

export default EditableText;