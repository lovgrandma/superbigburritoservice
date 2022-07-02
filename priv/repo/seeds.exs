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
|> Ingredient.changeset(%{ name: "Lettuce", pounds: 1000.00, pricePerUnit: 0.10, poundPerUnit: 0.10 })
|> Repo.insert!()

%Ingredient{}
|> Ingredient.changeset(%{ name: "Tortilla", pounds: 2000.00, pricePerUnit: 0.50, poundPerUnit: 0.50 })
|> Repo.insert!()

%Ingredient{}
|> Ingredient.changeset(%{ name: "Chorizo", pounds: 750.00, pricePerUnit: 0.80, poundPerUnit: 1.00 })
|> Repo.insert!()

%Ingredient{}
|> Ingredient.changeset(%{ name: "Cheese", pounds: 500.00, pricePerUnit: 0.65, poundPerUnit: 0.50 })
|> Repo.insert!()

%Ingredient{}
|> Ingredient.changeset(%{ name: "Chicken", pounds: 750.00, pricePerUnit: 1.00, poundPerUnit: 1.25 })
|> Repo.insert!()

%Ingredient{}
|> Ingredient.changeset(%{ name: "Sour Cream", pounds: 500.00, pricePerUnit: 0.02, poundPerUnit: 0.25 })
|> Repo.insert!()
