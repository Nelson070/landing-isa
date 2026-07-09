import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

// DEFINIÇÃO DE INTERFACES PARA AS PROPS (Usando 'any' nas variants para passar direto no build e no browser)
interface DiffData {
  icon: string;
  title: string;
  desc: string;
}

interface DifferentialCardProps {
  diff: DiffData;
  cardVariants: any;
}

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // =============================================================
  // 1. CONFIGURAÇÕES DE SCROLL (HERO MOCKUP 3D)
  // =============================================================
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"]
  });

  const rotateX = useTransform(heroScroll, [0, 0.7], [45, 0]);
  const scaleMockup = useTransform(heroScroll, [0, 0.7], [0.8, 1.05]);
  const yMockup = useTransform(heroScroll, [0, 0.7], ["12vh", "0vh"]);

  const cardLeftX = useTransform(heroScroll, [0, 0.6], [0, -220]);
  const cardLeftY = useTransform(heroScroll, [0, 0.6], [0, -50]);
  const cardLeftOpacity = useTransform(heroScroll, [0, 0.1, 0.6], [0, 1, 1]);

  const cardRightX = useTransform(heroScroll, [0, 0.6], [0, 240]);
  const cardRightY = useTransform(heroScroll, [0, 0.6], [0, 60]);
  const cardRightOpacity = useTransform(heroScroll, [0, 0.1, 0.6], [0, 1, 1]);

  // =============================================================
  // 2. CONFIGURAÇÕES DO BOTÃO MAGNÉTICO (CTA PRINCIPAL)
  // =============================================================
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150 };
  const magneticX = useSpring(mouseX, springConfig);
  const magneticY = useSpring(mouseY, springConfig);

  const handleMouseMoveCTA = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    mouseX.set((clientX - centerX) * 0.35);
    mouseY.set((clientY - centerY) * 0.35);
  };

  const handleMouseLeaveCTA = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // =============================================================
  // 3. CONFIGURAÇÕES DO TEXTO PARALLAX
  // =============================================================
  const textSectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: textScroll } = useScroll({
    target: textSectionRef,
    offset: ["start end", "end start"]
  });
  const xTextLeft = useTransform(textScroll, [0, 1], [-250, 250]);
  const xTextRight = useTransform(textScroll, [0, 1], [250, -250]);

  // =============================================================
  // 4. CONFIGURAÇÕES DE ANIMAÇÃO GERAL (STAGGER / DIFFERENTIALS)
  // =============================================================
  const gridVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12 } }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 35, scale: 0.96 },
    show: { 
      opacity: 1, y: 0, scale: 1,
      transition: { type: "spring", stiffness: 90, damping: 14 } 
    }
  };

  // =============================================================
  // 5. MÁSCARA DE TEXTO COM OPACIDADE POR PALAVRA NO SCROLL
  // =============================================================
  const diffTitleRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: wordScroll } = useScroll({
    target: diffTitleRef,
    offset: ["start end", "center center"]
  });
  const textParagraph = "Cada projeto é tratado com atenção estratégica, criatividade e foco em resultados reais para o seu negócio.";
  const words = textParagraph.split(" ");

  return (
    <div className="relative w-full bg-[#232e0d] text-[#f4ecdf] selection:bg-[#f4ecdf] selection:text-[#232e0d]">
      
      {/* NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-[#232e0d]/90 backdrop-blur-md py-4 border-b border-[#f4ecdf]/10 shadow-lg' : 'py-6'}`}>
        <div className="max-w-[1160px] mx-auto px-7 flex items-center justify-between">
          <div className="flex flex-col gap-px">
            <span className="font-serif text-2xl font-medium text-white tracking-wide">Isa Melo</span>
            <span className="text-[0.6rem] tracking-[0.2em] uppercase text-[#f4ecdf]/70 font-semibold">Marketing & Vendas</span>
          </div>
          <a href="https://wa.me/559981746266" target="_blank" rel="noreferrer"
             className="hidden md:flex items-center gap-2 bg-[#f4ecdf] text-[#232e0d] px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide uppercase hover:opacity-90 transition-all duration-300">
            Solicitar Orçamento
          </a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section ref={heroRef} className="relative h-[200vh] bg-[#232e0d]">
        <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden px-7" style={{ perspective: "1200px" }}>
          
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(244,236,223,0.06)_0%,transparent_70%)] pointer-events-none" />
          
          <div className="text-center z-20 max-w-[800px] mb-12 flex flex-col items-center">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-4 inline-block text-[0.68rem] font-semibold tracking-[0.18em] uppercase text-[#f4ecdf] bg-[#f4ecdf]/10 px-4 py-1.5 rounded-full">
              Gestão de Marketing & Vendas
            </motion.div>
            
            <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="font-serif text-3xl md:text-5xl lg:text-[4rem] text-white leading-tight mb-6 tracking-tight max-w-[750px]">
              Marketing estratégico que <em className="italic text-[#f4ecdf]/80">transforma</em> presença em vendas.
            </motion.h1>

            {/* CTA SEPARADO */}
            <div onMouseMove={handleMouseMoveCTA} onMouseLeave={handleMouseLeaveCTA} className="cursor-pointer relative z-30">
              <motion.a 
                href="https://wa.me/559981746266" target="_blank" rel="noreferrer"
                style={{ x: magneticX, y: magneticY }}
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-[#f4ecdf] text-[#232e0d] px-8 py-3.5 rounded-full text-sm font-bold tracking-wide uppercase shadow-xl shadow-white/5 transition-all group"
              >
                <span>Solicitar Orçamento</span>
                <motion.span className="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-1">→</motion.span>
              </motion.a>
            </div>
          </div>

          {/* MOCKUP CENTRAL INTERATIVO ESTILO INSTAGRAM */}
          <motion.div
            style={{ rotateX, scale: scaleMockup, y: yMockup }}
            onDoubleClick={() => {
              setLiked(true);
              setTimeout(() => setLiked(false), 800);
            }}
            className="w-full max-w-[640px] h-[38vh] bg-[#232e0d] border border-[#f4ecdf]/10 rounded-2xl relative flex flex-col justify-between p-6 shadow-[0_30px_100px_rgba(0,0,0,0.3)] cursor-pointer select-none"
          >
            {/* 1. SEÇÃO DE STORIES SIMULADA NO TOPO */}
            <div className="flex gap-3 overflow-hidden border-b border-[#f4ecdf]/10 pb-3 w-full justify-start mb-2">
              {[
                { label: 'Estratégia', active: true },
                { label: 'Cases', active: true },
                { label: 'Vendas', active: false },
                { label: 'Branding', active: false }
              ].map((story, i) => (
                <div key={i} className="flex flex-col items-center gap-1 shrink-0">
                  <motion.div 
                    whileHover={{ scale: 1.08 }}
                    className={`w-10 h-10 rounded-full p-[2px] ${story.active ? 'bg-[#f4ecdf]' : 'bg-[#f4ecdf]/20'}`}
                  >
                    <div className="w-full h-full rounded-full bg-[#232e0d] flex items-center justify-center text-[10px]">
                      {i === 0 ? '👩‍💻' : '✨'}
                    </div>
                  </motion.div>
                  <span className="text-[9px] text-[#f4ecdf]/60 tracking-wide">{story.label}</span>
                </div>
              ))}
            </div>

            {/* 2. CORPO DO POST */}
            <div className="text-center flex flex-col items-center justify-center flex-1 relative py-2">
              <AnimatePresence>
                {liked && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 1] }}
                    exit={{ scale: 1.4, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute text-6xl z-30 pointer-events-none drop-shadow-[0_0_20px_rgba(244,236,223,0.3)]"
                  >
                    ❤️
                  </motion.div>
                )}
              </AnimatePresence>

              <span className="text-2xl mb-1">🎯</span>
              <h3 className="font-serif text-base text-white">Posicionamento & Autoridade</h3>
              <p className="text-[11px] text-[#f4ecdf]/70 mt-1 max-w-[340px] leading-relaxed">
                Dê dois cliques em qualquer área deste post para interagir com o conteúdo estratégico.
              </p>
            </div>

            {/* 3. BOTTOM BAR INTERATIVO */}
            <div className="flex justify-between items-center border-t border-[#f4ecdf]/10 pt-3 text-[10px] text-[#f4ecdf]/50 w-full">
              <div className="flex gap-4 items-center">
                <motion.span 
                  animate={liked ? { scale: [1, 1.3, 1] } : {}} 
                  className={`flex items-center gap-1 font-medium ${liked ? 'text-red-400' : ''}`}
                >
                  {liked ? '❤️' : '🤍'} {liked ? '1.241' : '1.240'}
                </motion.span>
                <span>💬 84</span>
                <span>🚀 312</span>
              </div>
              <span className="text-[#f4ecdf] font-semibold tracking-wide uppercase text-[8px] bg-[#f4ecdf]/5 px-2 py-0.5 rounded border border-[#f4ecdf]/10">
                Métricas de Conversão
              </span>
            </div>

            {/* CARDS FLUTUANTES PARALLAX NAS LATERAIS */}
            <motion.div style={{ x: cardLeftX, y: cardLeftY, opacity: cardLeftOpacity }} className="absolute p-4 w-[220px] bg-[#232e0d] border border-[#f4ecdf]/20 rounded-xl shadow-2xl z-20 left-[-50px] top-[25%] hidden md:block">
              <div className="text-xs text-[#f4ecdf] font-bold mb-1 flex items-center gap-1.5">📈 Conversão Active</div>
              <p className="text-[10px] text-[#f4ecdf]/70 leading-normal">Transformamos interações superficiais em funis de vendas direta para o seu produto ou serviço.</p>
            </motion.div>

            <motion.div style={{ x: cardRightX, y: cardRightY, opacity: cardRightOpacity }} className="absolute p-4 w-[220px] bg-[#232e0d] border border-[#f4ecdf]/20 rounded-xl shadow-2xl z-20 right-[-50px] bottom-[20%] hidden md:block">
              <div className="text-xs text-[#f4ecdf] font-bold mb-1 flex items-center gap-1.5">📱 Social Reels</div>
              <p className="text-[10px] text-[#f4ecdf]/70 leading-normal">Captação, direção e edição com cortes dinâmicos e roteiro focado em retenção orgânica.</p>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-20 bg-[#232e0d] border-y border-[#f4ecdf]/10 relative overflow-hidden">
        <div className="max-w-[1160px] mx-auto px-7 relative z-10">
          <motion.div 
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={gridVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-[#f4ecdf]/10"
          >
            {[
              { num: '10', label: 'Marcas Criadas' },
              { num: '50', label: 'Clientes Atendidos' },
              { num: '100', label: 'Conteúdos Produzidos' },
              { num: '100', percent: true, label: 'Atendimento Humanizado' }
            ].map((stat, i) => (
              <motion.div key={i} variants={cardVariants} className="text-center py-4 md:py-0">
                <div className="font-serif text-4xl md:text-5xl font-bold text-white mb-2">
                  <span className="text-[#f4ecdf]/60">{stat.percent ? '' : '+'}</span>
                  {stat.num}
                  {stat.percent && <span className="text-[#f4ecdf]/60">%</span>}
                </div>
                <div className="text-[0.75rem] tracking-[0.15em] uppercase text-[#f4ecdf]/60">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SERVICES / PLANS */}
      <ServicesSection />

      {/* TEXTO PARALLAX INTERATIVO DE TRANSIÇÃO */}
      <section ref={textSectionRef} className="py-20 bg-black/30 border-y border-[#f4ecdf]/10 flex flex-col justify-center overflow-hidden">
        <motion.h2 style={{ x: xTextLeft }} className="text-7xl font-black tracking-tight text-[#f4ecdf]/10 uppercase whiteSpace-nowrap select-none m-0">
          SOCIAL MEDIA • BRANDING • STRATEGY • COPYWRITING • FILMMAKING •
        </motion.h2>
        <motion.h2 style={{ x: xTextRight }} className="text-7xl font-black tracking-tight text-[#f4ecdf]/5 uppercase whiteSpace-nowrap select-none mt-2">
          POSICIONAMENTO PREMIUM • DESIGN DE MARCAS • ESTRATÉGIA COMERCIAL •
        </motion.h2>
      </section>

      {/* DIFFERENTIALS */}
      <section ref={diffTitleRef} className="py-24 bg-[#232e0d]">
        <div className="max-w-[1160px] mx-auto px-7">
          <div className="text-center mb-16">
            <span className="text-[0.68rem] font-medium tracking-[0.18em] uppercase text-[#f4ecdf] bg-[#f4ecdf]/10 px-4 py-1.5 rounded-full inline-block mb-4">Por que a Isa Melo?</span>
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">Nossos Diferenciais</h2>
            
            <p className="max-w-[550px] mx-auto text-sm font-medium leading-relaxed flex flex-wrap justify-center gap-x-1.5 gap-y-1">
              {words.map((word, i) => {
                const start = i / words.length;
                const end = start + 1 / words.length;
                const opacity = useTransform(wordScroll, [start, end], [0.2, 1]);
                return (
                  <motion.span key={i} style={{ opacity }}>
                    {word}
                  </motion.span>
                );
              })}
            </p>
          </div>

          <motion.div 
            variants={gridVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              { icon: '👥', title: 'Atendimento Humanizado', desc: 'Relacionamento próximo, atenção real e comunicação clara com cada cliente.' },
              { icon: '📈', title: 'Estratégia Associada a Vendas', desc: 'Marketing que vai além do visual — pensado para converter e atrair clientes.' },
              { icon: '🖼️', title: 'Conteúdo com Posicionamento', desc: 'Conteúdo criado com intenção estratégica para comunicar o valor da sua marca.' },
              { icon: '✒️', title: 'Design Premium', desc: 'Identidade visual refinada e consistente que transmite alto profissionalismo.' },
              { icon: '💬', title: 'Comunicação Estratégica', desc: 'Mensagens claras e impactantes que conectam sua marca ao público certo.' },
              { icon: '🖥️', title: 'Gestão Profissional', desc: 'Presença digital cuidada com planejamento e olhar analítico para o crescimento.' }
            ].map((diff, i) => (
              <DifferentialCard key={i} diff={diff} cardVariants={cardVariants} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 bg-[#232e0d] border-t border-[#f4ecdf]/10 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,rgba(244,236,223,0.04)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-[1160px] mx-auto px-7 relative z-10">
          <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <span className="text-[0.68rem] font-medium tracking-[0.18em] uppercase text-[#f4ecdf] bg-[#f4ecdf]/10 px-4 py-1.5 rounded-full inline-block mb-6">Comece agora</span>
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-3">Seu posicionamento <em className="italic text-[#f4ecdf]/80">começa agora.</em></h2>
            <p className="text-[#f4ecdf]/60 text-sm max-w-[440px] mx-auto mb-10">Vamos construir uma marca forte, estratégica e profissional para o seu negócio.</p>
            
            <a href="https://wa.me/559981746266" target="_blank" rel="noreferrer"
               className="inline-flex items-center gap-3 bg-[#f4ecdf] text-[#232e0d] px-10 py-4 rounded-full text-sm font-bold uppercase hover:opacity-90 shadow-xl transition-all"
            >
              <span className="text-base">💬</span>
              Solicitar Orçamento no WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black/20 pt-16 pb-8 border-t border-[#f4ecdf]/10">
        <div className="max-w-[1160px] mx-auto px-7">
          <div className="grid md:grid-cols-2 gap-10 mb-10">
            <div>
              <div className="flex flex-col gap-px mb-4">
                <span className="font-serif text-2xl font-medium text-white">Isa Melo</span>
                <span className="text-[0.6rem] tracking-[0.2em] uppercase text-[#f4ecdf]">Marketing & Vendas</span>
              </div>
              <p className="text-xs text-[#f4ecdf]/60 max-w-[300px] leading-relaxed">Marketing estratégico que transforma presença em vendas. Branding, Social Media e Filmmaker com posicionamento profissional.</p>
            </div>
            <div className="md:justify-self-end">
              <h4 className="font-sans text-[0.72rem] tracking-[0.2em] uppercase text-[#f4ecdf]/40 font-semibold mb-4">Contato</h4>
              <div className="flex flex-col gap-3">
                <a href="https://instagram.com/kaisamelo" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-xs text-[#f4ecdf]/70 hover:text-white transition-colors">📸 @kaisamelo</a>
                <a href="https://wa.me/559981746266" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-xs text-[#f4ecdf]/70 hover:text-white transition-colors">💬 (99) 98174-6266</a>
                <a href="mailto:mmelodesignerdemarcas@gmail.com" className="flex items-center gap-3 text-xs text-[#f4ecdf]/70 hover:text-white transition-colors">✉️ mmelodesignerdemarcas@gmail.com</a>
              </div>
            </div>
          </div>
          <div className="pt-6 border-t border-[#f4ecdf]/10 flex flex-col md:flex-row justify-between gap-4 text-xs text-[#f4ecdf]/40 tracking-wide">
            <span>© Isa Melo — Gestão de Marketing & Vendas</span>
            <span className="opacity-60">Feito com estratégia e propósito</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// =============================================================
// SUB-COMPONENTE: CARD COM SPOTLIGHT TRACKER
// =============================================================
function DifferentialCard({ diff, cardVariants }: DifferentialCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  return (
    <motion.div 
      ref={cardRef}
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -6 }}
      className="bg-[#232e0d] p-8 rounded-2xl border border-[#f4ecdf]/10 transition-colors duration-300 cursor-pointer relative overflow-hidden group"
    >
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(250px circle at ${x}px ${y}px, rgba(244,236,223,0.05), transparent 80%)`
          )
        }}
      />
      
      <div className="text-3xl mb-4 relative z-10">{diff.icon}</div>
      <h4 className="font-serif text-lg text-white mb-2 relative z-10">{diff.title}</h4>
      <p className="text-xs text-[#f4ecdf]/70 leading-relaxed relative z-10">{diff.desc}</p>
    </motion.div>
  );
}

// =============================================================
// SUB-COMPONENTE: SERVIÇOS
// =============================================================
function ServicesSection() {
  const [activeTab, setActiveTab] = useState('social');
  
  const tabs = [
    { id: 'social', label: 'Social Media', icon: '📱' },
    { id: 'filmmaker', label: 'Filmmaker', icon: '📷' },
    { id: 'branding', label: 'Branding', icon: '✒️' }
  ];

  type PlanItem = {
    name: string;
    price: string;
    label: string;
    features: string[];
    featured?: boolean;
    badge?: string;
    highlight?: boolean;
    customPrice?: boolean;
  };

  const plans: Record<string, PlanItem[]> = {
    social: [
      { name: 'Social Media', price: '500', label: 'Plano Básico · /mês', features: ['Estruturação do perfil', 'Criação de conteúdo', 'Copy estratégica', 'Desenvolvimento dos criativos', 'Entrega semanal', 'Sem gerenciamento'] },
      { name: 'Social Media', price: '850', label: 'Plano Intermediário · /mês', featured: true, badge: 'Mais Escolhido', features: ['Análise estratégica', 'Estruturação profissional', 'Estratégia de conteúdo', 'Criativos personalizados', '1 captação mensal', 'Gerenciamento das redes'] },
      { name: 'Social Media', price: '1.200', label: 'Plano Completo · /mês', highlight: true, badge: 'Completo', features: ['Análise de mercado', 'Estratégia de vendas', 'Planejamento estratégico', 'Criação + criativos', '2 captações mensais', 'E-mail marketing', 'Treinamento de vendas'] }
    ],
    filmmaker: [
      { name: 'Filmmaker', price: '250', label: 'Cobertura Parcial', features: ['4h no evento', 'Captação de fotos e vídeos', 'Entrega de 1 vídeo editado'] },
      { name: 'Filmmaker', price: '360', label: 'Cobertura Completa', featured: true, badge: 'Popular', features: ['Cobertura durante todo o evento', 'Captação de fotos e vídeos', 'Entrega de 2 vídeos editados'] },
      { name: 'Filmmaker', price: '545', label: 'Cobertura Premium', highlight: true, badge: 'Experiência Completa', features: ['Cobertura completa', 'Stories em tempo real', 'Publicação em até 2 perfis', 'Captação dos convidados', 'Apoio de fotógrafo auxiliar', '4 vídeos editados'] }
    ],
    branding: [
      { name: 'Branding', price: '250', label: 'Logo Essencial', features: ['Criação de logo simples'] },
      { name: 'Branding', price: '455', label: 'Intermediário', featured: true, badge: 'Recomendado', features: ['Logo profissional', 'Mockups', 'Estruturação do perfil', 'Aplicação da identidade'] },
      { name: 'Branding', price: 'Sob Consulta', label: 'Branding Premium', highlight: true, badge: 'Premium', customPrice: true, features: ['Pesquisa de mercado', 'Estratégia de posicionamento', 'Desenvolvimento completo', 'Logo + Mockups', 'Estruturação das redes', 'Estratégia de lançamento'] }
    ]
  };

  return (
    <section className="py-24 bg-[#232e0d] border-t border-[#f4ecdf]/10">
      <div className="max-w-[1160px] mx-auto px-7">
        <div className="text-center mb-14">
          <span className="text-[0.68rem] font-medium tracking-[0.18em] uppercase text-[#f4ecdf] bg-[#f4ecdf]/10 px-4 py-1.5 rounded-full inline-block mb-4">O que oferecemos</span>
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-3">Serviços & Planos</h2>
          <p className="max-w-[520px] mx-auto text-sm text-[#f4ecdf]/60">Soluções estratégicas para construir, fortalecer e posicionar sua marca no digital com resultado real.</p>
        </div>

        {/* TAB CONTROLLERS */}
        <div className="flex justify-center mb-14">
          <div className="flex flex-wrap gap-1 bg-black/10 border border-[#f4ecdf]/10 p-1.5 rounded-full relative">
            {tabs.map(tab => {
              const isTabActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-2.5 relative rounded-full text-[0.82rem] font-semibold tracking-wide uppercase transition-colors duration-300 z-10 ${isTabActive ? 'text-[#232e0d]' : 'text-[#f4ecdf]/60 hover:text-white'}`}
                >
                  {isTabActive && (
                    <motion.div 
                      layoutId="active-service-pill"
                      className="absolute inset-0 bg-[#f4ecdf] rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="mr-0.5">{tab.icon}</span> {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* CONTAINER DOS CARDS INTERATIVOS */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 15, scale: 0.99 }} 
            animate={{ opacity: 1, y: 0, scale: 1 }} 
            exit={{ opacity: 0, y: -15, scale: 0.99 }} 
            transition={{ duration: 0.25 }}
            className="grid lg:grid-cols-3 gap-6"
          >
            {plans[activeTab].map((plan, i) => (
              <div 
                key={i} 
                className={`relative p-8 rounded-3xl transition-all duration-300 border ${plan.featured ? 'bg-[#f4ecdf] text-[#232e0d] shadow-2xl border-[#f4ecdf]' : 'bg-[#232e0d] text-zinc-100 border-[#f4ecdf]/10 hover:border-[#f4ecdf]/30'}`}
              >
                {plan.badge && (
                  <div className={`absolute -top-3 left-1/2 -translate-x-1/2 text-[0.65rem] font-bold tracking-[0.16em] uppercase px-4 py-1.5 rounded-full whitespace-nowrap ${plan.featured ? 'bg-[#232e0d] text-white border border-[#232e0d]' : 'bg-black/30 text-[#f4ecdf] border border-[#f4ecdf]/10'}`}>
                    {plan.badge}
                  </div>
                )}
                
                <div className={`text-[0.72rem] tracking-[0.18em] uppercase mb-1.5 ${plan.featured ? 'text-[#232e0d]/60 font-semibold' : 'text-[#f4ecdf]/40'}`}>{plan.name}</div>
                
                {plan.customPrice ? (
                  <div className={`font-serif text-3xl font-bold italic mb-1.5 ${plan.featured ? 'text-[#232e0d]' : 'text-white'}`}>{plan.price}</div>
                ) : (
                  <div className={`font-serif text-5xl font-bold leading-none mb-1.5 ${plan.featured ? 'text-[#232e0d]' : 'text-white'}`}>
                    <small className="text-lg font-sans font-light mr-1">R$</small>{plan.price}
                  </div>
                )}
                
                <div className={`text-xs mb-6 ${plan.featured ? 'text-[#232e0d]/50' : 'text-[#f4ecdf]/40'}`}>{plan.label}</div>
                <div className={`h-px w-full mb-6 ${plan.featured ? 'bg-[#232e0d]/10' : 'bg-[#f4ecdf]/10'}`}></div>
                
                <ul className="flex flex-col gap-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <span className="mt-0.5 shrink-0 text-xs">✔️</span>
                      <span className={plan.featured ? 'text-[#232e0d]/80 font-semibold' : 'text-[#f4ecdf]/70'}>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <a href="https://wa.me/559981746266" target="_blank" rel="noreferrer" 
                   className={`w-full flex justify-center py-3.5 rounded-full text-sm font-bold tracking-wide uppercase transition-all duration-300 
                   ${plan.featured ? 'bg-[#232e0d] text-white hover:opacity-90' : 'bg-black/20 text-white hover:bg-black/40 border border-[#f4ecdf]/20'}`}>
                  {plan.customPrice ? 'Solicitar Diagnóstico' : 'Solicitar Plano'}
                </a>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}