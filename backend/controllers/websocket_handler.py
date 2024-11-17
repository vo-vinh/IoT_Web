from typing import Dict, List
from fastapi import WebSocket, WebSocketDisconnect

class ConnectionManager:
    def __init__(self):
        # Dictionary to hold channel subscriptions
        self.channels: Dict[str, List[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, channel: str):
        await websocket.accept()
        if channel not in self.channels:
            self.channels[channel] = []
        self.channels[channel].append(websocket)

    def disconnect(self, websocket: WebSocket, channel: str):
        if channel in self.channels:
            self.channels[channel].remove(websocket)
            if not self.channels[channel]:  # Clean up empty channels
                del self.channels[channel]

    async def broadcast(self, message: dict, channel: str):
        print(f"Broadcasting to {channel}: {message}")
        if channel in self.channels:
            for connection in self.channels[channel]:
                try:
                    await connection.send_json(message)
                except Exception as e:
                    print(f"Error broadcasting to {channel}: {e}")
                    
manager = ConnectionManager()

