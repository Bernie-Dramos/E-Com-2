import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg font-playfair">DC</span>
              </div>
              <span className="text-xl font-bold gold-text font-playfair">Dexta's Collection</span>
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              Sua loja premium de eletrônicos e moda feminina em Moçambique. Oferecemos produtos de qualidade com
              atendimento excepcional.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-yellow-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/eletronicos" className="text-gray-600 hover:text-yellow-600 transition-colors">
                  Eletrônicos
                </Link>
              </li>
              <li>
                <Link href="/roupas-femininas" className="text-gray-600 hover:text-yellow-600 transition-colors">
                  Roupas Femininas
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-gray-600 hover:text-yellow-600 transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="/rastreamento" className="text-gray-600 hover:text-yellow-600 transition-colors">
                  Rastreamento
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-gray-600">
                <Phone className="w-4 h-4" />
                <span>+258 84 123 4567</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-600">
                <Mail className="w-4 h-4" />
                <span>info@dextascollection.mz</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>Maputo, Moçambique</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-gray-600">
          <p>&copy; 2024 Dexta's Collection. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
