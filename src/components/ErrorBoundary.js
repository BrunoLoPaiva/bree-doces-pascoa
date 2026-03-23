import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Atualiza o estado para que a próxima renderização mostre a interface de substituição (fallback)
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Aqui pode registar o erro num serviço de monitorização, se desejar
    console.error("Erro capturado pelo Error Boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Interface de utilizador amigável que será mostrada quando ocorrer um erro
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFF9FA] text-[#5A2C1D] p-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Ops! Algo não correu como esperado.
          </h1>
          <p className="text-[#8C7A70] mb-8 max-w-md">
            Tivemos um problema inesperado ao carregar esta página. Por favor,
            recarregue a página para tentar novamente.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#E5989B] text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-rose-200/50 hover:bg-[#d88689] transition-all"
          >
            Recarregar a página
          </button>
        </div>
      );
    }

    // Se não houver erro, renderiza os componentes filhos normalmente
    return this.props.children;
  }
}

export default ErrorBoundary;
