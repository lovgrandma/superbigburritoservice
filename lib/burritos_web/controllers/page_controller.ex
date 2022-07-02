import Ecto.Query, only: [from: 2]
alias Burritos.Repo
alias Burritos.Job
alias Burritos.Ingredient

defmodule BurritosWeb.PageController do
  use BurritosWeb, :controller

  def index(conn, _params) do
    json(conn, %{burritos: "muy bueno!", prompt: "Select \"Start Burrito\" to start building!"})
  end
  def addIngredient(conn, %{"ingredient" => ingredient, "socket" => socket}) do

    # pID = self()
    # spawn(fn ->
    #   ing = Repo.get_by!(Ingredient, name: ingredient)
    #   if ing.pounds > 0 do
    #     # Add ingredient to users burrito!
    #     Repo.insert(%Job{socket: socket, name: ingredient, pounds: ing.poundPerUnit, cost: ing.pricePerUnit, status: "processing" })
    #     :timer.sleep(500); # Getting the ingredients
    #     # BurritosWeb.RoomChannel.send_to_client(socket, ingredient, ing.poundPerUnit, ing.pricePerUnit) # Attempt at using events
    #   else
    #     # Advise user that we have no more of that ingredient
    #   end
    # end)
    ing = Repo.get_by!(Ingredient, name: ingredient)
    if ing.pounds > 0 do
      Repo.insert(%Job{socket: socket, name: ingredient, pounds: ing.poundPerUnit, cost: ing.pricePerUnit, status: "done" })
      newPounds = ing.pounds - ing.poundPerUnit
      ing
      |> Ecto.Changeset.change(%{pounds: newPounds})
      |> Repo.update()
      json(conn, %{status: "approved", time: :os.system_time(:millisecond), ingredient: %{name: ingredient, pounds: ing.poundPerUnit, cost: ing.pricePerUnit } })
    else
      json(conn, %{status: "out_of_stock", time: :os.system_time(:millisecond), ingredient: %{name: ingredient }})
    end
  end
  def removeIngredient(conn, %{"ingredient" => ingredient, "socket" => socket}) do
    ing = Repo.get_by!(Ingredient, name: ingredient)
    Repo.insert(%Job{socket: socket, name: ingredient, pounds: ing.poundPerUnit, cost: ing.pricePerUnit, status: "done" })
    newPounds = ing.pounds + ing.poundPerUnit
    ing
    |> Ecto.Changeset.change(%{pounds: newPounds})
    |> Repo.update()
    json(conn, %{status: "approved", time: :os.system_time(:millisecond), ingredient: %{name: ingredient, pounds: ing.poundPerUnit, cost: ing.pricePerUnit } })
  end
end
