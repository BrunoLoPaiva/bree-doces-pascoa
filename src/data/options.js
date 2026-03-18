// src/data/options.js

export const saboresCasca = [
  { id: "branco", nome: "Chocolate Branco", cor: "#f3e5d8", preco: 0, img: "chocolate_branco.jpg" },
  { id: "leite", nome: "Chocolate ao Leite", cor: "#5a2c1d", preco: 0, img: "chocolate.webp" }, 
];

// Fixing the broken unsplash link for ao leite
saboresCasca[1].img = "https://images.unsplash.com/photo-1614088685112-0a760b71a3c8?q=80&w=600&auto=format&fit=crop";

export const tiposCasca = [
  { id: "lisa", nome: "Lisa", preco: 0, img: "lisa.png" },
  { id: "crocante", nome: "Crocante (com amendoim)", preco: 8, img: "crocante.webp" },
];

export const tiposOvo = [
  { id: "tradicional", nome: "Tradicional (Somente Casca)", preco: 0, img: "simples.webp" }, // Will fix below
  { id: "trufado", nome: "Trufado (Casca com Recheio)", preco: 15, img: "recheado.webp" },
  { id: "colher", nome: "De Colher (Cheio)", preco: 25, img: "recheado.jpg" },
];

// tiposOvo[0].img = "https://images.unsplash.com/photo-1614088685112-0a760b71a3c8?q=80&w=600&auto=format&fit=crop";

export const recheios = [
  { id: "ninho_nutella", nome: "Ninho c/ Nutella", cor: "#fff2cc", preco: 0, img: "ninho_nutella.jpg" },
  { id: "brigadeiro", nome: "Brigadeiro", cor: "#3b1f14", preco: 0, img: "brigadeiro.avif" },
  { id: "beijinho", nome: "Beijinho", cor: "#f9e5c4", preco: 0, img: "beijinho.jpg" },
  { id: "maracuja", nome: "Maracujá", cor: "#ffcc00", preco: 0, img: "maracuja.jpg" },
  { id: "sensacao", nome: "Sensação", cor: "#ff6699", preco: 0, img: "sensacao.jpg" },
  { id: "pacoca", nome: "Paçoca", cor: "#c29b6e", preco: 0, img: "pacoca-recheio.jpg" },
  { id: "dois_amores", nome: "Dois Amores", cor: "#8b5a2b", preco: 0, img: "dois-amores.jpg" },
];

export const coberturas = [
  { id: "kitkat", nome: "Kit Kat", preco: 5, img: "https://t4.ftcdn.net/jpg/04/29/25/71/360_F_429257188_Aaj8zVjlQH70PZOzWomqS8X0EJgxhrkh.jpg" },
  { id: "confete", nome: "Confete", preco: 5, img: "https://img.freepik.com/fotos-premium/doces-coloridos-fundo-de-doces-coloridos-fundo-preto_259266-125.jpg" },
  { id: "bis", nome: "Bis", preco: 5, img: "https://62e4b2026e.cbaul-cdnwnd.com/7d4de7735f3389e81299f8124c6078a3/200000135-42bb342bb5/1007-bis-lacta.jpg?ph=62e4b2026e" },
  { id: "kinder", nome: "Kinder", preco: 8, img: "https://funchal.vtexassets.com/arquivos/ids/248156/foto_1_002.jpg?v=638461251121300000" },
  { id: "oreo", nome: "Oreo", preco: 5, img: "https://www.hola.com/horizon/original_aspect_ratio/1cc376d18717-adobe-oreo-1-a.jpg" },
  { id: "brownie", nome: "Brownie", preco: 6, img: "https://bakeandcakegourmet.com.br/uploads/site/receitas/brownie-a61d7xl1.jpg" },
  { id: "ovomaltine", nome: "Ovomaltine Rocks", preco: 5, img: "https://cdn.dooca.store/259/products/yjxtg0fth3no3zstkjvg1ut0nif4malmvkoq_640x640+fill_ffffff.jpg?v=1582745557&webp=0" },
  { id: "morango", nome: "Morango", preco: 7, img: "https://image.tuasaude.com/media/article/na/qf/beneficios-do-morango_39335.jpg?width=686&height=487" },
  { id: "nutella", nome: "Nutella Extra", preco: 8, img: "https://t4.ftcdn.net/jpg/03/40/59/61/360_F_340596198_RZ7WYwBq4LI12BfJZEE2AMOfWv0zNJOf.jpg" },
];

export const tamanhos = [
  { id: "150", nome: "150g", preco: 45 },
  { id: "300", nome: "300g", preco: 70 },
  { id: "500", nome: "500g", preco: 95 },
];

export const getNomeOpcao = (categoria, id) => {
  const allOptions = {
    saborCasca: saboresCasca,
    tipoCasca: tiposCasca,
    tipoOvo: tiposOvo,
    recheio: recheios,
    cobertura: coberturas,
    tamanho: tamanhos,
  };
  if (!allOptions[categoria]) return id;
  const opcao = allOptions[categoria].find(opt => opt.id === id);
  return opcao ? opcao.nome : id;
};
