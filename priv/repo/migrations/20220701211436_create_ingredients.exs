defmodule Burritos.Repo.Migrations.CreateIngredients do
  use Ecto.Migration

  def change do
    create table(:ingredients) do
      add(:name, :string)
      add(:pounds, :float)
      add(:pricePerUnit, :float)
      add(:poundPerUnit, :float)
    end
  end
end
