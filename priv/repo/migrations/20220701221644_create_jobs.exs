defmodule Burritos.Repo.Migrations.CreateJobs do
  use Ecto.Migration

  def change do
    create table(:jobs) do
      add(:socket, :integer)
      add(:name, :string)
      add(:pounds, :float)
      add(:cost, :float) # Cost to customer for ingredient
      add(:status, :string)
    end
  end
end
