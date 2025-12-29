type Props = Record<string,any>
type State = Record<string,any>

abstract class Component<P extends Props = {} , S extends State = {}> {
    props: Readonly<P>
    state: Readonly<S>
    root:HTMLElement;
    constructor(props:P){
        this.props = Object.freeze(props)
        const initialState = this.getInitialState(props)
        this.state = Object.freeze(initialState as S)
        this.root = this.render()
    }

    // lifecycle methods
    on_init():void{}
    on_mount():void{}
    on_unmount():void{}
    on_update(_prev_state:S):void{}  

    // Override this method to provide initial state
    getInitialState(_props: P): Partial<S> {
        return {} as Partial<S>
    }

    abstract render():HTMLElement
    set_state(partial:Partial<S>){
        const prev = this.state as S
        this.state = Object.freeze({...prev ,...partial} as S)
        this.on_update(prev)
        const new_root = this.render()
        this.root.replaceWith(new_root)
        this.root = new_root
    }

}

function mount(component :Component , container : HTMLElement){
    container.appendChild(component.root)
    component.on_mount()
    return ()=>{
        component.on_unmount()
        container.removeChild(component.root)
    }
}

export{Component,mount}