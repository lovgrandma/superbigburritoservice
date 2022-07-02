defmodule Burritos.Ingredient do
  use Ecto.Schema

  schema "ingredients" do
    field(:name, :string)
    field(:pounds, :float)
    field(:pricePerUnit, :float) # Price added to value of product before sale
    field(:poundPerUnit, :float) # Price per pound of ingredient
  end

  def changeset(ingredient, params \\ %{}) do
    ingredient
    |> Ecto.Changeset.cast(params, [:name, :pounds, :pricePerUnit, :poundPerUnit])
    |> Ecto.Changeset.validate_required([:name])
  end
end
