"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Package,
  DollarSign,
  Users,
  TrendingUp,
  Eye,
  Edit3,
  Save,
  LogOut,
  BarChart3,
  ShoppingCart,
  Star,
  Clock,
  Plus,
  Trash2,
  X,
} from "lucide-react"
import { products as initialProducts } from "@/app/data/products"
import type { Product } from "@/app/types/product"

interface Analytics {
  totalVisitors: number
  todayVisitors: number
  totalViews: number
  mostViewedProducts: Array<{
    id: string
    name: string
    views: number
    category: string
  }>
}

interface ProductStock {
  [key: string]: {
    stock: number
    price: number
  }
}

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [editingProduct, setEditingProduct] = useState<string | null>(null)
  const [productStock, setProductStock] = useState<ProductStock>({})
  const [saveMessage, setSaveMessage] = useState("")
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [selectedCategory, setSelectedCategory] = useState<"all" | "electronics" | "clothing">("all")
  const [isAddingProduct, setIsAddingProduct] = useState(false)
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    description: "",
    price: 0,
    category: "electronics",
    condition: "novo",
    inStock: true,
    image: "/placeholder.svg?height=400&width=400",
  })

  // Mock analytics data
  const [analytics] = useState<Analytics>({
    totalVisitors: 2847,
    todayVisitors: 156,
    totalViews: 8934,
    mostViewedProducts: [
      { id: "1", name: "iPhone 14 Pro Max", views: 342, category: "Eletrônicos" },
      { id: "8", name: "Vestido Elegante Dourado", views: 298, category: "Roupas Femininas" },
      { id: "4", name: "PlayStation 5", views: 267, category: "Eletrônicos" },
      { id: "7", name: "Blusa de Seda Premium", views: 234, category: "Roupas Femininas" },
      { id: "3", name: "MacBook Air M2", views: 198, category: "Eletrônicos" },
    ],
  })

  useEffect(() => {
    const authenticated = localStorage.getItem("adminAuthenticated")
    if (!authenticated) {
      router.push("/admin/login")
      return
    }
    setIsAuthenticated(true)

    // Initialize product stock data
    const initialStock: ProductStock = {}
    products.forEach((product) => {
      initialStock[product.id] = {
        stock: Math.floor(Math.random() * 50) + 5, // Random stock between 5-55
        price: product.price,
      }
    })
    setProductStock(initialStock)
  }, [router, products])

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated")
    router.push("/")
  }

  const handleSaveProduct = (productId: string) => {
    setEditingProduct(null)
    setSaveMessage("Produto atualizado com sucesso!")
    setTimeout(() => setSaveMessage(""), 3000)
  }

  const updateStock = (productId: string, newStock: number) => {
    setProductStock((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        stock: newStock,
      },
    }))
  }

  const updatePrice = (productId: string, newPrice: number) => {
    setProductStock((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        price: newPrice,
      },
    }))
  }

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.description || !newProduct.price) {
      setSaveMessage("Por favor, preencha todos os campos obrigatórios.")
      setTimeout(() => setSaveMessage(""), 3000)
      return
    }

    const productId = `new-${Date.now()}`
    const product: Product = {
      id: productId,
      name: newProduct.name!,
      description: newProduct.description!,
      price: newProduct.price!,
      category: newProduct.category as "electronics" | "clothing",
      condition: newProduct.condition as "novo" | "usado",
      inStock: true,
      image: "/placeholder.svg?height=400&width=400",
      sizes: newProduct.category === "clothing" ? ["P", "M", "G", "GG"] : undefined,
      colors: newProduct.category === "clothing" ? ["Preto", "Branco", "Cinza"] : undefined,
    }

    setProducts([...products, product])
    setProductStock((prev) => ({
      ...prev,
      [productId]: {
        stock: 10,
        price: newProduct.price!,
      },
    }))

    setNewProduct({
      name: "",
      description: "",
      price: 0,
      category: "electronics",
      condition: "novo",
      inStock: true,
      image: "/placeholder.svg?height=400&width=400",
    })
    setIsAddingProduct(false)
    setSaveMessage("Produto adicionado com sucesso!")
    setTimeout(() => setSaveMessage(""), 3000)
  }

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter((p) => p.id !== productId))
    setProductStock((prev) => {
      const newStock = { ...prev }
      delete newStock[productId]
      return newStock
    })
    setSaveMessage("Produto removido com sucesso!")
    setTimeout(() => setSaveMessage(""), 3000)
  }

  const filteredProducts = products.filter((product) => {
    if (selectedCategory === "all") return true
    return product.category === selectedCategory
  })

  const groupedProducts = {
    electronics: filteredProducts.filter((p) => p.category === "electronics"),
    clothing: filteredProducts.filter((p) => p.category === "clothing"),
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg font-playfair">DC</span>
              </div>
              <div>
                <h1 className="text-xl font-bold gold-text font-playfair">Painel Administrativo</h1>
                <p className="text-sm text-gray-600">Dexta's Collection</p>
              </div>
            </div>
            <Button onClick={handleLogout} variant="outline" className="flex items-center space-x-2 bg-transparent">
              <LogOut className="w-4 h-4" />
              <span>Sair</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {saveMessage && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <AlertDescription className="text-green-700">{saveMessage}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Visão Geral</span>
            </TabsTrigger>
            <TabsTrigger value="inventory" className="flex items-center space-x-2">
              <Package className="w-4 h-4" />
              <span>Inventário</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Análises</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center space-x-2">
              <ShoppingCart className="w-4 h-4" />
              <span>Pedidos</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="card-hover">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Visitantes Totais</CardTitle>
                  <Users className="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.totalVisitors.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+{analytics.todayVisitors} hoje</p>
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Visualizações</CardTitle>
                  <Eye className="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.totalViews.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Páginas visualizadas</p>
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Produtos</CardTitle>
                  <Package className="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{products.length}</div>
                  <p className="text-xs text-muted-foreground">Total no catálogo</p>
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Receita Estimada</CardTitle>
                  <DollarSign className="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2.4M MZN</div>
                  <p className="text-xs text-muted-foreground">Este mês</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-yellow-600" />
                  <span>Atividade Recente</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Novo pedido recebido - iPhone 14 Pro Max</span>
                    <span className="text-xs text-gray-500 ml-auto">2 min atrás</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Produto visualizado - Vestido Elegante Dourado</span>
                    <span className="text-xs text-gray-500 ml-auto">5 min atrás</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm">Estoque baixo - MacBook Air M2 (3 unidades)</span>
                    <span className="text-xs text-gray-500 ml-auto">1 hora atrás</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Inventory Tab */}
          <TabsContent value="inventory" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Gerenciar Inventário</CardTitle>
                    <CardDescription>Atualize preços, quantidades e gerencie produtos</CardDescription>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Select
                      value={selectedCategory}
                      onValueChange={(value: "all" | "electronics" | "clothing") => setSelectedCategory(value)}
                    >
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filtrar por categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas as Categorias</SelectItem>
                        <SelectItem value="electronics">Eletrônicos</SelectItem>
                        <SelectItem value="clothing">Roupas Femininas</SelectItem>
                      </SelectContent>
                    </Select>

                    <Dialog open={isAddingProduct} onOpenChange={setIsAddingProduct}>
                      <DialogTrigger asChild>
                        <Button className="btn-gold flex items-center space-x-2">
                          <Plus className="w-4 h-4" />
                          <span>Adicionar Produto</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Adicionar Novo Produto</DialogTitle>
                          <DialogDescription>Preencha as informações do novo produto</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="name">Nome do Produto</Label>
                            <Input
                              id="name"
                              value={newProduct.name || ""}
                              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                              placeholder="Ex: iPhone 15 Pro"
                            />
                          </div>
                          <div>
                            <Label htmlFor="description">Descrição</Label>
                            <Textarea
                              id="description"
                              value={newProduct.description || ""}
                              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                              placeholder="Descrição detalhada do produto"
                              rows={3}
                            />
                          </div>
                          <div>
                            <Label htmlFor="price">Preço (MZN)</Label>
                            <Input
                              id="price"
                              type="number"
                              value={newProduct.price || ""}
                              onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                              placeholder="0"
                            />
                          </div>
                          <div>
                            <Label htmlFor="category">Categoria</Label>
                            <Select
                              value={newProduct.category}
                              onValueChange={(value: "electronics" | "clothing") =>
                                setNewProduct({ ...newProduct, category: value })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="electronics">Eletrônicos</SelectItem>
                                <SelectItem value="clothing">Roupas Femininas</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          {newProduct.category === "electronics" && (
                            <div>
                              <Label htmlFor="condition">Condição</Label>
                              <Select
                                value={newProduct.condition}
                                onValueChange={(value: "novo" | "usado") =>
                                  setNewProduct({ ...newProduct, condition: value })
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="novo">Novo</SelectItem>
                                  <SelectItem value="usado">Usado</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          )}
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsAddingProduct(false)}>
                            Cancelar
                          </Button>
                          <Button onClick={handleAddProduct} className="btn-gold">
                            Adicionar Produto
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {selectedCategory === "all" ? (
                  <div className="space-y-8">
                    {/* Electronics Section */}
                    {groupedProducts.electronics.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                          <Package className="w-5 h-5 mr-2 text-yellow-600" />
                          Eletrônicos ({groupedProducts.electronics.length})
                        </h3>
                        <div className="space-y-4">
                          {groupedProducts.electronics.map((product) => (
                            <ProductRow
                              key={product.id}
                              product={product}
                              productStock={productStock}
                              editingProduct={editingProduct}
                              setEditingProduct={setEditingProduct}
                              updateStock={updateStock}
                              updatePrice={updatePrice}
                              handleSaveProduct={handleSaveProduct}
                              handleDeleteProduct={handleDeleteProduct}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Clothing Section */}
                    {groupedProducts.clothing.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                          <Package className="w-5 h-5 mr-2 text-yellow-600" />
                          Roupas Femininas ({groupedProducts.clothing.length})
                        </h3>
                        <div className="space-y-4">
                          {groupedProducts.clothing.map((product) => (
                            <ProductRow
                              key={product.id}
                              product={product}
                              productStock={productStock}
                              editingProduct={editingProduct}
                              setEditingProduct={setEditingProduct}
                              updateStock={updateStock}
                              updatePrice={updatePrice}
                              handleSaveProduct={handleSaveProduct}
                              handleDeleteProduct={handleDeleteProduct}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredProducts.map((product) => (
                      <ProductRow
                        key={product.id}
                        product={product}
                        productStock={productStock}
                        editingProduct={editingProduct}
                        setEditingProduct={setEditingProduct}
                        updateStock={updateStock}
                        updatePrice={updatePrice}
                        handleSaveProduct={handleSaveProduct}
                        handleDeleteProduct={handleDeleteProduct}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-600" />
                    <span>Produtos Mais Visualizados</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics.mostViewedProducts.map((item, index) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{item.name}</p>
                            <p className="text-xs text-gray-600">{item.category}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-yellow-600">{item.views}</p>
                          <p className="text-xs text-gray-600">visualizações</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Estatísticas de Visitantes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Visitantes Hoje</span>
                        <span className="text-sm text-gray-600">{analytics.todayVisitors}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-2 rounded-full"
                          style={{ width: `${(analytics.todayVisitors / 200) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Meta Mensal</span>
                        <span className="text-sm text-gray-600">2847 / 5000</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full"
                          style={{ width: `${(analytics.totalVisitors / 5000) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-yellow-600">68%</p>
                        <p className="text-xs text-gray-600">Taxa de Retorno</p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-green-600">3.2</p>
                        <p className="text-xs text-gray-600">Páginas/Sessão</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pedidos Recentes</CardTitle>
                <CardDescription>Gerencie e acompanhe os pedidos dos clientes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: "ORD-001",
                      customer: "Maria Silva",
                      product: "iPhone 14 Pro Max",
                      amount: "85.000 MZN",
                      status: "Pendente",
                      time: "2 horas atrás",
                    },
                    {
                      id: "ORD-002",
                      customer: "João Santos",
                      product: "MacBook Air M2",
                      amount: "120.000 MZN",
                      status: "Processando",
                      time: "4 horas atrás",
                    },
                    {
                      id: "ORD-003",
                      customer: "Ana Costa",
                      product: "Vestido Elegante Dourado",
                      amount: "4.500 MZN",
                      status: "Enviado",
                      time: "1 dia atrás",
                    },
                    {
                      id: "ORD-004",
                      customer: "Pedro Machado",
                      product: "PlayStation 5",
                      amount: "65.000 MZN",
                      status: "Entregue",
                      time: "2 dias atrás",
                    },
                  ].map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-gray-600">{order.customer}</p>
                        </div>
                        <div>
                          <p className="text-sm">{order.product}</p>
                          <p className="text-sm font-medium text-yellow-600">{order.amount}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <Badge
                          variant={
                            order.status === "Entregue"
                              ? "default"
                              : order.status === "Enviado"
                                ? "secondary"
                                : order.status === "Processando"
                                  ? "outline"
                                  : "destructive"
                          }
                        >
                          {order.status}
                        </Badge>
                        <span className="text-xs text-gray-500">{order.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// Product Row Component
interface ProductRowProps {
  product: Product
  productStock: ProductStock
  editingProduct: string | null
  setEditingProduct: (id: string | null) => void
  updateStock: (id: string, stock: number) => void
  updatePrice: (id: string, price: number) => void
  handleSaveProduct: (id: string) => void
  handleDeleteProduct: (id: string) => void
}

function ProductRow({
  product,
  productStock,
  editingProduct,
  setEditingProduct,
  updateStock,
  updatePrice,
  handleSaveProduct,
  handleDeleteProduct,
}: ProductRowProps) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex items-center space-x-4">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-16 h-16 object-cover rounded-lg"
        />
        <div>
          <h3 className="font-medium">{product.name}</h3>
          <p className="text-sm text-gray-600">
            {product.category === "electronics" ? "Eletrônicos" : "Roupas Femininas"}
            {product.condition && ` • ${product.condition}`}
          </p>
          <Badge variant={productStock[product.id]?.stock > 10 ? "default" : "destructive"}>
            {productStock[product.id]?.stock || 0} em estoque
          </Badge>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {editingProduct === product.id ? (
          <div className="flex items-center space-x-2">
            <div>
              <Label className="text-xs">Estoque</Label>
              <Input
                type="number"
                value={productStock[product.id]?.stock || 0}
                onChange={(e) => updateStock(product.id, Number.parseInt(e.target.value) || 0)}
                className="w-20 h-8"
              />
            </div>
            <div>
              <Label className="text-xs">Preço (MZN)</Label>
              <Input
                type="number"
                value={productStock[product.id]?.price || 0}
                onChange={(e) => updatePrice(product.id, Number.parseInt(e.target.value) || 0)}
                className="w-24 h-8"
              />
            </div>
            <Button size="sm" onClick={() => handleSaveProduct(product.id)} className="btn-gold h-8">
              <Save className="w-3 h-3" />
            </Button>
            <Button size="sm" variant="outline" onClick={() => setEditingProduct(null)} className="h-8">
              <X className="w-3 h-3" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="font-medium">{(productStock[product.id]?.price || product.price).toLocaleString()} MZN</p>
              <p className="text-sm text-gray-600">{productStock[product.id]?.stock || 0} unidades</p>
            </div>
            <Button size="sm" variant="outline" onClick={() => setEditingProduct(product.id)}>
              <Edit3 className="w-3 h-3" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleDeleteProduct(product.id)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
