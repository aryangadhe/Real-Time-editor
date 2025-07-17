import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../components/Card";
import { Badge } from "../components/Badge";
import { Copy, Users } from "lucide-react";
import { Textarea } from "../components/Textarea";
import { io } from "socket.io-client";
import toast, { Toaster } from "react-hot-toast";

const socket = io("http://localhost:5000");

const CodeEditor = () => {
  const { roomId } = useParams();
  const [code, setCode] = useState(`// Welcome to CodeDuo - Room ${roomId}

// Start coding together!

function helloWorld() {
  console.log("Hello, collaborative coding!");
}

helloWorld();`);

  const [users, setUsers] = useState([{ id: "local", name: "You" }]);

  useEffect(() => {
    socket.emit("join-room", { roomId, username: "You" });

    socket.on("code-update", (newCode) => {
      setCode(newCode);
    });

    socket.on("code-sync", (existingCode) => {
      setCode(existingCode);
    });

    socket.on("user-list", (users) => {
      setUsers(users);
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId]);

  const handleChange = (e) => {
    const updatedCode = e.target.value;
    setCode(updatedCode);
    socket.emit("code-change", { roomId, code: updatedCode });
  };

  const copyRoomId = () => {
    if (roomId) {
      navigator.clipboard.writeText(roomId);
      toast.success("Room ID copied to clipboard!");
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <Toaster />
      {/* Header */}
      <header className="border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <h1 className="text-xl font-semibold">CodeDuo</h1>
            </div>
            <Badge variant="outline" className="flex items-center gap-2">
              Room: {roomId}
              <button onClick={copyRoomId} className="hover:bg-accent rounded p-1">
                <Copy className="w-3 h-3" />
              </button>
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-amber-100" variant="secondary">
              {users.length} connected
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Code Editor */}
        <div className="flex-1 p-4">
          <Card className="h-full">
            <div className="h-full p-4">
              <Textarea
                value={code}
                onChange={handleChange}
                placeholder="Start typing your code here..."
                className="h-full resize-none font-mono text-sm border-none p-0 focus-visible:ring-0"
                style={{ minHeight: "calc(100vh - 200px)" }}
              />
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="w-80 border-l border-border p-4">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Connected Users</h3>
              <div className="space-y-2">
                {users.map((user, index) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-2 p-2 rounded-md bg-amber-100"
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        index === 0 ? "bg-green-500" : "bg-blue-500"
                      }`}
                    ></div>
                    <span className="text-sm">{user.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;