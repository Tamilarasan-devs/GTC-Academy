import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../../utils/api";
import { PlayCircle, CheckCircle2, FileText, Download, ChevronLeft, List, X } from "lucide-react";

export default function CoursePlayer() {
  const { courseId } = useParams();
  const [enrollment, setEnrollment] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [activeChapter, setActiveChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get(`/student/my-courses/${courseId}`);
        setEnrollment(res.data.enrollment);
        setChapters(res.data.chapters);

        // Resume from last watched or start from first
        const lastWatched = res.data.enrollment.progress?.lastWatchedChapter;
        const startChapter = lastWatched
          ? res.data.chapters.find((c) => c._id === lastWatched) || res.data.chapters[0]
          : res.data.chapters[0];
        setActiveChapter(startChapter);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [courseId]);

  // Resume position when chapter loads
  useEffect(() => {
    if (videoRef.current && activeChapter && enrollment) {
      const lastWatched = enrollment.progress?.lastWatchedChapter;
      const lastPosition = enrollment.progress?.lastWatchedPosition || 0;
      if (lastWatched === activeChapter._id && lastPosition > 0) {
        videoRef.current.currentTime = lastPosition;
      }
    }
  }, [activeChapter]);

  const handleTimeUpdate = () => {
    if (!videoRef.current || !activeChapter) return;
    const position = Math.floor(videoRef.current.currentTime);
    // Save every 10 seconds
    if (position > 0 && position % 10 === 0) {
      api.put(`/student/my-courses/${courseId}/progress`, {
        chapterId: activeChapter._id,
        position,
        completed: false,
      }).catch(() => {});
    }
  };

  const handleVideoEnd = async () => {
    if (!activeChapter) return;
    try {
      const res = await api.put(`/student/my-courses/${courseId}/progress`, {
        chapterId: activeChapter._id,
        position: 0,
        completed: true,
      });
      setEnrollment((prev) => ({
        ...prev,
        progress: res.data.progress,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const isCompleted = (chapterId) => enrollment?.progress?.completedChapters?.includes(chapterId);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!enrollment) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-slate-700">Course Not Found</h2>
        <Link to="/student/my-courses" className="text-blue-600 mt-4 inline-block">← Back to Courses</Link>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-80px)] -m-6 relative">
      {/* Chapter Sidebar Overlay (mobile) */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Chapter Sidebar */}
      <aside className={`fixed lg:relative top-0 left-0 h-full w-80 bg-white border-r border-slate-200 z-50 flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-slate-900">Course Content</h3>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden"><X size={20} /></button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {chapters.map((chapter, idx) => (
            <button
              key={chapter._id}
              onClick={() => { setActiveChapter(chapter); setSidebarOpen(false); }}
              className={`w-full text-left px-4 py-4 border-b border-slate-100 flex items-start gap-3 transition hover:bg-slate-50 ${activeChapter?._id === chapter._id ? "bg-blue-50 border-l-4 border-l-blue-600" : ""}`}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-sm font-bold mt-0.5 ${isCompleted(chapter._id) ? "bg-green-100 text-green-600" : "bg-slate-100 text-slate-500"}`}>
                {isCompleted(chapter._id) ? <CheckCircle2 size={16} /> : idx + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`font-medium text-sm truncate ${activeChapter?._id === chapter._id ? "text-blue-700" : "text-slate-800"}`}>
                  {chapter.title}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">{chapter.duration}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-slate-200">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-slate-500">Progress</span>
            <span className="font-bold text-slate-700">{enrollment.progress?.percentage || 0}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${enrollment.progress?.percentage || 0}%` }} />
          </div>
        </div>
      </aside>

      {/* Main Video Area */}
      <div className="flex-1 flex flex-col bg-slate-950">
        {/* Top bar */}
        <div className="bg-slate-900 px-4 py-3 flex items-center gap-4 border-b border-white/10">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-white"><List size={20} /></button>
          <Link to="/student/my-courses" className="text-slate-400 hover:text-white"><ChevronLeft size={20} /></Link>
          <h2 className="text-white font-medium text-sm truncate flex-1">{enrollment.courseId?.title}</h2>
        </div>

        {/* Video */}
        <div className="flex-1 flex items-center justify-center bg-black">
          {activeChapter?.videoUrl ? (
            <video
              ref={videoRef}
              key={activeChapter._id}
              src={`http://localhost:8080${activeChapter.videoUrl}`}
              controls
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleVideoEnd}
              className="w-full h-full object-contain"
              controlsList="nodownload"
              onContextMenu={(e) => e.preventDefault()}
            />
          ) : (
            <div className="text-center text-slate-400 p-8">
              <PlayCircle size={64} className="mx-auto mb-4 opacity-30" />
              <p className="text-lg">No video available for this chapter</p>
            </div>
          )}
        </div>

        {/* Chapter Info */}
        <div className="bg-slate-900 px-6 py-4 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-bold">{activeChapter?.title}</h3>
              <p className="text-slate-400 text-sm">{activeChapter?.duration}</p>
            </div>

            {activeChapter?.pdfNotes && (
              <a
                href={`http://localhost:8080${activeChapter.pdfNotes}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition"
              >
                <Download size={16} /> PDF Notes
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
