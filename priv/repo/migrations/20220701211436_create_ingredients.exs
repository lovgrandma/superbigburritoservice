defmodule Burritos.Repo.Migrations.CreateIngredients do
  use Ecto.Migration

  def change do
    create table(:ingredients) do
      add(:name, :string)
      add(:pounds, :float)
      add(:pricePerPound, :float) # Price added to value of product before sale
    end
  end
end
