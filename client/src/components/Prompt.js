import '../general.css';

const Prompt = props => {
    return <div>
        <div className={`welcome`} onClick={(e) => {props.doAddIngredient("tortilla")}}>Burritos. {props.message}</div>
        {
            props.prompt ?
                <div className={`promptText`}>{props.prompt}</div>
                : null
        }
    </div>;      
}

export default Prompt;