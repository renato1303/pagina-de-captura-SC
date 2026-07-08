/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight, Check, Sparkles, Download, ArrowLeft, RefreshCw, BarChart3, BookOpen, UserCheck } from "lucide-react";
import { LeadFormValues } from "../types";

interface ConversationalFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConversationalForm({ isOpen, onClose }: ConversationalFormProps) {
  const [step, setStep] = useState<number>(0); // 0: Welcome, 1: Name, 2: Email, 3: Business, 4: Role, 5: WhatsApp, 6: Mix, 7: Success
  const [values, setValues] = useState<LeadFormValues>({
    name: "",
    email: "",
    businessName: "",
    role: "",
    currentMix: "",
    whatsapp: "",
  });
  
  const [errors, setErrors] = useState<Partial<LeadFormValues>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };
  
  // Interactive Calculator State
  const [calcClients, setCalcClients] = useState<number>(2500); // monthly customers
  const [calcTicket, setCalcTicket] = useState<number>(45); // avg ticket in R$
  const [calcConversion, setCalcConversion] = useState<number>(8); // % clients adopting cacao (e.g. 5% - 15%)
  const [calcPrice, setCalcPrice] = useState<number>(28); // price of 100g premium pure cacao pack
  const [calcCost, setCalcCost] = useState<number>(14); // cost price to partner

  const currentInputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setStep(0);
      setValues({
        name: "",
        email: "",
        businessName: "",
        role: "",
        currentMix: "",
        whatsapp: "",
      });
      setErrors({});
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    // Focus the active input when step changes
    if (currentInputRef.current) {
      currentInputRef.current.focus();
    }
  }, [step]);

  const validateStep = (): boolean => {
    const newErrors: Partial<LeadFormValues> = {};
    let isValid = true;

    if (step === 1 && !values.name.trim()) {
      newErrors.name = "Por favor, insira seu nome completo.";
      isValid = false;
    }
    if (step === 2) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!values.email.trim()) {
        newErrors.email = "Precisamos do seu e-mail para contato.";
        isValid = false;
      } else if (!emailRegex.test(values.email.trim())) {
        newErrors.email = "Por favor, insira um e-mail válido.";
        isValid = false;
      }
    }
    if (step === 3 && !values.businessName.trim()) {
      newErrors.businessName = "Por favor, insira o nome do seu negócio.";
      isValid = false;
    }
    if (step === 4 && !values.role.trim()) {
      newErrors.role = "Por favor, nos conte a sua atuação.";
      isValid = false;
    }
    if (step === 5) {
      const phoneClean = values.whatsapp.replace(/\D/g, "");
      if (!values.whatsapp.trim()) {
        newErrors.whatsapp = "Precisamos do seu WhatsApp para agendar.";
        isValid = false;
      } else if (phoneClean.length < 10) {
        newErrors.whatsapp = "Por favor, digite um WhatsApp válido com DDD.";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
      setErrors({});
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && step !== 6) {
      e.preventDefault();
      handleNext();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep()) {
      // Save submission simulation
      const submissions = JSON.parse(localStorage.getItem("seracacau_leads") || "[]");
      submissions.push({
        ...values,
        id: Date.now(),
        date: new Date().toISOString(),
        calcReport: {
          monthlyCustomers: calcClients,
          averageTicket: calcTicket,
          adoption: calcConversion,
          estimatedMonthlyRevenue: calcClients * (calcConversion / 100) * calcPrice,
          estimatedProfit: calcClients * (calcConversion / 100) * (calcPrice - calcCost),
        }
      });
      localStorage.setItem("seracacau_leads", JSON.stringify(submissions));
      setStep(7); // success
    }
  };

  // Calculations
  const calculatedSalesQty = Math.round(calcClients * (calcConversion / 100));
  const calculatedRevenue = calculatedSalesQty * calcPrice;
  const calculatedCostTotal = calculatedSalesQty * calcCost;
  const calculatedProfit = calculatedRevenue - calculatedCostTotal;
  const calculatedMargin = ((calcPrice - calcCost) / calcPrice) * 100;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="conversational-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex flex-col bg-white overflow-y-auto"
        >
          {/* Header */}
          <header className="sticky top-0 z-10 flex flex-wrap items-center justify-between px-4 sm:px-6 py-4 border-b border-brand-border bg-white/95 backdrop-blur-md gap-3">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="font-serif text-base sm:text-lg tracking-wider text-brand-accent font-medium">SERÁ CACAU</span>
              <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full border border-brand-border text-brand-muted bg-brand-bg-sec font-mono">
                {step <= 6 ? `Etapa ${step} de 6` : "Sucesso & Downloads"}
              </span>
            </div>
            
            <button
              id="close-modal-btn"
              onClick={onClose}
              className="p-2 text-brand-muted hover:text-brand-dark rounded-full hover:bg-brand-bg-sec transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              <X size={20} />
            </button>
          </header>

          {/* Progress Bar */}
          {step <= 6 && (
            <div className="w-full h-1 bg-brand-bg-sec">
              <motion.div
                className="h-full bg-brand-accent"
                initial={{ width: "0%" }}
                animate={{ width: `${(step / 6) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          )}

          {/* Main Container */}
          <main className="flex-1 flex flex-col items-center justify-start md:justify-center max-w-3xl w-full mx-auto px-6 py-8 md:py-16">
            <AnimatePresence mode="wait">
              {/* STEP 0: Welcome Screen */}
              {step === 0 && (
                <motion.div
                  key="step-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="w-full text-center space-y-8"
                >
                  <div className="mx-auto w-16 h-16 rounded-full bg-brand-bg-sec border border-brand-border flex items-center justify-center text-brand-accent mb-6">
                    <Sparkles size={28} />
                  </div>
                  <div className="space-y-4">
                    <h2 className="font-serif text-4xl md:text-5xl text-brand-dark leading-tight tracking-tight max-w-2xl mx-auto">
                      Inicie sua aplicação para a Análise Estratégica
                    </h2>
                    <p className="text-brand-muted text-lg max-w-lg mx-auto leading-relaxed">
                      Preencha os dados da sua operação para que nossa curadoria prepare um diagnóstico personalizado e sob medida.
                    </p>
                  </div>

                  <div className="pt-4 flex flex-col items-center space-y-3">
                    <button
                      id="start-form-btn"
                      onClick={() => setStep(1)}
                      className="inline-flex items-center space-x-3 px-8 py-4 bg-brand-dark text-white font-medium rounded-full hover:bg-brand-accent transition-all shadow-md cursor-pointer group"
                    >
                      <span>Começar aplicação</span>
                      <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                    </button>
                    <span className="text-xs text-brand-muted font-mono">
                      Leva menos de 2 minutos · Sem custos
                    </span>
                  </div>
                </motion.div>
              )}

              {/* STEP 1: Name */}
              {step === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="w-full space-y-6"
                >
                  <span className="text-brand-accent font-mono text-xs uppercase tracking-widest font-semibold block">01 . Identificação</span>
                  <label htmlFor="user-name-input" className="block font-serif text-2xl sm:text-3xl md:text-4xl text-brand-dark leading-tight tracking-tight">
                    Para começarmos, qual o seu nome completo?
                  </label>
                  <div className="relative pt-2">
                    <input
                      id="user-name-input"
                      ref={(el) => (currentInputRef.current = el)}
                      type="text"
                      value={values.name}
                      onChange={(e) => setValues({ ...values, name: e.target.value })}
                      onKeyDown={handleKeyDown}
                      placeholder="Escreva seu nome aqui..."
                      className="w-full bg-transparent border-b-2 border-brand-border focus:border-brand-accent outline-none py-4 text-xl sm:text-2xl md:text-3xl text-brand-dark font-serif placeholder-neutral-300 transition-colors"
                      required
                    />
                    {errors.name && (
                      <p className="text-sm text-red-600 mt-2 font-mono">{errors.name}</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 pt-4">
                    <button
                      id="name-next-btn"
                      onClick={handleNext}
                      className="px-6 py-3 bg-brand-dark text-white rounded-full hover:bg-brand-accent transition-all text-sm font-medium cursor-pointer inline-flex items-center space-x-2"
                    >
                      <span>Continuar</span>
                      <ArrowRight size={16} />
                    </button>
                    <span className="text-xs text-brand-muted hidden md:inline font-mono">Pressione Enter ↵</span>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Email */}
              {step === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="w-full space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-brand-accent font-mono text-xs uppercase tracking-widest font-semibold">02 . Contato</span>
                    <button onClick={handlePrev} className="text-xs text-brand-muted hover:text-brand-dark flex items-center space-x-1 cursor-pointer">
                      <ArrowLeft size={12} /> <span>Voltar</span>
                    </button>
                  </div>
                  <label htmlFor="user-email-input" className="block font-serif text-2xl sm:text-3xl md:text-4xl text-brand-dark leading-tight tracking-tight">
                    Olá, {values.name.split(" ")[0]}. Qual o seu melhor e-mail corporativo?
                  </label>
                  <div className="relative pt-2">
                    <input
                      id="user-email-input"
                      ref={(el) => (currentInputRef.current = el)}
                      type="email"
                      value={values.email}
                      onChange={(e) => setValues({ ...values, email: e.target.value })}
                      onKeyDown={handleKeyDown}
                      placeholder="seuemail@empresa.com.br"
                      className="w-full bg-transparent border-b-2 border-brand-border focus:border-brand-accent outline-none py-4 text-xl sm:text-2xl md:text-3xl text-brand-dark font-serif placeholder-neutral-300 transition-colors"
                      required
                    />
                    {errors.email && (
                      <p className="text-sm text-red-600 mt-2 font-mono">{errors.email}</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 pt-4">
                    <button
                      id="email-next-btn"
                      onClick={handleNext}
                      className="px-6 py-3 bg-brand-dark text-white rounded-full hover:bg-brand-accent transition-all text-sm font-medium cursor-pointer inline-flex items-center space-x-2"
                    >
                      <span>Continuar</span>
                      <ArrowRight size={16} />
                    </button>
                    <span className="text-xs text-brand-muted hidden md:inline font-mono">Pressione Enter ↵</span>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Business Name */}
              {step === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="w-full space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-brand-accent font-mono text-xs uppercase tracking-widest font-semibold">03 . Empresa</span>
                    <button onClick={handlePrev} className="text-xs text-brand-muted hover:text-brand-dark flex items-center space-x-1 cursor-pointer">
                      <ArrowLeft size={12} /> <span>Voltar</span>
                    </button>
                  </div>
                  <label htmlFor="user-business-input" className="block font-serif text-2xl sm:text-3xl md:text-4xl text-brand-dark leading-tight tracking-tight">
                    Qual o nome do seu negócio? (Empório, cafeteria, hotel...)
                  </label>
                  <div className="relative pt-2">
                    <input
                      id="user-business-input"
                      ref={(el) => (currentInputRef.current = el)}
                      type="text"
                      value={values.businessName}
                      onChange={(e) => setValues({ ...values, businessName: e.target.value })}
                      onKeyDown={handleKeyDown}
                      placeholder="Nome do seu estabelecimento"
                      className="w-full bg-transparent border-b-2 border-brand-border focus:border-brand-accent outline-none py-4 text-xl sm:text-2xl md:text-3xl text-brand-dark font-serif placeholder-neutral-300 transition-colors"
                      required
                    />
                    {errors.businessName && (
                      <p className="text-sm text-red-600 mt-2 font-mono">{errors.businessName}</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 pt-4">
                    <button
                      id="business-next-btn"
                      onClick={handleNext}
                      className="px-6 py-3 bg-brand-dark text-white rounded-full hover:bg-brand-accent transition-all text-sm font-medium cursor-pointer inline-flex items-center space-x-2"
                    >
                      <span>Continuar</span>
                      <ArrowRight size={16} />
                    </button>
                    <span className="text-xs text-brand-muted hidden md:inline font-mono">Pressione Enter ↵</span>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: Role */}
              {step === 4 && (
                <motion.div
                  key="step-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="w-full space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-brand-accent font-mono text-xs uppercase tracking-widest font-semibold">04 . Atuação</span>
                    <button onClick={handlePrev} className="text-xs text-brand-muted hover:text-brand-dark flex items-center space-x-1 cursor-pointer">
                      <ArrowLeft size={12} /> <span>Voltar</span>
                    </button>
                  </div>
                  <label className="block font-serif text-2xl sm:text-3xl md:text-4xl text-brand-dark leading-tight tracking-tight mb-4">
                    Qual o seu cargo ou relação com o negócio?
                  </label>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                    {["Dono / Sócio", "Gerente de Compras", "Nutricionista / Curador", "Outros"].map((roleOption) => (
                      <button
                        key={roleOption}
                        type="button"
                        onClick={() => {
                          setValues({ ...values, role: roleOption });
                          setStep(5);
                        }}
                        className={`text-left p-4 rounded-xl border text-lg transition-all cursor-pointer ${
                          values.role === roleOption
                            ? "border-brand-accent bg-brand-bg-sec font-medium text-brand-dark"
                            : "border-brand-border bg-white text-brand-muted hover:border-brand-support hover:bg-brand-bg-sec/50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{roleOption}</span>
                          {values.role === roleOption && <Check size={18} className="text-brand-accent" />}
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="relative pt-4">
                    <input
                      id="user-role-custom-input"
                      ref={(el) => (currentInputRef.current = el)}
                      type="text"
                      value={values.role}
                      onChange={(e) => setValues({ ...values, role: e.target.value })}
                      onKeyDown={handleKeyDown}
                      placeholder="Ou digite outro cargo personalizado..."
                      className="w-full bg-transparent border-b border-brand-border focus:border-brand-accent outline-none py-2 text-lg text-brand-dark placeholder-neutral-300 transition-colors"
                    />
                    {errors.role && (
                      <p className="text-sm text-red-600 mt-2 font-mono">{errors.role}</p>
                    )}
                  </div>

                  <div className="flex items-center space-x-4 pt-4">
                    <button
                      id="role-next-btn"
                      onClick={handleNext}
                      className="px-6 py-3 bg-brand-dark text-white rounded-full hover:bg-brand-accent transition-all text-sm font-medium cursor-pointer inline-flex items-center space-x-2"
                    >
                      <span>Continuar</span>
                      <ArrowRight size={16} />
                    </button>
                    <span className="text-xs text-brand-muted hidden md:inline font-mono">Pressione Enter ↵</span>
                  </div>
                </motion.div>
              )}

              {/* STEP 5: WhatsApp */}
              {step === 5 && (
                <motion.div
                  key="step-5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="w-full space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-brand-accent font-mono text-xs uppercase tracking-widest font-semibold">05 . Agendamento</span>
                    <button onClick={handlePrev} className="text-xs text-brand-muted hover:text-brand-dark flex items-center space-x-1 cursor-pointer">
                      <ArrowLeft size={12} /> <span>Voltar</span>
                    </button>
                  </div>
                  <label htmlFor="user-whatsapp-input" className="block font-serif text-2xl sm:text-3xl md:text-4xl text-brand-dark leading-tight tracking-tight">
                    Qual o seu WhatsApp com DDD para confirmarmos o agendamento?
                  </label>
                  <div className="relative pt-2">
                    <input
                      id="user-whatsapp-input"
                      ref={(el) => (currentInputRef.current = el)}
                      type="tel"
                      value={values.whatsapp}
                      onChange={(e) => {
                        // Very simple phone formatter
                        let v = e.target.value.replace(/\D/g, "");
                        if (v.length > 11) v = v.slice(0, 11);
                        if (v.length > 10) {
                          v = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
                        } else if (v.length > 6) {
                          v = `(${v.slice(0, 2)}) ${v.slice(2, 6)}-${v.slice(6)}`;
                        } else if (v.length > 2) {
                          v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
                        } else if (v.length > 0) {
                          v = `(${v}`;
                        }
                        setValues({ ...values, whatsapp: v });
                      }}
                      onKeyDown={handleKeyDown}
                      placeholder="(11) 99999-9999"
                      className="w-full bg-transparent border-b-2 border-brand-border focus:border-brand-accent outline-none py-4 text-xl sm:text-2xl md:text-3xl text-brand-dark font-serif placeholder-neutral-300 transition-colors"
                      required
                    />
                    {errors.whatsapp && (
                      <p className="text-sm text-red-600 mt-2 font-mono">{errors.whatsapp}</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 pt-4">
                    <button
                      id="whatsapp-next-btn"
                      onClick={handleNext}
                      className="px-6 py-3 bg-brand-dark text-white rounded-full hover:bg-brand-accent transition-all text-sm font-medium cursor-pointer inline-flex items-center space-x-2"
                    >
                      <span>Continuar</span>
                      <ArrowRight size={16} />
                    </button>
                    <span className="text-xs text-brand-muted hidden md:inline font-mono">Pressione Enter ↵</span>
                  </div>
                </motion.div>
              )}

              {/* STEP 6: Mix & Submit */}
              {step === 6 && (
                <motion.div
                  key="step-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="w-full space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-brand-accent font-mono text-xs uppercase tracking-widest font-semibold">06 . Diagnóstico</span>
                    <button onClick={handlePrev} className="text-xs text-brand-muted hover:text-brand-dark flex items-center space-x-1 cursor-pointer">
                      <ArrowLeft size={12} /> <span>Voltar</span>
                    </button>
                  </div>
                  <label htmlFor="user-mix-input" className="block font-serif text-2xl sm:text-3xl md:text-4xl text-brand-dark leading-tight tracking-tight">
                    Conte-nos sobre seu mix atual ou de onde surgiu o interesse pelo cacau 100% puro.
                  </label>
                  <p className="text-xs text-brand-muted font-sans -mt-2">Esta resposta é opcional, mas nos ajuda a preparar uma reunião muito mais rica.</p>
                  <div className="relative pt-2">
                    <textarea
                      id="user-mix-input"
                      ref={(el) => (currentInputRef.current = el)}
                      value={values.currentMix}
                      onChange={(e) => setValues({ ...values, currentMix: e.target.value })}
                      placeholder="Quais produtos mais giram hoje? Trabalha com cafés especiais? Seus clientes procuram hábitos mais saudáveis?"
                      className="w-full bg-transparent border border-brand-border focus:border-brand-accent rounded-xl p-4 text-lg text-brand-dark font-sans placeholder-neutral-300 transition-colors h-36 resize-none focus:outline-none"
                    />
                  </div>
                  <div className="pt-4 flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                    <button
                      id="submit-form-btn"
                      onClick={handleSubmit}
                      className="px-8 py-4 bg-brand-dark text-white rounded-full hover:bg-brand-accent transition-all font-medium cursor-pointer inline-flex items-center justify-center space-x-3 shadow-md"
                    >
                      <Check size={18} />
                      <span>Finalizar e Garantir Vaga</span>
                    </button>
                    <span className="text-xs text-brand-muted font-mono text-center sm:text-left">
                      Seus dados estão protegidos e não serão compartilhados.
                    </span>
                  </div>
                </motion.div>
              )}

              {/* STEP 7: Success and Free Materials & Calculator */}
              {step === 7 && (
                <motion.div
                  key="step-7"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="w-full space-y-10"
                >
                  <div className="text-center space-y-4">
                    <div className="mx-auto w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-4">
                      <Check size={32} />
                    </div>
                    <h2 className="font-serif text-4xl text-brand-dark tracking-tight leading-tight">
                      Vaga garantida para a Análise Estratégica!
                    </h2>
                    <p className="text-brand-muted text-lg max-w-xl mx-auto leading-relaxed">
                      Obrigado, <strong className="text-brand-dark font-medium">{values.name.split(" ")[0]}</strong>. Nós já recebemos sua aplicação e entraremos em contato no WhatsApp <strong className="text-brand-dark font-medium">{values.whatsapp}</strong> em até 24h úteis para agendar sua reunião.
                    </p>
                  </div>

                  {/* Interactive Section */}
                  <div className="bg-brand-bg-sec border border-brand-border rounded-2xl p-6 md:p-8 space-y-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-brand-border/60 pb-5 gap-4">
                      <div>
                        <span className="text-xs font-mono font-semibold text-brand-accent uppercase tracking-wider">Material Exclusivo 01 (Interativo)</span>
                        <h3 className="font-serif text-2xl text-brand-dark font-medium mt-1">Calculadora de Margem & Giro</h3>
                        <p className="text-brand-muted text-sm mt-1">Veja agora o impacto financeiro que a Será Cacau pode trazer à sua operação.</p>
                      </div>
                      <div className="bg-white/80 backdrop-blur px-4 py-2 rounded-lg border border-brand-border text-center">
                        <span className="text-xs text-brand-muted block font-mono">Retorno Mensal Estimado</span>
                        <span className="text-2xl font-serif text-brand-accent font-bold">R$ {calculatedProfit.toLocaleString("pt-BR")}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Calculator Controls */}
                      <div className="space-y-5">
                        <h4 className="font-serif text-lg text-brand-dark font-medium flex items-center gap-2">
                          <BarChart3 size={16} className="text-brand-accent" /> Ajuste os números da sua casa
                        </h4>

                        <div className="space-y-4 font-sans text-sm">
                          {/* Control 1: Clients */}
                          <div className="space-y-2">
                            <div className="flex justify-between text-brand-muted">
                              <span>Clientes mensais na sua casa</span>
                              <span className="font-mono font-semibold text-brand-dark">{calcClients.toLocaleString("pt-BR")}</span>
                            </div>
                            <input
                              type="range"
                              min="500"
                              max="15000"
                              step="250"
                              value={calcClients}
                              onChange={(e) => setCalcClients(Number(e.target.value))}
                              className="w-full accent-brand-accent h-1 bg-brand-border rounded-lg cursor-pointer"
                            />
                            <div className="flex justify-between text-[10px] text-brand-muted font-mono">
                              <span>500</span>
                              <span>15.000+</span>
                            </div>
                          </div>

                          {/* Control 2: Adoption Rate */}
                          <div className="space-y-2">
                            <div className="flex justify-between text-brand-muted">
                              <span>Clientes que adotam o cacau (conversão)</span>
                              <span className="font-mono font-semibold text-brand-dark">{calcConversion}%</span>
                            </div>
                            <input
                              type="range"
                              min="2"
                              max="30"
                              step="1"
                              value={calcConversion}
                              onChange={(e) => setCalcConversion(Number(e.target.value))}
                              className="w-full accent-brand-accent h-1 bg-brand-border rounded-lg cursor-pointer"
                            />
                            <div className="flex justify-between text-[10px] text-brand-muted font-mono">
                              <span>Cafés/Empórios comuns (2%)</span>
                              <span>Foco saudável (30%)</span>
                            </div>
                          </div>

                          {/* Control 3: Pricing */}
                          <div className="grid grid-cols-2 gap-4 pt-1">
                            <div>
                              <label className="text-xs text-brand-muted block mb-1">Preço de venda (sugerido)</label>
                              <div className="relative">
                                <span className="absolute left-3 top-2.5 text-brand-muted font-mono text-xs">R$</span>
                                <input
                                  type="number"
                                  value={calcPrice}
                                  onChange={(e) => setCalcPrice(Number(e.target.value))}
                                  className="w-full bg-white border border-brand-border focus:border-brand-accent rounded-lg py-2 pl-9 pr-3 text-sm text-brand-dark font-mono outline-none"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="text-xs text-brand-muted block mb-1">Custo do produto (parceiro)</label>
                              <div className="relative">
                                <span className="absolute left-3 top-2.5 text-brand-muted font-mono text-xs">R$</span>
                                <input
                                  type="number"
                                  value={calcCost}
                                  onChange={(e) => setCalcCost(Number(e.target.value))}
                                  className="w-full bg-white border border-brand-border focus:border-brand-accent rounded-lg py-2 pl-9 pr-3 text-sm text-brand-dark font-mono outline-none"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Calculator Outputs */}
                      <div className="bg-white border border-brand-border rounded-xl p-5 md:p-6 flex flex-col justify-between space-y-6">
                        <h4 className="font-serif text-lg text-brand-dark font-medium border-b border-brand-border pb-3">
                          Projeção Mensal Será Cacau
                        </h4>

                        <div className="space-y-4 font-sans text-sm">
                          <div className="flex justify-between items-center py-1">
                            <span className="text-brand-muted">Vendas mensais estimadas</span>
                            <span className="font-mono font-semibold text-brand-dark">{calculatedSalesQty} unidades</span>
                          </div>
                          <div className="flex justify-between items-center py-1">
                            <span className="text-brand-muted">Margem bruta real</span>
                            <span className="font-mono font-semibold text-brand-accent bg-brand-bg-sec px-2 py-0.5 rounded-full border border-brand-border">
                              {calculatedMargin.toFixed(0)}% de margem
                            </span>
                          </div>
                          <div className="flex justify-between items-center py-1">
                            <span className="text-brand-muted">Faturamento incremental</span>
                            <span className="font-mono font-medium text-brand-dark">R$ {calculatedRevenue.toLocaleString("pt-BR")}</span>
                          </div>
                          <div className="flex justify-between items-center pt-3 border-t border-brand-border/60">
                            <span className="font-serif text-base text-brand-dark font-medium">Lucro Líquido Estimado</span>
                            <span className="font-serif text-2xl text-brand-accent font-bold">R$ {calculatedProfit.toLocaleString("pt-BR")}</span>
                          </div>
                        </div>

                        <div className="text-[11px] text-brand-muted leading-relaxed font-mono pt-2 border-t border-brand-border/40">
                          * Projeção baseada em taxa de conversão média observada. Os números finais dependem do fluxo do seu estabelecimento.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Other Free Materials Downloads */}
                  <div className="space-y-4">
                    <h4 className="font-serif text-xl text-brand-dark font-medium">Baixe seus outros materiais de apoio</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Material 1: Dossiê */}
                      <div className="p-5 border border-brand-border rounded-xl hover:border-brand-accent hover:bg-brand-bg-sec/40 transition-all flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-brand-bg-sec text-brand-accent flex-shrink-0">
                          <BookOpen size={20} />
                        </div>
                        <div className="space-y-2 flex-1">
                          <h5 className="font-serif text-lg font-medium text-brand-dark leading-tight">Dossiê da Marca Será</h5>
                          <p className="text-brand-muted text-xs leading-relaxed">Conheça nossa história, cadeia de fornecedores agroflorestais na Bahia e portfólio completo de SKUs.</p>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              showToast("Iniciando download: Dossiê da Marca Será Cacau.pdf");
                            }}
                            className="inline-flex items-center space-x-1.5 text-xs text-brand-accent font-medium hover:underline pt-1"
                          >
                            <Download size={12} />
                            <span>Download PDF (4.2 MB)</span>
                          </a>
                        </div>
                      </div>

                      {/* Material 2: Kit Balcão */}
                      <div className="p-5 border border-brand-border rounded-xl hover:border-brand-accent hover:bg-brand-bg-sec/40 transition-all flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-brand-bg-sec text-brand-accent flex-shrink-0">
                          <UserCheck size={20} />
                        </div>
                        <div className="space-y-2 flex-1">
                          <h5 className="font-serif text-lg font-medium text-brand-dark leading-tight">Kit Equipe de Balcão</h5>
                          <p className="text-brand-muted text-xs leading-relaxed">Guia rápido de narrativa de vendas, benefícios funcionais do cacau 100% e treinamento básico para baristas.</p>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              showToast("Iniciando download: Kit de Equipe de Balcão Será Cacau.pdf");
                            }}
                            className="inline-flex items-center space-x-1.5 text-xs text-brand-accent font-medium hover:underline pt-1"
                          >
                            <Download size={12} />
                            <span>Download PDF (2.8 MB)</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="pt-6 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-brand-muted font-sans text-center sm:text-left">
                      Um convite para o calendário foi enviado para <strong>{values.email}</strong>.
                    </p>
                    <button
                      id="close-success-btn"
                      onClick={onClose}
                      className="w-full sm:w-auto px-6 py-2.5 border border-brand-border rounded-full hover:bg-brand-bg-sec text-sm text-brand-dark transition-all cursor-pointer font-medium text-center"
                    >
                      Voltar ao Site
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </main>

          {/* Premium Toast Container */}
          <AnimatePresence>
            {toastMessage && (
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                className="fixed bottom-6 right-6 bg-brand-dark text-white text-xs font-mono px-5 py-3 rounded-lg shadow-xl border border-brand-accent/20 z-50 flex items-center gap-3"
              >
                <Check className="text-brand-accent" size={16} />
                <span>{toastMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
