import { useEffect, useState } from 'react';
import './style.scss';
function ScrollContainer({ view, children }) {
    let [box, setBox] = useState(false)
    let [boxStyle, setBoxStyle] = useState(false)
    let [isCanMove, setCanMove] = useState(false)
    let [startPosition, setStartPosition] = useState()
    let [boxWidth, setBoxWidth] = useState(0)
    let [timeID, setTimeID] = useState()

    function onMouseDownHandle(e) {
        setCanMove(true)

        setStartPosition((prev) => prev ? parseFloat(boxStyle.right) + e.screenX : e.screenX)
    }

    function onMoveHandler(e) {
        if (!isCanMove) return

        let maxRight = parseFloat(boxStyle.width)
        let wi = parseFloat(getComputedStyle(document.querySelector(".ScrollContainer")).width)

        if (30 > startPosition - e.screenX
            && -maxRight + wi - 30 < startPosition - e.screenX
        ) {
            let right = startPosition - e.screenX
            right -= right % parseInt(view.width)
            box.style.right = `${right}px`
        }
    }

    function onResizeHandler() { 
        document.querySelector(".ScrollContainer").style.width = "50vw" 

        clearInterval(timeID)
        setTimeID(setTimeout(() => {
            let wi = document.querySelector(".ScrollContainer").offsetWidth
            setBoxWidth(prev => wi - wi % parseInt(view.width)+parseInt(view.width))
        }, 200));
    }

    useEffect(() => {
        document.addEventListener('mousemove', onMoveHandler)
        return () => document.removeEventListener('mousemove', onMoveHandler)
    }, [isCanMove])

    useEffect(() => {
        onResizeHandler()
        setBox(document.querySelector(".box"))
        setBoxStyle(getComputedStyle(document.querySelector(".box")))

        document.addEventListener('mouseup', (e) => {
            setCanMove(false)
        })
    }, [])

    useEffect(() => {
        window.addEventListener('resize', onResizeHandler)
        return () => window.removeEventListener('resize', onResizeHandler)
    })
    return (
        <div className="ScrollContainer"
            onMouseDown={onMouseDownHandle}

            style={{
                width: boxWidth > 0 ? boxWidth + "px" : undefined
            }}
        >
            <div className="box"

            >
                {children}
            </div>



        </div>

    );
}

export default ScrollContainer;
