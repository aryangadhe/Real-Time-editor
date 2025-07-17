import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/Card";
import { cn } from "../lib/utils";
import { Separator } from "../components/Seperator";
const RoomSelection = () => {
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const handleJoinRoom = (e) => {
    e.preventDefault();
    if (roomId.trim()) {
      navigate(`/editor/${roomId}`);
    }
  };

  const handleCreateRoom = () => {
    const newRoomId = Math.random().toString(36).substring(2, 15);
    navigate(`/editor/${newRoomId}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Join a Room</CardTitle>
          <CardDescription>
            Create a new room or join an existing one
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <button onClick={handleCreateRoom} className="w-full bg-black text-white rounded-xl h-10">
              Create New Room
            </button>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
                <Separator/>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-background px-2 text-muted-foreground">
                Or join existing
                
              </span>
            </div>
          </div>

          <form onSubmit={handleJoinRoom} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="roomId">Room ID</label>
              <input className={cn(
                                    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",            
                                )}
                id="roomId"
                type="text"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                placeholder="Enter room ID"
                required
              />
            </div>
            <button type="submit" variant="outline" className="w-full bg-white text-black border-1 border-slate-500 rounded-xl h-10">
              Join Room
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoomSelection;