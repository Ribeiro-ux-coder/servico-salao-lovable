import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import salonHero from "@/assets/salon-hero.jpg";
import mockupPhone from "@/assets/mockup-phone.jpg";

import founderPhoto from "@/assets/founder.png";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nex0s — Páginas Premium para Salões de Beleza em Macaé" },
      {
        name: "description",
        content:
          "Página profissional, mobile-first e otimizada para conversão. Entrega em até 2 dias. Mais agendamentos e clientes no WhatsApp. Vagas limitadas para salões em Macaé.",
      },
      { property: "og:title", content: "Nex0s — Páginas Premium para Salões em Macaé" },
      {
        property: "og:description",
        content:
          "Página promocional profissional para salões de beleza. Entrega em até 2 dias. Atendimento exclusivo em Macaé.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#000000" },
      { name: "referrer", content: "strict-origin-when-cross-origin" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preload", as: "image", href: salonHero, fetchpriority: "high" },
    ],
  }),
  component: LandingPage,
});


/* ---------- Constants ---------- */

const WHATSAPP_NUMBER = "5522974005878";

const PIX_HOLDER = "Nicoly Vera Cruz da Conceição";
const PIX_DOC = "CPF cadastrado · Macaé/RJ";
const PIX_BANK = "Mercado Pago";

const PLANS = [
  {
    id: "basico",
    name: "Básico",
    price: "R$ 150",
    deposit: "R$ 50",
    depositValue: 50,
    paymentLink: "https://mpago.la/2FzZdec",
    featured: false,
    tagline: "Presença rápida e objetiva.",
    items: [
      "Landing page profissional",
      "Botão direto para WhatsApp",
      "Otimização mobile",
      "1 banner promocional",
      "Entrega rápida",
      "Estrutura básica de conversão",
    ],
    limit: "Até 1 alteração após envio da prévia.",
  },
  {
    id: "plus",
    name: "Plus",
    price: "R$ 320",
    deposit: "R$ 120",
    depositValue: 120,
    paymentLink: "https://mpago.la/2gLRm7w",
    featured: true,
    tagline: "Mais conversão e apresentação premium.",
    items: [
      "Visual premium",
      "Promoções personalizadas",
      "Banners extras",
      "Integração WhatsApp avançada",
      "Estrutura otimizada para anúncios",
      "Prioridade média na fila",
      "Experiência mais premium",
    ],
    limit: "Até 3 alterações após envio da prévia.",
  },
  {
    id: "avancado",
    name: "Avançado",
    price: "R$ 520",
    deposit: "R$ 180",
    depositValue: 180,
    paymentLink: "https://mpago.la/1nFjNjv",
    featured: false,
    tagline: "Máximo nível de apresentação profissional.",
    items: [
      "Experiência premium completa",
      "Design sofisticado",
      "Estrutura avançada de conversão",
      "Personalização premium",
      "Prioridade máxima na fila",
      "Foco máximo em conversão",
      "Maior impacto profissional",
    ],
    limit: "Até 5 alterações após envio da prévia.",
  },
] as const;


type Plan = (typeof PLANS)[number];

function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

const RESERVE_EVENT = "nex0s:open-reservation";

