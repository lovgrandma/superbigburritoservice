import './BurritoBuilder.css';
import { removeIngredient } from '../../utility/burrito';
import { BAD_STATES } from '../../utility/flags';

const ItemRender = props => {

    const resolveItem = (name) => {
        let dir = "/ingredients/";
        let type = ".png"
        switch (name) {
            case "Tortilla":
                return dir + "tortilla" + type;
            case "Lettuce":
                return dir + "lettuce" + type;
            case "Chorizo":
                return dir + "chorizo" + type;
            case "Cheese":
                return dir + "cheese" + type;
            case "Chicken":
                return dir + "chicken" + type;
            case "Sour Cream":
                return dir + "sour_cream" + type;
        }
    }

    const handleRemoveItemClick = async (e) => {
        if (props.item.name) {
            props.setBusy(true);
            props.setError(null);
            let d = await removeIngredient(props.socketRef.leadRoom, props.item.name, props.burrito);
            if (d) {
                if (BAD_STATES.indexOf(d.status) > -1 || !d.ingredient) {
                    props.setError("Issue starting Burrito. Please contact us at 000-000-0000");
                } else {
                    let tempBurrito = props.burrito;
                    let f = tempBurrito.burrito.findIndex(item => item.name == props.item.name);
                    tempBurrito.burrito.splice(f, 1);
                    props.setBurrito(tempBurrito);
                    props.setInc(props.inc + 1);
                }
                props.setBusy(false);
            }
        }
    }

    return (
        <div className={`center`}>
            <img className={`ingredientImg`} src={process.env.PUBLIC_URL + resolveItem(props.item.name)} item={props.item.name} onClick={(e) => {handleRemoveItemClick(e)}}></img>
        </div>
    )
}

export default ItemRender;