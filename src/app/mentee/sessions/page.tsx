"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Star, Video, MessageCircle } from "lucide-react";

const SessionsPage = () => {
  const [sessionFilter, setSessionFilter] = useState("all");
  const router = useRouter();

  const allSessions = [
    {
      id: 1,
      mentor: "Sarah Chen",
      topic: "Product Strategy Deep Dive",
      date: "2024-06-15",
      time: "2:00 PM",
      duration: "45 min",
      status: "upcoming",
      type: "video",
      avatar: "👩‍💼",
      price: "$85",
    },
    {
      id: 2,
      mentor: "Marcus Rodriguez",
      topic: "Career Growth Planning",
      date: "2024-06-16",
      time: "10:00 AM",
      duration: "60 min",
      status: "upcoming",
      type: "call",
      avatar: "👨‍💻",
      price: "$70",
    },
    {
      id: 3,
      mentor: "Dr. Emily Watson",
      topic: "Machine Learning Fundamentals",
      date: "2024-06-10",
      time: "3:00 PM",
      duration: "45 min",
      status: "completed",
      type: "video",
      avatar: "👩‍🔬",
      price: "$85",
      rating: 5,
    },
    {
      id: 4,
      mentor: "Alex Kim",
      topic: "React Best Practices",
      date: "2024-06-08",
      time: "11:00 AM",
      duration: "60 min",
      status: "completed",
      type: "video",
      avatar: "👨‍🎨",
      price: "$70",
      rating: 4,
    },
    {
      id: 5,
      mentor: "Priya Sharma",
      topic: "Product Roadmap Planning",
      date: "2024-06-05",
      time: "4:00 PM",
      duration: "45 min",
      status: "cancelled",
      type: "call",
      avatar: "👩‍💼",
      price: "$90",
    },
    {
      id: 6,
      mentor: "David Park",
      topic: "System Design Interview Prep",
      date: "2024-06-03",
      time: "2:30 PM",
      duration: "90 min",
      status: "completed",
      type: "video",
      avatar: "👨‍💼",
      price: "$100",
      rating: 5,
    },
  ];

  const filteredSessions =
    sessionFilter === "all"
      ? allSessions
      : allSessions.filter((session) => session.status === sessionFilter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">My Sessions</h1>
            <p className="text-gray-400 mt-1">Manage your mentoring sessions</p>
          </div>          <button
            onClick={() => router.push("/mentee/find-mentors")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Book New Session
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 space-y-6">
        {/* Session Stats */}
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <h3 className="text-gray-400 text-sm">Total Sessions</h3>
            <p className="text-2xl font-bold text-white">
              {allSessions.length}
            </p>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <h3 className="text-gray-400 text-sm">Upcoming</h3>
            <p className="text-2xl font-bold text-blue-400">
              {allSessions.filter((s) => s.status === "upcoming").length}
            </p>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <h3 className="text-gray-400 text-sm">Completed</h3>
            <p className="text-2xl font-bold text-green-400">
              {allSessions.filter((s) => s.status === "completed").length}
            </p>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <h3 className="text-gray-400 text-sm">This Month</h3>
            <p className="text-2xl font-bold text-purple-400">4</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg w-fit">
          {["all", "upcoming", "completed", "cancelled"].map((filter) => (
            <button
              key={filter}
              onClick={() => setSessionFilter(filter)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize ${
                sessionFilter === filter
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {filter} (
              {filter === "all"
                ? allSessions.length
                : allSessions.filter((s) => s.status === filter).length}
              )
            </button>
          ))}
        </div>

        {/* Sessions List */}
        <div className="space-y-4">
          {filteredSessions.length > 0 ? (
            filteredSessions.map((session) => (
              <div
                key={session.id}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{session.avatar}</div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">
                        {session.mentor}
                      </h3>
                      <p className="text-gray-400">{session.topic}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <span>{session.date}</span>
                        <span>{session.time}</span>
                        <span>{session.duration}</span>
                        <span className="font-semibold text-green-400">
                          {session.price}
                        </span>
                        <div className="flex items-center space-x-1">
                          {session.type === "video" ? (
                            <Video size={14} />
                          ) : (
                            <MessageCircle size={14} />
                          )}
                          <span className="capitalize">{session.type}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        session.status
                      )}`}
                    >
                      {session.status}
                    </span>
                    {session.status === "upcoming" && (
                      <div className="flex space-x-2">
                        <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors">
                          Reschedule
                        </button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          Join Session
                        </button>
                      </div>
                    )}
                    {session.status === "completed" && (
                      <div className="flex items-center space-x-3">
                        {session.rating && (
                          <div className="flex items-center space-x-1">
                            <Star
                              className="fill-yellow-400 text-yellow-400"
                              size={16}
                            />
                            <span className="text-white font-medium">
                              {session.rating}
                            </span>
                          </div>
                        )}
                        <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors">
                          View Notes
                        </button>
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                          Rebook
                        </button>
                      </div>
                    )}
                    {session.status === "cancelled" && (
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Book Again
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-gray-800 rounded-xl p-12 border border-gray-700 text-center">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-white font-semibold text-lg mb-2">
                No {sessionFilter !== "all" ? sessionFilter : ""} sessions found
              </h3>
              <p className="text-gray-400 mb-6">
                {sessionFilter === "upcoming"
                  ? "You don't have any upcoming sessions. Book one to get started!"
                  : sessionFilter === "completed"
                  ? "You haven't completed any sessions yet."
                  : "Start your learning journey by booking your first session."}
              </p>
              <button                onClick={() => router.push("/mentee/find-mentors")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Find Mentors
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SessionsPage;
