defmodule Burritos.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      # Start the Ecto repository
      Burritos.Repo,
      # Start the Telemetry supervisor
      BurritosWeb.Telemetry,
      # Start the PubSub system
      {Phoenix.PubSub, name: Burritos.PubSub},
      # Start the Endpoint (http/https)
      BurritosWeb.Endpoint,
      # Start a worker by calling: Burritos.Worker.start_link(arg)
      # {Burritos.Worker, arg}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Burritos.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    BurritosWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
