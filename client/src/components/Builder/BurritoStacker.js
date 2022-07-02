import './BurritoBuilder.css';
import ItemRender from './ItemRender.js';

const BurritoStacker = props => {

    return (
        <div>
            {
                props.burrito && props.burrito.burrito && props.burrito.burrito.map ?
                    props.burrito.burrito.map((item, i) => 
                        <div key={i}>
                            <ItemRender
                            item={item}
                            socketRef={props.socketRef}
                            burrito={props.burrito} 
                            setBurrito={props.setBurrito} 
                            inc={props.inc} 
                            setInc={props.setInc}
                            setError={props.setError} 
                            setBusy={props.setBusy}
                            ></ItemRender>
                        </div>
                    ) 
                    : null
            }
        </div>
    )
}

export default BurritoStacker;