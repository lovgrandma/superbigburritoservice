import React, { useState } from 'react';
import './BurritoBuilder.css';
import BurritoStacker from './BurritoStacker.js';
import Checkout from '../Ecommerce/Checkout.js';
import { addIngredient } from '../../utility/burrito.js';
import { BAD_STATES } from '../../utility/flags.js';

const BurritoBuilder = props => {

    const [currentSelectedItem, setCurrentSelectedItem] = useState("Lettuce");
    const [inc, setInc] = useState(0);

    const changeCurrentItem = (e) => {
        if (e && e.target && e.target.value) {
            setCurrentSelectedItem(e.target.value);
        }
    }

    const addIngredientToBurrito = async (e) => {
        props.setBusy(true);
        props.setError(null);
        let d = await addIngredient(props.socketRef.leadRoom, currentSelectedItem, props.burrito);
        if (d) {
            if (BAD_STATES.indexOf(d.status) > -1 || !d.ingredient) {
                props.setError("Issue starting Burrito. Please contact us at 000-000-0000");
            } else {
                let tempBurrito = props.burrito;
                tempBurrito.burrito.unshift(d.ingredient);
                props.setBurrito(tempBurrito);
                setInc(inc + 1);
            }
            props.setBusy(false);
        }
    }

    React.useEffect(() => {
        if (props.burrito && props.burrito.burrito && props.burrito.burrito.length == 0) {
            props.setBurrito(null);
            props.setMessage("muy bueno!")
            props.setPrompt("Select \"Start Burrito\" to start building!");
        }
    }, [props.burrito, inc])

    return (
        <div className={`burritoContainer`}>
            <div className={`burritoTitle`} style={{ margin: 0 + " auto", textAlign: "center" }}>Burrito Builder</div>
            <Checkout></Checkout>
            <BurritoStacker burrito={props.burrito} setBurrito={props.setBurrito} inc={inc} setInc={setInc} socketRef={props.socketRef} setError={props.setError} setBusy={props.setBusy}></BurritoStacker>
            {
                props.burrito ?
                <div>
                    <div className={`addItemContainer`}>
                        <div>
                            <label for="ingredient" style={{ fontWeight: 600, paddingRight: .25 + "rem" }}>Add an ingredient:</label>
                            <select id="ingredient" name="ingredient" onChange={(e) => changeCurrentItem(e)}>
                                <option value="Lettuce">Lettuce</option>
                                <option value="Chorizo">Chorizo</option>
                                <option value="Cheese">Cheese</option>
                                <option value="Chicken">Chicken</option>
                                <option value="Sour Cream">Sour Cream</option>
                            </select>
                        </div>
                        <button className={`button`} onClick={(e) => addIngredientToBurrito(e)}>Add Ingredient</button>
                    </div>
                    <Checkout burrito={props.burrito && props.burrito.burrito ? props.burrito.burrito : null} inc={inc}></Checkout>
                </div>
                : null
            }
            {
                props.error ?
                    <div>{props.error}</div>
                    : null
            }
        </div>
    )
}

export default BurritoBuilder;