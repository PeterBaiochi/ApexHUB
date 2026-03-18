import { useState, useMemo } from "react";
import {
  Play,
  Clock,
  CheckCircle2,
  Lock,
  Star,
  TrendingUp,
  Award,
  BookOpen,
  Video,
  ChevronRight,
  Info,
  Zap,
  Filter,
  Flame
} from "lucide-react";
import { cn } from "../components/ui/utils";

export function Academy() {
  const [filter, setFilter] = useState("Todos");

  const courses = [
    {
      id: "1",
      title: "Fundamentos do Marketing",
      description: "A base sólida que você precisa para construir um império digital do zero.",
      duration: "2h 30min",
      lessons: 12,
      progress: 100,
      thumbnail: "bg-gradient-to-br from-indigo-900 to-purple-900",
      level: "Iniciante",
      completed: true,
    },
    {
      id: "2",
      title: "Copywriting de Elite",
      description: "As palavras que vendem milhões. Domine a arte da persuasão invisível.",
      duration: "3h 15min",
      lessons: 18,
      progress: 65,
      thumbnail: "bg-gradient-to-br from-blue-900 to-cyan-900",
      level: "Intermediário",
      completed: false,
    },
    {
      id: "3",
      title: "Tráfego Pago Master",
      description: "Escalando suas campanhas para os 6 dígitos com inteligência de dados.",
      duration: "4h 00min",
      lessons: 24,
      progress: 30,
      thumbnail: "bg-gradient-to-br from-gray-800 to-black",
      level: "Avançado",
      completed: false,
    },
    {
      id: "4",
      title: "Autoridade e Influência",
      description: "Construa uma presença digital magnética e domine seu nicho.",
      duration: "2h 45min",
      lessons: 15,
      progress: 0,
      thumbnail: "bg-gradient-to-br from-orange-900 to-red-900",
      level: "Intermediário",
      completed: false,
    },
    {
      id: "5",
      title: "Métricas e ROI",
      description: "O que não se mede não se escala. Domine sua lucratividade.",
      duration: "3h 30min",
      lessons: 20,
      progress: 0,
      thumbnail: "bg-gradient-to-br from-rose-900 to-pink-900",
      level: "Avançado",
      completed: false,
      locked: true,
    },
    {
      id: "6",
      title: "Funis de Escala Real",
      description: "Estruturas automatizadas que trabalham para você 24/7.",
      duration: "5h 00min",
      lessons: 28,
      progress: 0,
      thumbnail: "bg-gradient-to-br from-emerald-900 to-teal-900",
      level: "Avançado",
      completed: false,
      locked: true,
    },
  ];

  const featuredCourse = courses[1]; // Copywriting como destaque
  const continueWatching = courses.filter(c => c.progress > 0 && c.progress < 100);

  return (
    <div className="max-w-[1600px] mx-auto space-y-12 pb-20 animate-in fade-in duration-700">

      {/* SECTION 1: THE BILLBOARD (SPOTLIGHT) */}
      <section className="relative h-[450px] w-full rounded-[40px] overflow-hidden group">
        <div className={cn("absolute inset-0 transition-transform duration-1000 group-hover:scale-105", featuredCourse.thumbnail)} />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />

        <div className="absolute inset-0 p-8 lg:p-16 flex flex-col justify-center max-w-2xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="bg-white text-black px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest">Destaque</div>
            <span className="text-white/60 text-sm font-bold flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" /> Top #1 da Semana
            </span>
          </div>

          <h2 className="text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter italic leading-none">
            {featuredCourse.title}
          </h2>

          <p className="text-gray-300 text-lg leading-relaxed line-clamp-3 font-medium">
            {featuredCourse.description}
          </p>

          <div className="flex items-center gap-4 pt-4">
            <button className="bg-white text-black px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:bg-gray-200 transition-all hover:scale-105 active:scale-95">
              <Play className="w-5 h-5 fill-black" /> Assistir Agora
            </button>
            <button className="bg-white/10 backdrop-blur-md border border-white/10 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-3 hover:bg-white/20 transition-all">
              <Info className="w-5 h-5" /> Detalhes
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2: QUICK STATS (BARRA DISCRETA) */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Concluídos", val: "1/6", icon: CheckCircle2, color: "text-green-500" },
          { label: "Certificados", val: "01", icon: Award, color: "text-blue-500" },
          { label: "Horas Aula", val: "12.5h", icon: Clock, color: "text-purple-500" },
          { label: "Elite Score", val: "32%", icon: TrendingUp, color: "text-white" },
        ].map((s, i) => (
          <div key={i} className="bg-[#050505] border border-gray-800 rounded-3xl p-6 flex items-center gap-4 group hover:border-white/20 transition-all">
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <s.icon className={cn("w-6 h-6", s.color)} />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{s.label}</p>
              <p className="text-xl font-black text-white">{s.val}</p>
            </div>
          </div>
        ))}
      </section>

      {/* SECTION 3: CONTINUE WATCHING (RAILS) */}
      {continueWatching.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-2xl font-black text-white uppercase italic tracking-tight flex items-center gap-3">
              Continuar <span className="text-gray-500">Assistindo</span>
            </h3>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {continueWatching.map((course) => (
              <div key={course.id} className="min-w-[350px] group cursor-pointer relative">
                <div className={cn("h-[200px] w-full rounded-3xl overflow-hidden relative", course.thumbnail)}>
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform">
                      <Play className="w-8 h-8 text-black fill-black ml-1" />
                    </div>
                  </div>
                  {/* PROGRESS BAR OVERLAY */}
                  <div className="absolute bottom-0 left-0 w-full h-1.5 bg-white/20">
                    <div className="h-full bg-white shadow-[0_0_10px_#fff]" style={{ width: `${course.progress}%` }} />
                  </div>
                </div>
                <div className="mt-4 px-2">
                  <h4 className="text-white font-black uppercase text-sm tracking-tight">{course.title}</h4>
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">{course.progress}% concluído • {course.lessons} aulas</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 4: CATALOGO COMPLETO */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-800 pb-6">
          <h3 className="text-2xl font-black text-white uppercase italic tracking-tight">Catálogo <span className="text-gray-500">ApexHub</span></h3>

          <div className="flex items-center gap-2 bg-[#050505] p-1.5 rounded-2xl border border-gray-800">
            {["Todos", "Iniciante", "Intermediário", "Avançado"].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setFilter(lvl)}
                className={cn(
                  "px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                  filter === lvl ? "bg-white text-black shadow-xl" : "text-gray-500 hover:text-white"
                )}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className={cn(
                "group relative bg-[#050505] border rounded-[32px] overflow-hidden transition-all duration-500",
                course.locked ? "border-gray-900 opacity-40 grayscale" : "border-gray-800 hover:border-white/40 hover:translate-y-[-8px] shadow-2xl"
              )}
            >
              <div className={cn("aspect-video w-full relative overflow-hidden border-b border-gray-800", course.thumbnail)}>
                {course.locked ? (
                  <div className="absolute inset-0 flex items-center justify-center backdrop-blur-md bg-black/40">
                    <Lock className="w-10 h-10 text-white/20" />
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/20">
                      <Play className="w-6 h-6 text-white fill-white" />
                    </div>
                  </div>
                )}
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                  <p className="text-[8px] font-black text-white uppercase tracking-widest">{course.level}</p>
                </div>
              </div>

              <div className="p-8 space-y-4">
                <div className="flex justify-between items-start">
                  <h4 className="text-2xl font-black text-white uppercase tracking-tighter leading-none">{course.title}</h4>
                  {course.completed && <CheckCircle2 className="w-5 h-5 text-white" />}
                </div>
                <p className="text-gray-500 text-sm font-medium leading-relaxed line-clamp-2">{course.description}</p>

                <div className="flex items-center justify-between pt-4 text-white">
                  <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-gray-500">
                    <span className="flex items-center gap-1.5"><Video className="w-3.5 h-3.5" /> {course.lessons} aulas</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {course.duration}</span>
                  </div>
                  {!course.locked && (
                    <button className="text-white hover:text-gray-400 transition-colors">
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: CALL TO ACTION (ELIMINADO REPETIÇÃO) */}
      <section className="bg-white rounded-[40px] p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_30px_60px_rgba(255,255,255,0.1)] overflow-hidden relative">
        <Zap className="absolute -right-10 -bottom-10 w-64 h-64 text-black/[0.03] -rotate-12" />
        <div className="space-y-2 relative z-10">
          <h3 className="text-3xl font-black text-black uppercase tracking-tighter leading-none">Acelere seu Aprendizado</h3>
          <p className="text-black/60 font-bold uppercase text-xs tracking-widest">Cursos novos todas as semanas com certificados oficiais ScaleHub.</p>
        </div>
        <button className="bg-black text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-2xl relative z-10">
          Solicitar Mentoria
        </button>
      </section>

    </div>
  );
}