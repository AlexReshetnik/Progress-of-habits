
import { useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
function ContextMenu() {
    const dispatch = useDispatch()
    const strictMode = useSelector(state => state.strictMode.mode)
    const mode = useSelector(state => state.animProgressOfHabits.mode)
    let [stateManu, setStateManu] = useState({ isOpen: false, x: 0, y: 0 })
    let [isTarget, setIsTarget] = useState({ is: false, target: null })
    let [color, setColor] = useState("#000000")
    let [showColorPanel, setShowColorPanel] = useState(false)


    function onContextMenuHandler(e) {
        if (mode == "SHOW") {
            e.preventDefault()
            setStateManu({ isOpen: true, x: e.clientX, y: e.clientY })

            if (e.target.parentNode.className == "TitleСontainer") {
                setIsTarget({ is: true, target: e.target.innerText })
            } else {
                setIsTarget({ is: false, target: null })
            }
        }
    }

    function onClickHandler(e) {
        if (showColorPanel && !e.composedPath().find((i) => i.className?.includes("HexColorPicker"))) {
            console.log("setShowColorPanel");
            setShowColorPanel(false)
        }

        setStateManu((prev) => prev.isOpen ? { ...prev, isOpen: false } : prev)
    }

    function strictModeClick(e) {
        if (strictMode === "strictModeTRUE") {
            dispatch({ type: "strictModeFALSE" })
        } else {
            dispatch({ type: "strictModeTRUE" })
        }
    }

    function onDeleteHandler(e) {
        dispatch({ type: "DELETEHABIT", target: isTarget.target })
    }

    function onChangeColorHandler(e) {
        setShowColorPanel(true)
        e.stopPropagation()
    }

    function onCreateHandler(e) {
        let name = prompt("Enter name habit : ")
        if (name) dispatch({ type: "CREATEHABIT", name, color: "#000000" })
    }
    useEffect(() => {
        dispatch({ type: "CHANGECOLOR", target: isTarget.target, newColor: color })
    }, [color])

    useEffect(() => {
        document.addEventListener('contextmenu', onContextMenuHandler)
        document.addEventListener('click', onClickHandler)
        return () => {
            document.removeEventListener('contextmenu', onContextMenuHandler)
            document.removeEventListener('click', onClickHandler)
        }
    })

    return (
        <>

            {showColorPanel ?
                <HexColorPicker
                    className='HexColorPicker'
                    color={color}
                    onChange={setColor}
                    style={{ top: stateManu.y, left: stateManu.x }} />
                : undefined
            }

            {
                stateManu.isOpen ?
                    (<div className='ContextMenu' style={{ top: stateManu.y, left: stateManu.x }}>

                        <button onClick={onCreateHandler}>Create new habit

                        </button>

                        {isTarget.is ? (
                            <button onClick={onDeleteHandler}>Delete habit</button>
                        ) : undefined}

                        {isTarget.is ? (
                            <button onClick={onChangeColorHandler}>Change color habit</button>
                        ) : undefined}

                        <button onClick={strictModeClick}>
                            {strictMode === "strictModeTRUE" ? "Exclude strict mode" : "Include strict mode"}
                        </button>

                    </div>)
                    :
                    null
            }
        </>
    );
}

export default ContextMenu;
