/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
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
  Coffee,
  CheckCircle2,
  Mail,
  Phone
} from "lucide-react";
import ConversationalForm from "./components/ConversationalForm";

// Path to custom generated images
const BRAND_LOGO = "/images/logo_sera.png";
const HERO_IMAGE = "/images/gotas.jpeg";
const BAHIA_ORIGIN_IMAGE = "/images/IMG_8578.jpg";
const LIFESTYLE_IMAGE = "/images/gotas02.jpeg";

export default function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const analysisCards = [
    {
      id: 1,
      num: "01",
      title: "Diagnóstico de Mix & Giro",
      shortDesc: "Mapeamento de oportunidades de margem, giro e diferenciação na sua prateleira.",
      detail: "Identificamos onde sua gôndola pode capturar clientes premium que buscam opções funcionais e hoje não encontram um produto à altura.",
      pill: "Giro & Gôndola"
    },
    {
      id: 2,
      num: "02",
      title: "Portfólio Ideal por Canal",
      shortDesc: "Seleção dos SKUs mais adequados ao seu perfil (gotas culinárias 210g, barras e doses).",
      detail: "Dimensionamos a composição ideal para elevar o ticket médio da sua casa sem imobilizar capital em estoque de baixa saída.",
      pill: "Mix Estratégico"
    },
    {
      id: 3,
      num: "03",
      title: "Ativação no Ponto de Venda",
      shortDesc: "Posicionamento de gôndola, tabela de precificação e guia para a equipe de balcão.",
      detail: "Roteiro prático com recomendações de exposição e argumentos simples para que sua equipe encante e converta clientes no balcão.",
      pill: "PDV & Equipe"
    },
    {
      id: 4,
      num: "04",
      title: "Projeção de Margem & Retorno",
      shortDesc: "Simulação de faturamento, margens atrativas e previsão realista de reposição.",
      detail: "Apresentamos cenários comerciais claros com margens acima da média do setor e previsão de giro para o primeiro lote.",
      pill: "Rentabilidade"
    }
  ];

  const triggerCTA = () => {
    // Captura parâmetros existentes na URL atual (como utm de campanhas, gclid, etc.)
    const currentParams = new URLSearchParams(window.location.search);
    
    // Configura os parâmetros de identificação da página de parceria B2B
    const targetUrl = new URL("https://responda.seracacau.com.br");
    targetUrl.searchParams.set("utm_source", currentParams.get("utm_source") || "lp_b2b");
    targetUrl.searchParams.set("utm_medium", currentParams.get("utm_medium") || "cta_parceria");
    targetUrl.searchParams.set("utm_campaign", currentParams.get("utm_campaign") || "parceria_b2b");
    targetUrl.searchParams.set("origem", "pagina_parceria_b2b");

    // Repassa quaisquer outros parâmetros presentes para rastreamento completo
    currentParams.forEach((value, key) => {
      if (!targetUrl.searchParams.has(key)) {
        targetUrl.searchParams.set(key, value);
      }
    });

    window.open(targetUrl.toString(), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-white text-brand-dark selection:bg-brand-support selection:text-brand-dark font-sans antialiased overflow-x-hidden">
      <div className="grain-overlay" />

      {/* CABEÇALHO / HEADER COM LOGO */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-brand-border/50 py-3.5 md:py-4 transition-all">
        <div className="max-w-7xl mx-auto px-6 flex items-center">
          <a href="#" className="flex items-center group" aria-label="Será Cacau">
            <img 
              src={BRAND_LOGO} 
              alt="Será Cacau" 
              className="h-10 md:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]" 
            />
          </a>
        </div>
      </header>

      {/* DOBRA 1: PROMESSA + CTA (HERO SECTION) */}
      <section className="relative pt-10 pb-20 md:pt-14 md:pb-28 bg-white" id="hero">
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
                <span className="text-brand-accent bg-brand-bg-sec border border-brand-border px-4 py-1.5 rounded-full text-xs md:text-sm font-sans font-medium tracking-wide shadow-sm">
                  Parcerias B2B · Empórios, Cafeterias, Hotéis e Boutiques
                </span>
              </motion.div>

              <h1 
                className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-brand-dark leading-[1.1] tracking-tight font-light"
              >
                Tenha na prateleira o produto que o cliente pergunta, comenta e volta para comprar.
              </h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-brand-muted text-base md:text-lg font-light leading-relaxed max-w-2xl font-sans"
              >
                Cacau 100% puro da Bahia com alta margem e rotatividade. Diferencie sua gôndola e atenda a maior virada de hábito de consumo da década: a vida além do café.
              </motion.p>

              {/* Action and supporting elements */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6, delay: 0.45 }}
                className="space-y-3 pt-2"
              >
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                  <button
                    onClick={triggerCTA}
                    className="group relative px-8 py-4 bg-brand-dark text-white font-medium rounded-full text-base transition-all duration-300 hover:bg-brand-accent hover:scale-[1.01] shadow-md hover:shadow-lg cursor-pointer inline-flex items-center justify-center space-x-3"
                  >
                    <span>Quero me tornar parceiro</span>
                    <ArrowRight size={18} className="transform group-hover:translate-x-1.5 transition-transform duration-300" />
                  </button>
                </div>
                
                <p className="text-xs text-brand-muted pl-1 font-sans flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-support animate-pulse"></span>
                  Conversa objetiva e sem compromisso comercial
                </p>
              </motion.div>

              {/* Trust Bar */}
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.8, delay: 0.6 }}
                className="pt-6 border-t border-brand-border/80 flex flex-wrap items-center gap-y-2.5 gap-x-5 text-xs text-brand-muted font-mono"
              >
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 size={14} className="text-brand-accent" />
                  <span>Cacau 100% puro</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 size={14} className="text-brand-accent" />
                  <span>Single-origin Bahia</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 size={14} className="text-brand-accent" />
                  <span>Manejo Cabruca</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 size={14} className="text-brand-support" />
                  <span>Rastreabilidade de lote</span>
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
      <section className="relative py-20 md:py-28 bg-brand-bg-sec" id="problema">
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
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-brand-dark leading-tight tracking-tight font-light">
                Gôndolas iguais. Clientes passando direto.
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
                Os mesmos produtos disputam espaço por centavos, nada novo retém o olhar e marcas sem história real não justificam o espaço que ocupam na sua prateleira.
              </p>
              <p className="border-l-2 border-brand-support/50 pl-6 my-4 italic text-brand-dark font-serif font-light text-lg md:text-xl">
                Enquanto isso, seu público busca ativamente alternativas limpas de energia e foco — sem a ansiedade ou o desgaste do excesso de café.
              </p>
              <p className="text-brand-dark font-medium">
                A pergunta é direta: sua casa vai liderar essa resposta ou assistir o concorrente sair na frente?
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* DOBRA 3: A VIRADA (POR QUE AGORA) */}
      <section className="relative py-20 md:py-28 bg-white" id="virada">
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
              </div>
            </motion.div>

            {/* Column Right: Copywriting */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="lg:col-span-7 space-y-6 text-left"
            >
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-brand-dark leading-[1.15] tracking-tight font-light">
                A vida além do café não é modismo. É a próxima grande categoria.
              </h2>

              <div className="space-y-4 text-brand-muted text-base md:text-lg font-sans font-light leading-relaxed">
                <p>
                  O mesmo movimento que consolidou o café especial, os vinhos naturais e os azeites de terroir está chegando ao cacau puro. O mercado estava dividido entre ultraprocessados industriais e produtos inacessíveis.
                </p>
                <p className="text-brand-dark font-medium">
                  A Será ocupa o centro: cacau 100% puro, nobre e para consumo diário. Quem entra cedo constrói reputação de curadoria e fideliza o cliente antes de todo mundo.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={triggerCTA}
                  className="w-full sm:w-auto px-8 py-3.5 bg-brand-dark text-white text-sm font-semibold rounded-full hover:bg-brand-accent transition-all duration-300 text-center cursor-pointer shadow"
                >
                  Quero ser parceiro
                </button>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* DOBRA 4: A OFERTA (VALOR DA ANÁLISE ESTRATÉGICA) */}
      <section className="relative py-20 md:py-28 bg-brand-bg-sec border-t border-b border-brand-border/60" id="oferta">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl mx-auto text-center space-y-4 mb-14 md:mb-16"
          >
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-brand-dark leading-tight tracking-tight font-light">
              O que avaliamos no diagnóstico de parceria
            </h2>
            <p className="text-brand-muted text-base md:text-lg font-light leading-relaxed font-sans max-w-2xl mx-auto">
              Uma conversa estratégica de 20 minutos com nossa curadoria para entender a sinergia com a sua casa:
            </p>
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
                  className={`relative p-7 md:p-8 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between group ${
                    isActive 
                      ? "bg-white border-brand-accent shadow-md ring-1 ring-brand-accent/20" 
                      : "bg-white/70 backdrop-blur-md border-brand-border/80 hover:border-brand-accent/40 hover:bg-white shadow-sm"
                  }`}
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-xl bg-brand-bg-sec flex items-center justify-center text-brand-accent font-mono text-xs font-bold border border-brand-border/40">
                        {card.num}
                      </div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-brand-accent/80 font-medium">
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
                          className="overflow-hidden pt-3 border-t border-brand-border/40 mt-3 text-xs font-sans text-brand-dark leading-relaxed space-y-1.5"
                        >
                          <p className="font-semibold text-brand-accent uppercase tracking-wider font-mono text-[10px]">Ponto focal da análise:</p>
                          <p className="font-light text-brand-muted">{card.detail}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Toggle trigger text */}
                  <div className="pt-5 flex items-center justify-between text-xs font-mono tracking-wider uppercase font-medium mt-auto text-brand-accent">
                    <span>{isActive ? "Recolher" : "Ver detalhe"}</span>
                    <ChevronDown size={14} className={`transform transition-transform duration-300 ${isActive ? "rotate-180" : ""}`} />
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* DOBRA 5: AUTORIDADE (QUEM É A SERÁ) */}
      <section className="relative py-20 md:py-28 bg-white" id="autoridade">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Content Column */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 space-y-6 text-left"
            >
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-brand-dark leading-tight tracking-tight font-light">
                Por que a Será, e não apenas mais uma marca de prateleira
              </h2>

              <div className="space-y-4 text-brand-muted text-base md:text-lg font-sans font-light leading-relaxed">
                <p>
                  A Será nasceu da inquietação da fundadora Madeleine, alemã radicada na Bahia, ao constatar que o cacau puro de alta qualidade permanecia restrito a nichos caros e pouco acessíveis.
                </p>
                <p className="border-l-2 border-brand-accent/50 pl-6 my-4 italic text-brand-dark font-serif font-light">
                  Trabalhamos exclusivamente com cacau 100% puro, single-origin, cultivado em sistema cabruca sob a sombra da Mata Atlântica — com origem que você rastreia lote a lote.
                </p>
                <p>
                  Produto honesto, história verdadeira e rastreabilidade: o tripé que gera curiosidade imediata e fidelidade de recompra na sua casa.
                </p>
              </div>

              {/* Data numbers / credentials Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t border-brand-border/80">
                <div className="space-y-1">
                  <span className="block text-2xl md:text-3xl font-serif text-brand-accent font-light">Tree-to-Bar</span>
                  <span className="block text-xs text-brand-muted font-sans">Rastreabilidade da árvore à xícara</span>
                </div>
                <div className="space-y-1">
                  <span className="block text-2xl md:text-3xl font-serif text-brand-accent font-light">100% Cabruca</span>
                  <span className="block text-xs text-brand-muted font-sans">Conservação da Mata Atlântica</span>
                </div>
                <div className="space-y-1">
                  <span className="block text-2xl md:text-3xl font-serif text-brand-accent font-light">Zero Aditivos</span>
                  <span className="block text-xs text-brand-muted font-sans">Sem açúcares ou conservantes</span>
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

      {/* DOBRA 7: REVERSÃO DE RISCO + CTA FINAL */}
      <section className="relative py-20 md:py-28 bg-white" id="agenda-final">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="bg-brand-bg-sec border border-brand-border rounded-3xl p-8 md:p-14 space-y-6 relative overflow-hidden shadow-sm"
          >
            
            <div className="space-y-3">
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-brand-dark leading-tight tracking-tight font-light">
                Sem custo. Sem compromisso. Com clareza garantida.
              </h2>
            </div>

            <p className="text-brand-muted text-base md:text-lg font-sans font-light leading-relaxed max-w-2xl mx-auto">
              Uma conversa objetiva de 20 minutos. No pior cenário, você ganha um diagnóstico do potencial da categoria para o seu perfil. No melhor, descobre o produto de maior rotatividade e margem da sua prateleira.
            </p>

            <div className="pt-2 space-y-3 max-w-md mx-auto">
              <button
                onClick={triggerCTA}
                className="w-full py-4 px-8 bg-brand-dark text-white font-medium text-base rounded-full hover:bg-brand-accent transition-all duration-300 shadow-md cursor-pointer inline-flex items-center justify-center space-x-3"
              >
                <span>Inscreva-se para se tornar um parceiro</span>
                <ArrowRight size={18} />
              </button>
              
              <p className="text-xs text-brand-muted font-sans">
                Aplicação rápida · retorno em até 24 horas úteis
              </p>
            </div>

            {/* Micro aesthetic accent lines */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-support/5 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-accent/5 rounded-full blur-2xl pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-brand-border py-10 md:py-16 text-brand-muted">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
            
            {/* Brand Column */}
            <div className="md:col-span-6 space-y-3">
              <div className="flex flex-col items-start">
                <img 
                  src={BRAND_LOGO} 
                  alt="Será Cacau" 
                  className="h-8 md:h-9 w-auto object-contain mb-1" 
                />
                <span className="font-sans text-[9px] tracking-[0.3em] text-brand-accent uppercase font-medium">ORIGEM AGROFLORESTAL</span>
              </div>
              <p className="text-xs sm:text-sm font-sans max-w-md leading-relaxed text-brand-muted">
                Cacau 100% puro com rastreabilidade da árvore ao lote no Sul da Bahia. Feito para os empórios, cafeterias e marcas mais exigentes do Brasil.
              </p>
              <div className="inline-flex items-center gap-2 pt-1 text-[11px] text-brand-dark/80 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent"></span>
                <span>Single Origin · Manejo Cabruca · Sul da Bahia</span>
              </div>
            </div>

            {/* Contacts Column */}
            <div className="md:col-span-6 space-y-3">
              <span className="block font-serif text-sm md:text-base text-brand-dark font-medium">
                Atendimento a Parceiros B2B
              </span>
              
              <div className="space-y-2.5 font-sans text-xs sm:text-sm">
                <a 
                  href="mailto:parceiros@seracacau.com.br" 
                  className="flex items-center gap-2.5 text-brand-dark hover:text-brand-accent transition-colors group"
                >
                  <div className="w-7 h-7 rounded-lg bg-brand-bg-sec flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-colors flex-shrink-0">
                    <Mail size={13} />
                  </div>
                  <span className="font-mono text-xs sm:text-sm truncate">parceiros@seracacau.com.br</span>
                </a>

                <a 
                  href="https://wa.me/5573998231022" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2.5 text-brand-dark hover:text-brand-accent transition-colors group"
                >
                  <div className="w-7 h-7 rounded-lg bg-brand-bg-sec flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-colors flex-shrink-0">
                    <Phone size={13} />
                  </div>
                  <span className="font-mono text-xs sm:text-sm">+55 (73) 99823-1022</span>
                </a>

                <div className="flex items-center gap-2.5 text-brand-muted">
                  <div className="w-7 h-7 rounded-lg bg-brand-bg-sec/60 flex items-center justify-center text-brand-muted flex-shrink-0">
                    <MapPin size={13} />
                  </div>
                  <span className="text-xs">Ilhéus, Bahia · Brasil</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Copyright */}
          <div className="pt-6 mt-8 border-t border-brand-border/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left text-[11px] font-sans text-brand-muted/80">
            <span>&copy; {new Date().getFullYear()} Será Cacau Ltda. Todos os direitos reservados.</span>
            <span>Feito de forma justa e agroflorestal</span>
          </div>
        </div>
      </footer>

      {/* CONVERSATIONAL FORM MODAL */}
      <ConversationalForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />

    </div>
  );
}
