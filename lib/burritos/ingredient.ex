defmodule Burritos.Ingredient do
  use Ecto.Schema

  schema "ingredients" do
    field(:name, :string)
    field(:pounds, :float)
    field(:pricePerPound, :float) # Price added to value of product before sale
  end

  def changeset(ingredient, params \\ %{}) do
    ingredient
    |> Ecto.Changeset.cast(params, [:name, :pounds, :pricePerPound])
    |> Ecto.Changeset.validate_required([:name])
  end
end
