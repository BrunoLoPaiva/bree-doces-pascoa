// src/data/options.js

export const saboresCasca = [
  {
    id: "branco",
    nome: "Chocolate Branco",
    cor: "#f3e5d8",
    preco: 0,
    img: "chocolate_branco.jpg",
  },
  {
    id: "leite",
    nome: "Chocolate ao Leite",
    cor: "#5a2c1d",
    preco: 0,
    img: "https://images.unsplash.com/photo-1614088685112-0a760b71a3c8?q=80&w=600&auto=format&fit=crop",
  },
];

export const tiposCasca = [
  { id: "lisa", nome: "Lisa", preco: 0, img: "lisa.png" },
  {
    id: "crocante",
    nome: "Crocante (com amendoim)",
    preco: 0,
    img: "https://i.ytimg.com/vi/SRvA-dWi9zc/maxresdefault.jpg",
  }, // Preço calculado dinamicamente
];

export const tiposOvo = [
  {
    id: "tradicional",
    nome: "Tradicional (2 Cascas Fechadas)",
    preco: 0,
    img: "simples.webp",
  },
  {
    id: "trufado",
    nome: "Trufado (Casca Recheada)",
    preco: 0,
    img: "recheado.webp",
  },
  { id: "colher", nome: "De Colher (Cheio)", preco: 0, img: "recheado.jpg" },
];

export const kits = [
  { id: "unidade", nome: "Unidade (1 Ovo)", mult: 1 },
  { id: "dupla", nome: "Dupla (2 Ovos)", mult: 2 },
  { id: "trio", nome: "Trio (3 Ovos)", mult: 3 },
  { id: "quarteto", nome: "Quarteto (4 Ovos)", mult: 4 },
];

export const recheios = [
  // Premium
  {
    id: "ninho_nutella",
    nome: "Ninho c/ Nutella",
    categoria: "premium",
    cor: "#fff2cc",
    preco: 0,
    img: "ninho_nutella.jpg",
  },
  {
    id: "dois_amores",
    nome: "Dois Amores (Ninho c/ Brigadeiro)",
    categoria: "premium",
    cor: "#8b5a2b",
    preco: 0,
    img: "dois-amores.jpg",
  },
  // Tradicionais
  {
    id: "brigadeiro",
    nome: "Brigadeiro",
    categoria: "tradicional",
    cor: "#3b1f14",
    preco: 0,
    img: "brigadeiro.jpg",
  },
  {
    id: "beijinho",
    nome: "Beijinho",
    categoria: "tradicional",
    cor: "#f9e5c4",
    preco: 0,
    img: "beijinho.jpg",
  },
  {
    id: "maracuja",
    nome: "Maracujá",
    categoria: "tradicional",
    cor: "#ffcc00",
    preco: 0,
    img: "maracuja.jpg",
  },
  {
    id: "sensacao",
    nome: "Sensação",
    categoria: "tradicional",
    cor: "#ff6699",
    preco: 0,
    img: "sensacao.jpg",
  },
  {
    id: "pacoca",
    nome: "Paçoca",
    categoria: "tradicional",
    cor: "#c29b6e",
    preco: 0,
    img: "amendoim.jpg",
  },
];

export const coberturas = [
  {
    id: "kitkat",
    nome: "Kit Kat",
    // Preço dinâmico por tamanho (chaves string para consistência com tamanhoId)
    precos: { "50": 1.0, "150": 2.5, "250": 4.0, "350": 5.0, "500": 6.0 },
    img: "https://t4.ftcdn.net/jpg/04/29/25/71/360_F_429257188_Aaj8zVjlQH70PZOzWomqS8X0EJgxhrkh.jpg",
  },
  {
    id: "confete",
    nome: "Confete",
    precos: { "50": 0.5, "150": 1.5, "250": 2.5, "350": 3.5, "500": 5.0 },
    img: "https://img.freepik.com/fotos-premium/doces-coloridos-fundo-de-doces-coloridos-fundo-preto_259266-125.jpg",
  },
  {
    id: "bis",
    nome: "Bis",
    precos: { "50": 0.5, "150": 1.5, "250": 2.0, "350": 3.0, "500": 4.0 },
    img: "https://62e4b2026e.cbaul-cdnwnd.com/7d4de7735f3389e81299f8124c6078a3/200000135-42bb342bb5/1007-bis-lacta.jpg?ph=62e4b2026e",
  },
  {
    id: "kinder",
    nome: "Kinder Bueno",
    precos: { "50": 2.5, "150": 4.5, "250": 6.5, "350": 9.0, "500": 11.0 },
    img: "https://funchal.vtexassets.com/arquivos/ids/248156/foto_1_002.jpg?v=638461251121300000",
  },
  {
    id: "oreo",
    nome: "Oreo",
    precos: { "50": 1.0, "150": 2.5, "250": 4.0, "350": 5.0, "500": 6.0 },
    img: "https://www.hola.com/horizon/original_aspect_ratio/1cc376d18717-adobe-oreo-1-a.jpg",
  },
  {
    id: "brownie",
    nome: "Brownie",
    precos: { "50": 1.5, "150": 3.0, "250": 4.5, "350": 6.0, "500": 7.0 },
    img: "https://bakeandcakegourmet.com.br/uploads/site/receitas/brownie-a61d7xl1.jpg",
  },
  {
    id: "ovomaltine",
    nome: "Ovomaltine Rocks",
    precos: { "50": 2.0, "150": 3.0, "250": 4.0, "350": 5.0, "500": 6.0 },
    img: "https://cdn.dooca.store/259/products/yjxtg0fth3no3zstkjvg1ut0nif4malmvkoq_640x640+fill_ffffff.jpg?v=1582745557&webp=0",
  },
  {
    id: "morango",
    nome: "Morango Fresco",
    precos: { "50": 1.5, "150": 3.5, "250": 5.0, "350": 6.5, "500": 8.0 },
    img: "https://image.tuasaude.com/media/article/na/qf/beneficios-do-morango_39335.jpg?width=686&height=487",
  },
  {
    id: "nutella",
    nome: "Nutella Extra",
    precos: { "50": 2.0, "150": 4.5, "250": 7.0, "350": 9.0, "500": 12.0 },
    img: "https://t4.ftcdn.net/jpg/03/40/59/61/360_F_340596198_RZ7WYwBq4LI12BfJZEE2AMOfWv0zNJOf.jpg",
  },
  {
    id: "granule",
    nome: "Granule",
    precos: { "50": 1.5, "150": 2.5, "250": 3.5, "350": 4.5, "500": 5.5 },
    img: "https://docemalu.vtexassets.com/arquivos/ids/5368117-800-auto?v=639021241434670000&width=800&height=auto&aspect=true",
  },
  {
    id: "amendoim",
    nome: "Amendoim",
    precos: { "50": 1, "150": 2, "250": 3, "350": 4, "500": 5 },
    img: "https://inovanuts.cdn.magazord.com.br/img/2023/03/produto/457/granulado-de-amendoim.jpg",
  },
];

