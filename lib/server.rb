# require 'faye/websocket'
#
# App = lambda do |env|
#   if Faye::WebSocket.websocket?(env)
#     sock = Faye::WebSocket.new(env)
#
#     sock.on :message do |event|
#       puts 'received message: '
#       puts event
#       sock.send(event.data)
#     end
#
#     sock.on :close do |event|
#       # increment user count
#       # add user reference to array
#       puts 'connection colsed'
#     end
#   end
# end
#

require 'em-websocket'

puts 'starting server'
EM.run {
  EM::WebSocket.run(:host => "0.0.0.0", :port => 8080) do |ws|
    ws.onopen { |handshake|
      puts "WebSocket connection open"

      # Access properties on the EM::WebSocket::Handshake object, e.g.
      # path, query_string, origin, headers

      # Publish message to the client
      ws.send "Hello Client, you connected to #{handshake.path}"
    }

    ws.onclose { puts "Connection closed" }

    ws.onmessage { |msg|
      puts "Recieved message: #{msg}"
      ws.send "Pong: #{msg}"
    }
  end
}
