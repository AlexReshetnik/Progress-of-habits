import { memo, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import './style.scss';
function ScrollContainer({ children }) {
   
  
    let [boxWidth, setBoxWidth] = useState(0)
    let [timeID, setTimeID] = useState()
    const { height, width, marginLeft } = useSelector(state => state.view)
    let scrollContainerRef = useRef()
    let boxRef = useRef()
    let [isCanMove,setIsCanMove] = useState(false)
    let startPosition = useRef()
    
    function onMouseDownHandle(e) {
        setIsCanMove(true)

        startPosition.current=  startPosition.current ? 
        parseFloat(boxRef.style.right) + e.screenX : e.screenX
    }

    function onMoveHandler(e) {
        if (!isCanMove) return
      
        let maxRight = parseFloat(boxRef.style.width)
        let wi = parseFloat(getComputedStyle(scrollContainerRef.current).width)
        let startPositionC=startPosition.current
      
        if (30 > startPositionC - e.screenX
            && -maxRight + wi - 30 < startPositionC - e.screenX
        ) {
           
            let right = startPositionC - e.screenX
            right -= right % parseInt(width)
            boxRef.current.style.right = `${right}px`
        }
    }

    useEffect(() => {
        document.addEventListener('mousemove', onMoveHandler)
        return () => document.removeEventListener('mousemove', onMoveHandler)
    }, [isCanMove])


    function onResizeHandler() {
        
        scrollContainerRef.current.style.width = "50vw"

        clearInterval(timeID)
        setTimeID(setTimeout(() => {
            let wi = scrollContainerRef.current.offsetWidth
            setBoxWidth(prev => wi - wi % parseInt(width) + parseInt(width))
        }, 200));
    }

    useEffect(() => {
        window.addEventListener('resize', onResizeHandler)
        return () => window.removeEventListener('resize', onResizeHandler)
    })

    function onMouseUpHandle() {
        setIsCanMove(false)
    }

    useEffect(() => {
        onResizeHandler()
        boxRef.style=getComputedStyle(boxRef.current)
       
        document.addEventListener('mouseup', onMouseUpHandle)
        return () => document.removeEventListener('mouseup', onMouseUpHandle)
    }, [])

    
    return (
        <div className="ScrollContainer"
            ref={scrollContainerRef}
            onMouseDown={onMouseDownHandle}
            style={{ width: boxWidth > 0 ? boxWidth + "px" : undefined }}
        >
            <div className="box" ref={boxRef}>
                {children}
            </div>
        </div>
    );
}

export default ScrollContainer;
