defmodule BurritosWeb.RoomChannel do
  use Phoenix.Channel
  # use BurritosWeb, :channel

  def send_to_client(socket, ingredient, pound, price) do
    IO.puts socket
    IO.puts ingredient
    # broadcast("room:lobby", "new_msg", %{ingredient: ingredient, pound: pound, price: price})
    # {:noreply, socket}
    r = "room:" <> Kernel.inspect(socket)
    broadcast(r, "new_msg", %{uid: ingredient, body: price})
    {:noreply, socket}
  end

  @impl true
  def join("room:" <> id, _payload, %{assigns: %{id: id }} = socket) do
    IO.puts "Joined! *"
    {:ok, socket}
  end

  @impl true
  def join("room:lobby", _payload, socket) do
    IO.puts "Joined! *"
    {:ok, socket}
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  @impl true
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (room:lobby).
  @impl true
  def handle_in("shout", payload, socket) do
    broadcast(socket, "shout", payload)
    {:noreply, socket}
  end
end
