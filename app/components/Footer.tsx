import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Settings } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg font-playfair">DC</span>
              </div>
              <span className="text-xl font-bold gold-text font-playfair">Dexta's Collection</span>
            </div>
            <p className="text-gray-600 text-sm">
              Sua loja premium de eletrônicos e moda feminina em Moçambique. Qualidade e elegância em cada produto.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-yellow-600 transition-colors text-sm">
                  Página Inicial
                </Link>
              </li>
              <li>
                <Link href="/eletronicos" className="text-gray-600 hover:text-yellow-600 transition-colors text-sm">
                  Eletrônicos
                </Link>
              </li>
              <li>
                <Link
                  href="/roupas-femininas"
                  className="text-gray-600 hover:text-yellow-600 transition-colors text-sm"
                >
                  Roupas Femininas
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-gray-600 hover:text-yellow-600 transition-colors text-sm">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="/rastreamento" className="text-gray-600 hover:text-yellow-600 transition-colors text-sm">
                  Rastreamento
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>+258 84 123 4567</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span>info@dextascollection.mz</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>Maputo, Moçambique</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Redes Sociais</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-yellow-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-yellow-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-yellow-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">© 2025 Dexta's Collection. Todos os direitos reservados.</p>

          {/* Admin Button */}
          <Link
            href="/admin/login"
            className="mt-4 md:mt-0 text-gray-400 hover:text-yellow-600 transition-colors"
            title="Painel Administrativo"
          >
            <Settings className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </footer>
  )
}