function triggerReservation(e?: { preventDefault?: () => void }) {
  e?.preventDefault?.();
  if (typeof window === "undefined") return;
  const el = document.getElementById("planos");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function ReserveButton({
  children,
  variant = "primary",
  full = false,
  className = "",
}: {
  children: ReactNode;
  variant?: "primary" | "ghost" | "white" | "outline-white";
  full?: boolean;
  className?: string;
}) {
  const base = `group inline-flex ${full ? "w-full" : ""} items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-medium transition-all active:scale-[0.98]`;
  const styles = {
    primary: "bg-foreground text-background hover:bg-foreground/90",
    ghost: "border border-foreground/15 bg-background text-foreground hover:border-foreground/40",
    white: "text-neutral-950 bg-slate-50",
    "outline-white": "border border-white/25 text-white hover:border-white/60",
  }[variant];
  return (
    <button type="button" onClick={() => triggerReservation()} className={`${base} ${styles} ${className}`}>
      {children}
      <span aria-hidden className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
    </button>
  );
}

/* ---------- Primitives ---------- */


function FadeIn({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-2 eyebrow">
      <span className="h-px w-6 bg-foreground/30" />
      <span>{children}</span>
    </div>
  );
}

function PrimaryCTA({ href, children, full = false }: { href: string; children: ReactNode; full?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex ${full ? "w-full" : ""} items-center justify-center gap-2 rounded-full bg-foreground px-7 py-4 text-sm font-medium text-background transition-all hover:bg-foreground/90 active:scale-[0.98]`}
    >
      {children}
      <span aria-hidden className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
    </a>
  );
}

function GhostCTA({ href, children, full = false }: { href: string; children: ReactNode; full?: boolean }) {
  return (
    <a
      href={href}
      className={`inline-flex ${full ? "w-full" : ""} items-center justify-center gap-2 rounded-full border border-foreground/15 bg-background px-7 py-4 text-sm font-medium text-foreground transition-all hover:border-foreground/40 active:scale-[0.98]`}
    >
      {children}
    </a>
  );
}

/* ---------- Sections ---------- */

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b hairline bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <a href="#top" className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-foreground text-background text-[11px] font-semibold tracking-tight">N</span>
          <span className="text-sm font-medium tracking-tight">Nex0s <span className="text-muted-foreground">· Salões</span></span>
        </a>
        <button
          type="button"
          onClick={() => triggerReservation()}
          className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background hover:bg-foreground/90"
        >
          Reservar minha vaga
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-background">
      <div className="mx-auto max-w-6xl px-5 pt-10 pb-16 sm:pt-16 sm:pb-24">
        <FadeIn>
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium">
            <span className="rounded-full border hairline px-3 py-1 text-muted-foreground">
              <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-foreground align-middle" />
              Atendimento exclusivo em Macaé · RJ
            </span>
            <span className="rounded-full border hairline px-3 py-1 text-muted-foreground">Vagas limitadas</span>
          </div>
        </FadeIn>

        <FadeIn delay={0.05}>
          <h1 className="h-display mt-6 max-w-4xl text-foreground">
            Seu salão preparado para <span className="italic font-normal text-muted-foreground">lotar</span> no Dia dos Namorados.
          </h1>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground">
            Página profissional para atrair mais clientes, aumentar agendamentos e vender direto pelo WhatsApp. Mobile-first, premium e otimizada para anúncios no Instagram.
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ReserveButton variant="primary">Ver planos e garantir vaga</ReserveButton>
            <ReserveButton variant="ghost">Reservar agora</ReserveButton>
          </div>
        </FadeIn>

        <FadeIn delay={0.18}>
          <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-muted-foreground">
            <li className="inline-flex items-center gap-1.5"><LockIcon /> Pagamento via Mercado Pago</li>
            <li className="inline-flex items-center gap-1.5"><LockIcon /> Reserva por sinal PIX</li>
            <li className="inline-flex items-center gap-1.5"><LockIcon /> CNPJ ativo · Macaé/RJ</li>
            <li className="inline-flex items-center gap-1.5"><LockIcon /> Entrega garantida em 2 dias</li>
          </ul>
        </FadeIn>

        <FadeIn delay={0.2}>
          <dl className="mt-12 grid grid-cols-3 gap-4 border-t hairline pt-6 max-w-xl">
            <div>
              <dt className="text-[10px] uppercase tracking-widest text-muted-foreground">Entrega</dt>
              <dd className="mt-1 text-lg font-medium tracking-tight">2 dias</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-widest text-muted-foreground">Foco</dt>
              <dd className="mt-1 text-lg font-medium tracking-tight">Conversão</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-widest text-muted-foreground">Cidade</dt>
              <dd className="mt-1 text-lg font-medium tracking-tight">Macaé</dd>
            </div>
          </dl>
        </FadeIn>

        <FadeIn delay={0.25}>
          <div className="relative mt-12 overflow-hidden rounded-3xl ring-inset-hairline">
            <img
              src={salonHero}
              alt="Salão de beleza minimalista premium"
              width={1280}
              height={1600}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="aspect-[4/5] sm:aspect-[16/9] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3 text-white">
              <p className="text-xs uppercase tracking-[0.2em] opacity-80">Mobile-first · Premium · Conversão</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

const BENEFITS = [
  { t: "Mais agendamentos", d: "Estrutura criada para transformar visitas em horários marcados." },
  { t: "Mais clientes no WhatsApp", d: "Botões diretos em pontos estratégicos da página." },
  { t: "Mais autoridade", d: "Apresentação que comunica profissionalismo e cuidado." },
  { t: "Visual profissional", d: "Tipografia, espaçamento e fotografia em padrão premium." },
  { t: "Conversão otimizada", d: "Cada seção empurra o visitante para o próximo passo." },
  { t: "Página premium mobile", d: "90% das clientes acessam pelo celular — tudo pensado para elas." },
  { t: "Promoções para 12/06", d: "Banners e seções específicas para Dia dos Namorados." },
  { t: "Atendimento rápido", d: "Comunicação direta com a equipe pelo WhatsApp." },
];

function Benefits() {
  return (
    <section className="border-t hairline bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
        <FadeIn><Eyebrow>Por que sua cliente vai marcar</Eyebrow></FadeIn>
        <FadeIn delay={0.05}>
          <h2 className="h-section mt-4 max-w-3xl">Construído para gerar reservas, não impressionar agências.</h2>
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((b, i) => (
            <FadeIn key={b.t} delay={i * 0.03}>
              <div className="h-full bg-background p-6 transition-colors hover:bg-surface">
                <span className="text-xs font-mono text-muted-foreground">0{i + 1}</span>
                <h3 className="mt-6 text-base font-medium tracking-tight">{b.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.d}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Mockups() {
  return (
    <section className="border-t hairline bg-background">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <FadeIn>
            <div>
              <Eyebrow>Apresentação</Eyebrow>
              <h2 className="h-section mt-4">Uma página que parece um catálogo de marca premium.</h2>
              <p className="mt-5 max-w-md text-muted-foreground leading-relaxed">
                Composição minimalista, fotografia editorial, hierarquia tipográfica refinada. Cada detalhe trabalha o posicionamento do seu salão.
              </p>
              <ul className="mt-8 space-y-3 text-sm">
                {["Layout 100% mobile", "WhatsApp em todos os pontos", "Banners de promoção", "Seção de agendamento rápido"].map(
                  (i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
                      <span>{i}</span>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="relative">
              <div className="absolute -inset-6 -z-10 rounded-3xl bg-surface" />
              <img
                src={mockupPhone}
                alt="Mockup mobile da página"
                width={1024}
                height={1280}
                loading="lazy"
                decoding="async"
                className="w-full rounded-2xl object-cover"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ---------- Plans ---------- */

function Plans({ onChoose }: { onChoose: (p: Plan) => void }) {
  return (
    <section id="planos" className="border-t hairline bg-background">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
        <FadeIn><Eyebrow>Planos</Eyebrow></FadeIn>
        <FadeIn delay={0.05}>
          <h2 className="h-section mt-4 max-w-2xl">Escolha o nível de apresentação do seu salão.</h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mt-4 max-w-xl text-sm text-muted-foreground">
            O valor do sinal é descontado do valor total. Após a aprovação da prévia funcional, o restante libera a versão final.
          </p>
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {PLANS.map((p, i) => (
            <FadeIn key={p.id} delay={i * 0.05}>
              <article
                className={`relative flex h-full flex-col rounded-2xl border p-6 sm:p-7 ${
                  p.featured
                    ? "border-foreground bg-foreground text-background"
                    : "hairline bg-background"
                }`}
              >
                {p.featured && (
                  <span className="absolute -top-3 left-6 rounded-full bg-background px-3 py-1 text-[10px] uppercase tracking-widest text-foreground ring-inset-hairline">
                    Mais escolhido
                  </span>
                )}
                <div className="flex items-baseline justify-between">
                  <h3 className="text-lg font-medium tracking-tight">{p.name}</h3>
                  <span className={`text-[11px] uppercase tracking-widest ${p.featured ? "text-background/60" : "text-muted-foreground"}`}>
                    Sinal {p.deposit}
                  </span>
                </div>
                <div className="mt-5 flex items-baseline gap-1.5">
                  <span className="text-4xl font-semibold tracking-tight">{p.price}</span>
                  <span className={`text-xs ${p.featured ? "text-background/60" : "text-muted-foreground"}`}>· valor total</span>
                </div>
                <p className={`mt-2 text-sm ${p.featured ? "text-background/70" : "text-muted-foreground"}`}>{p.tagline}</p>

                <ul className="mt-6 space-y-2.5 text-sm">
                  {p.items.map((it) => (
                    <li key={it} className="flex items-start gap-2.5">
                      <span className={`mt-1.5 h-1 w-1 shrink-0 rounded-full ${p.featured ? "bg-background" : "bg-foreground"}`} />
                      <span className={p.featured ? "text-background/90" : ""}>{it}</span>
                    </li>
                  ))}
                </ul>

                <div className={`mt-6 rounded-lg px-3 py-2.5 text-xs ${p.featured ? "bg-background/10 text-background/80" : "bg-surface text-muted-foreground"}`}>
                  {p.limit}
                </div>

                <button
                  onClick={() => onChoose(p)}
                  className={`mt-7 w-full rounded-full px-5 py-3.5 text-sm font-medium transition-all active:scale-[0.98] ${
                    p.featured
                      ? "bg-background text-foreground hover:bg-background/90"
                      : "bg-foreground text-background hover:bg-foreground/90"
                  }`}
                >
                  Escolher {p.name}
                </button>
              </article>
            </FadeIn>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          Valor do sinal sempre descontado do total. Reserva confirmada após envio do comprovante.
        </p>
      </div>
    </section>
  );
}

/* ---------- Payment Flow (Modal Funnel) ---------- */

function LockIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 1 1 8 0v3" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}

const PAYMENT_WINDOW_SECONDS = 15 * 60;

function Field({
  label,
  value,
  onChange,
  placeholder,
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  inputMode?: "text" | "tel" | "email" | "url";
}) {
  return (
    <label className="block">
      <span className="block text-[11px] font-medium uppercase tracking-widest text-muted-foreground">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        inputMode={inputMode}
        className="mt-1.5 w-full rounded-xl border hairline bg-surface px-3.5 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-foreground"
      />
    </label>
  );
}

function FieldArea({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="block text-[11px] font-medium uppercase tracking-widest text-muted-foreground">{label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="mt-1.5 w-full resize-none rounded-xl border hairline bg-surface px-3.5 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-foreground"
      />
    </label>
  );
}

function PaymentFlow({

  selected,
  onClose,
}: {
  selected: Plan;
  onClose: () => void;
}) {
  const STEP_KEY = "nex_funnel_step_v1";
  const PAID_KEY = "nex_funnel_paid_v1";
  const RECEIPT_KEY = "nex_funnel_receipt_v1";
  const [step, setStep] = useState<1 | 2 | 3>(() => {
    if (typeof window === "undefined") return 1;
    const s = Number(sessionStorage.getItem(STEP_KEY));
    return s === 2 || s === 3 ? (s as 2 | 3) : 1;
  });
  const [paidClicked, setPaidClicked] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem(PAID_KEY) === "1";
  });
  const [receipt, setReceipt] = useState<{ name: string; size: number; dataUrl: string } | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const raw = localStorage.getItem(RECEIPT_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [receiptError, setReceiptError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(PAYMENT_WINDOW_SECONDS);
  const [expired, setExpired] = useState(false);

  // Persist step & paid state
  useEffect(() => {
    try { sessionStorage.setItem(STEP_KEY, String(step)); } catch { /* noop */ }
  }, [step]);
  useEffect(() => {
    try { sessionStorage.setItem(PAID_KEY, paidClicked ? "1" : "0"); } catch { /* noop */ }
  }, [paidClicked]);
  useEffect(() => {
    try {
      if (receipt) localStorage.setItem(RECEIPT_KEY, JSON.stringify(receipt));
      else localStorage.removeItem(RECEIPT_KEY);
    } catch { /* noop */ }
  }, [receipt]);

  // Mercado Pago checkout link for the chosen plan
  const paymentLink = selected.paymentLink;


  // Persistent form (step 3) — survives accidental close / reload
  const STORAGE_KEY = "nex_lead_form_v1";
  type LeadForm = {
    salon: string;
    owner: string;
    whatsapp: string;
    instagram: string;
    address: string;
    services: string;
    promo: string;
  };
  const emptyForm: LeadForm = {
    salon: "",
    owner: "",
    whatsapp: "",
    instagram: "",
    address: "",
    services: "",
    promo: "",
  };
  const [form, setForm] = useState<LeadForm>(emptyForm);

  // Load persisted form once
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setForm({ ...emptyForm, ...JSON.parse(raw) });
    } catch {
      /* noop */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist form on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    } catch {
      /* noop */
    }
  }, [form]);

  // Lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // ESC to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Countdown on step 2
  useEffect(() => {
    if (step !== 2 || expired) return;
    const t = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          setExpired(true);
          clearInterval(t);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [step, expired]);

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");
  const pct = (secondsLeft / PAYMENT_WINDOW_SECONDS) * 100;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(paymentLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* noop */
    }
  };


  const restart = () => {
    setExpired(false);
    setSecondsLeft(PAYMENT_WINDOW_SECONDS);
    setStep(2);
  };

  const update = <K extends keyof LeadForm>(k: K, v: LeadForm[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const formFieldsValid = form.salon.trim().length > 1 && form.whatsapp.trim().length >= 8;
  const formValid = formFieldsValid && !!receipt;

  const onReceiptFile = (file: File | null) => {
    setReceiptError(null);
    if (!file) return;
    const okTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp", "application/pdf"];
    if (!okTypes.includes(file.type)) {
      setReceiptError("Formato inválido. Envie JPG, PNG, WEBP ou PDF.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setReceiptError("Arquivo grande demais. Máximo 5MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setReceipt({ name: file.name, size: file.size, dataUrl: String(reader.result) });
    };
    reader.onerror = () => setReceiptError("Não foi possível ler o arquivo. Tente outro.");
    reader.readAsDataURL(file);
  };

  const downloadReceipt = () => {
    if (!receipt) return;
    const a = document.createElement("a");
    a.href = receipt.dataUrl;
    a.download = receipt.name || "comprovante";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const buildWaMessage = () =>
    [
      `Olá! Acabei de pagar o sinal de ${selected.deposit} do plano ${selected.name}.`,
      ``,
      `*Dados do salão:*`,
      `• Salão: ${form.salon || "-"}`,
      `• Responsável: ${form.owner || "-"}`,
      `• WhatsApp: ${form.whatsapp || "-"}`,
      `• Instagram: ${form.instagram || "-"}`,
      `• Endereço: ${form.address || "-"}`,
      ``,
      `*Serviços principais:*`,
      form.services || "-",
      ``,
      `*Promoção Dia dos Namorados:*`,
      form.promo || "-",
      ``,
      `Vou anexar o comprovante do pagamento nesta conversa em seguida.`,
    ].join("\n");

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center" role="dialog" aria-modal="true">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-t-3xl border hairline bg-background sm:rounded-3xl"
      >
        {/* Header / Steps */}
        <div className="flex items-center justify-between border-b hairline px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-foreground text-background text-[11px] font-semibold">N</span>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Reserva segura</p>
              <p className="text-sm font-medium">Plano {selected.name} · Sinal {selected.deposit}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="grid h-9 w-9 place-items-center rounded-full border hairline text-muted-foreground hover:text-foreground"
          >
            ✕
          </button>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 px-5 pt-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="flex flex-1 items-center gap-2">
              <span
                className={`grid h-6 w-6 place-items-center rounded-full text-[10px] font-semibold ${
                  step >= (n as 1 | 2 | 3)
                    ? "bg-foreground text-background"
                    : "bg-surface text-muted-foreground ring-inset-hairline"
                }`}
              >
                {step > n ? <CheckIcon /> : n}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                {n === 1 ? "Confirmar" : n === 2 ? "Pagar PIX" : "Comprovante"}
              </span>
              {n < 3 && <span className="ml-1 h-px flex-1 bg-hairline" />}
            </div>
          ))}
        </div>

        <div className="max-h-[75vh] overflow-y-auto px-5 py-6 sm:px-7 sm:py-7">
          {/* STEP 1 */}
          {step === 1 && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <p className="eyebrow">Etapa 01 · Confirmação</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">Confirme sua reserva.</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Você está prestes a reservar uma das últimas vagas para o Dia dos Namorados em Macaé.
              </p>

              <div className="mt-6 rounded-2xl bg-surface p-5 ring-inset-hairline">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">Plano</span>
                  <span className="text-sm font-medium">{selected.name}</span>
                </div>
                <div className="mt-3 flex items-baseline justify-between">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">Valor total</span>
                  <span className="text-sm font-medium">{selected.price}</span>
                </div>
                <div className="mt-3 flex items-baseline justify-between border-t hairline pt-3">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">Sinal hoje</span>
                  <span className="text-2xl font-semibold tracking-tight">{selected.deposit}</span>
                </div>
                <p className="mt-2 text-[11px] text-muted-foreground">Descontado do valor total na entrega final.</p>
              </div>

              <ul className="mt-5 space-y-2 text-xs text-muted-foreground">
                <li className="flex items-center gap-2"><LockIcon /> Pagamento processado via Mercado Pago</li>
                <li className="flex items-center gap-2"><LockIcon /> Reserva confirmada por ordem de pagamento</li>
                <li className="flex items-center gap-2"><LockIcon /> Sem cobrança recorrente</li>
              </ul>

              <div className="mt-6 flex flex-col gap-2">
                <button
                  onClick={() => setStep(2)}
                  className="w-full rounded-full bg-foreground px-6 py-4 text-sm font-semibold text-background transition-transform active:scale-[0.98]"
                >
                  Gerar PIX agora →
                </button>
                <button
                  onClick={onClose}
                  className="w-full rounded-full border hairline px-6 py-3 text-xs font-medium text-muted-foreground hover:text-foreground"
                >
                  Cancelar
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center justify-between">
                <p className="eyebrow">Etapa 02 · PIX</p>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-surface px-2.5 py-1 text-[10px] uppercase tracking-widest text-muted-foreground ring-inset-hairline">
                  <LockIcon /> Mercado Pago
                </span>
              </div>

              {!expired ? (
                <>
                  {/* Timer */}
                  <div className="mt-4 rounded-2xl border hairline bg-surface p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Reserva expira em</p>
                        <p className="mt-1 font-mono text-3xl font-semibold tabular-nums tracking-tight">
                          {mm}:{ss}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Sinal</p>
                        <p className="mt-1 text-2xl font-semibold tracking-tight">{selected.deposit}</p>
                      </div>
                    </div>
                    <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-hairline">
                      <div
                        className="h-full bg-foreground transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <p className="mt-2 text-[11px] text-muted-foreground">
                      Após esse tempo a vaga volta para a fila pública.
                    </p>
                  </div>

                  {/* Botão Mercado Pago — link oficial com valor já fixo */}
                  <div className="mt-5 rounded-2xl border-2 border-foreground bg-background p-5">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Pagamento seguro</p>
                    <p className="mt-1 text-sm">
                      Você será direcionado ao <span className="font-semibold">Mercado Pago</span> com o valor do sinal já preenchido ({selected.deposit}).
                      Pague por PIX, cartão ou saldo Mercado Pago.
                    </p>

                    {paidClicked && (
                      <div className="mt-3 rounded-xl border border-amber-500/40 bg-amber-50 p-3 text-[12px] leading-relaxed text-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
                        <p className="font-semibold">⚠️ Você já abriu o pagamento.</p>
                        <p className="mt-1">
                          Se o PIX/cartão foi confirmado, <strong>NÃO pague de novo</strong>.
                          Avance para o próximo passo e nos envie o comprovante.
                        </p>
                      </div>
                    )}

                    <a
                      href={paymentLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setPaidClicked(true)}
                      className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#009ee3] px-6 py-4 text-sm font-semibold text-white transition-transform active:scale-[0.98] hover:bg-[#008fcf]"
                    >
                      {paidClicked ? `Reabrir pagamento (${selected.deposit})` : `Pagar ${selected.deposit} no Mercado Pago →`}
                    </a>
                    <button
                      onClick={copyLink}
                      className="mt-2 w-full rounded-full border hairline px-5 py-2.5 text-xs font-medium text-muted-foreground hover:text-foreground"
                    >
                      {copied ? "✓ Link copiado" : "Copiar link de pagamento"}
                    </button>
                    <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
                      Ao voltar para este site, sua reserva continuará exatamente neste passo —
                      você não precisa começar do zero.
                    </p>
                  </div>

                  {/* Titular destaque — confiança */}
                  <div className="mt-4 rounded-2xl border hairline bg-surface p-4">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Confira o titular antes de pagar</p>
                    <p className="mt-1 text-sm font-semibold tracking-tight">{PIX_HOLDER}</p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">{PIX_BANK} · {PIX_DOC}</p>
                    <div className="mt-3 grid grid-cols-3 gap-2 text-[10px] text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-background px-2.5 py-1 ring-inset-hairline"><LockIcon /> SSL</span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-background px-2.5 py-1 ring-inset-hairline"><LockIcon /> BACEN</span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-background px-2.5 py-1 ring-inset-hairline"><LockIcon /> Sem recorrência</span>
                    </div>
                  </div>




                  <div className="mt-6 flex flex-col gap-2">
                    <button
                      onClick={() => setStep(3)}
                      className="w-full rounded-full bg-foreground px-6 py-4 text-sm font-semibold text-background active:scale-[0.98]"
                    >
                      Já paguei — enviar comprovante →
                    </button>
                    <button
                      onClick={onClose}
                      className="w-full rounded-full border hairline px-6 py-3 text-xs font-medium text-muted-foreground hover:text-foreground"
                    >
                      Cancelar pagamento
                    </button>
                  </div>
                </>
              ) : (
                <div className="mt-6 text-center">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">Tempo esgotado</p>
                  <h4 className="mt-2 text-xl font-semibold tracking-tight">Sua reserva expirou.</h4>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Ainda há vagas — gere um novo PIX para continuar.
                  </p>
                  <div className="mt-6 flex flex-col gap-2">
                    <button
                      onClick={restart}
                      className="w-full rounded-full bg-foreground px-6 py-4 text-sm font-semibold text-background active:scale-[0.98]"
                    >
                      Gerar novo PIX
                    </button>
                    <button
                      onClick={onClose}
                      className="w-full rounded-full border hairline px-6 py-3 text-xs font-medium text-muted-foreground hover:text-foreground"
                    >
                      Fechar
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <p className="eyebrow">Etapa 03 · Seus dados</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">Quase pronto — só faltam seus dados e o comprovante.</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Preencha abaixo, anexe o comprovante do pagamento e enviamos tudo direto para o WhatsApp já formatado.
                Suas informações ficam salvas — se sair sem querer, voltam preenchidas.
              </p>

              {/* Aviso anti-duplicidade */}
              <div className="mt-4 rounded-xl border border-amber-500/40 bg-amber-50 p-3 text-[12px] leading-relaxed text-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
                <p className="font-semibold">Importante — evite pagamento duplicado:</p>
                <ul className="mt-1 list-disc space-y-0.5 pl-4">
                  <li>Pague o sinal <strong>uma única vez</strong>. Se já apareceu “pagamento aprovado”, está pago.</li>
                  <li>Em caso de dúvida, <strong>não pague de novo</strong> — fale com a gente pelo WhatsApp.</li>
                  <li>Sua reserva só é confirmada após o envio do comprovante abaixo.</li>
                </ul>
              </div>

              <div className="mt-5 space-y-3">
                <Field label="Nome do salão *" value={form.salon} onChange={(v) => update("salon", v)} placeholder="Ex: Studio Bella" />
                <Field label="Seu nome" value={form.owner} onChange={(v) => update("owner", v)} placeholder="Responsável pelo salão" />
                <Field label="WhatsApp *" value={form.whatsapp} onChange={(v) => update("whatsapp", v)} placeholder="(22) 9 9999-9999" inputMode="tel" />
                <Field label="Instagram" value={form.instagram} onChange={(v) => update("instagram", v)} placeholder="@seusalao" />
                <Field label="Endereço em Macaé" value={form.address} onChange={(v) => update("address", v)} placeholder="Bairro / rua" />
                <FieldArea label="Principais serviços" value={form.services} onChange={(v) => update("services", v)} placeholder="Ex: progressiva, manicure, design de sobrancelha…" />
                <FieldArea label="Promoção do Dia dos Namorados" value={form.promo} onChange={(v) => update("promo", v)} placeholder="Ex: pacote casal por R$ 199, válido até 12/06" />
              </div>

              {/* Upload do comprovante */}
              <div className="mt-5 rounded-2xl border-2 border-dashed border-foreground/30 bg-surface p-4">
                <p className="text-[11px] uppercase tracking-widest text-muted-foreground">Comprovante do pagamento *</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Anexe a foto/print do comprovante (JPG, PNG, WEBP ou PDF, até 5MB). É obrigatório para liberar o envio.
                </p>

                {!receipt ? (
                  <label className="mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border hairline bg-background px-5 py-3 text-sm font-medium text-foreground hover:bg-surface">
                    <span>📎 Anexar comprovante</span>
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp,application/pdf"
                      className="hidden"
                      onChange={(e) => onReceiptFile(e.target.files?.[0] ?? null)}
                    />
                  </label>
                ) : (
                  <div className="mt-3">
                    {receipt.dataUrl.startsWith("data:image") ? (
                      <img
                        src={receipt.dataUrl}
                        alt="Pré-visualização do comprovante"
                        className="max-h-56 w-full rounded-xl border hairline object-contain bg-background"
                      />
                    ) : (
                      <div className="rounded-xl border hairline bg-background p-4 text-center text-xs text-muted-foreground">
                        📄 PDF anexado — {receipt.name}
                      </div>
                    )}
                    <div className="mt-2 flex items-center justify-between gap-2 text-[11px] text-muted-foreground">
                      <span className="truncate">✓ {receipt.name} ({(receipt.size / 1024).toFixed(0)} KB)</span>
                      <div className="flex gap-2">
                        <label className="cursor-pointer rounded-full border hairline px-3 py-1 hover:text-foreground">
                          Trocar
                          <input
                            type="file"
                            accept="image/png,image/jpeg,image/webp,application/pdf"
                            className="hidden"
                            onChange={(e) => onReceiptFile(e.target.files?.[0] ?? null)}
                          />
                        </label>
                        <button
                          type="button"
                          onClick={() => setReceipt(null)}
                          className="rounded-full border hairline px-3 py-1 hover:text-foreground"
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {receiptError && (
                  <p className="mt-2 text-[11px] font-medium text-destructive">{receiptError}</p>
                )}

                {receipt && (
                  <div className="mt-3 rounded-xl bg-background p-3 text-[12px] leading-relaxed text-muted-foreground ring-inset-hairline">
                    <p className="font-semibold text-foreground">Próximo passo (atenção):</p>
                    <ol className="mt-1 list-decimal space-y-0.5 pl-4">
                      <li>Clique em <strong>“Enviar tudo no WhatsApp”</strong> — a mensagem abre pronta.</li>
                      <li>Na conversa do WhatsApp, <strong>anexe o comprovante</strong> que você acabou de subir aqui (📎 anexo no WhatsApp).</li>
                      <li>Se preferir, <button type="button" onClick={downloadReceipt} className="underline underline-offset-2 hover:text-foreground">baixe novamente o comprovante</button> antes de anexar.</li>
                    </ol>
                  </div>
                )}
              </div>

              <div className="mt-5 rounded-2xl bg-surface p-4 ring-inset-hairline">
                <p className="text-[11px] uppercase tracking-widest text-muted-foreground">Resumo</p>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span>Plano {selected.name}</span>
                  <span className="font-semibold">Sinal {selected.deposit}</span>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-2">
                <a
                  href={formValid ? waLink(buildWaMessage()) : undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-disabled={!formValid}
                  onClick={(e) => {
                    if (!formValid) e.preventDefault();
                  }}
                  className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-semibold transition-transform active:scale-[0.98] ${
                    formValid
                      ? "bg-foreground text-background"
                      : "cursor-not-allowed bg-surface text-muted-foreground ring-inset-hairline"
                  }`}
                >
                  {formValid
                    ? "Continuar — enviar no WhatsApp →"
                    : !formFieldsValid
                      ? "Preencha salão e WhatsApp para continuar"
                      : "Anexe o comprovante para continuar"}
                </a>
                <button
                  onClick={() => setStep(2)}
                  className="w-full rounded-full border hairline px-6 py-3 text-xs font-medium text-muted-foreground hover:text-foreground"
                >
                  ← Voltar para o PIX
                </button>
              </div>

              <p className="mt-4 text-center text-[11px] leading-relaxed text-muted-foreground">
                <LockIcon /> Conforme a LGPD (Lei 13.709/18), seus dados ficam salvos apenas neste aparelho e são usados somente para a execução do projeto contratado.{" "}
                <Link to="/termos" className="underline underline-offset-2 hover:text-foreground">Ver Termos e Privacidade</Link>{" "}
                · Atendimento: (22) 97400-5878
              </p>
            </motion.div>
          )}

        </div>

        {/* Trust footer */}
        <div className="border-t hairline bg-surface px-5 py-3 text-center text-[10px] uppercase tracking-widest text-muted-foreground">
          <span className="inline-flex items-center gap-1.5"><LockIcon /> Conexão segura · Dados protegidos</span>
        </div>
      </motion.div>
    </div>
  );
}


