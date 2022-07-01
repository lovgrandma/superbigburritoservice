# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Burritos.Repo.insert!(%Burritos.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias Burritos.Repo
alias Burritos.Ingredient

Repo.delete_all(Ingredient)

%Ingredient{}
|> Ingredient.changeset(%{name: "Lettuce", pounds: 1000.00, pricePerPound: 00.02})
|> Repo.insert!()

%Ingredient{}
|> Ingredient.changeset(%{name: "Tortilla", pounds: 1000.00, pricePerPound: 00.50})
|> Repo.insert!()

%Ingredient{}
|> Ingredient.changeset(%{name: "Chorizo", pounds: 1000.00, pricePerPound: 00.80})
|> Repo.insert!()

%Ingredient{}
|> Ingredient.changeset(%{name: "Cheese", pounds: 1000.00, pricePerPound: 00.65})
|> Repo.insert!()

%Ingredient{}
|> Ingredient.changeset(%{name: "Chicken", pounds: 1000.00, pricePerPound: 01.00})
|> Repo.insert!()
