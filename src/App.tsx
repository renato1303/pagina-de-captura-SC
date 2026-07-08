/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Check, 
  MapPin, 
  ChevronDown, 
  Layers, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  FileText, 
  HelpCircle, 
  Menu, 
  X,
  Coffee,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import ConversationalForm from "./components/ConversationalForm";

// Path to custom generated images
const HERO_IMAGE = "/images/gotas.jpeg";
const BAHIA_ORIGIN_IMAGE = "/src/assets/images/bahia_agroforestry_origin_1783533957886.jpg";
const LIFESTYLE_IMAGE = "/images/gotas02.jpeg";

export default function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const analysisCards = [
    {
      id: 1,
      num: "01",
      title: "Diagnóstico do seu mix atual",
      shortDesc: "onde estão as oportunidades reais de giro, margem e diferenciação na sua prateleira, hoje.",
      detail: "Mapeamos o comportamento do consumidor na sua região para identificar se o seu espaço está perdendo clientes premium para canais concorrentes por falta de um cacau funcional autêntico. Analisamos pontos cegos na gôndola atual.",
      pill: "Gargalos de Giro"
    },
    {
      id: 2,
      num: "02",
      title: "Dimensionamento do portfólio ideal",
      shortDesc: "quais linhas fazem sentido agora (gotas, barras, revenda) e quais não.",
      detail: "Evite capital parado. Calculamos o mix exato de SKUs (como nossas gotas de preparo culinário de 200g e barras de consumo por impulso) dimensionado especificamente para o fluxo de clientes e ticket médio da sua casa.",
      pill: "Gôndola Inteligente"
    },
    {
      id: 3,
      num: "03",
      title: "Plano de ação personalizado",
      shortDesc: "como introduzir o cacau na prática: exposição no PDV, precificação, narrativa de venda e treinamento de equipe.",
      detail: "Roteiro prático de comunicação visual para seu PDV e um micro-treinamento de 5 minutos para que sua equipe saiba responder às perguntas dos clientes sobre o cacau puro de maneira elegante e convincente.",
      pill: "Treinamento & PDV"
    },
    {
      id: 4,
      num: "04",
      title: "Leitura de margem & giro",
      shortDesc: "quanto o produto pode representar de retorno na sua operação, a partir do seu ticket e do seu volume.",
      detail: "Apresentamos simulações reais de rentabilidade, demonstrando cenários de faturamento com margens excelentes (muitas vezes superiores a 40%) e o prazo estimado para o giro completo do primeiro lote.",
      pill: "Estudo de Markup"
    }
  ];

  // Monitor scroll for header background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const triggerCTA = () => {
    window.open("https://responda.seracacau.com.br", "_blank", "noopener,noreferrer");
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white text-brand-dark selection:bg-brand-support selection:text-brand-dark font-sans antialiased overflow-x-hidden">
      <div className="grain-overlay" />
      
      {/* HEADER / NAVIGATION */}
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled 
            ? "bg-white/70 backdrop-blur-md border-b border-brand-border/40 py-4 shadow-sm" 
            : "bg-white/40 backdrop-blur-sm py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo / Brand */}
          <a href="#" className="flex items-center">
            <span className="font-serif text-2xl tracking-[0.2em] text-brand-dark font-semibold leading-none">SERÁ CACAU</span>
          </a>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-10 text-xs tracking-wider uppercase font-medium text-brand-muted">
            <a href="#problema" className="hover:text-brand-accent transition-colors">O Problema</a>
            <a href="#virada" className="hover:text-brand-accent transition-colors">A Categoria</a>
            <a href="#oferta" className="hover:text-brand-accent transition-colors">A Análise</a>
            <a href="#autoridade" className="hover:text-brand-accent transition-colors">A Origem</a>
            <a href="#faq" className="hover:text-brand-accent transition-colors">FAQ</a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-brand-dark hover:text-brand-accent transition-colors cursor-pointer"
            aria-label="Abrir Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* MOBILE SIDEBAR */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-40 md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-white border-l border-brand-border z-50 p-8 flex flex-col justify-between md:hidden"
            >
              <div className="space-y-8">
                <div className="flex items-center justify-between border-b border-brand-border pb-6">
                  <span className="font-serif text-xl tracking-[0.2em] text-brand-dark font-semibold">SERÁ CACAU</span>
                  <button onClick={() => setMobileMenuOpen(false)} className="p-1 cursor-pointer">
                    <X size={20} />
                  </button>
                </div>

                <nav className="flex flex-col space-y-6 text-sm uppercase tracking-wider font-semibold text-brand-muted">
                  <a href="#problema" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-accent transition-colors">O Problema</a>
                  <a href="#virada" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-accent transition-colors">A Categoria</a>
                  <a href="#oferta" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-accent transition-colors">A Análise</a>
                  <a href="#autoridade" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-accent transition-colors">A Origem</a>
                  <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-accent transition-colors">FAQ</a>
                </nav>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    triggerCTA();
                  }}
                  className="w-full py-4 bg-brand-dark text-white font-medium rounded-full text-center hover:bg-brand-accent transition-all cursor-pointer shadow-md"
                >
                  Quero minha análise estratégica
                </button>
                <p className="text-center text-[10px] text-brand-muted font-mono uppercase tracking-widest">
                  Bahia · Cacau 100% Puro
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* DOBRA 1: PROMESSA + CTA (HERO SECTION) */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 bg-white" id="hero">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Column Left: Copywriting */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <motion.div 
                initial={{ opacity: 0, y: 15 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6 }}
                className="inline-flex"
              >
                <span className="text-brand-accent bg-brand-bg-sec border border-brand-border px-4 py-2 rounded-full text-xs md:text-sm font-sans font-medium leading-normal tracking-wide shadow-sm">
                  Para empórios, concept stores, cafeterias, hotéis e distribuidores que querem uma curadoria que vende sozinha
                </span>
              </motion.div>

              <h1 
                className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-brand-dark leading-[1.1] tracking-tight font-light"
              >
                Tenha na prateleira o produto que o cliente pergunta, comenta, e volta pra comprar.
              </h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-brand-muted text-lg md:text-xl font-light leading-relaxed max-w-2xl font-sans"
              >
                Numa análise estratégica gratuita, nosso time de curadoria olha o seu mix atual e te mostra, com número na mesa, como o cacau 100% da Será pode entrar como o SKU que diferencia a sua casa , surfando a maior virada de hábito da década: a vida além do café.
              </motion.p>

              {/* Action and supporting elements */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6, delay: 0.45 }}
                className="space-y-4 pt-2"
              >
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                  <button
                    onClick={triggerCTA}
                    className="group relative px-8 py-4 bg-brand-dark text-white font-medium rounded-full text-base transition-all duration-300 hover:bg-brand-accent hover:scale-[1.01] shadow-md hover:shadow-lg cursor-pointer inline-flex items-center justify-center space-x-3"
                  >
                    <span>Quero minha análise estratégica</span>
                    <ArrowRight size={18} className="transform group-hover:translate-x-1.5 transition-transform duration-300" />
                  </button>
                </div>
                
                <p className="text-xs text-brand-muted pl-1 font-sans flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-support animate-pulse"></span>
                  Gratuita e sem compromisso · vagas limitadas por semana
                </p>
              </motion.div>

              {/* Trust Bar */}
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.8, delay: 0.6 }}
                className="pt-8 border-t border-brand-border/80 flex flex-wrap items-center gap-y-3 gap-x-6 text-xs text-brand-muted font-mono"
              >
                <div className="flex items-center space-x-2">
                  <CheckCircle2 size={14} className="text-brand-accent" />
                  <span>Cacau 100% puro</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 size={14} className="text-brand-accent" />
                  <span>single-origin</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 size={14} className="text-brand-accent" />
                  <span>origem rastreável</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 size={14} className="text-brand-accent" />
                  <span>base agroflorestal</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 size={14} className="text-brand-support" />
                  <span>manejo agroflorestal & origem controlada</span>
                </div>
              </motion.div>
            </div>

            {/* Column Right: Premium Image Grid */}
            <div className="lg:col-span-5 relative mt-8 lg:mt-0">
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-brand-bg-sec border border-brand-border shadow-xl group"
              >
                {/* Custom Generated Image with premium overlay */}
                <img 
                  src={HERO_IMAGE} 
                  alt="Premium raw single-origin cocoa beans and dark chocolate on stone" 
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-[1.02] transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
                
                {/* Light reflection atmospheric overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </motion.div>

              {/* Accent back-shading blobs (extremely subtle for Aesop feel) */}
              <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-brand-bg-sec/40 blur-3xl -z-10" />
              <div className="absolute -bottom-12 -left-12 w-64 h-64 rounded-full bg-brand-support/10 blur-3xl -z-10" />
            </div>

          </div>
        </div>
      </section>

      {/* DOBRA 2: O PROBLEMA (AGITAÇÃO) */}
      <section className="relative py-24 md:py-32 bg-brand-bg-sec" id="problema">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Headline */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 space-y-4"
            >
              <span className="text-brand-accent font-mono text-xs uppercase tracking-widest font-semibold block">O Cenário Atual</span>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-brand-dark leading-tight tracking-tight font-light">
                A sua gôndola parece a do concorrente. E o cliente passa reto.
              </h2>
              <div className="w-16 h-[1px] bg-brand-support mt-6"></div>
            </motion.div>

            {/* Right Long Copy */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="lg:col-span-7 space-y-6 text-brand-muted text-base md:text-lg leading-relaxed font-sans font-light"
            >
              <p>
                Você já sentiu isso: os mesmos três produtos giram, nada novo prende atenção, e a próxima marca que te oferecem é bonita, mas sem história, sem origem verificável, sem nada que justifique tirar um SKU da prateleira pra colocar ela.
              </p>
              <p className="border-l-2 border-brand-support/40 pl-6 my-6 italic text-brand-dark font-serif font-light text-lg md:text-xl">
                Enquanto isso, o comportamento do seu cliente mudou. Ele lê rótulo, pergunta a procedência, e está ativamente procurando uma alternativa ao café, clareza e energia sem o ciclo de ansiedade. Essa demanda já está na sua porta.
              </p>
              <p>
                A pergunta é se a sua casa vai ser a que oferece a resposta, ou a que assistiu o concorrente oferecer primeiro.
              </p>
              
              <div className="pt-6">
                <button
                  onClick={triggerCTA}
                  className="inline-flex items-center space-x-2 text-xs uppercase font-semibold text-brand-accent hover:text-brand-dark tracking-widest transition-colors cursor-pointer group"
                >
                  <span>Análise de Mix Cortesia</span>
                  <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* DOBRA 3: A VIRADA (POR QUE AGORA) */}
      <section className="relative py-24 md:py-32 bg-white" id="virada">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Column Left: Visual Storytelling */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 order-last lg:order-first"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] md:aspect-[3/2] lg:aspect-[4/5] border border-brand-border shadow-md group">
                <img 
                  src={BAHIA_ORIGIN_IMAGE} 
                  alt="Raw cacao pod hanging from trees in Bahia agroforest" 
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-[1.02] transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-md border border-brand-border/40 text-[9px] font-mono uppercase tracking-wider text-brand-accent shadow-sm">
                  Sustentabilidade Rastreável
                </div>
              </div>
            </motion.div>

            {/* Column Right: Copywriting */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="lg:col-span-7 space-y-8 text-left"
            >
              <span className="text-brand-accent font-mono text-xs uppercase tracking-widest font-semibold block">A Mudança de Hábito</span>
              
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-brand-dark leading-[1.15] tracking-tight font-light">
                A vida além do café não é tendência passageira. É a próxima categoria.
              </h2>

              <div className="space-y-6 text-brand-muted text-base md:text-lg font-sans font-light leading-relaxed">
                <p>
                  O mesmo movimento que criou espaço para o café de especialidade, para o vinho natural e para o azeite com origem está chegando ao cacau. Só que aqui existe uma diferença: o cacau 100% puro ainda não tem um dono claro na cabeça do consumidor. Está preso entre o "achocolatado" de supermercado e a bolha cerimonial cara e nichada.
                </p>
                <p className="text-brand-dark font-medium">
                  Esse é o espaço que a Será ocupa, e que a sua casa pode ocupar junto. Um alimento de verdade, honesto, com uma narrativa que se comunica sozinha na prateleira. Quem entra cedo numa categoria assim não vende um produto: constrói a reputação de ter curado a tendência antes de todo mundo.
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={triggerCTA}
                  className="w-full sm:w-auto px-8 py-3.5 bg-brand-dark text-white text-sm font-semibold rounded-full hover:bg-brand-accent transition-all duration-300 text-center cursor-pointer shadow"
                >
                  Garantir posicionamento antecipado
                </button>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* DOBRA 4: A OFERTA (VALOR DA ANÁLISE ESTRATÉGICA) */}
      <section className="relative py-24 md:py-32 bg-brand-bg-sec border-t border-b border-brand-border/60" id="oferta">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl mx-auto text-center space-y-4 mb-16 md:mb-20"
          >
            <span className="text-brand-accent font-mono text-xs uppercase tracking-widest font-semibold block">Diagnóstico de Prateleira</span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-brand-dark leading-tight tracking-tight font-light">
              O que você recebe na Análise Estratégica de Curadoria & Giro
            </h2>
            <p className="text-brand-muted text-base md:text-lg font-light leading-relaxed font-sans max-w-2xl mx-auto">
              Não é uma reunião de venda com pressão. É um diagnóstico da sua operação conduzido pelo nosso time, você sai dela com clareza, mesmo que a gente nem chegue a falar de fechar pedido. Na conversa você recebe:
            </p>
            <div className="inline-flex items-center gap-1.5 text-xs text-brand-accent font-mono uppercase tracking-wider bg-brand-accent/5 px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-ping" />
              Clique nos cards para revelar insights detalhados
            </div>
          </motion.div>

          {/* Grid 2x2 of the Value items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {analysisCards.map((card) => {
              const isActive = activeCard === card.id;
              return (
                <motion.div
                  key={card.id}
                  layout="position"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setActiveCard(isActive ? null : card.id)}
                  className={`relative p-8 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between group ${
                    isActive 
                      ? "bg-white border-brand-accent shadow-md ring-1 ring-brand-accent/20" 
                      : "bg-white/60 backdrop-blur-md border-brand-border/80 hover:border-brand-accent/40 hover:bg-white/90 shadow-sm"
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-brand-bg-sec flex items-center justify-center text-brand-accent font-mono text-sm font-bold border border-brand-border/40">
                        {card.num}
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-brand-accent bg-brand-accent/5 px-2.5 py-1 rounded-md">
                        {card.pill}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl text-brand-dark font-medium leading-tight group-hover:text-brand-accent transition-colors">
                      {card.title}
                    </h3>
                    
                    <p className="text-brand-muted text-sm font-sans leading-relaxed">
                      {card.shortDesc}
                    </p>

                    {/* Animated Details */}
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden pt-4 border-t border-brand-border/40 mt-4 text-xs font-sans text-brand-dark leading-relaxed space-y-2"
                        >
                          <p className="font-semibold text-brand-accent uppercase tracking-wider font-mono text-[10px]">Insight Estratégico da Reunião:</p>
                          <p className="font-light">{card.detail}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Toggle trigger text */}
                  <div className="pt-6 flex items-center justify-between text-xs font-mono tracking-wider uppercase font-medium mt-auto text-brand-accent">
                    <span>{isActive ? "Recolher" : "Ver Insight Detalhado"}</span>
                    <ChevronDown size={14} className={`transform transition-transform duration-300 ${isActive ? "rotate-180" : ""}`} />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Microcopy materials alert */}
          <div className="mt-12 bg-white border border-brand-border rounded-2xl p-6 md:p-8 max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center space-x-1.5 bg-brand-bg-sec px-2.5 py-1 rounded-full border border-brand-border text-[10px] font-mono text-brand-accent font-semibold uppercase">
                Bônus de Aplicação
              </div>
              <p className="text-brand-dark text-sm md:text-base font-medium font-sans">
                E depois da reunião, você ainda leva três materiais gratuitos: o Dossiê da Marca Será, a Calculadora de Margem & Giro e o Kit Equipe de Balcão , seus para usar, listando conosco ou não.
              </p>
            </div>
            
            <button
              onClick={triggerCTA}
              className="flex-shrink-0 w-full md:w-auto px-6 py-3.5 bg-brand-dark text-white font-medium rounded-full text-xs uppercase tracking-wider text-center hover:bg-brand-accent transition-all duration-300 cursor-pointer shadow-sm"
            >
              Agendar e Levar Materiais
            </button>
          </div>

        </div>
      </section>

      {/* DOBRA 5: AUTORIDADE (QUEM É A SERÁ) */}
      <section className="relative py-24 md:py-32 bg-white" id="autoridade">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Content Column */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 space-y-8 text-left"
            >
              <span className="text-brand-accent font-mono text-xs uppercase tracking-widest font-semibold block">Nossa História & Manifestação</span>
              
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-brand-dark leading-tight tracking-tight font-light">
                Por que a Será, e não mais uma marca bonita de prateleira
              </h2>

              <div className="space-y-6 text-brand-muted text-base md:text-lg font-sans font-light leading-relaxed">
                <p>
                  A Será nasceu da inquietação de um casal, Madlen, alemã e formada em administração, e Clark, brasileiro, que se mudou para a Bahia para responder uma pergunta simples: por que os benefícios reais do cacau 100% ficaram presos a um nicho pequeno e caro?
                </p>
                <p className="border-l-2 border-brand-accent/50 pl-6 my-4 italic text-brand-dark font-serif font-light">
                  Trabalhamos com cacau 100% puro, sem adição de nada, single-origin, de base agroflorestal, com origem que você consegue rastrear e defender internamente.
                </p>
                <p>
                  É esse conjunto, produto honesto + história verdadeira + rastreabilidade, que faz o cliente perguntar, comentar e voltar. Porque no fim, a sua casa não vende produto: vende decisão e curadoria. E é exatamente por isso que a gente seleciona com quem trabalha.
                </p>
              </div>

              {/* Data numbers / credentials Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t border-brand-border/80">
                <div className="space-y-1">
                  <span className="block text-3xl font-serif text-brand-accent font-light">180+</span>
                  <span className="block text-xs text-brand-muted font-sans">Lojas parceiras em todo o país</span>
                </div>
                <div className="space-y-1">
                  <span className="block text-3xl font-serif text-brand-accent font-light">100%</span>
                  <span className="block text-xs text-brand-muted font-sans">Agroflorestal Sul da Bahia</span>
                </div>
                <div className="space-y-1">
                  <span className="block text-3xl font-serif text-brand-accent font-light">Zero</span>
                  <span className="block text-xs text-brand-muted font-sans">Adição de açúcares ou conservantes</span>
                </div>
              </div>
            </motion.div>

            {/* Right Visual Image Column */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-brand-bg-sec border border-brand-border shadow-md group">
                <img 
                  src={LIFESTYLE_IMAGE} 
                  alt="Craft ceramic cup of pure hot cocoa on an elegant oak table with linen napkins" 
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-[1.02] transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/5" />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* DOBRA 6: PARA QUEM É (QUALIFICAÇÃO + EXCLUSIVIDADE) */}
      <section className="relative py-24 md:py-32 bg-brand-bg-sec border-t border-b border-brand-border/60" id="qualificacao">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl mx-auto text-center space-y-4 mb-16"
          >
            <span className="text-brand-accent font-mono text-xs uppercase tracking-widest font-semibold block">Critérios de Admissão</span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-brand-dark leading-tight tracking-tight font-light">
              Essa análise é para você se…
            </h2>
            <p className="text-brand-muted text-sm md:text-base font-sans">
              Buscamos consistência e valores alinhados. Entenda se sua operação se encaixa no perfil da Será Cacau.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* YES Column */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-2xl border border-brand-accent/30 shadow-sm p-8 md:p-10 space-y-6 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-brand-accent" />
              <h3 className="font-serif text-2xl text-brand-dark font-medium flex items-center gap-2">
                <CheckCircle2 size={22} className="text-brand-accent flex-shrink-0" />
                <span>Sim, é ideal para o seu negócio se:</span>
              </h3>
              
              <ul className="space-y-4 font-sans text-brand-muted text-base">
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-accent flex-shrink-0" />
                  <span>Você tem um empório, concept store, cafeteria, hotel, restaurante ou distribuição e decide (ou influencia) o mix da casa.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-accent flex-shrink-0" />
                  <span>Você enxerga curadoria como diferencial competitivo, não compra \"o mais barato\".</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-accent flex-shrink-0" />
                  <span>Você quer entrar cedo na categoria de alternativas ao café, não correr atrás depois.</span>
                </li>
              </ul>
            </motion.div>

            {/* NO Column */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white/80 rounded-2xl border border-brand-border shadow-sm p-8 md:p-10 space-y-6 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-neutral-300" />
              <h3 className="font-serif text-2xl text-brand-dark font-medium flex items-center gap-2">
                <AlertCircle size={22} className="text-brand-muted flex-shrink-0" />
                <span>Não é para o seu momento se:</span>
              </h3>
              
              <div className="space-y-4 text-brand-muted font-sans text-base leading-relaxed">
                <p>
                  Não é para você se busca o menor preço a qualquer custo, ou não tem interesse real em levar cacau 100% de verdade para a sua casa. Reservamos poucos horários por semana e preferimos usá-los com quem realmente quer construir isso.
                </p>
                <p className="text-xs text-brand-muted bg-brand-bg-sec/80 p-4 rounded-lg border border-brand-border/60 leading-relaxed">
                  * Nossa produção é artesanal de base agroflorestal controlada na Bahia. Prezamos pela parceria e integridade comercial em detrimento do volume desenfreado.
                </p>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* DOBRA 7: REVERSÃO DE RISCO + CTA FINAL */}
      <section className="relative py-24 md:py-32 bg-white" id="agenda-final">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="bg-brand-bg-sec border border-brand-border rounded-3xl p-8 md:p-16 space-y-8 relative overflow-hidden shadow-sm"
          >
            
            <div className="space-y-3">
              <span className="text-brand-accent font-mono text-xs uppercase tracking-widest font-semibold block">Garantia e Tranquilidade</span>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-brand-dark leading-tight tracking-tight font-light">
                Sem custo. Sem compromisso. Com clareza garantida.
              </h2>
            </div>

            <p className="text-brand-muted text-base md:text-lg font-sans font-light leading-relaxed max-w-2xl mx-auto">
              A análise é gratuita, e você não precisa decidir nada na reunião. No pior cenário, você sai com um diagnóstico honesto da sua prateleira e três materiais que pode usar do seu jeito. No melhor, encontra o produto que vai diferenciar a sua casa pelos próximos anos.
            </p>

            <div className="pt-4 space-y-4 max-w-md mx-auto">
              <button
                onClick={triggerCTA}
                className="w-full py-4 px-8 bg-brand-dark text-white font-medium text-base rounded-full hover:bg-brand-accent transition-all duration-300 shadow-md cursor-pointer inline-flex items-center justify-center space-x-3"
              >
                <span>Garantir minha vaga na análise estratégica</span>
                <ArrowRight size={18} />
              </button>
              
              <p className="text-xs text-brand-muted font-sans">
                Aplicação rápida · nosso time confirma o melhor horário com você
              </p>
            </div>

            {/* Micro aesthetic accent lines */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-support/5 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-accent/5 rounded-full blur-2xl pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* FAQ SECTION (MATADORES DE OBJEÇÃO) */}
      <section className="relative py-24 bg-brand-bg-sec" id="faq">
        <div className="max-w-4xl mx-auto px-6">
          
          {/* Header */}
          <div className="text-center space-y-4 mb-16">
            <span className="text-brand-accent font-mono text-xs uppercase tracking-widest font-semibold block">Dúvidas Frequentes</span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-brand-dark font-light tracking-tight">
              Perguntas Frequentes (FAQ)
            </h2>
            <p className="text-brand-muted text-sm font-sans">
              Esclareça suas principais dúvidas sobre o diagnóstico de curadoria.
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-4 max-w-3xl mx-auto">
            
            {/* FAQ 1 */}
            <div className="bg-white border border-brand-border rounded-xl overflow-hidden transition-all duration-200">
              <button
                onClick={() => toggleFaq(1)}
                className="w-full py-5 px-6 text-left flex items-center justify-between font-serif text-lg text-brand-dark hover:text-brand-accent transition-colors font-medium cursor-pointer"
              >
                <span>"Não estou abrindo novas listagens agora."</span>
                <ChevronDown 
                  size={18} 
                  className={`text-brand-muted transform transition-transform duration-300 ${activeFaq === 1 ? "rotate-180" : ""}`} 
                />
              </button>
              
              <AnimatePresence initial={false}>
                {activeFaq === 1 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-6 pb-5 pt-1 text-sm text-brand-muted font-sans leading-relaxed border-t border-brand-border/40 bg-brand-bg-sec/30">
                      Tudo bem , a análise não pede que você liste nada. É um diagnóstico da sua curadoria; o que fizer com ele é decisão sua.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* FAQ 2 */}
            <div className="bg-white border border-brand-border rounded-xl overflow-hidden transition-all duration-200">
              <button
                onClick={() => toggleFaq(2)}
                className="w-full py-5 px-6 text-left flex items-center justify-between font-serif text-lg text-brand-dark hover:text-brand-accent transition-colors font-medium cursor-pointer"
              >
                <span>"É pago?"</span>
                <ChevronDown 
                  size={18} 
                  className={`text-brand-muted transform transition-transform duration-300 ${activeFaq === 2 ? "rotate-180" : ""}`} 
                />
              </button>
              
              <AnimatePresence initial={false}>
                {activeFaq === 2 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-6 pb-5 pt-1 text-sm text-brand-muted font-sans leading-relaxed border-t border-brand-border/40 bg-brand-bg-sec/30">
                      Não. A reunião e os três materiais são gratuitos.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* FAQ 3 */}
            <div className="bg-white border border-brand-border rounded-xl overflow-hidden transition-all duration-200">
              <button
                onClick={() => toggleFaq(3)}
                className="w-full py-5 px-6 text-left flex items-center justify-between font-serif text-lg text-brand-dark hover:text-brand-accent transition-colors font-medium cursor-pointer"
              >
                <span>"Marca pequena consegue entregar em escala?"</span>
                <ChevronDown 
                  size={18} 
                  className={`text-brand-muted transform transition-transform duration-300 ${activeFaq === 3 ? "rotate-180" : ""}`} 
                />
              </button>
              
              <AnimatePresence initial={false}>
                {activeFaq === 3 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-6 pb-5 pt-1 text-sm text-brand-muted font-sans leading-relaxed border-t border-brand-border/40 bg-brand-bg-sec/30">
                      É parte do que a gente mapeia na conversa: dimensionamos o portfólio ao seu volume, sem prometer o que não sustenta.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* FAQ 4 */}
            <div className="bg-white border border-brand-border rounded-xl overflow-hidden transition-all duration-200">
              <button
                onClick={() => toggleFaq(4)}
                className="w-full py-5 px-6 text-left flex items-center justify-between font-serif text-lg text-brand-dark hover:text-brand-accent transition-colors font-medium cursor-pointer"
              >
                <span>"Quanto tempo dura?"</span>
                <ChevronDown 
                  size={18} 
                  className={`text-brand-muted transform transition-transform duration-300 ${activeFaq === 4 ? "rotate-180" : ""}`} 
                />
              </button>
              
              <AnimatePresence initial={false}>
                {activeFaq === 4 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-6 pb-5 pt-1 text-sm text-brand-muted font-sans leading-relaxed border-t border-brand-border/40 bg-brand-bg-sec/30">
                      Cerca de 30–40 minutos, online.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-brand-border py-16 md:py-20 text-brand-muted">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
          
          <div className="space-y-4 md:col-span-2">
            <div className="flex flex-col">
              <span className="font-serif text-xl tracking-[0.2em] text-brand-dark font-semibold">SERÁ CACAU</span>
              <span className="font-sans text-[8px] tracking-[0.4em] text-brand-accent uppercase pl-0.5 mt-0.5 font-medium">ORIGEM AGROFLORESTAL</span>
            </div>
            <p className="text-sm font-sans max-w-sm leading-relaxed">
              Curadoria de cacau de alta pureza e origem controlada no Sul da Bahia. Criamos pontes entre a conservação agroflorestal da Mata Atlântica e os empórios mais sofisticados do Brasil.
            </p>
          </div>

          <div className="space-y-4">
            <span className="block font-serif text-brand-dark font-medium">Contatos</span>
            <ul className="space-y-2 text-xs font-mono">
              <li>parceiros@seracacau.com.br</li>
              <li>+55 (73) 99823-1022</li>
              <li>Ilhéus, Bahia · Brasil</li>
            </ul>
          </div>

          <div className="space-y-4">
            <span className="block font-serif text-brand-dark font-medium">Garantia de Origem</span>
            <p className="text-xs font-sans leading-relaxed">
              Cacau 100% puro · Single Origin · Manejo Agroflorestal · Rastreabilidade do lote garantida de ponta a ponta.
            </p>
            <div className="pt-2 flex items-center gap-2 text-[10px] text-brand-accent font-mono uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent"></span>
              <span>Bahia, Brasil</span>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 pt-12 mt-12 border-t border-brand-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[10px] uppercase tracking-wider">
          <span>&copy; {new Date().getFullYear()} Será Cacau Ltda. Todos os direitos reservados.</span>
          <span className="hover:text-brand-dark transition-colors">Feito de forma justa e sustentável</span>
        </div>
      </footer>

      {/* CONVERSATIONAL FORM MODAL */}
      <ConversationalForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />

    </div>
  );
}
