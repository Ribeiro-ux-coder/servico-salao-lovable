import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/termos")({
  head: () => ({
    meta: [
      { title: "Termos de Uso — Nex0s" },
      {
        name: "description",
        content:
          "Termos de Uso da Nex0s: regras de contratação, pagamento, entrega, prévia, suporte e responsabilidades dos serviços de criação de páginas.",
      },
      { property: "og:title", content: "Termos de Uso — Nex0s" },
      { property: "og:description", content: "Condições de contratação dos serviços Nex0s." },
    ],
    links: [{ rel: "canonical", href: "/termos" }],
  }),
  component: TermosPage,
});

const SECTIONS: Array<{ title: string; body: string | string[] }> = [
  {
    title: "1. Identificação",
    body: [
      "Estes Termos de Uso regem a contratação dos serviços prestados pela Nex0s, estúdio de criação de páginas profissionais para salões de beleza, com atendimento exclusivo para a região de Macaé/RJ.",
      "Titular dos pagamentos: Nicoly Vera Cruz da Conceição. Atendimento oficial pelo WhatsApp (22) 97400-5878.",
    ],
  },
  {
    title: "2. Objeto do serviço",
    body:
      "A Nex0s desenvolve páginas promocionais (landing pages) personalizadas conforme o plano contratado pelo cliente: Básico, Plus ou Avançado. Os recursos de cada plano são os descritos na página de planos no momento da contratação.",
  },
  {
    title: "3. Sinal e pagamento",
    body: [
      "Para reservar uma vaga na fila de produção, o cliente paga um sinal via Mercado Pago no valor correspondente ao plano escolhido (R$ 50, R$ 120 ou R$ 180).",
      "O sinal é descontado do valor total do plano. O restante é pago após a aprovação da prévia funcional e antes da liberação da versão final.",
      "A reserva é confirmada por ordem de pagamento. Não há cobrança recorrente.",
    ],
  },
  {
    title: "4. Prazo de entrega",
    body:
      "A prévia funcional é enviada em até 2 dias corridos após a confirmação do pagamento do sinal e do recebimento das informações e fotos do salão. A versão final é liberada após a aprovação da prévia e o pagamento do valor restante.",
  },
  {
    title: "5. Alterações e revisões",
    body:
      "Cada plano inclui um limite de alterações após o envio da prévia: Básico (até 1), Plus (até 3) e Avançado (até 5). Alterações que excedam o limite podem ser orçadas à parte.",
  },
  {
    title: "6. Materiais do cliente",
    body:
      "O cliente é responsável por fornecer textos, fotos e informações verídicas do seu salão. A Nex0s não se responsabiliza por uso indevido de imagens de terceiros enviadas pelo cliente.",
  },
  {
    title: "7. Reembolso",
    body:
      "O sinal não é reembolsável após o início da produção, pois reserva a vaga e o tempo da equipe. Caso a Nex0s não cumpra o prazo da prévia por motivos exclusivamente internos, o cliente pode optar pelo reembolso integral do sinal.",
  },
  {
    title: "8. Propriedade e uso",
    body:
      "Após o pagamento integral, o cliente recebe o direito de uso da página entregue. O código-fonte, estrutura e identidade visual desenvolvidos pela Nex0s podem ser reutilizados como referência em portfólio.",
  },
  {
    title: "9. Suporte",
    body:
      "O suporte é realizado via WhatsApp para dúvidas e ajustes dentro do limite do plano contratado, durante 30 dias após a entrega final.",
  },
  {
    title: "10. Privacidade e LGPD",
    body: [
      "Em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), os dados informados pelo cliente (nome, WhatsApp, e-mail, endereço, fotos e textos do salão) são tratados exclusivamente para a execução do projeto contratado, comunicação e cumprimento de obrigações legais. A base legal é a execução de contrato e o consentimento do titular.",
      "Os dados preenchidos no formulário ficam armazenados localmente no aparelho do cliente (localStorage) até o envio para o nosso WhatsApp. Não compartilhamos dados com terceiros, exceto com o Mercado Pago para processamento de pagamento, conforme a política da própria plataforma.",
      "O cliente pode, a qualquer momento, solicitar acesso, correção, portabilidade, anonimização ou exclusão dos seus dados pelo WhatsApp (22) 97400-5878. Os dados são mantidos pelo tempo necessário para a prestação do serviço e cumprimento de obrigações fiscais.",
    ],
  },
  {
    title: "11. Alterações destes Termos",
    body:
      "Estes Termos podem ser atualizados a qualquer momento. A versão vigente é sempre a publicada nesta página.",
  },
  {
    title: "12. Foro",
    body:
      "Fica eleito o foro da Comarca de Macaé/RJ para dirimir quaisquer dúvidas oriundas destes Termos.",
  },
];

function TermosPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b hairline bg-surface">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-5">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-foreground text-background text-[11px] font-semibold">N</span>
            <span className="text-sm font-medium">Nex0s</span>
          </Link>
          <Link to="/" className="text-xs font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
            ← Voltar ao site
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-5 py-16 sm:py-24">
        <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Documento legal</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Termos de Uso</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Última atualização: {new Date().toLocaleDateString("pt-BR")}
        </p>

        <div className="mt-12 space-y-10">
          {SECTIONS.map((s) => (
            <article key={s.title}>
              <h2 className="text-lg font-semibold tracking-tight">{s.title}</h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
                {Array.isArray(s.body)
                  ? s.body.map((p, i) => <p key={i}>{p}</p>)
                  : <p>{s.body}</p>}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border hairline bg-surface p-6 text-sm">
          <p className="text-muted-foreground">
            Dúvidas sobre estes Termos? Fale com a gente no WhatsApp{" "}
            <a
              href="https://wa.me/5522974005878"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              (22) 97400-5878
            </a>
            .
          </p>
        </div>
      </section>

      <footer className="border-t hairline bg-surface">
        <div className="mx-auto max-w-3xl px-5 py-8 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Nex0s · Macaé/RJ
        </div>
      </footer>
    </main>
  );
}
