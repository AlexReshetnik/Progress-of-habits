import { memo, useMemo } from "react"
import { useSelector } from "react-redux";



function ResultItem({ item }) {
    const { height } = useSelector(state => state.view)
    let calc = useMemo(() => {

        let startDay = new Date(item.id).setHours(0, 0, 0, 0)
        let last = new Date(Date.now()).setHours(0, 0, 0, 0)
        let daysCount = (last - startDay) / (1000 * 60 * 60 * 24)
        let count = 0

        for (const day of item.progres.sort((a, b) => b - a)) {
            if (last - day > 86400000) break
            else count++

            last = day
        }
       
        return [count, Math.round(daysCount)+1]
    }, [item.progres.length])
    let [count, all] = calc
    return (
        <div style={{ height: height, color: item.color }}>
            {count}
            <span>{"/" + all}</span>
        </div>

    );
}

export default memo(ResultItem, (prev, next) => {
    return prev.item === next.item
});
