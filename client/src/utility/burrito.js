import { fetchPost } from "./fetch";

export const addIngredient = async (socket, ingredient, currentBurrito) => {
    let d = await fetchPost("/addingredient", {
        socket: socket,
        ingredient: ingredient,
        currentBurrito: currentBurrito
    });
    if (!d) {
        return {
            status: "failed"
        }
    }
    return d;
}

export const removeIngredient = async (socket, ingredient, currentBurrito) => {
    let d = await fetchPost("/removeingredient", {
        socket: socket,
        ingredient: ingredient,
        currentBurrito: currentBurrito
    });
    if (!d) {
        return {
            status: "failed"
        }
    }
    return d;
}