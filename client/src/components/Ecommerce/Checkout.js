import React from 'react';
import { number } from 'sharp/lib/is';
import './Checkout.css';

const Checkout = props => {

    let total = React.useMemo(() => {
        let t = 0;
        if (props.burrito && props.burrito) {
            for (let i = 0; i < props.burrito.length; i++) {
                console.log(props.burrito[i]);
                t += props.burrito[i].cost;
            }
        }
        return t.toFixed(2);
    }, [props.burrito, props.inc]);

    return (
        <div className={`checkoutContainer`}>
            {
                props.burrito && props.burrito && props.burrito.map ?
                    props.burrito.map((item2, i) =>
                        <div style={{ display: "flex", justifyContent: "space-between", padding: 0 + "rem " + .75 + "rem" }}>
                            <div className={`checkoutItem`}>{item2.name}</div>
                            <div className={`checkoutItem`}>${item2.cost}</div>
                        </div>
                    )
                : null
            }
            {
                props.burrito ?
                    <div style={{ display: "flex", justifyContent: "space-between", padding: 0 + "rem " + .75 + "rem" }}>
                        <div className={`checkoutItem`}>Total:</div>
                        <div className={`checkoutItem`}>{total ? total : 0}</div>
                    </div>
                : null
            }
        </div>
    )
}

export default Checkout;