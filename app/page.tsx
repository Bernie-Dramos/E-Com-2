import Link from "next/link"
import { ArrowRight, Star, Shield, Truck, Headphones } from "lucide-react"
import ProductCard from "./components/ProductCard"
import { getFeaturedProducts } from "./data/products"

export default function Home() {
  const featuredProducts = getFeaturedProducts()

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-white via-yellow-50 to-white hero-pattern py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8 animate-slide-up">
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-2xl mx-auto mb-6">
                <span className="text-white font-bold text-4xl font-playfair">DC</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 font-playfair">
                <span className="gold-text">Dexta's</span>
                <br />
                <span className="text-gray-900">Collection</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Sua loja premium de eletrônicos e moda feminina em Moçambique. Qualidade, elegância e sofisticação em
                cada produto.
              </p>
              <Link href="/eletronicos" className="btn-gold inline-flex items-center space-x-2">
                <span>Comprar Agora</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Produtos Autênticos</h3>
              <p className="text-gray-600 text-sm">Garantia de originalidade em todos os produtos</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Entrega Rápida</h3>
              <p className="text-gray-600 text-sm">Entregamos em todo Moçambique</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Qualidade Premium</h3>
              <p className="text-gray-600 text-sm">Selecionamos apenas os melhores produtos</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Suporte 24/7</h3>
              <p className="text-gray-600 text-sm">Atendimento via WhatsApp sempre disponível</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">
              Produtos em <span className="gold-text">Destaque</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Descubra nossa seleção especial de produtos premium, cuidadosamente escolhidos para você.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Link href="/eletronicos" className="btn-gold mr-4">
              Ver Eletrônicos
            </Link>
            <Link href="/roupas-femininas" className="btn-gold">
              Ver Roupas Femininas
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gradient-to-r from-yellow-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-playfair">
              Sobre a <span className="gold-text">Dexta's Collection</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Somos uma loja premium especializada em eletrônicos de última geração e moda feminina sofisticada. Nossa
              missão é oferecer produtos de alta qualidade com atendimento excepcional, proporcionando uma experiência
              de compra única e luxuosa para nossos clientes em Moçambique.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold gold-text mb-2">500+</div>
                <p className="text-gray-600">Produtos Disponíveis</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gold-text mb-2">1000+</div>
                <p className="text-gray-600">Clientes Satisfeitos</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gold-text mb-2">2+</div>
                <p className="text-gray-600">Anos de Experiência</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