/* ---------- Timeline ---------- */

const STEPS = [
  { t: "Escolha seu plano", d: "Selecione o nível que combina com seu salão." },
  { t: "Envie o formulário", d: "Informações essenciais para começarmos." },
  { t: "Pague o sinal via PIX", d: "Reserva sua vaga na fila de produção." },
  { t: "Envie comprovante + fotos", d: "Tudo direto pelo WhatsApp." },
  { t: "Projeto entra na fila", d: "Acompanhamento próximo durante a produção." },
  { t: "Prévia em até 2 dias", d: "Versão funcional para sua aprovação." },
  { t: "Pague o restante", d: "Sinal descontado do valor total." },
  { t: "Página final liberada", d: "Pronta para anúncios e Instagram." },
];

function Timeline() {
  return (
    <section className="border-t hairline bg-background">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
        <FadeIn><Eyebrow>Como funciona</Eyebrow></FadeIn>
        <FadeIn delay={0.05}>
          <h2 className="h-section mt-4 max-w-2xl">Um processo claro do primeiro contato à entrega final.</h2>
        </FadeIn>

        <ol className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <FadeIn key={s.t} delay={i * 0.02}>
              <li className="h-full bg-background p-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-muted-foreground">Etapa {String(i + 1).padStart(2, "0")}</span>
                  <span className="h-px w-8 bg-foreground/20" />
                </div>
                <h3 className="mt-5 text-base font-medium tracking-tight">{s.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </li>
            </FadeIn>
          ))}
        </ol>

        <p className="mt-6 text-xs text-muted-foreground">
          A prévia funcional não é a versão final. A liberação completa acontece após o pagamento restante.
        </p>
      </div>
    </section>
  );
}

