defmodule BurritosWeb.Router do
  use BurritosWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, {BurritosWeb.LayoutView, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", BurritosWeb do
    pipe_through :api
    post "/index", PageController, :index
    post "/addingredient", PageController, :addIngredient
    post "/removeingredient", PageController, :removeIngredient
  end


  # Other scopes may use custom stacks.
  # scope "/api", BurritosWeb do
  #   pipe_through :api
  # end
end
