defmodule Burritos.Job do
  use Ecto.Schema

  schema "jobs" do
    field(:socket, :integer)
    field(:name, :string)
    field(:pounds, :float)
    field(:cost, :float) # Cost to customer for ingredient
    field(:status, :string)
  end

  def changeset(job, params \\ %{}) do
    job
    |> Ecto.Changeset.cast(params, [:socket, :name, :pounds, :cost, :status])
    |> Ecto.Changeset.validate_required([:name])
  end
end