/* ---------- Social proof ---------- */

function SocialProof() {
  const cards = [
    { who: "Salão atendido", where: "Macaé · RJ", quote: "Estrutura visual em padrão de marca grande, sem complicação na produção." },
    { who: "Salão atendido", where: "Macaé · RJ", quote: "A página guia a cliente direto para o WhatsApp. Funciona." },
    { who: "Salão atendido", where: "Macaé · RJ", quote: "Apresentação profissional que combina com o nível do meu trabalho." },
  ];
  return (
    <section className="border-t hairline bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
        <FadeIn><Eyebrow>Quem está com a gente</Eyebrow></FadeIn>
        <FadeIn delay={0.05}>
          <h2 className="h-section mt-4 max-w-2xl">Estrutura usada por salões em Macaé.</h2>
        </FadeIn>

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {cards.map((c, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <figure className="flex h-full flex-col justify-between rounded-2xl border hairline bg-background p-6">
                <blockquote className="text-sm leading-relaxed">“{c.quote}”</blockquote>
                <figcaption className="mt-6 border-t hairline pt-4">
                  <p className="text-sm font-medium">{c.who}</p>
                  <p className="text-xs text-muted-foreground">{c.where}</p>
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <div className="mt-12 flex flex-col items-center gap-4 rounded-2xl border hairline bg-background p-6 sm:flex-row sm:gap-6">
            <img src={founderPhoto} alt="Fundador Nex0s" width={64} height={64} loading="lazy" decoding="async" className="h-16 w-16 rounded-full object-cover ring-inset-hairline" />
            <div className="text-center sm:text-left">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Atendimento direto</p>
              <p className="mt-1 text-sm">Estúdio Nex0s · Páginas premium feitas para salões de Macaé.</p>
            </div>
            <div className="sm:ml-auto">
              <ReserveButton variant="ghost">Reservar minha vaga</ReserveButton>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ---------- Urgency ---------- */

function Urgency() {
  return (
    <section className="border-t hairline grad-dark text-white">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
        <FadeIn>
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/60">
            <span className="h-px w-6 bg-white/40" />
            Atenção
          </div>
        </FadeIn>
        <FadeIn delay={0.05}>
          <h2 className="h-section mt-4 max-w-3xl text-white">
            Poucas vagas disponíveis antes do <span className="italic font-normal text-white/70">Dia dos Namorados</span>.
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mt-5 max-w-xl text-white/70">
            Atendimento limitado para salões em Macaé. Alta procura nesta semana. A reserva é por ordem de pagamento do sinal.
          </p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ReserveButton variant="white" className="bg-neutral-900 text-white border border-white/20 hover:bg-neutral-800">Garantir minha vaga</ReserveButton>
            <ReserveButton variant="outline-white">Reservar agora</ReserveButton>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */

const FAQ = [
  { q: "Qual o prazo de entrega?", a: "A prévia funcional é enviada em até 2 dias após confirmação do formulário e do sinal. A versão final é liberada após a aprovação e o pagamento restante." },
  { q: "Como funciona o pagamento?", a: "Você paga o sinal via PIX (Mercado Pago) para reservar sua vaga. O valor do sinal é descontado do valor total. O restante é pago após aprovação da prévia." },
  { q: "Posso personalizar a página?", a: "Sim. Cada plano inclui um número de alterações após o envio da prévia. Plus permite até 3 e Avançado até 5." },
  { q: "Como envio as fotos do meu salão?", a: "Todas as fotos e materiais devem ser enviados diretamente pelo WhatsApp, junto com o comprovante do sinal." },
  { q: "Tem suporte depois da entrega?", a: "Sim, suporte via WhatsApp para dúvidas e ajustes dentro do limite do plano contratado." },
  { q: "E se eu já enviei o comprovante?", a: "Seu atendimento entra na fila assim que confirmamos o pagamento. Você recebe atualização pelo WhatsApp." },
  { q: "Quando a produção começa?", a: "A produção começa após a confirmação do formulário e do sinal." },
  { q: "A prévia já é a versão final?", a: "Não. A prévia é uma versão funcional para sua aprovação. A versão final é liberada após o pagamento restante." },
];

function Faq() {
  return (
    <section className="border-t hairline bg-background">
      <div className="mx-auto max-w-3xl px-5 py-20 sm:py-28">
        <FadeIn><Eyebrow>Perguntas frequentes</Eyebrow></FadeIn>
        <FadeIn delay={0.05}>
          <h2 className="h-section mt-4">Tudo claro antes de começar.</h2>
        </FadeIn>
        <div className="mt-10 divide-y divide-[var(--hairline)] border-y hairline">
          {FAQ.map((f, i) => (
            <details key={i} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium">
                {f.q}
                <span className="text-muted-foreground transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Final CTA + Footer ---------- */

function FinalCta({ onChoose }: { onChoose: () => void }) {
  return (
    <section className="border-t hairline bg-background">
      <div className="mx-auto max-w-4xl px-5 py-24 text-center sm:py-32">
        <FadeIn><Eyebrow>Próximo passo</Eyebrow></FadeIn>
        <FadeIn delay={0.05}>
          <h2 className="h-display mt-5">
            Garanta sua vaga <span className="italic font-normal text-muted-foreground">antes que acabe.</span>
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mx-auto mt-6 max-w-md text-muted-foreground">
            Pagamentos confirmados entram na fila por ordem de chegada. Atendimento exclusivo para salões em Macaé.
          </p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ReserveButton variant="primary">Reservar minha vaga agora</ReserveButton>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t hairline bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 py-10 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-foreground text-background text-[11px] font-semibold">N</span>
          <p className="text-sm">Nex0s · Páginas premium para salões em Macaé</p>
        </div>
        <div className="flex flex-col items-start gap-2 sm:items-end">
          <Link to="/termos" className="text-xs font-medium text-foreground underline-offset-4 hover:underline">
            Termos de Uso
          </Link>
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Nex0s. Atendimento via WhatsApp 22 97400-5878.</p>
        </div>
      </div>
    </footer>
  );
}


/* ---------- Sticky / Floating CTAs ---------- */

function FloatingWhats() {
  return (
    <a
      href={waLink("Olá, quero atendimento para meu salão em Macaé.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-24 right-4 z-40 grid h-14 w-14 place-items-center rounded-full bg-foreground text-background shadow-lg shadow-black/20 transition-transform hover:scale-105 sm:bottom-6"
    >
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden>
        <path d="M20.5 3.5A11.9 11.9 0 0 0 12 0C5.4 0 .1 5.3.1 11.9c0 2.1.6 4.1 1.6 5.9L0 24l6.4-1.7a11.9 11.9 0 0 0 5.6 1.4h.01c6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.2-3.4-8.3zM12 21.3h-.01a9.4 9.4 0 0 1-4.8-1.3l-.34-.2-3.8 1 1-3.7-.22-.38a9.4 9.4 0 1 1 8.17 4.58zm5.4-7.05c-.3-.15-1.74-.86-2-.95-.27-.1-.46-.15-.65.15s-.74.95-.9 1.14c-.17.2-.34.22-.63.08-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.74-1.64-2.04-.17-.3-.02-.46.13-.6.13-.13.3-.34.45-.5.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.65-1.57-.9-2.15-.23-.55-.47-.48-.65-.49h-.55c-.2 0-.5.07-.77.37-.27.3-1.02 1-1.02 2.43s1.05 2.83 1.2 3.02c.15.2 2.07 3.17 5.02 4.45.7.3 1.25.48 1.68.62.7.22 1.34.2 1.85.12.56-.08 1.74-.71 1.98-1.4.24-.69.24-1.27.17-1.4-.07-.13-.27-.2-.57-.35z" />
      </svg>
    </a>
  );
}

function StickyMobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t hairline bg-background/90 backdrop-blur-xl sm:hidden">
      <div className="p-3">
        <button
          type="button"
          onClick={() => triggerReservation()}
          className="inline-flex w-full items-center justify-center rounded-full bg-foreground px-4 py-3 text-xs font-medium text-background"
        >
          Garantir minha vaga →
        </button>
      </div>
    </div>
  );
}

/* ---------- Page ---------- */

const FUNNEL_STATE_KEY = "nex_funnel_state_v1";

function LandingPage() {
  const [selectedId, setSelectedId] = useState<string>("plus");
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const selected = PLANS.find((p) => p.id === selectedId) ?? PLANS[1];

  // Restore funnel state on mount (so returning from Mercado Pago lands on the same screen)
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(FUNNEL_STATE_KEY);
      if (raw) {
        const s = JSON.parse(raw) as { open?: boolean; planId?: string };
        if (s.planId) setSelectedId(s.planId);
        if (s.open) setPaymentOpen(true);
      }
    } catch {
      /* noop */
    }
    setHydrated(true);
  }, []);

  // Persist funnel state
  useEffect(() => {
    if (!hydrated) return;
    try {
      sessionStorage.setItem(
        FUNNEL_STATE_KEY,
        JSON.stringify({ open: paymentOpen, planId: selectedId }),
      );
    } catch {
      /* noop */
    }
  }, [paymentOpen, selectedId, hydrated]);

  useEffect(() => {
    const handler = () => setPaymentOpen(true);
    window.addEventListener(RESERVE_EVENT, handler);
    return () => window.removeEventListener(RESERVE_EVENT, handler);
  }, []);

  const onChoose = (p: Plan) => {
    setSelectedId(p.id);
    setPaymentOpen(true);
  };

  return (
    <main className="min-h-screen bg-background text-foreground pb-16 sm:pb-0">
      <Nav />
      <Hero />
      <Benefits />
      <Mockups />
      <Plans onChoose={onChoose} />
      <Timeline />
      <SocialProof />
      <Urgency />
      <Faq />
      <FinalCta onChoose={() => setPaymentOpen(true)} />
      <Footer />
      <FloatingWhats />
      <StickyMobileBar />
      <AnimatePresence>
        {paymentOpen && (
          <PaymentFlow selected={selected} onClose={() => setPaymentOpen(false)} />
        )}
      </AnimatePresence>
    </main>
  );
}

