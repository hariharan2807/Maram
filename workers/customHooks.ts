import { useEffect, useRef, useState } from "react"
import { InteractionManager } from "react-native"

export function useIsScreenReady() {
    const [screenReady, setScreenReady] = useState(false)
    useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            setScreenReady(true)
        })
    }, [])
    return screenReady
}

export function useRenderCount(name: string) {
    let renderCount = useRef(1)
    // console.log(`${name} renders ${renderCount.current++} Times`)
    return 0
}

export function useAddToCartCheck() {
    // What modal need to show when increment clicked 
}