// Valores base atualizados pela tabela da imagem
export const tamanhos = [
  { id: "50", nome: "50g", baseLisa: 15, adcCrocante: 2 },
  { id: "150", nome: "150g", baseLisa: 35, adcCrocante: 3 },
  { id: "250", nome: "250g", baseLisa: 45, adcCrocante: 3 },
  { id: "350", nome: "350g", baseLisa: 55, adcCrocante: 4 },
  { id: "500", nome: "500g", baseLisa: 65, adcCrocante: 5 },
];

// Tabela de preços adicionais de recheios
export const tabelaRecheios = {
  tradicional: {
    50: { trufado: 0, colher: 3.0 },
    150: { trufado: 3.0, colher: 4.5 },
    250: { trufado: 3.0, colher: 4.5 },
    350: { trufado: 4.0, colher: 5.0 },
    500: { trufado: 5.0, colher: 6.0 },
  },
  premium: {
    50: { trufado: 0, colher: 4.0 },
    150: { trufado: 4.0, colher: 5.0 },
    250: { trufado: 4.0, colher: 5.0 },
    350: { trufado: 4.5, colher: 5.5 },
    500: { trufado: 5.5, colher: 6.5 },
  },
};

// --- FUNÇÃO CENTRAL DE PRECIFICAÇÃO ---
export const calcularPrecoTotal = (pedido) => {
  if (!pedido) return 0;

  // Normalizar tamanho: garantir que é string para busca correta
  const tamanhoId = String(pedido.tamanho || "");
  const tam = tamanhos.find((t) => t.id === tamanhoId);
  if (!tam) {
    console.warn("[calcularPrecoTotal] Tamanho inválido:", pedido.tamanho);
    return 0;
  }

  // Preço base por ovo (casca, sem recheio/cobertura)
  const calcularBasePorOvo = (tipoCascaId) => {
    let base = tam.baseLisa;
    if (tipoCascaId === "crocante") base += tam.adcCrocante;
    return base;
  };

  // Preço adicional do recheio de um ovo específico
  const calcularRecheioOvo = (recheioId) => {
    if (pedido.tipoOvo === "tradicional" || !recheioId) return 0;
    const rech = recheios.find((r) => r.id === recheioId);
    if (!rech) return 0;
    return tabelaRecheios[rech.categoria]?.[tamanhoId]?.[pedido.tipoOvo] || 0;
  };

  // Preço adicional da cobertura de um ovo específico
  const calcularCoberturaOvo = (coberturaId) => {
    if (pedido.tipoOvo !== "colher" || !coberturaId) return 0;
    const cob = coberturas.find((c) => c.id === coberturaId);
    return cob?.precos?.[tamanhoId] || 0;
  };

  // Desconto por kit
  let desconto = 0;
  const k = kits.find((x) => x.id === pedido.kit);
  if (k && pedido.tipoOvo !== "tradicional") {
    if (k.id === "dupla") desconto = 3.0;
    else if (k.id === "trio") desconto = 5.0;
    else if (k.id === "quarteto") desconto = 10.0;
  }

  // Se usa formato com array de ovos individuais
  if (pedido.ovos && pedido.ovos.length > 0) {
    const totalOvos = pedido.ovos.reduce((acc, ovo) => {
      const base = calcularBasePorOvo(ovo.tipoCasca || pedido.tipoCasca);
      const recheio = calcularRecheioOvo(ovo.recheio);
      const cobertura = calcularCoberturaOvo(ovo.cobertura);
      return acc + base + recheio + cobertura;
    }, 0);
    return Math.max(0, totalOvos - desconto);
  }

  // Fallback: formato legado (campo plano)
  const totalPorOvo =
    calcularBasePorOvo(pedido.tipoCasca) +
    calcularRecheioOvo(pedido.recheio) +
    calcularCoberturaOvo(pedido.cobertura);
  const multiplicador = k ? k.mult : 1;
  return Math.max(0, totalPorOvo * multiplicador - desconto);
};

export const getNomeOpcao = (categoria, id) => {
  const allOptions = {
    saborCasca: saboresCasca,
    tipoCasca: tiposCasca,
    tipoOvo: tiposOvo,
    recheio: recheios,
    cobertura: coberturas,
    tamanho: tamanhos,
    kit: kits,
  };
  if (!allOptions[categoria]) return id;
  const opcao = allOptions[categoria].find((opt) => opt.id === id);
  return opcao ? opcao.nome : id;
};
